// Optional cloud sync to the user's own Google Drive.
//
// Data lives in the Drive *appDataFolder* — a hidden folder only this OAuth
// client can read. The browser talks to Google directly; there is no High5
// server or database in the path, so the app's operator has no copy of
// anyone's learning data. That is the reason this replaced Firestore.
//
// Each device writes only its own file (`high5-<deviceId>.json`) and reads
// everyone's, keeping the newest version of each record. Drive v3 has no
// conditional write, so one shared file would let two devices silently
// overwrite each other; with one writer per file there is nothing to overwrite.
//
// Ported from KanDOne's src/driveSync.js, which was tested end to end on a
// phone; the comments below carry the reasons behind each guard. Every write
// resolves only once it has actually landed in Drive.

const FILE_PREFIX = "high5-";
const DOCUMENT_VERSION = 1;
const SCOPES = "https://www.googleapis.com/auth/drive.appdata openid email profile";
const GIS_SRC = "https://accounts.google.com/gsi/client";
const DRIVE_API = "https://www.googleapis.com/drive/v3";
const DRIVE_UPLOAD_API = "https://www.googleapis.com/upload/drive/v3";
const USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";
const REVOKE_URL = "https://oauth2.googleapis.com/revoke";
const LOCK_NAME = "high5-drive-write";

// Kept in localStorage, not sessionStorage, so a new tab or a reload within the
// token's hour does not demand another click. The token is scoped to this
// app's hidden Drive folder only and expires on Google's side regardless.
export const SESSION_KEY = "high5.drive_session_v1";
const DEVICE_KEY = "high5.drive_device_v1";

/** Treat a token as expired a little early so no request starts with one about to die. */
const TOKEN_EXPIRY_MARGIN_MS = 60_000;

/**
 * The Android app renews through the OS, which hands back the *same* token
 * until it has actually expired, so renewal must wait almost to the end.
 */
const NATIVE_TOKEN_EXPIRY_MARGIN_MS = 5_000;

/**
 * A device file nobody has written to for this long, all of whose records are
 * superseded by newer copies in other files, is deleted (see findCompactableFiles).
 */
export const STALE_DEVICE_FILE_MS = 90 * 24 * 60 * 60 * 1000;

/** The idle-file check runs at most this often, however many reads happen. */
const COMPACTION_MIN_INTERVAL_MS = 60 * 60 * 1000;

/** A pull deletes at most this many idle files; the rest wait for the next pass, so it never fans out. */
const MAX_DELETES_PER_PASS = 10;
/** Drive answers 429 and transient 5xx when it is busy; asking again a moment later usually works. */
const MAX_ATTEMPTS = 4;
const RETRY_BASE_MS = 500;
const RETRY_MAX_MS = 30_000;
const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);

/** How many device files download at once; a user with many devices would otherwise open them all together. */
const DOWNLOAD_CONCURRENCY = 4;

/** After a failed silent renewal, wait this long before trying again on its own. */
const RENEWAL_BACKOFF_MS = 5 * 60_000;

/** Coalesce bursts of edits (a quiz round, typing) into one Drive upload. */
const DEFAULT_FLUSH_DELAY_MS = 1500;

// --- Document model ---------------------------------------------------------

/** A synced record. Every collection keys its records by `id`; the rest is opaque here. */
export interface SyncItem {
  readonly id: string | number;
}

interface RecordEntry {
  readonly item: SyncItem | null; // null is a delete tombstone
  readonly at: number;
}

interface ProfileEntry {
  readonly value: unknown;
  readonly at: number;
}

export interface DeviceDocument {
  readonly version: typeof DOCUMENT_VERSION;
  readonly device: string;
  readonly profile: Readonly<Record<string, ProfileEntry>>;
  readonly collections: Readonly<Record<string, Readonly<Record<string, RecordEntry>>>>;
}

export type SyncOperation =
  | { readonly type: "upsert"; readonly collection: string; readonly item: SyncItem }
  | { readonly type: "delete"; readonly collection: string; readonly id: string | number }
  | { readonly type: "profile"; readonly data: Readonly<Record<string, unknown>> };

/** Every device's file, merged: the live records, plus the ids whose newest entry is a delete. */
export interface MergedView {
  readonly profile: Record<string, unknown>;
  readonly collections: Record<string, SyncItem[]>;
  readonly deleted: Record<string, string[]>;
}

export type DriveSyncErrorCode =
  | ""
  | "offline"
  | "corrupt-file"
  | "unsupported-version"
  | "signed-out"
  | "not-configured"
  | "access_denied"
  | "gis-load-failed"
  | "popup_closed"
  | (string & {});

/** Error raised for any failed Drive or Google sign-in request. */
export class DriveSyncError extends Error {
  readonly status: number;
  readonly code: DriveSyncErrorCode;

  constructor(
    message: string,
    { status = 0, code = "", cause }: { status?: number; code?: DriveSyncErrorCode; cause?: unknown } = {},
  ) {
    super(message, cause === undefined ? undefined : { cause });
    this.name = "DriveSyncError";
    this.status = status;
    this.code = code;
  }
}

/** Raised when Google cannot be reached at all: the work is kept and retried once the network is back. */
function offlineError(cause?: unknown): DriveSyncError {
  return new DriveSyncError("Cannot reach Google Drive.", { code: "offline", cause });
}

function errorStatus(err: unknown): number {
  return err instanceof DriveSyncError ? err.status : 0;
}

function errorCode(err: unknown): string {
  return err instanceof DriveSyncError ? err.code : "";
}

/** Errors that retrying will not fix, so the file is skipped rather than failing the read. */
const isPermanentlyUnreadable = (err: unknown): boolean =>
  errorStatus(err) === 404 ||
  errorCode(err) === "corrupt-file" ||
  errorCode(err) === "unsupported-version";

type Obj = Record<string, unknown>;

const isPlainObject = (value: unknown): value is Obj =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

function emptyDocument(device: string): DeviceDocument {
  return { version: DOCUMENT_VERSION, device, profile: {}, collections: {} };
}

const isSyncItem = (value: unknown): value is SyncItem =>
  isPlainObject(value) && (typeof value.id === "string" || typeof value.id === "number");

const isRecordEntry = (entry: unknown): entry is RecordEntry =>
  isPlainObject(entry) &&
  Number.isFinite(entry.at) &&
  (entry.item === null || isSyncItem(entry.item));

const isProfileEntry = (entry: unknown): entry is ProfileEntry =>
  isPlainObject(entry) && Number.isFinite(entry.at) && "value" in entry;

function keepEntries<T>(map: unknown, isValid: (entry: unknown) => entry is T): Record<string, T> {
  if (!isPlainObject(map)) return {};
  return Object.fromEntries(
    Object.entries(map).filter((pair): pair is [string, T] => isValid(pair[1])),
  );
}

/**
 * Validate one device file. Throws rather than returning an empty document:
 * an unreadable file treated as empty would be overwritten and its data lost.
 */
export function parseDeviceDocument(raw: unknown): DeviceDocument {
  if (!isPlainObject(raw) || typeof raw.device !== "string") {
    throw new DriveSyncError("Drive sync file is not in the expected format.", { code: "corrupt-file" });
  }
  if (raw.version !== DOCUMENT_VERSION) {
    throw new DriveSyncError("Drive sync file was written by a newer High5. Update the app.", {
      code: "unsupported-version",
    });
  }
  const collections = isPlainObject(raw.collections)
    ? Object.fromEntries(
        Object.entries(raw.collections).map(([name, items]) => [name, keepEntries(items, isRecordEntry)]),
      )
    : {};
  return {
    version: DOCUMENT_VERSION,
    device: raw.device,
    profile: keepEntries(raw.profile, isProfileEntry),
    collections,
  };
}

/**
 * Apply queued writes to this device's own document, stamping each with `at`.
 * Pure: returns a new document. Deletes are kept as tombstones (`item: null`)
 * so they win over an older copy of the record in another device's file.
 */
export function applyOperations(
  document: DeviceDocument,
  operations: readonly SyncOperation[],
  at: number,
): DeviceDocument {
  const profile: Record<string, ProfileEntry> = { ...document.profile };
  const collections: Record<string, Record<string, RecordEntry>> = Object.fromEntries(
    Object.entries(document.collections).map(([name, items]) => [name, { ...items }]),
  );
  for (const op of operations) {
    if (op.type === "profile") {
      for (const [field, value] of Object.entries(op.data)) profile[field] = { value, at };
      continue;
    }
    const items = (collections[op.collection] ??= {});
    if (op.type === "upsert") items[String(op.item.id)] = { item: op.item, at };
    else items[String(op.id)] = { item: null, at };
  }
  return { ...document, profile, collections };
}

interface Stamped {
  readonly at: number;
  readonly device: string;
}

/** Newest entry wins; a tie goes to the higher device id so every reader agrees. */
function newer<T extends Stamped>(current: T | undefined, candidate: T): T {
  if (!current) return candidate;
  if (candidate.at !== current.at) return candidate.at > current.at ? candidate : current;
  return candidate.device > current.device ? candidate : current;
}

/** Latest `at` in a document, so the next write can be stamped after it. */
function latestStamp(document: DeviceDocument): number {
  const stamps = [
    ...Object.values(document.profile).map((entry) => entry.at),
    ...Object.values(document.collections).flatMap((items) =>
      Object.values(items).map((entry) => entry.at),
    ),
  ];
  return Math.max(0, ...stamps);
}

/**
 * Stamp for the next write: the wall clock, but never earlier than anything
 * already read. A device whose clock runs behind would otherwise lose every
 * edit to an older one written by a device whose clock runs ahead.
 */
export function nextStamp(now: number, latestSeen: number): number {
  return Math.max(now, latestSeen + 1);
}

/**
 * Merge every device's file into one view. `collections` holds the live
 * records; `deleted` holds the ids whose newest entry is a delete, so a
 * device still holding an old local copy can drop it instead of re-uploading it.
 */
export function mergeDeviceDocuments(documents: readonly DeviceDocument[]): MergedView {
  const profile: Record<string, ProfileEntry & Stamped> = {};
  const records: Record<string, Record<string, RecordEntry & Stamped>> = {};
  for (const doc of documents) {
    for (const [field, entry] of Object.entries(doc.profile)) {
      profile[field] = newer(profile[field], { ...entry, device: doc.device });
    }
    for (const [name, items] of Object.entries(doc.collections)) {
      const merged = (records[name] ??= {});
      for (const [id, entry] of Object.entries(items)) {
        merged[id] = newer(merged[id], { ...entry, device: doc.device });
      }
    }
  }
  const collections: Record<string, SyncItem[]> = {};
  const deleted: Record<string, string[]> = {};
  for (const [name, items] of Object.entries(records)) {
    collections[name] = Object.values(items).flatMap((entry) => (entry.item ? [entry.item] : []));
    deleted[name] = Object.entries(items).flatMap(([id, entry]) => (entry.item === null ? [id] : []));
  }
  return {
    profile: Object.fromEntries(Object.entries(profile).map(([field, entry]) => [field, entry.value])),
    collections,
    deleted,
  };
}

function sameJson(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (Array.isArray(a) || Array.isArray(b)) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((value, i) => sameJson(value, b[i]))
    );
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const keys = Object.keys(a);
    return (
      keys.length === Object.keys(b).length &&
      keys.every((key) => key in b && sameJson(a[key], b[key]))
    );
  }
  return false;
}

const KNOWN_DOCUMENT_KEYS = new Set(["version", "device", "profile", "collections"]);

/** The parser keeps an entry's extra fields as they are, so they must be looked for separately. */
function hasUnknownEntryKeys(document: DeviceDocument): boolean {
  const unknown = (entry: object, known: readonly string[]) =>
    Object.keys(entry).some((key) => !known.includes(key));
  return (
    Object.values(document.profile).some((entry) => unknown(entry, ["at", "value"])) ||
    Object.values(document.collections).some((items) =>
      Object.values(items).some((entry) => unknown(entry, ["at", "item"])),
    )
  );
}

/**
 * True when parsing a device file threw something away: an entry that failed
 * validation, or a field this version does not know. The file still reads fine,
 * but it is not safe to delete on the strength of what was understood.
 */
function parsingDroppedData(raw: Obj, document: DeviceDocument): boolean {
  return (
    Object.keys(raw).some((key) => !KNOWN_DOCUMENT_KEYS.has(key)) ||
    hasUnknownEntryKeys(document) ||
    !sameJson(raw.profile ?? {}, document.profile) ||
    !sameJson(raw.collections ?? {}, document.collections)
  );
}

export interface DriveFileEntry {
  readonly id: string;
  readonly name: string;
  readonly modifiedTime?: string;
  readonly lossy?: boolean;
  readonly document: DeviceDocument;
}

interface Candidate {
  readonly at: number;
  readonly device: string;
  readonly fileId: string;
  readonly content: string;
}

/**
 * Whether `a` is the winning entry over `b`: newest stamp, then higher device
 * id (the merge's own rule), then higher file id so that two files that are
 * exact copies of each other still have one winner. The last step makes every
 * device agree on which file to keep, so none of them deletes both.
 */
function beats(a: Candidate, b: Candidate | undefined): boolean {
  if (!b) return true;
  if (a.at !== b.at) return a.at > b.at;
  if (a.device !== b.device) return a.device > b.device;
  return a.fileId > b.fileId;
}

/**
 * Which device files can be deleted without anyone losing a record.
 *
 * Each file is a device's own history, and nothing ever shrinks it: deletes stay
 * as tombstones and a device that is gone for good leaves its file behind. A file
 * qualifies only when it has had no writes for `maxIdleMs` *and* it holds the
 * winning entry for none of its records or profile fields — every one has a newer
 * copy in some other file. Files holding winners are never listed, so deleting the
 * rest cannot change what the merge returns.
 *
 * That guarantee needs three things this function checks or assumes:
 * - Every entry was understood. A file whose entries parsing dropped is `lossy`
 *   and is never listed: deleting it would destroy data nobody can see.
 * - Two files never tie on (stamp, device) with different content. When they do,
 *   the merge cannot say which is right, so both are kept.
 * - Nothing wrote to the file since it was read. That is a race this function
 *   cannot see; the caller re-checks right before deleting, which narrows it to
 *   the gap between that check and the delete but cannot close it (Drive has no
 *   conditional delete).
 *
 * "Idle" is judged against the newest write Drive itself reports, and never later
 * than the local clock. A device whose clock is far ahead would otherwise see
 * every superseded file as idle; one far behind sees none, which is the safe side.
 *
 * `isOwn` marks this device's own file, which is never listed. It is asked only
 * about files that would otherwise be deleted.
 */
export function findCompactableFiles(
  entries: readonly DriveFileEntry[],
  {
    now,
    isOwn,
    maxIdleMs = STALE_DEVICE_FILE_MS,
  }: { now: number; isOwn: (entry: DriveFileEntry) => boolean; maxIdleMs?: number },
): DriveFileEntry[] {
  const modifiedAt = (entry: DriveFileEntry) => Date.parse(entry.modifiedTime ?? "");
  const newestWrite = Math.max(-Infinity, ...entries.map(modifiedAt).filter(Number.isFinite));
  // No usable modification time anywhere means no evidence of idleness at all.
  if (!Number.isFinite(newestWrite)) return [];
  const reference = Math.min(now, newestWrite);

  const winners = new Map<string, Candidate>();
  const ambiguous = new Set<string>();
  const consider = (key: string, at: number, document: DeviceDocument, fileId: string, content: string) => {
    const candidate: Candidate = { at, device: document.device, fileId, content };
    const current = winners.get(key);
    if (current && current.at === at && current.device === document.device && current.content !== content) {
      ambiguous.add(current.fileId).add(fileId);
    }
    if (beats(candidate, current)) winners.set(key, candidate);
  };
  for (const { id, document } of entries) {
    for (const [field, entry] of Object.entries(document.profile)) {
      consider(JSON.stringify(["profile", field]), entry.at, document, id, JSON.stringify(entry.value));
    }
    for (const [name, items] of Object.entries(document.collections)) {
      for (const [recordId, entry] of Object.entries(items)) {
        consider(JSON.stringify(["record", name, recordId]), entry.at, document, id, JSON.stringify(entry.item));
      }
    }
  }
  const needed = new Set([...ambiguous, ...[...winners.values()].map((winner) => winner.fileId)]);
  return entries.filter((entry) => {
    const modified = modifiedAt(entry);
    if (!Number.isFinite(modified) || reference - modified < maxIdleMs) return false;
    if (entry.lossy || needed.has(entry.id)) return false;
    return !isOwn(entry);
  });
}

// --- Browser plumbing -------------------------------------------------------

/** The subset of Web Storage this module uses, so tests can pass a Map-backed fake. */
export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function readJson<T>(storage: KeyValueStorage | null, key: string): T | null {
  try {
    const raw = storage?.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(storage: KeyValueStorage | null, key: string, value: unknown): void {
  try {
    if (value === null) storage?.removeItem(key);
    else storage?.setItem(key, JSON.stringify(value));
  } catch {
    // Storage blocked or full: the session just will not survive a reload.
  }
}

/** Google Identity Services' token-client surface, as far as this module uses it. */
export interface GisTokenResponse {
  readonly access_token?: string;
  readonly expires_in?: number | string;
  readonly error?: string;
  readonly error_description?: string;
}

export interface GisTokenClient {
  callback: (response: GisTokenResponse) => void;
  error_callback?: (err: { type?: string; message?: string }) => void;
  requestAccessToken(options: { prompt: string; login_hint: string }): void;
}

export interface Gis {
  readonly accounts: {
    readonly oauth2: {
      initTokenClient(config: {
        client_id: string;
        scope: string;
        callback: (response: GisTokenResponse) => void;
      }): GisTokenClient;
      revoke(token: string, done: () => void): void;
    };
  };
}

declare global {
  interface Window {
    google?: Gis;
  }
}

function loadGisScript(): Promise<Gis> {
  if (typeof window === "undefined") {
    return Promise.reject(new DriveSyncError("Google sign-in needs a browser.", { code: "gis-load-failed" }));
  }
  if (window.google?.accounts?.oauth2) return Promise.resolve(window.google);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = GIS_SRC;
    script.async = true;
    script.onload = () => {
      if (window.google) resolve(window.google);
      else reject(new DriveSyncError("Could not load Google sign-in.", { code: "gis-load-failed" }));
    };
    script.onerror = () =>
      reject(new DriveSyncError("Could not load Google sign-in.", { code: "gis-load-failed" }));
    document.head.appendChild(script);
  });
}

const hasWebLocks = (): boolean => typeof navigator !== "undefined" && Boolean(navigator.locks?.request);

/**
 * Serialise writes across this browser's tabs: they share one device id and
 * therefore one Drive file. Without Web Locks each tab gets its own device id
 * instead (see `persistDeviceId`), so there is nothing to serialise across tabs.
 */
function withBrowserLock(task: () => Promise<void>): Promise<void> {
  return hasWebLocks() ? navigator.locks.request(LOCK_NAME, task) : task();
}

function browserStorage(kind: "localStorage" | "sessionStorage" = "localStorage"): KeyValueStorage | null {
  try {
    return typeof window !== "undefined" ? window[kind] : null;
  } catch {
    return null;
  }
}

type Settled<T> = { status: "fulfilled"; value: T } | { status: "rejected"; reason: unknown };

/**
 * Run `task` over `items`, at most `limit` at a time, and report each outcome
 * the way Promise.allSettled does, in input order.
 */
async function settleWithConcurrency<I, T>(
  items: readonly I[],
  limit: number,
  task: (item: I) => Promise<T>,
): Promise<Settled<T>[]> {
  const results: Settled<T>[] = new Array<Settled<T>>(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next;
      next += 1;
      try {
        // index < items.length is checked by the loop condition above.
        results[index] = { status: "fulfilled", value: await task(items[index] as I) };
      } catch (reason) {
        results[index] = { status: "rejected", reason };
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

// --- The client -------------------------------------------------------------

export interface DriveUser {
  readonly uid: string;
  readonly email: string;
  readonly displayName: string;
}

interface Session {
  readonly accessToken: string | null;
  readonly expiresAt: number;
  readonly user: DriveUser;
  readonly renewalFailedAt?: number | null;
}

/** The Android app's sign-in (see nativeGoogleAuth); null in a browser, which uses Google's popup. */
export interface NativeAuth {
  requestToken(options: { interactive: boolean }): Promise<GisTokenResponse | null>;
  signOut(): Promise<void>;
}

/** The minimum of a fetch Response this module reads. */
export interface FetchResponse {
  readonly ok: boolean;
  readonly status: number;
  readonly headers?: { get(name: string): string | null };
  json(): Promise<unknown>;
  text(): Promise<string>;
}

export type FetchLike = (url: string, init?: RequestInit) => Promise<FetchResponse>;

export interface DriveSyncDeps {
  /** OAuth Web client ID; empty disables cloud sync. */
  readonly clientId: string;
  readonly fetchImpl: FetchLike;
  readonly loadGis?: () => Promise<Gis>;
  readonly storage?: KeyValueStorage | null;
  /** Per-tab storage (sessionStorage). */
  readonly tabStorage?: KeyValueStorage | null;
  readonly now?: () => number;
  readonly newDeviceId?: () => string;
  readonly withLock?: (task: () => Promise<void>) => Promise<void>;
  /**
   * Share one device id (one file) across tabs. Only safe when `withLock`
   * really excludes other tabs; otherwise two tabs could read-then-write the
   * same file and drop each other's batch, so the id is kept per tab in
   * `tabStorage` (it still survives a reload).
   */
  readonly persistDeviceId?: boolean;
  readonly flushDelayMs?: number;
  readonly nativeAuth?: NativeAuth | null;
  readonly sleep?: (ms: number) => Promise<void>;
  readonly random?: () => number;
  /** Whether the device has a network. A failed request or renewal while it has none is "offline", never a sign-out. */
  readonly isOnline?: () => boolean;
  /**
   * Called with ids whose write landed and that have no newer write still
   * queued — the caller's cue that they are no longer at risk (pendingSync).
   */
  readonly onLanded?: (collection: string, ids: string[]) => void;
}

interface QueuedWrite {
  readonly op: SyncOperation;
  readonly resolve: () => void;
  readonly reject: (err: unknown) => void;
}

/**
 * Build a Drive sync client. Dependencies are injected so tests run without
 * network, Google's script, timers, randomness or real storage.
 */
export function createDriveSync({
  clientId,
  fetchImpl,
  loadGis = loadGisScript,
  storage = browserStorage(),
  tabStorage = browserStorage("sessionStorage"),
  now = () => Date.now(),
  newDeviceId = () => crypto.randomUUID(),
  withLock = withBrowserLock,
  persistDeviceId = hasWebLocks(),
  flushDelayMs = DEFAULT_FLUSH_DELAY_MS,
  nativeAuth = null,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  random = Math.random,
  isOnline = () => globalThis.navigator?.onLine !== false,
  onLanded = () => {},
}: DriveSyncDeps) {
  let session: Session | null = readJson<Session>(storage, SESSION_KEY);
  let gis: Gis | null = null;
  let gisLoading: Promise<Gis> | null = null;
  let tokenClient: GisTokenClient | null = null;
  let pendingTokenRequest: Promise<GisTokenResponse> | null = null;
  let pendingRenewal: Promise<string> | null = null;
  let expiryTimer: ReturnType<typeof setTimeout> | undefined;
  const listeners = new Set<(user: DriveUser | null) => void>();

  let queue: QueuedWrite[] = [];
  let flushTimer: ReturnType<typeof setTimeout> | null = null;
  let flushChain: Promise<void> = Promise.resolve();
  let ownFileId: string | null = null;
  let latestSeenAt = 0;
  let lastCompactionAt: number | null = null;
  // Files whose last read had entries the parser dropped (see parsingDroppedData).
  const lossyFileIds = new Set<string>();

  // A file whose modifiedTime has not changed since the last pull is not
  // downloaded again. Keyed by file id.
  const documentCache = new Map<string, { modifiedTime: string; document: DeviceDocument }>();
  // Counts uploads, so a read started before one is never handed to a caller
  // that asked after it.
  let writeEpoch = 0;
  let readInFlight: { epoch: number; promise: Promise<MergedView> } | null = null;

  const isConfigured = () => Boolean(clientId);
  const expiryMargin = nativeAuth ? NATIVE_TOKEN_EXPIRY_MARGIN_MS : TOKEN_EXPIRY_MARGIN_MS;

  const hasValidToken = (): boolean =>
    Boolean(session?.accessToken && session.expiresAt - expiryMargin > now());

  /**
   * Who the UI shows as connected. In a browser that is the token's lifetime.
   * In the app a lapsed token is renewed silently, so the user stays connected
   * until a renewal actually fails.
   */
  const currentUser = (): DriveUser | null => {
    if (!nativeAuth) return hasValidToken() && session ? session.user : null;
    return session?.user && !session.renewalFailedAt ? session.user : null;
  };

  /** App only: a stored account whose token can be renewed without UI, outside the post-failure backoff. */
  const canRenewSilently = (): boolean =>
    Boolean(
      nativeAuth &&
        session?.user &&
        (!session.renewalFailedAt || now() - session.renewalFailedAt >= RENEWAL_BACKOFF_MS),
    );

  let device: string | null = null;
  const deviceStorage = persistDeviceId ? storage : tabStorage;

  /** Stable per browser and shared by its tabs; per tab when that is unsafe or storage is blocked. */
  function deviceId(): string {
    if (device) return device;
    device = readJson<string>(deviceStorage, DEVICE_KEY) ?? newDeviceId();
    writeJson(deviceStorage, DEVICE_KEY, device);
    return device;
  }

  /**
   * Leave an unreadable own file where it is (readers skip it) and continue in
   * a new one. Refusing to write forever would strand every later edit locally.
   */
  function abandonOwnFile(): DeviceDocument {
    console.warn("High5: own Drive sync file is unreadable; continuing in a new one.");
    device = null;
    writeJson(deviceStorage, DEVICE_KEY, null);
    ownFileId = null;
    documentCache.clear();
    return emptyDocument(deviceId());
  }

  const ownFileName = () => `${FILE_PREFIX}${deviceId()}.json`;

  let lastReportedUid: string | null = currentUser()?.uid ?? null;

  /**
   * Report only a change of *who is connected*. A token swap for the same user
   * is not one: the store answers every report with a full pull-and-merge.
   */
  function notifyListeners() {
    const user = currentUser();
    if ((user?.uid ?? null) === lastReportedUid) return;
    lastReportedUid = user?.uid ?? null;
    for (const listener of listeners) listener(user);
  }

  /**
   * Browser only: tell the UI the moment the token lapses, not on the next
   * failed save. The app renews lazily on the next Drive call instead.
   */
  function scheduleExpiryNotice() {
    clearTimeout(expiryTimer);
    if (nativeAuth || !hasValidToken() || !session) return;
    expiryTimer = setTimeout(notifyListeners, session.expiresAt - expiryMargin - now());
  }

  function setSession(next: Session | null) {
    session = next;
    writeJson(storage, SESSION_KEY, next);
    scheduleExpiryNotice();
    notifyListeners();
  }

  function ensureGis(): Promise<Gis> {
    if (gis) return Promise.resolve(gis);
    gisLoading ??= loadGis()
      .then((loaded) => {
        gis = loaded;
        return loaded;
      })
      .catch((err: unknown) => {
        gisLoading = null;
        throw err;
      });
    return gisLoading;
  }

  function getTokenClient(loaded: Gis): GisTokenClient {
    tokenClient ??= loaded.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: SCOPES,
      callback: () => {},
    });
    return tokenClient;
  }

  function requireToken(response: GisTokenResponse | null): GisTokenResponse {
    if (!response?.access_token) {
      throw new DriveSyncError("Google did not grant access to Drive.", { code: "access_denied" });
    }
    return response;
  }

  /**
   * Ask Google for an access token. When GIS is already loaded this opens the
   * popup synchronously, inside the click that called it — anything later and
   * the browser blocks the popup. That is why GIS is preloaded on subscribe.
   */
  function requestToken(): Promise<GisTokenResponse> {
    if (pendingTokenRequest) return pendingTokenRequest;
    if (nativeAuth) {
      pendingTokenRequest = nativeAuth
        .requestToken({ interactive: true })
        .then(requireToken)
        .finally(() => {
          pendingTokenRequest = null;
        });
      return pendingTokenRequest;
    }
    const run = (loaded: Gis) =>
      new Promise<GisTokenResponse>((resolve, reject) => {
        gis = loaded;
        const client = getTokenClient(loaded);
        client.callback = (response) => {
          if (response.error) {
            reject(new DriveSyncError(response.error_description || response.error, { code: response.error }));
            return;
          }
          resolve(response);
        };
        client.error_callback = (err) => {
          reject(
            new DriveSyncError(err?.message || "Google sign-in was closed.", {
              code: err?.type || "popup_closed",
            }),
          );
        };
        client.requestAccessToken({ prompt: "", login_hint: session?.user?.email || "" });
      });
    pendingTokenRequest = (gis ? run(gis) : ensureGis().then(run)).finally(() => {
      pendingTokenRequest = null;
    });
    return pendingTokenRequest;
  }

  const expiredSession = (current: Session): Session => ({ ...current, accessToken: null, expiresAt: 0 });

  /**
   * App only: renew an expired token for the signed-in user without UI. A
   * failure marks the session so the UI offers Connect Drive, and stops
   * every queued save from retrying the OS round-trip until the backoff ends.
   */
  function renewSilently(native: NativeAuth): Promise<string> {
    pendingRenewal ??= native
      .requestToken({ interactive: false })
      .then(requireToken)
      .then((response) => {
        const token = response.access_token as string; // requireToken checked it
        if (session) {
          setSession({
            ...session,
            accessToken: token,
            expiresAt: now() + Number(response.expires_in) * 1000,
            renewalFailedAt: null,
          });
        }
        return token;
      })
      .catch((err: unknown) => {
        // No network is not a lapsed sign-in: keep the session and try again when it returns.
        if (!isOnline()) throw offlineError(err);
        if (session) setSession({ ...expiredSession(session), renewalFailedAt: now() });
        throw new DriveSyncError("Google Drive session expired.", { code: "signed-out", cause: err });
      })
      .finally(() => {
        pendingRenewal = null;
      });
    return pendingRenewal;
  }

  async function fetchUser(accessToken: string): Promise<DriveUser> {
    const res = await fetchImpl(USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).catch((err: unknown) => {
      throw offlineError(err);
    });
    if (!res.ok) throw new DriveSyncError("Could not read the Google account.", { status: res.status });
    const info = (await res.json()) as { sub?: unknown; email?: unknown; name?: unknown };
    if (typeof info.sub !== "string" || !info.sub) {
      throw new DriveSyncError("Google returned no account id.", { status: res.status });
    }
    return {
      uid: info.sub,
      email: typeof info.email === "string" ? info.email : "",
      displayName: typeof info.name === "string" ? info.name : "",
    };
  }

  async function signIn(): Promise<DriveUser> {
    if (!isConfigured()) {
      throw new DriveSyncError("Google Drive sync is not configured.", { code: "not-configured" });
    }
    const response = await requestToken();
    const token = response.access_token as string; // requireToken / callback checked it
    const user = await fetchUser(token);
    if (session?.user?.uid !== user.uid) {
      ownFileId = null;
      documentCache.clear();
      latestSeenAt = 0;
    }
    setSession({
      accessToken: token,
      expiresAt: now() + Number(response.expires_in) * 1000,
      user,
    });
    return user;
  }

  /**
   * Never opens a popup: a background save is not a click, so the browser
   * would block it. In a browser an expired token instead reports "signed
   * out", the UI offers Connect Drive, and pending ids replay local edits on
   * reconnect. The app renews the token silently first.
   */
  async function accessToken(): Promise<string> {
    if (hasValidToken() && session?.accessToken) return session.accessToken;
    if (nativeAuth && canRenewSilently()) return renewSilently(nativeAuth);
    if (!isOnline()) throw offlineError();
    if (session?.accessToken) setSession(expiredSession(session));
    throw new DriveSyncError("Google Drive session expired.", { code: "signed-out" });
  }

  /**
   * Whether asking again can help. A 429 means the request was refused, so any
   * request may repeat. A 5xx may have been applied before it failed, and
   * repeating a file *creation* then could leave two files, so only requests
   * that are safe to repeat (reads, deletes, whole-file uploads) are retried.
   */
  function worthRetrying(status: number, method: string | undefined): boolean {
    if (!RETRYABLE_STATUSES.has(status)) return false;
    return status === 429 || (method ?? "GET") !== "POST";
  }

  /** Exponential, jittered, and never shorter than the Retry-After the server sent. */
  function retryDelayMs(attempt: number, res: FetchResponse): number {
    const asked = Number(res.headers?.get?.("Retry-After"));
    const backoff = RETRY_BASE_MS * 2 ** attempt * (0.5 + random());
    return Math.min(RETRY_MAX_MS, Math.max(backoff, Number.isFinite(asked) ? asked * 1000 : 0));
  }

  async function driveFetch(url: string, init: RequestInit = {}, retried = false, attempt = 0): Promise<FetchResponse> {
    const token = await accessToken();
    const res = await fetchImpl(url, {
      ...init,
      headers: { ...(init.headers as Record<string, string> | undefined), Authorization: `Bearer ${token}` },
    }).catch((err: unknown) => {
      throw offlineError(err);
    });
    if (res.status === 401 && session) {
      // Revoked or expired early: drop the token. A browser then offers to
      // reconnect; the app (still connected) renews and retries once.
      setSession(expiredSession(session));
      if (canRenewSilently() && !retried) return driveFetch(url, init, true, attempt);
    }
    if (!res.ok && attempt < MAX_ATTEMPTS - 1 && worthRetrying(res.status, init.method)) {
      await sleep(retryDelayMs(attempt, res));
      return driveFetch(url, init, retried, attempt + 1);
    }
    if (!res.ok) throw new DriveSyncError(`Google Drive request failed (${res.status}).`, { status: res.status });
    return res;
  }

  interface ListedFile {
    readonly id: string;
    readonly name: string;
    readonly modifiedTime?: string;
  }

  async function listFiles(query: string, pageToken = ""): Promise<ListedFile[]> {
    const params = new URLSearchParams({
      spaces: "appDataFolder",
      q: query,
      fields: "nextPageToken,files(id,name,modifiedTime)",
      pageSize: "1000",
    });
    if (pageToken) params.set("pageToken", pageToken);
    const page = (await (await driveFetch(`${DRIVE_API}/files?${params}`)).json()) as {
      files?: ListedFile[];
      nextPageToken?: string;
    };
    const files = page.files ?? [];
    return page.nextPageToken ? [...files, ...(await listFiles(query, page.nextPageToken))] : files;
  }

  async function readFile(id: string): Promise<DeviceDocument> {
    const res = await driveFetch(`${DRIVE_API}/files/${encodeURIComponent(id)}?alt=media`);
    // Read the body first: a connection dropped mid-download must surface as a
    // network error, not be mistaken for a corrupt file and abandoned.
    const text = await res.text().catch((err: unknown) => {
      throw offlineError(err);
    });
    let raw: unknown;
    try {
      raw = JSON.parse(text);
    } catch {
      throw new DriveSyncError("Drive sync file is not valid JSON.", { code: "corrupt-file" });
    }
    const document = parseDeviceDocument(raw);
    if (parsingDroppedData(raw as Obj, document)) lossyFileIds.add(id);
    else lossyFileIds.delete(id);
    return document;
  }

  /** The device file's parsed content, from the cache while its modifiedTime has not moved. */
  async function readFileUnlessUnchanged(file: ListedFile): Promise<DeviceDocument> {
    const cached = documentCache.get(file.id);
    if (file.modifiedTime && cached?.modifiedTime === file.modifiedTime) return cached.document;
    const document = await readFile(file.id);
    if (file.modifiedTime) documentCache.set(file.id, { modifiedTime: file.modifiedTime, document });
    return document;
  }

  /**
   * Housekeeping that must never get in the way of a pull: a failure is logged
   * and the read still succeeds. Runs at most once an hour. Each file is looked
   * at again right before its delete, and skipped if anything wrote to it since
   * the pull read it. A 404 means another device removed it first.
   */
  async function deleteIdleFiles(readable: readonly DriveFileEntry[]) {
    const started = now();
    // A clock that moved backwards must not block the check until it catches up.
    if (
      lastCompactionAt !== null &&
      started >= lastCompactionAt &&
      started - lastCompactionAt < COMPACTION_MIN_INTERVAL_MS
    ) {
      return;
    }
    lastCompactionAt = started;
    try {
      const idle = findCompactableFiles(readable, {
        now: started,
        isOwn: (entry) => entry.id === ownFileId || entry.name === ownFileName(),
      });
      const outcomes = await Promise.allSettled(
        idle.slice(0, MAX_DELETES_PER_PASS).map(async (entry) => {
          const url = `${DRIVE_API}/files/${encodeURIComponent(entry.id)}`;
          const current = (await (await driveFetch(`${url}?fields=modifiedTime`)).json()) as {
            modifiedTime?: string;
          };
          if (current.modifiedTime === entry.modifiedTime) await driveFetch(url, { method: "DELETE" });
        }),
      );
      const failed = outcomes.filter((o) => o.status === "rejected" && errorStatus(o.reason) !== 404).length;
      if (failed) console.warn(`High5: could not remove ${failed} idle Drive sync file(s).`);
    } catch (err) {
      console.warn("High5: could not check for idle Drive sync files.", err instanceof Error ? err.message : err);
    }
  }

  /**
   * Every device's file, merged. A file that can never be read (corrupt,
   * written by a newer version, deleted since the listing) is skipped: one bad
   * file must not stop every device from syncing. Any other failure (network,
   * rate limit, auth) fails the whole read — a merge missing a device's newer
   * edits and deletes would let this device re-upload stale copies over them.
   */
  async function readMergedFresh(): Promise<MergedView> {
    const files = (await listFiles(`name contains '${FILE_PREFIX}'`)).filter(
      (file) => file.name.startsWith(FILE_PREFIX) && file.name.endsWith(".json"),
    );
    const listed = new Set(files.map((file) => file.id));
    for (const id of documentCache.keys()) if (!listed.has(id)) documentCache.delete(id);
    const results = await settleWithConcurrency(files, DOWNLOAD_CONCURRENCY, readFileUnlessUnchanged);
    const fatal = results.find((r) => r.status === "rejected" && !isPermanentlyUnreadable(r.reason));
    if (fatal?.status === "rejected") throw fatal.reason;
    const skipped = results.filter((r) => r.status === "rejected");
    if (skipped.length) console.warn(`High5: skipped ${skipped.length} unreadable Drive sync file(s).`);
    const readable: DriveFileEntry[] = files.flatMap((file, index) => {
      const result = results[index];
      if (result?.status !== "fulfilled") return [];
      return [
        {
          id: file.id,
          name: file.name,
          ...(file.modifiedTime ? { modifiedTime: file.modifiedTime } : {}),
          lossy: lossyFileIds.has(file.id),
          document: result.value,
        },
      ];
    });
    const documents = readable.map((entry) => entry.document);
    latestSeenAt = Math.max(latestSeenAt, ...documents.map(latestStamp));
    const merged = mergeDeviceDocuments(documents);
    await deleteIdleFiles(readable);
    return merged;
  }

  /** Concurrent callers share one read; a read from before an upload is never reused after it. */
  function readMerged(): Promise<MergedView> {
    if (readInFlight?.epoch !== writeEpoch) {
      const epoch = writeEpoch;
      const promise = readMergedFresh().finally(() => {
        if (readInFlight?.promise === promise) readInFlight = null;
      });
      readInFlight = { epoch, promise };
    }
    return readInFlight.promise;
  }

  async function readOwnDocument(): Promise<DeviceDocument> {
    if (!ownFileId) {
      const [file] = await listFiles(`name = '${ownFileName()}'`);
      ownFileId = file?.id ?? null;
    }
    if (!ownFileId) return emptyDocument(deviceId());
    try {
      const own = await readFile(ownFileId);
      latestSeenAt = Math.max(latestSeenAt, latestStamp(own));
      return own;
    } catch (err) {
      if (errorCode(err) === "corrupt-file") return abandonOwnFile();
      // Deleted from Drive's "Manage apps → Delete hidden app data": start a new file.
      if (errorStatus(err) !== 404) throw err;
      ownFileId = null;
      return emptyDocument(deviceId());
    }
  }

  async function writeOwnDocument(document: DeviceDocument) {
    const body = JSON.stringify(document);
    writeEpoch += 1;
    if (ownFileId) {
      documentCache.delete(ownFileId);
      await driveFetch(`${DRIVE_UPLOAD_API}/files/${encodeURIComponent(ownFileId)}?uploadType=media`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body,
      });
      writeEpoch += 1;
      return;
    }
    const boundary = `high5-${now()}`;
    const metadata = JSON.stringify({ name: ownFileName(), parents: ["appDataFolder"] });
    const multipart = [
      `--${boundary}`,
      "Content-Type: application/json; charset=UTF-8",
      "",
      metadata,
      `--${boundary}`,
      "Content-Type: application/json",
      "",
      body,
      `--${boundary}--`,
      "",
    ].join("\r\n");
    const res = await driveFetch(`${DRIVE_UPLOAD_API}/files?uploadType=multipart&fields=id`, {
      method: "POST",
      headers: { "Content-Type": `multipart/related; boundary=${boundary}` },
      body: multipart,
    });
    const created = (await res.json()) as { id?: unknown };
    if (typeof created.id !== "string") throw new DriveSyncError("Drive did not return the new file's id.");
    ownFileId = created.id;
    writeEpoch += 1;
  }

  async function flush() {
    flushTimer = null;
    const batch = queue;
    queue = [];
    if (batch.length === 0) return;
    try {
      await withLock(async () => {
        // Re-read under the lock: another tab of this browser shares the file.
        const own = await readOwnDocument();
        const at = nextStamp(now(), latestSeenAt);
        await writeOwnDocument(applyOperations(own, batch.map((entry) => entry.op), at));
        latestSeenAt = at;
      });
      for (const entry of batch) entry.resolve();
    } catch (err) {
      for (const entry of batch) entry.reject(err);
    }
  }

  function scheduleFlush() {
    if (flushTimer) return;
    flushTimer = setTimeout(() => {
      flushChain = flushChain.then(flush);
    }, flushDelayMs);
  }

  function enqueue(op: SyncOperation): Promise<void> {
    if (!session) {
      return Promise.reject(new DriveSyncError("Not connected to Google Drive.", { code: "signed-out" }));
    }
    return new Promise<void>((resolve, reject) => {
      queue.push({ op, resolve, reject });
      scheduleFlush();
    });
  }

  /**
   * Report only ids with no newer write still queued: if that later write then
   * failed, a cleared id would let the next pull overwrite it with this older copy.
   */
  function reportLanded(collection: string, ids: readonly (string | number)[]) {
    const stillQueued = new Set(
      queue.flatMap(({ op }) => {
        if (op.type === "profile" || op.collection !== collection) return [];
        return [String(op.type === "upsert" ? op.item.id : op.id)];
      }),
    );
    onLanded(
      collection,
      ids.map(String).filter((id) => !stillQueued.has(id)),
    );
  }

  /** Browser: revoke through Google's script, loaded before anything is deleted. */
  async function gisRevoker(): Promise<(token: string) => Promise<void>> {
    const loaded = await ensureGis();
    return (token) => new Promise<void>((resolve) => loaded.accounts.oauth2.revoke(token, resolve));
  }

  /**
   * App: Google's script is not used there, so revoke with the plain OAuth
   * endpoint. The files are already gone by now, so a failure only leaves the
   * (now empty) grant in the user's Google account, which they can remove there.
   */
  async function revokeOverHttp(token: string) {
    const res = await fetchImpl(REVOKE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ token }).toString(),
    });
    if (!res.ok) console.warn(`High5: revoking Drive access failed (${res.status})`);
  }

  /** Cancel every queued write, telling each caller it never reached Drive. */
  function dropQueuedWrites() {
    if (flushTimer) clearTimeout(flushTimer);
    flushTimer = null;
    const dropped = queue;
    queue = [];
    for (const entry of dropped) {
      entry.reject(new DriveSyncError("Signed out before sync.", { code: "signed-out" }));
    }
  }

  /** Drop queued writes and forget the session; local data is the caller's to clear. */
  function endSession() {
    dropQueuedWrites();
    ownFileId = null;
    latestSeenAt = 0;
    lastCompactionAt = null;
    lossyFileIds.clear();
    documentCache.clear();
    writeEpoch += 1;
    setSession(null);
  }

  async function signOutOfDevice(native: NativeAuth) {
    await native.signOut().catch((err: unknown) => {
      console.warn("High5: device sign-out failed", err instanceof Error ? err.message : err);
    });
  }

  return {
    isCloudConfigured: isConfigured,

    /**
     * True when a usable token is stored, or (app only) when an expired one can
     * be renewed silently. In a browser an expired one is not restorable
     * without a click, so the UI should offer Connect Drive, not "Reconnecting…".
     */
    hasRestorableSession: async () => isConfigured() && (hasValidToken() || canRenewSilently()),

    /**
     * Reports the connected user on subscribing, then on every change. In the
     * app a stored session whose token has lapsed still reports the user: the
     * first Drive call renews it, and only a failed renewal reports signed out.
     * In a browser it also starts loading Google's script, so a Connect Drive
     * click can open the popup synchronously.
     */
    onAuthChange(callback: (user: DriveUser | null) => void): () => void {
      listeners.add(callback);
      scheduleExpiryNotice();
      const user = isConfigured() ? currentUser() : null;
      lastReportedUid = user?.uid ?? null;
      callback(user);
      if (isConfigured() && !nativeAuth) ensureGis().catch(() => {});
      return () => {
        listeners.delete(callback);
      };
    },

    /**
     * True while an account is stored, even with a lapsed token: its local
     * changes must be tracked as pending, so a reconnect replays them.
     */
    isLinked: (): boolean => Boolean(session?.user),

    signInWithGoogle: signIn,

    async signOut(): Promise<void> {
      endSession();
      // Also forget the account on the device, so the next Connect asks again.
      // The app is already signed out locally, so a failure here is not fatal.
      if (nativeAuth) await signOutOfDevice(nativeAuth);
    },

    /**
     * Delete every High5 sync file from the user's Drive and revoke this app's
     * access, then sign out. Google must be reachable *before* anything is
     * deleted: losing the data but keeping the grant would be the worse half.
     * A device that is still signed in uploads its local copy again on its next
     * sync, so other devices need signing out first.
     */
    async deleteAllSyncedData(): Promise<void> {
      if (!session?.user) {
        throw new DriveSyncError("Not connected to Google Drive.", { code: "signed-out" });
      }
      const revoke = nativeAuth ? revokeOverHttp : await gisRevoker();
      const token = await accessToken();
      dropQueuedWrites();
      await flushChain;
      const files = (await listFiles(`name contains '${FILE_PREFIX}'`)).filter(
        (file) => file.name.startsWith(FILE_PREFIX) && file.name.endsWith(".json"),
      );
      await Promise.all(
        files.map((file) => driveFetch(`${DRIVE_API}/files/${encodeURIComponent(file.id)}`, { method: "DELETE" })),
      );
      await revoke(session?.accessToken ?? token);
      endSession();
      if (nativeAuth) await signOutOfDevice(nativeAuth);
    },

    /** Every device's records and profile fields, merged; empty before anything was ever synced. */
    loadMerged: readMerged,

    saveProfile: (data: Readonly<Record<string, unknown>>) => enqueue({ type: "profile", data }),

    async upsertItems<T extends SyncItem>(collection: string, items: readonly T[]): Promise<void> {
      if (!items.length) return;
      await Promise.all(items.map((item) => enqueue({ type: "upsert", collection, item })));
      reportLanded(collection, items.map((item) => item.id));
    },

    async deleteItems(collection: string, ids: readonly (string | number)[]): Promise<void> {
      if (!ids.length) return;
      await Promise.all(ids.map((id) => enqueue({ type: "delete", collection, id })));
      reportLanded(collection, ids);
    },
  };
}

export type DriveSync = ReturnType<typeof createDriveSync>;

/** User-facing (Hebrew) message for a failed "Connect Google Drive". */
export function formatSignInError(err: unknown): string {
  const code = errorCode(err);
  if (code === "popup_failed_to_open") return "החלון של Google נחסם. אפשרו חלונות קופצים לאתר ונסו שוב.";
  if (code === "popup_closed" || code === "access_denied") return "החיבור בוטל.";
  if (code === "gis-load-failed") return "לא הצלחנו להגיע ל-Google. בדקו את החיבור או חוסם הפרסומות.";
  if (code === "not-configured") return "סנכרון ל-Google Drive לא מוגדר בגרסה הזו.";
  if (code === "offline") return "אין חיבור לאינטרנט. נסו שוב כשהחיבור יחזור.";
  return "החיבור נכשל. נסו שוב.";
}
