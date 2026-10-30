import { afterEach, describe, expect, it, vi } from "vitest";
import {
  maybeNotifyIncompleteMissions,
  notificationsSupported,
  requestReminderPermission,
  syncNativeReminders,
} from "./reminders";
import { isNativeApp } from "./platform";
import { nativeReminders } from "./nativeReminders";
import type { DailyMissionsState } from "../types";

vi.mock("./platform", () => ({ isNativeApp: vi.fn(() => false) }));
vi.mock("./nativeReminders", () => ({
  nativeReminders: { reschedule: vi.fn(async () => {}), requestPermission: vi.fn(async () => "granted") },
}));

const incomplete: DailyMissionsState = {
  date: "2026-07-27",
  video: false,
  talk: false,
  words: false,
  reading: false,
  listening: false,
  speaking: false,
  grammar: false,
  memorization: false,
};

afterEach(() => {
  localStorage.clear();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("maybeNotifyIncompleteMissions", () => {
  it("does nothing when reminders are disabled", () => {
    const notify = vi.fn();
    vi.stubGlobal("Notification", Object.assign(notify, { permission: "granted" }));
    expect(maybeNotifyIncompleteMissions(incomplete, new Date("2026-07-27T19:00:00"))).toBe(
      false,
    );
    expect(notify).not.toHaveBeenCalled();
  });

  it("notifies once when enabled, permitted, past hour, and incomplete", () => {
    localStorage.setItem(
      "high5.prefs",
      JSON.stringify({ remindersEnabled: true, reminderHour: 18 }),
    );
    const notify = vi.fn();
    vi.stubGlobal("Notification", Object.assign(notify, { permission: "granted" }));

    const when = new Date("2026-07-27T19:00:00");
    expect(maybeNotifyIncompleteMissions(incomplete, when)).toBe(true);
    expect(notify).toHaveBeenCalledOnce();
    expect(maybeNotifyIncompleteMissions(incomplete, when)).toBe(false);
  });
});

describe("notificationsSupported", () => {
  afterEach(() => vi.mocked(isNativeApp).mockReturnValue(false));

  it("is true in the Android app, whose WebView has no Notification API", () => {
    vi.mocked(isNativeApp).mockReturnValue(true);
    Reflect.deleteProperty(window, "Notification");

    expect(notificationsSupported()).toBe(true);
  });
});

describe("requestReminderPermission", () => {
  afterEach(() => vi.mocked(isNativeApp).mockReturnValue(false));

  it("asks Android for notification permission in the app", async () => {
    vi.mocked(isNativeApp).mockReturnValue(true);

    expect([await requestReminderPermission(), vi.mocked(nativeReminders.requestPermission).mock.calls.length]).toEqual([
      "granted",
      1,
    ]);
  });
});

describe("syncNativeReminders", () => {
  it.each([
    { name: "an unfinished day", missions: incomplete, todayDone: false },
    {
      name: "a finished day",
      missions: { ...incomplete, video: true, talk: true, words: true, reading: true, listening: true, speaking: true, grammar: true },
      todayDone: true,
    },
  ])("schedules from the saved preference for $name", async ({ missions, todayDone }) => {
    localStorage.setItem("high5.prefs", JSON.stringify({ remindersEnabled: true, reminderHour: 19 }));
    // A Monday: a learning day, so the words box counts (not the review round).
    const now = new Date("2026-07-27T09:00:00");

    await syncNativeReminders(missions, now);

    expect(nativeReminders.reschedule).toHaveBeenLastCalledWith({ enabled: true, hour: 19, todayDone, now });
  });
});
