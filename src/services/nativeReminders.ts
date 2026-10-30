// Daily-missions reminders for the Android app: local notifications the OS
// fires at the chosen hour even while the app is closed, so the server learns
// nothing (the web needs push for this; see push.ts).
//
// The next week of reminders is kept scheduled and rebuilt whenever the app
// opens or the day's missions change: today's is dropped once every mission is
// done, and a learner who stops opening the app still gets a week of nudges.

import type { PermissionState } from "@capacitor/core";

export const REMINDER_DAYS = 7;
// Ids this module owns; any other notification the app schedules must avoid them.
const FIRST_ID = 5100;
const REMINDER_IDS = Array.from({ length: REMINDER_DAYS }, (_, i) => ({ id: FIRST_ID + i }));

const TITLE = "High5 — חמש ביום";
const BODY = "עדיין יש משימות שלא הושלמו להיום. בואו נסיים אותן ✋";

/** The slice of @capacitor/local-notifications this module uses. */
export interface LocalNotificationsPort {
  checkPermissions(): Promise<{ display: PermissionState }>;
  requestPermissions(): Promise<{ display: PermissionState }>;
  cancel(options: { notifications: { id: number }[] }): Promise<void>;
  schedule(options: {
    notifications: {
      id: number;
      title: string;
      body: string;
      schedule: { at: Date; allowWhileIdle: boolean };
      isExactNotification: boolean;
    }[];
  }): Promise<unknown>;
}

export interface ReminderPlan {
  readonly enabled: boolean;
  /** Local hour, 0–23. */
  readonly hour: number;
  /** Every one of today's missions is done, so today needs no reminder. */
  readonly todayDone: boolean;
  readonly now: Date;
}

/** The next `days` reminder times at `hour` local time, skipping today once it's done or past. */
export function reminderTimes({ hour, todayDone, now }: Omit<ReminderPlan, "enabled">, days = REMINDER_DAYS): Date[] {
  const times: Date[] = [];
  for (let offset = 0; times.length < days; offset += 1) {
    // Built from calendar fields, so a DST change still lands on the local hour.
    const at = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset, hour);
    if (offset === 0 && (todayDone || at <= now)) continue;
    times.push(at);
  }
  return times;
}

async function loadLocalNotifications(): Promise<LocalNotificationsPort> {
  return (await import("@capacitor/local-notifications")).LocalNotifications;
}

export function createNativeReminders(loadPlugin: () => Promise<LocalNotificationsPort> = loadLocalNotifications) {
  // One reschedule at a time: two interleaved cancel-then-schedule passes could
  // leave the older plan's notifications in place.
  let chain: Promise<void> = Promise.resolve();

  async function apply(plan: ReminderPlan): Promise<void> {
    const plugin = await loadPlugin();
    await plugin.cancel({ notifications: REMINDER_IDS });
    if (!plan.enabled) return;
    // Permission revoked in Android settings: nothing would show, so schedule nothing.
    if ((await plugin.checkPermissions()).display !== "granted") return;
    await plugin.schedule({
      notifications: reminderTimes(plan).map((at, i) => ({
        id: FIRST_ID + i,
        title: TITLE,
        body: BODY,
        schedule: { at, allowWhileIdle: true },
        // An exact alarm would open Android's "Alarms & reminders" settings on
        // every reschedule, and a nudge a few minutes late costs nothing.
        isExactNotification: false,
      })),
    });
  }

  return {
    async requestPermission(): Promise<NotificationPermission> {
      const { display } = await (await loadPlugin()).requestPermissions();
      return display === "granted" ? "granted" : "denied";
    },

    reschedule(plan: ReminderPlan): Promise<void> {
      const next = chain.then(() => apply(plan));
      chain = next.catch(() => {});
      return next;
    },
  };
}

export const nativeReminders = createNativeReminders();
