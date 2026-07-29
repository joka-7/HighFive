import { afterEach, describe, expect, it, vi } from "vitest";
import { maybeNotifyIncompleteMissions } from "./reminders";
import type { DailyMissionsState } from "../types";

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
