// Keeps generated content (a reading passage, a vocabulary set, a lesson)
// stable across remounts — screens unmount/remount on every tab switch, so
// without this each visit would silently swap in new content and the user
// would lose their place mid-article or mid-lesson. Content only changes when
// the day or the level changes, or the caller explicitly forces a refresh.

import { dateKeyFromTs } from "./missions";

interface CachedEntry<T> {
  date: string;
  level: string;
  data: T;
}

function todayKey(): string {
  // Local calendar day — must match dateKeyFromTs used by missions/streaks,
  // not UTC toISOString (which flips the date near midnight in positive offsets).
  return dateKeyFromTs(Date.now());
}

export function loadDailyCache<T>(key: string, level: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedEntry<T>;
    if (parsed.date !== todayKey() || parsed.level !== level) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

// Every key ever written via saveDailyCache is remembered here so a full
// reset can find and clear all of them without each screen having to expose
// its own cache key constant to the store.
const MANIFEST_KEY = "high5.daily_cache_keys";

function readManifest(): string[] {
  try {
    const raw = localStorage.getItem(MANIFEST_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function rememberKey(key: string): void {
  try {
    const keys = new Set(readManifest());
    keys.add(key);
    localStorage.setItem(MANIFEST_KEY, JSON.stringify([...keys]));
  } catch {
    // Storage unavailable (private mode) — the cache itself still worked via
    // saveDailyCache; only the manifest bookkeeping is skipped.
  }
}

export function saveDailyCache<T>(key: string, level: string, data: T): void {
  const entry: CachedEntry<T> = { date: todayKey(), level, data };
  localStorage.setItem(key, JSON.stringify(entry));
  rememberKey(key);
}

/**
 * Clear every daily content cache ever written (today's lesson, reading,
 * listening, speaking set, ...). Used by a full data reset so it doesn't
 * leave stale cached content showing on the next visit to a screen.
 */
export function clearAllDailyCaches(): void {
  for (const key of readManifest()) {
    localStorage.removeItem(key);
  }
  localStorage.removeItem(MANIFEST_KEY);
}
