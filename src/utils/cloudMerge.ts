// How High5's learning state maps onto Drive sync (services/driveSync.ts).
//
// The store keeps whole arrays; Drive sync works per record. This module is
// the pure translation between the two, so every merge rule is testable
// without a network:
//
// - Collections (merged per record, deletes as tombstones): savedWords,
//   quizHistory, missionLog, chatMessages by `id`; learnedWords by its
//   lower-cased word.
// - Profile fields (newest copy wins): progress, dailyMissions.
//
// Local changes are found by fingerprint diff (see utils/pendingSync), not by
// each mutation reporting itself. Two High5-specific rules sit on top of
// KanDOne's merge:
// - Capped histories never upload a delete for an entry the cap trimmed:
//   trimming happens on every device by timestamp, so a tombstone would only
//   erase another device's newer copy. A cap only ever trims while appending,
//   so a removal that comes with at least as many additions on a full list is
//   a trim; anything else (clearing a chat, a reset) is a real delete.
// - A word saved on two devices gets two ids. After a merge the newest copy
//   per word stays and the other is deleted, so it stays gone.

import type {
  ChatMessage,
  DailyMissionsState,
  LearnedWordEntry,
  MissionLog,
  QuizHistory,
  SavedWord,
  UserProgress,
} from "../types";
import type { MergedView, SyncItem } from "../services/driveSync";
import { diffFingerprints, fingerprintItems, type PendingIds } from "./pendingSync";

/** Kept so the synced state stays small and localStorage can't grow forever. */
export const HISTORY_CAPS = {
  chatMessages: 200,
  missionLog: 400,
  quizHistory: 1000,
} as const;

export const SYNC_COLLECTIONS = [
  "savedWords",
  "quizHistory",
  "missionLog",
  "chatMessages",
  "learnedWords",
] as const;
export type SyncCollection = (typeof SYNC_COLLECTIONS)[number];

export const PROFILE_FIELDS = ["progress", "dailyMissions"] as const;
export type ProfileField = (typeof PROFILE_FIELDS)[number];

/** pendingSync's pseudo-collection for profile fields. */
export const PROFILE_PENDING = "profile";

export interface SyncedState {
  readonly progress: UserProgress | null;
  readonly dailyMissions: DailyMissionsState;
  readonly savedWords: readonly SavedWord[];
  readonly learnedWords: Readonly<Record<string, LearnedWordEntry>>;
  readonly chatMessages: readonly ChatMessage[];
  readonly quizHistory: readonly QuizHistory[];
  readonly missionLog: readonly MissionLog[];
}

/** What a sync step must send to Drive. */
export interface Upload {
  readonly upserts: Partial<Record<SyncCollection, SyncItem[]>>;
  readonly deletes: Partial<Record<SyncCollection, string[]>>;
  readonly profile: Partial<Record<ProfileField, unknown>>;
}

/** Fingerprints of what was last accounted for, per collection and profile field. */
export interface Snapshot {
  readonly collections: Readonly<Record<SyncCollection, ReadonlyMap<string, string>>>;
  readonly profile: Readonly<Record<ProfileField, string>>;
}

export type PendingByCollection = Readonly<Record<SyncCollection | typeof PROFILE_PENDING, PendingIds>>;

type Obj = Record<string, unknown>;
const isObject = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);
const isString = (v: unknown): v is string => typeof v === "string";
const isNumber = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);

function asRecords(state: SyncedState): Record<SyncCollection, SyncItem[]> {
  return {
    savedWords: [...state.savedWords],
    quizHistory: [...state.quizHistory],
    missionLog: [...state.missionLog],
    chatMessages: [...state.chatMessages],
    learnedWords: Object.entries(state.learnedWords).map(([key, entry]) => ({ id: key, ...entry })),
  };
}

export function snapshotOf(state: SyncedState): Snapshot {
  const records = asRecords(state);
  return {
    collections: {
      savedWords: fingerprintItems(records.savedWords),
      quizHistory: fingerprintItems(records.quizHistory),
      missionLog: fingerprintItems(records.missionLog),
      chatMessages: fingerprintItems(records.chatMessages),
      learnedWords: fingerprintItems(records.learnedWords),
    },
    profile: {
      progress: JSON.stringify(state.progress),
      dailyMissions: JSON.stringify(state.dailyMissions),
    },
  };
}

function capOf(collection: SyncCollection): number | null {
  return collection in HISTORY_CAPS ? HISTORY_CAPS[collection as keyof typeof HISTORY_CAPS] : null;
}

function timestampOf(json: string | undefined): number {
  const parsed: unknown = json === undefined ? null : JSON.parse(json);
  return isObject(parsed) && isNumber(parsed.timestamp) ? parsed.timestamp : Infinity;
}

/**
 * Removals the cap made while appending: see the module comment. Each removed
 * entry must also be no newer than everything kept — so even a misread (an
 * import that replaces a full history) only skips deletes that the next
 * merge's own cap would trim again anyway.
 */
function isCapTrim(
  collection: SyncCollection,
  records: readonly SyncItem[],
  added: number,
  removedJson: readonly (string | undefined)[],
): boolean {
  const cap = capOf(collection);
  if (cap === null || removedJson.length === 0 || added < removedJson.length || records.length !== cap) return false;
  const oldestKept = Math.min(...records.map((item) => timestampOf(JSON.stringify(item))));
  return removedJson.every((json) => timestampOf(json) <= oldestKept);
}

/** Progress fields that change on their own (opening the app on a new day), not by learning. */
const BOOKKEEPING_FIELDS = ["streak", "lastActiveTimestamp"] as const;

/**
 * True when `next` differs from the progress in `previousJson` only in
 * bookkeeping fields. Such a change is uploaded but never marked pending: a
 * device idle for days recomputes its streak on open, before its first pull,
 * and a pending mark would let that stale copy beat newer progress in Drive.
 */
function isBookkeepingOnly(previousJson: string, next: UserProgress | null): boolean {
  const previous: unknown = JSON.parse(previousJson);
  if (!isObject(previous) || next === null) return false;
  const strip = (v: Obj) => {
    const copy = { ...v };
    for (const field of BOOKKEEPING_FIELDS) delete copy[field];
    return JSON.stringify(copy);
  };
  return strip(previous) === strip({ ...next });
}

/**
 * What changed since `previous`, as records to send. Also returns the ids to
 * mark pending — the same ids, minus nothing: a cap trim is neither uploaded
 * nor pending.
 */
export function diffForUpload(
  previous: Snapshot,
  state: SyncedState,
): { snapshot: Snapshot; upload: Upload; notPending: ProfileField[] } {
  const snapshot = snapshotOf(state);
  const records = asRecords(state);
  const upserts: Upload["upserts"] = {};
  const deletes: Upload["deletes"] = {};
  for (const collection of SYNC_COLLECTIONS) {
    const { edited, added, deleted } = diffFingerprints(
      previous.collections[collection],
      snapshot.collections[collection],
    );
    if (edited.length) {
      const editedSet = new Set(edited);
      upserts[collection] = records[collection].filter((item) => editedSet.has(String(item.id)));
    }
    const removedJson = deleted.map((id) => previous.collections[collection].get(id));
    const trimmed = isCapTrim(collection, records[collection], added.length, removedJson);
    if (deleted.length && !trimmed) deletes[collection] = deleted;
  }
  const profile: Upload["profile"] = {};
  for (const field of PROFILE_FIELDS) {
    if (previous.profile[field] !== snapshot.profile[field]) profile[field] = state[field];
  }
  const notPending: ProfileField[] =
    "progress" in profile && isBookkeepingOnly(previous.profile.progress, state.progress) ? ["progress"] : [];
  return { snapshot, upload: { upserts, deletes, profile }, notPending };
}

// --- Shape checks for what comes back from Drive -----------------------------
// Drive files are this user's own, but may come from an older or newer app
// version; a malformed record is dropped rather than crashing a screen.

function isSavedWord(v: unknown): v is SavedWord {
  return isObject(v) && isString(v.id) && isString(v.word) && isString(v.translation) && isNumber(v.savedAt);
}

function isTimestamped(v: unknown): v is Obj & { id: string; timestamp: number } {
  return isObject(v) && isString(v.id) && isNumber(v.timestamp);
}

function isQuizHistory(v: unknown): v is QuizHistory {
  return isTimestamped(v) && isString(v.topic) && isNumber(v.score);
}

function isMissionLog(v: unknown): v is MissionLog {
  return isTimestamped(v) && isString(v.kind) && isString(v.label);
}

function isChatMessage(v: unknown): v is ChatMessage {
  return isTimestamped(v) && (v.role === "user" || v.role === "assistant") && isString(v.messageText);
}

function isLearnedRecord(v: unknown): v is SyncItem & LearnedWordEntry {
  return isObject(v) && isString(v.id) && isString(v.word) && isNumber(v.firstSeenAt);
}

function isProgress(v: unknown): v is UserProgress {
  return isObject(v) && isString(v.currentLevel) && isNumber(v.points) && isNumber(v.streak);
}

function isDailyMissions(v: unknown): v is DailyMissionsState {
  return isObject(v) && isString(v.date);
}

const GUARDS: Record<SyncCollection, (v: unknown) => boolean> = {
  savedWords: isSavedWord,
  quizHistory: isQuizHistory,
  missionLog: isMissionLog,
  chatMessages: isChatMessage,
  learnedWords: isLearnedRecord,
};

// --- Merging a pull into local state ------------------------------------------

/**
 * Union-merge by id. Drive is authoritative by default, with two exceptions
 * the local side owns, both drawn from `pending` (records whose local change
 * has not been confirmed written):
 * - a record with a pending local edit keeps the local copy and is pushed;
 * - a record with a pending local delete is dropped from the pull rather than
 *   resurrected, and the delete is replayed.
 * A record Drive has never seen is kept and pushed (made offline, or before
 * the first connect) — unless Drive holds a newer delete for it and there is
 * no pending edit, since re-uploading a stale copy would undo that delete.
 * Ported from KanDOne's unionById.
 */
function unionById(
  cloud: readonly SyncItem[],
  local: readonly SyncItem[],
  pending: PendingIds,
  cloudDeleted: readonly string[],
): { merged: SyncItem[]; push: SyncItem[]; deleteFromCloud: string[] } {
  const deletedInCloud = new Set(cloudDeleted);
  const deleteFromCloud: string[] = [];
  const unmatchedLocal = new Map(local.map((item) => [String(item.id), item]));
  const push: SyncItem[] = [];
  const merged: SyncItem[] = [];
  for (const cloudItem of cloud) {
    const id = String(cloudItem.id);
    const localItem = unmatchedLocal.get(id);
    unmatchedLocal.delete(id);
    if (pending.deleted.has(id)) {
      deleteFromCloud.push(id);
      continue;
    }
    if (localItem && pending.edited.has(id)) {
      // Only these are written back: every write is stamped as the newest, so
      // re-sending a record Drive already has would let this device's copy
      // beat an edit another device makes in the meantime.
      push.push(localItem);
      merged.push(localItem);
    } else {
      merged.push(cloudItem);
    }
  }
  for (const [id, item] of unmatchedLocal) {
    if (deletedInCloud.has(id) && !pending.edited.has(id)) continue;
    push.push(item);
    merged.push(item);
  }
  return { merged, push, deleteFromCloud };
}

const byNewest = <T>(time: (item: T) => number) => (a: T, b: T) => time(b) - time(a);

/** Keep the newest `cap` entries; dropped ones are not deletes (see module comment). */
function keepNewest<T extends SyncItem>(items: T[], cap: number | null, time: (item: T) => number): T[] {
  const sorted = [...items].sort(byNewest(time));
  return cap === null ? sorted : sorted.slice(0, cap);
}

/**
 * One copy per word: the one with the most review history, then the newest;
 * the ids of the others, to delete from Drive. Review history comes first so
 * a re-save on a stale device can't wipe weeks of spaced repetition.
 */
function dedupeWords(words: SavedWord[]): { kept: SavedWord[]; duplicates: string[] } {
  const newestFirst = [...words].sort(
    (a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0) || b.savedAt - a.savedAt,
  );
  const seen = new Set<string>();
  const kept: SavedWord[] = [];
  const duplicates: string[] = [];
  for (const word of newestFirst) {
    const key = word.word.toLowerCase();
    if (seen.has(key)) duplicates.push(word.id);
    else {
      seen.add(key);
      kept.push(word);
    }
  }
  return { kept, duplicates };
}

export interface PullInput {
  readonly local: SyncedState;
  readonly cloud: MergedView;
  readonly pending: PendingByCollection;
  /**
   * True when local data belongs to a different Google account (KanDOne #102):
   * it is discarded, never merged into this account's Drive.
   */
  readonly discardLocal: boolean;
  /** Fallbacks for profile fields neither side has. */
  readonly defaults: Pick<SyncedState, "progress" | "dailyMissions">;
}

/** Merge a pull into local state, and what must be sent back so Drive catches up. */
export function mergePull({ local, cloud, pending, discardLocal, defaults }: PullInput): {
  state: SyncedState;
  upload: Upload;
} {
  const empty: PendingIds = { edited: new Set(), deleted: new Set() };
  const localRecords = discardLocal
    ? { savedWords: [], quizHistory: [], missionLog: [], chatMessages: [], learnedWords: [] }
    : asRecords(local);
  const upserts: Upload["upserts"] = {};
  const deletes: Upload["deletes"] = {};
  const merged = {} as Record<SyncCollection, SyncItem[]>;

  for (const collection of SYNC_COLLECTIONS) {
    const cloudItems = (cloud.collections[collection] ?? []).filter(GUARDS[collection]);
    const result = unionById(
      cloudItems,
      localRecords[collection],
      discardLocal ? empty : pending[collection],
      cloud.deleted[collection] ?? [],
    );
    merged[collection] = result.merged;
    if (result.push.length) upserts[collection] = result.push;
    if (result.deleteFromCloud.length) deletes[collection] = result.deleteFromCloud;
  }

  // The guards above checked each record's shape.
  const { kept: savedWords, duplicates } = dedupeWords(merged.savedWords as unknown as SavedWord[]);
  if (duplicates.length) {
    const dropped = new Set(duplicates);
    deletes.savedWords = [...(deletes.savedWords ?? []), ...duplicates];
    const pushedWords = upserts.savedWords?.filter((w) => !dropped.has(String(w.id)));
    if (pushedWords?.length) upserts.savedWords = pushedWords;
    else delete upserts.savedWords;
  }

  const quizHistory = keepNewest(merged.quizHistory as unknown as QuizHistory[], HISTORY_CAPS.quizHistory, (h) => h.timestamp);
  const missionLog = keepNewest(merged.missionLog as unknown as MissionLog[], HISTORY_CAPS.missionLog, (m) => m.timestamp);
  // Chat reads oldest-first on screen.
  const chatMessages = keepNewest(merged.chatMessages as unknown as ChatMessage[], HISTORY_CAPS.chatMessages, (m) => m.timestamp).reverse();
  const learnedWords = Object.fromEntries(
    (merged.learnedWords as unknown as (SyncItem & LearnedWordEntry)[]).map(({ id, word, translation, level, firstSeenAt }) => [
      String(id),
      { word, translation, level, firstSeenAt },
    ]),
  );

  const profile: Upload["profile"] = {};
  const pickProfile = <F extends ProfileField>(
    field: F,
    isValid: (v: unknown) => v is PullInput["defaults"][F],
  ): PullInput["defaults"][F] => {
    const fromCloud = cloud.profile[field];
    const cloudValue = isValid(fromCloud) ? fromCloud : undefined;
    if (discardLocal) return cloudValue ?? defaults[field];
    const localValue: PullInput["defaults"][F] = local[field];
    const isPending = pending[PROFILE_PENDING].edited.has(field);
    if (cloudValue !== undefined && !isPending) return cloudValue;
    // A pending null (a reset) is sent too, or the field stays pending forever.
    if (isPending || localValue !== null) profile[field] = localValue;
    return localValue;
  };

  const state: SyncedState = {
    progress: pickProfile("progress", (v): v is UserProgress | null => v === null || isProgress(v)),
    dailyMissions: pickProfile("dailyMissions", isDailyMissions),
    savedWords,
    learnedWords,
    chatMessages,
    quizHistory,
    missionLog,
  };
  return { state, upload: { upserts, deletes, profile } };
}

/** True when an upload carries nothing. */
export function isEmptyUpload(upload: Upload): boolean {
  return (
    Object.keys(upload.upserts).length === 0 &&
    Object.keys(upload.deletes).length === 0 &&
    Object.keys(upload.profile).length === 0
  );
}
