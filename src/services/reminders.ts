import { loadPrefs } from "../services/prefs";
import { dateKeyFromTs } from "../utils/missions";
import { isOperationDone, OPERATIONS } from "../data/operations";
import { isReviewDay } from "../utils/cycle";
import type { DailyMissionFlag, DailyMissionsState } from "../types";

const NOTIFIED_KEY = "high5.reminder_notified";

export function notificationsSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window;
}

export async function requestReminderPermission(): Promise<NotificationPermission> {
  if (!notificationsSupported()) return "denied";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return Notification.requestPermission();
}

function alreadyNotifiedToday(today: string): boolean {
  try {
    return localStorage.getItem(NOTIFIED_KEY) === today;
  } catch {
    return false;
  }
}

function markNotified(today: string): void {
  try {
    localStorage.setItem(NOTIFIED_KEY, today);
  } catch {
    // ignore
  }
}

// The day is complete when all five operations are done plus the words box —
// new words on a learning day, the week's review round on Friday/Saturday.
function missionsIncomplete(m: DailyMissionsState, now: number): boolean {
  const flags: Record<DailyMissionFlag, boolean> = {
    video: Boolean(m.video),
    talk: Boolean(m.talk),
    words: Boolean(m.words),
    reading: Boolean(m.reading),
    listening: Boolean(m.listening),
    speaking: Boolean(m.speaking),
    grammar: Boolean(m.grammar),
    memorization: Boolean(m.memorization),
  };
  const daily = isReviewDay(now) ? flags.memorization : flags.words;
  return !(daily && OPERATIONS.every((op) => isOperationDone(op, flags)));
}

/**
 * Best-effort local reminder: fires when the app is open (or returns to
 * foreground) at/after the preferred hour, missions are incomplete, and we
 * haven't already notified today. True background push while the app is
 * closed needs a push service (see open PR #19).
 */
export function maybeNotifyIncompleteMissions(
  dailyMissions: DailyMissionsState,
  now = new Date(),
): boolean {
  const prefs = loadPrefs();
  if (!prefs.remindersEnabled) return false;
  if (!notificationsSupported() || Notification.permission !== "granted") return false;

  const today = dateKeyFromTs(now.getTime());
  if (alreadyNotifiedToday(today)) return false;
  if (now.getHours() < prefs.reminderHour) return false;
  if (!missionsIncomplete(dailyMissions, now.getTime())) return false;

  try {
    new Notification("High5 — חמש ביום", {
      body: "עדיין יש משימות שלא הושלמו להיום. בואו נסיים אותן ✋",
      icon: "/icon-192.png",
      tag: "high5-daily-missions",
    });
    markNotified(today);
    return true;
  } catch {
    return false;
  }
}
