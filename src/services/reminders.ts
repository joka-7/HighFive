import { loadPrefs } from "../services/prefs";
import { dateKeyFromTs } from "../utils/missions";
import type { DailyMissionsState } from "../types";

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

function missionsIncomplete(m: DailyMissionsState): boolean {
  return !(
    m.video &&
    m.talk &&
    m.words &&
    m.reading &&
    m.listening &&
    m.speaking &&
    m.grammar
  );
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
  if (!missionsIncomplete(dailyMissions)) return false;

  try {
    new Notification("High5 — משימות יומיות", {
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
