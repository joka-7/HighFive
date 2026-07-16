// Keeps generated content (a reading passage, a vocabulary set, a lesson)
// stable across remounts — screens unmount/remount on every tab switch, so
// without this each visit would silently swap in new content and the user
// would lose their place mid-article or mid-lesson. Content only changes when
// the day or the level changes, or the caller explicitly forces a refresh.

interface CachedEntry<T> {
  date: string;
  level: string;
  data: T;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
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

export function saveDailyCache<T>(key: string, level: string, data: T): void {
  const entry: CachedEntry<T> = { date: todayKey(), level, data };
  localStorage.setItem(key, JSON.stringify(entry));
}
