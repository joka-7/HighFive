// Tracks which locally-changed records have not been confirmed written to
// Drive yet, so a later pull can tell "the learner changed this while we
// believed we were offline" apart from "this is just an older copy of a
// record another device has since changed".
//
// Without that distinction a pull has to guess, and guessing "cloud wins"
// destroys anything done in the window before a restorable session resolves,
// or while a write was failing. Ported from KanDOne's src/utils/pendingSync.js.
//
// Keyed per collection; profile fields use the pseudo-collection "profile"
// with the field name as the id.

import type { KeyValueStorage } from "../services/driveSync";

const STORAGE_PREFIX = "high5.pending_sync_v1";
const OWNER_KEY = "high5.data_owner_v1";

/** Cap the bookkeeping so a runaway local session can't exhaust localStorage. */
const MAX_TRACKED_IDS = 10_000;

export interface PendingIds {
  readonly edited: Set<string>;
  readonly deleted: Set<string>;
}

export function pendingStorageKey(collection: string): string {
  return `${STORAGE_PREFIX}:${collection}`;
}

/** localStorage is unavailable in private modes and blocked-storage browsers. */
function browserStorage(): KeyValueStorage | null {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}

function toIdSet(ids: unknown): Set<string> {
  return new Set(Array.isArray(ids) ? ids.map(String) : []);
}

function capped(ids: string[]): string[] {
  return ids.length > MAX_TRACKED_IDS ? ids.slice(-MAX_TRACKED_IDS) : ids;
}

/**
 * Content fingerprint per id. Comparing two of these is how a save detects
 * which records the learner actually touched, without every mutation call
 * site having to remember to report itself.
 */
export function fingerprintItems<T extends { readonly id: string | number }>(
  items: readonly T[],
): Map<string, string> {
  return new Map(items.map((item) => [String(item.id), JSON.stringify(item)]));
}

/** Ids added or changed, and ids removed, between two fingerprints. */
export function diffFingerprints(
  before: ReadonlyMap<string, string>,
  after: ReadonlyMap<string, string>,
): { edited: string[]; added: string[]; deleted: string[] } {
  const edited: string[] = [];
  const added: string[] = [];
  for (const [id, hash] of after) {
    if (before.get(id) === hash) continue;
    edited.push(id);
    if (!before.has(id)) added.push(id);
  }
  const deleted = [...before.keys()].filter((id) => !after.has(id));
  return { edited, added, deleted };
}

export function readPending(collection: string, storage = browserStorage()): PendingIds {
  const empty = { edited: new Set<string>(), deleted: new Set<string>() };
  if (!storage) return empty;
  try {
    const raw = storage.getItem(pendingStorageKey(collection));
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as { edited?: unknown; deleted?: unknown } | null;
    return { edited: toIdSet(parsed?.edited), deleted: toIdSet(parsed?.deleted) };
  } catch {
    return empty;
  }
}

function writePending(collection: string, pending: PendingIds, storage: KeyValueStorage | null): void {
  if (!storage) return;
  const edited = capped([...pending.edited]);
  const deleted = capped([...pending.deleted]);
  try {
    if (edited.length === 0 && deleted.length === 0) {
      storage.removeItem(pendingStorageKey(collection));
      return;
    }
    storage.setItem(pendingStorageKey(collection), JSON.stringify({ edited, deleted }));
  } catch {
    // Storage full or blocked. The pull then prefers Drive for shared ids —
    // degraded, not broken.
  }
}

/**
 * Fold one save's changes into the pending set. An id is only ever in one of
 * the two sets: re-creating a deleted id makes it an edit again, and deleting
 * an edited id makes it a delete.
 */
export function recordLocalChanges(
  collection: string,
  { edited = [], deleted = [] }: { edited?: readonly string[]; deleted?: readonly string[] },
  storage = browserStorage(),
): void {
  if (edited.length === 0 && deleted.length === 0) return;
  const pending = readPending(collection, storage);
  for (const id of edited) {
    pending.deleted.delete(id);
    pending.edited.add(id);
  }
  for (const id of deleted) {
    pending.edited.delete(id);
    pending.deleted.add(id);
  }
  writePending(collection, pending, storage);
}

/** Drop ids whose Drive write has actually landed — they are no longer at risk. */
export function clearPendingIds(collection: string, ids: readonly string[], storage = browserStorage()): void {
  if (ids.length === 0) return;
  const pending = readPending(collection, storage);
  let changed = false;
  for (const id of ids) {
    if (pending.edited.delete(id)) changed = true;
    if (pending.deleted.delete(id)) changed = true;
  }
  if (changed) writePending(collection, pending, storage);
}

/** The Google account whose data is in local storage, or null for data made signed out. */
export function readDataOwner(storage = browserStorage()): string | null {
  try {
    return storage?.getItem(OWNER_KEY) || null;
  } catch {
    return null;
  }
}

export function writeDataOwner(uid: string, storage = browserStorage()): void {
  try {
    storage?.setItem(OWNER_KEY, uid);
  } catch {
    // Unrecorded ownership degrades to treating the data as signed-out data.
  }
}

/** Forget the owner and pending state, as sign-out must before another account connects. */
export function clearLocalSyncState(collections: readonly string[], storage = browserStorage()): void {
  try {
    storage?.removeItem(OWNER_KEY);
    for (const collection of collections) storage?.removeItem(pendingStorageKey(collection));
  } catch {
    // Blocked storage has nothing persisted to clear.
  }
}
