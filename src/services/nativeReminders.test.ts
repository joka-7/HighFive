import { describe, expect, it, vi } from "vitest";
import { createNativeReminders, reminderTimes, REMINDER_DAYS, type LocalNotificationsPort } from "./nativeReminders";

// Local times, so the expectations read the same in any machine timezone.
const at = (day: number, hour: number, minute = 0) => new Date(2026, 9, day, hour, minute);

describe("reminderTimes", () => {
  it.each([
    { name: "includes today when the hour is still ahead", now: at(20, 9), todayDone: false, first: at(20, 18) },
    { name: "starts tomorrow once today's hour has passed", now: at(20, 18, 30), todayDone: false, first: at(21, 18) },
    { name: "starts tomorrow at the exact hour itself", now: at(20, 18), todayDone: false, first: at(21, 18) },
    { name: "skips today once every mission is done", now: at(20, 9), todayDone: true, first: at(21, 18) },
  ])("$name", ({ now, todayDone, first }) => {
    const times = reminderTimes({ hour: 18, todayDone, now });

    expect([times.length, times[0], times.at(-1)?.getDate()]).toEqual([
      REMINDER_DAYS,
      first,
      first.getDate() + REMINDER_DAYS - 1,
    ]);
  });

  it("keeps the local hour across a DST change", () => {
    vi.stubEnv("TZ", "Asia/Jerusalem");
    // Israel springs forward on Friday 2027-03-26.
    const times = reminderTimes({ hour: 18, todayDone: false, now: new Date(2027, 2, 24, 9) });
    const hours = new Set(times.map((t) => t.getHours()));
    const offsets = new Set(times.map((t) => t.getTimezoneOffset()));
    vi.unstubAllEnvs();

    // Two offsets prove the week really crosses the change.
    expect([hours, offsets.size]).toEqual([new Set([18]), 2]);
  });
});

function fakePlugin(display: "granted" | "denied" = "granted") {
  return {
    checkPermissions: vi.fn(async () => ({ display })),
    requestPermissions: vi.fn(async () => ({ display })),
    cancel: vi.fn<LocalNotificationsPort["cancel"]>(async () => {}),
    schedule: vi.fn<LocalNotificationsPort["schedule"]>(async () => ({})),
  } satisfies LocalNotificationsPort;
}

const plan = { enabled: true, hour: 18, todayDone: false, now: at(20, 9) };

describe("createNativeReminders", () => {
  describe("reschedule", () => {
    it("replaces the week of reminders with inexact ones at the chosen hour", async () => {
      const plugin = fakePlugin();

      await createNativeReminders(async () => plugin).reschedule(plan);

      const scheduled = plugin.schedule.mock.calls[0]?.[0].notifications ?? [];
      expect([
        plugin.cancel.mock.calls[0]?.[0].notifications.length,
        scheduled.length,
        scheduled[0]?.schedule.at,
        scheduled.every((n) => !n.isExactNotification),
      ]).toEqual([REMINDER_DAYS, REMINDER_DAYS, at(20, 18), true]);
    });

    it.each([
      { name: "reminders are turned off", plugin: fakePlugin(), plan: { ...plan, enabled: false } },
      { name: "notification permission was revoked", plugin: fakePlugin("denied"), plan },
    ])("cancels and schedules nothing when $name", async ({ plugin, plan }) => {
      await createNativeReminders(async () => plugin).reschedule(plan);

      expect([plugin.cancel.mock.calls.length, plugin.schedule.mock.calls.length]).toEqual([1, 0]);
    });

    it("applies overlapping reschedules in order, so the newest plan wins", async () => {
      const plugin = fakePlugin();
      const log: string[] = [];
      plugin.cancel.mockImplementation(async () => {
        log.push("cancel");
        await new Promise((resolve) => setTimeout(resolve, 0));
      });
      plugin.schedule.mockImplementation(async ({ notifications }) => {
        log.push(`schedule ${notifications[0]?.schedule.at.getDate()}`);
        return {};
      });
      const reminders = createNativeReminders(async () => plugin);

      await Promise.all([reminders.reschedule(plan), reminders.reschedule({ ...plan, todayDone: true })]);

      expect(log).toEqual(["cancel", "schedule 20", "cancel", "schedule 21"]);
    });
  });

  describe("requestPermission", () => {
    it.each([
      { display: "granted" as const, result: "granted" },
      { display: "denied" as const, result: "denied" },
    ])("reports $result when Android answers $display", async ({ display, result }) => {
      expect(await createNativeReminders(async () => fakePlugin(display)).requestPermission()).toBe(result);
    });
  });
});
