// Pure logic for the daily "you haven't done today's missions" web-push
// reminder. Shared by the Vercel functions (api/) and their tests, so it
// stays dependency-free.
//
// The server knows nothing about anyone's learning: per browser install it
// keeps only a push token, a timezone, and two dates the browser reports —
// the last day the learner finished every mission, and the last day they
// opened the app. No Google account, no progress, no content.

/** What the server stores per install (reminders/{installId}). */
export interface ReminderInstall {
  readonly pushToken: string;
  readonly timezone: string;
  /** Local day (YYYY-MM-DD) the learner last finished every mission, or null. */
  readonly doneDate: string | null;
  /** Local day (YYYY-MM-DD) the learner last opened the app, or null. */
  readonly seenDate: string | null;
}

const DATE_KEY = /^\d{4}-\d{2}-\d{2}$/;

export function isDateKey(value: unknown): value is string {
  return typeof value === "string" && DATE_KEY.test(value);
}

/** True for an IANA timezone this runtime understands. */
export function isValidTimeZone(value: unknown): value is string {
  if (typeof value !== "string" || value.length === 0 || value.length > 64) return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: value });
    return true;
  } catch {
    return false;
  }
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

/**
 * True if this install should get today's reminder at `now`: it is the
 * target hour where the learner is, and today they have neither opened the
 * app nor finished their missions.
 */
export function shouldSendReminder(install: ReminderInstall, now: Date, targetHour: number): boolean {
  if (!install.pushToken || !isValidTimeZone(install.timezone)) return false;
  if (localHour(install.timezone, now) !== targetHour) return false;
  const today = localDateKey(install.timezone, now);
  return install.doneDate !== today && install.seenDate !== today;
}
