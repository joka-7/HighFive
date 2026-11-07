// Keeps the store's learning state in step with the learner's own Google
// Drive (services/driveSync). The merge rules live in utils/cloudMerge; this
// hook only decides *when* to pull and push:
//
// - Every state change is fingerprint-diffed against the last accounted-for
//   snapshot. While an account is linked, the changed ids are recorded as
//   pending (utils/pendingSync) before anything is sent, so a write that never
//   lands is replayed by the next pull instead of being overwritten.
// - Changes are uploaded only once this session has pulled and merged for the
//   connected account — never before, so a stale local copy can't be stamped
//   as the newest version of a record.
// - A pull runs on connect, on retry ("sync now"), when the tab comes back
//   into view, and when the Android app resumes from the background.

import { useCallback, useEffect, useRef, useState } from "react";
import { onAppResume as defaultOnAppResume } from "../services/appLifecycle";
import { driveSync as defaultDriveSync } from "../services/cloud";
import { DriveSyncError, type DriveSync, type DriveUser } from "../services/driveSync";
import { reportError } from "../services/errors";
import {
  PROFILE_PENDING,
  SYNC_COLLECTIONS,
  diffForUpload,
  isEmptyUpload,
  mergePull,
  snapshotOf,
  type PendingByCollection,
  type ProfileField,
  type Snapshot,
  type SyncedState,
  type Upload,
} from "../utils/cloudMerge";
import {
  clearLocalSyncState,
  clearPendingIds,
  readDataOwner,
  readPending,
  recordLocalChanges,
  writeDataOwner,
} from "../utils/pendingSync";

/** A pull when the tab returns to view runs at most this often. */
const VISIBILITY_PULL_MIN_MS = 60_000;

const PENDING_KEYS = [...SYNC_COLLECTIONS, PROFILE_PENDING] as const;

export interface CloudSyncOptions {
  /** The store's current learning state. */
  readonly state: SyncedState;
  /** Replace the store's learning state with a merged one. */
  readonly apply: (next: SyncedState) => void;
  /** Clear local learning data (sign-out must, so the next account starts clean). */
  readonly resetLocal: () => void;
  /** Fallbacks for profile fields neither side has. */
  readonly defaults: Pick<SyncedState, "progress" | "dailyMissions">;
  readonly sync?: DriveSync;
  /** Subscribes to the native app returning to the foreground; returns an unsubscribe. */
  readonly onAppResume?: (callback: () => void) => () => void;
}

export interface CloudSync {
  readonly cloudConfigured: boolean;
  readonly user: DriveUser | null;
  /**
   * An account is stored on this device, even while its browser token has
   * lapsed (`user` null): changes made now still reach Drive on reconnect.
   */
  readonly cloudLinked: boolean;
  readonly authReady: boolean;
  readonly cloudSyncError: boolean;
  readonly retryCloudSync: () => void;
  readonly signIn: () => Promise<void>;
  readonly signOut: () => Promise<void>;
  /** Delete every synced file from Drive and revoke access; local progress stays. */
  readonly deleteCloudData: () => Promise<void>;
}

function readAllPending(): PendingByCollection {
  return Object.fromEntries(PENDING_KEYS.map((key) => [key, readPending(key)])) as PendingByCollection;
}

/** Signed out, or offline: the change stays pending and the next pull replays it. */
function isExpectedSyncFailure(err: unknown): boolean {
  return err instanceof DriveSyncError && (err.code === "signed-out" || err.code === "offline");
}

function recordUpload(upload: Upload, notPending: readonly ProfileField[] = []): void {
  for (const collection of SYNC_COLLECTIONS) {
    recordLocalChanges(collection, {
      edited: (upload.upserts[collection] ?? []).map((item) => String(item.id)),
      deleted: upload.deletes[collection] ?? [],
    });
  }
  const quiet = new Set<string>(notPending);
  recordLocalChanges(PROFILE_PENDING, { edited: Object.keys(upload.profile).filter((f) => !quiet.has(f)) });
}

export function useCloudSync({
  state,
  apply,
  resetLocal,
  defaults,
  sync = defaultDriveSync,
  onAppResume = defaultOnAppResume,
}: CloudSyncOptions): CloudSync {
  const [user, setUser] = useState<DriveUser | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [cloudSyncError, setCloudSyncError] = useState(false);

  // Lazily initialised: snapshotOf fingerprints every record, too costly per render.
  const snapshotRef = useRef<Snapshot | null>(null);
  snapshotRef.current ??= snapshotOf(state);
  const latestRef = useRef(state);
  // The account this session has pulled and merged for; uploads wait for it.
  const pulledUidRef = useRef<string | null>(null);
  const lastPullAtRef = useRef(0);
  // A resume and a visibilitychange can arrive together; one pull serves both.
  const pullInFlightRef = useRef(false);
  // Per field, bumped per save that carries it, so an older save landing can't
  // clear a field a newer save is still carrying — nor leave one stuck pending.
  const profileSaveSeqRef = useRef<Partial<Record<string, number>>>({});
  // Bumped whenever the session changes, so a pull that was in flight across
  // a sign-out or account switch is dropped instead of applied.
  const sessionGenRef = useRef(0);
  const applyRef = useRef(apply);
  const defaultsRef = useRef(defaults);
  useEffect(() => {
    latestRef.current = state;
    applyRef.current = apply;
    defaultsRef.current = defaults;
  });

  const handleFailure = useCallback((err: unknown, context: string) => {
    if (isExpectedSyncFailure(err)) return;
    reportError(err, context);
    setCloudSyncError(true);
  }, []);

  const send = useCallback(
    (upload: Upload) => {
      for (const collection of SYNC_COLLECTIONS) {
        const upserts = upload.upserts[collection];
        if (upserts?.length) sync.upsertItems(collection, upserts).catch((err) => handleFailure(err, "cloud.upload"));
        const deletes = upload.deletes[collection];
        if (deletes?.length) sync.deleteItems(collection, deletes).catch((err) => handleFailure(err, "cloud.upload"));
      }
      const fields = Object.keys(upload.profile);
      if (fields.length === 0) return;
      const seqs = profileSaveSeqRef.current;
      const sent = Object.fromEntries(fields.map((field) => [field, (seqs[field] = (seqs[field] ?? 0) + 1)]));
      sync
        .saveProfile(upload.profile)
        .then(() => {
          clearPendingIds(
            PROFILE_PENDING,
            fields.filter((field) => sent[field] === profileSaveSeqRef.current[field]),
          );
        })
        .catch((err) => handleFailure(err, "cloud.upload"));
    },
    [sync, handleFailure],
  );

  const pull = useCallback(
    async (uid: string) => {
      setCloudSyncError(false);
      lastPullAtRef.current = Date.now();
      pullInFlightRef.current = true;
      const generation = sessionGenRef.current;
      try {
        const cloud = await sync.loadMerged();
        if (generation !== sessionGenRef.current) return;
        const owner = readDataOwner();
        // Local data from another Google account is never merged into this one.
        const discardLocal = owner !== null && owner !== uid;
        if (discardLocal) clearLocalSyncState(PENDING_KEYS);
        const { state: next, upload } = mergePull({
          local: latestRef.current,
          cloud,
          pending: readAllPending(),
          discardLocal,
          defaults: defaultsRef.current,
        });
        snapshotRef.current = snapshotOf(next);
        applyRef.current(next);
        writeDataOwner(uid);
        pulledUidRef.current = uid;
        if (!isEmptyUpload(upload)) {
          recordUpload(upload);
          send(upload);
        }
      } catch (err) {
        handleFailure(err, "cloud.pull");
      } finally {
        pullInFlightRef.current = false;
      }
    },
    [sync, send, handleFailure],
  );

  useEffect(
    () =>
      sync.onAuthChange((next) => {
        setUser(next);
        setAuthReady(true);
        sessionGenRef.current += 1;
        pulledUidRef.current = null;
      }),
    [sync],
  );

  useEffect(() => {
    if (user && pulledUidRef.current !== user.uid) void pull(user.uid);
  }, [user, pull]);

  // Pull again when the tab returns, when the app resumes, and when the
  // network does: a first pull that failed offline shows no error, so this is
  // what retries it. A resume always pulls — it is the moment the learner
  // expects to see what they did on another device.
  useEffect(() => {
    function pullAgain(force: boolean) {
      if (!user || pullInFlightRef.current) return;
      if (!force && Date.now() - lastPullAtRef.current < VISIBILITY_PULL_MIN_MS) return;
      void pull(user.uid);
    }
    const onVisible = () => {
      if (document.visibilityState === "visible") pullAgain(pulledUidRef.current !== user?.uid);
    };
    const onOnline = () => pullAgain(true);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", onOnline);
    const stopResume = onAppResume(() => pullAgain(true));
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", onOnline);
      stopResume();
    };
  }, [user, pull, onAppResume]);

  // Diff every change. Snapshot always moves forward; pending and uploads
  // depend on whether an account is linked and pulled.
  useEffect(() => {
    const { snapshot, upload, notPending } = diffForUpload(snapshotRef.current ?? snapshotOf(state), state);
    snapshotRef.current = snapshot;
    if (isEmptyUpload(upload) || !sync.isLinked()) return;
    recordUpload(upload, notPending);
    if (user && pulledUidRef.current === user.uid) send(upload);
  }, [state, user, sync, send]);

  const signIn = useCallback(async () => {
    await sync.signInWithGoogle();
  }, [sync]);

  const signOut = useCallback(async () => {
    await sync.signOut();
    sessionGenRef.current += 1;
    pulledUidRef.current = null;
    // Unlinked first, so clearing the device below records no deletes.
    clearLocalSyncState(PENDING_KEYS);
    resetLocal();
  }, [sync, resetLocal]);

  const deleteCloudData = useCallback(async () => {
    await sync.deleteAllSyncedData();
    sessionGenRef.current += 1;
    pulledUidRef.current = null;
    // The local copy is this device's own again, not an account's.
    clearLocalSyncState(PENDING_KEYS);
  }, [sync]);

  const retryCloudSync = useCallback(() => {
    if (user) void pull(user.uid);
  }, [user, pull]);

  return {
    cloudConfigured: sync.isCloudConfigured(),
    user,
    // Read per render: it changes only alongside a sign-in/out, which re-renders.
    cloudLinked: sync.isLinked(),
    authReady,
    cloudSyncError,
    retryCloudSync,
    signIn,
    signOut,
    deleteCloudData,
  };
}
