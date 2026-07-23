// Pure logic for the daily "you haven't done today's missions" reminder.
// Shared between the Vercel cron endpoint (api/mission-reminder.ts) and its
// tests — kept dependency-free so it needs no Firebase Admin/Vercel types.

export interface ReminderDailyMissions {
  date: string;
  video: boolean;
  talk: boolean;
  words: boolean;
  reading: boolean;
  grammar: boolean;
}

export interface ReminderUserData {
  pushToken?: string | null;
  timezone?: string | null;
  progress?: { lastActiveTimestamp?: number } | null;
  dailyMissions?: ReminderDailyMissions | null;
}

/** YYYY-MM-DD for the given instant, in the given IANA timezone. */
export function localDateKey(timeZone: string, date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** 0-23 hour for the given instant, in the given IANA timezone. */
export function localHour(timeZone: string, date: Date): number {
  return Number(
    new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", hour12: false }).format(date),
  );
}

/** Missions reset daily (see DailyMissionsState) — a stale `date` means none
 * of today's missions have started yet. */
export function missionsCompleteToday(
  missions: ReminderDailyMissions | null | undefined,
  todayKey: string,
): boolean {
  if (!missions || missions.date !== todayKey) return false;
  return Boolean(
    missions.video && missions.talk && missions.words && missions.reading && missions.grammar,
  );
}

/** True if this user should get today's reminder, evaluated at `now`. */
export function shouldSendReminder(user: ReminderUserData, now: Date, targetHour: number): boolean {
  if (!user.pushToken || !user.timezone) return false;

  let hour: number;
  let todayKey: string;
  try {
    hour = localHour(user.timezone, now);
    todayKey = localDateKey(user.timezone, now);
  } catch {
    return false; // invalid/unsupported IANA timezone string
  }
  if (hour !== targetHour) return false;

  const lastActiveKey = user.progress?.lastActiveTimestamp
    ? localDateKey(user.timezone, new Date(user.progress.lastActiveTimestamp))
    : "";
  if (lastActiveKey === todayKey) return false; // already opened the app today

  return !missionsCompleteToday(user.dailyMissions, todayKey);
}
