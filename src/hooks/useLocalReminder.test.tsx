import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useLocalReminder } from "./useLocalReminder";
import { maybeNotifyIncompleteMissions, syncNativeReminders } from "../services/reminders";
import { isNativeApp } from "../services/platform";
import { reportError } from "../services/errors";

vi.mock("../store/useLingo", () => ({ useLingo: () => ({ dailyMissions: { date: "2026-10-20" }, progress: {} }) }));
vi.mock("../services/platform", () => ({ isNativeApp: vi.fn(() => false) }));
vi.mock("../services/errors", () => ({ reportError: vi.fn() }));
vi.mock("../services/reminders", () => ({
  maybeNotifyIncompleteMissions: vi.fn(),
  syncNativeReminders: vi.fn(async () => {}),
}));

describe("useLocalReminder", () => {
  afterEach(() => {
    vi.mocked(isNativeApp).mockReturnValue(false);
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it.each([
    { name: "checks for an in-tab notification in a browser", native: false, notified: 1, synced: 0 },
    { name: "rebuilds the OS-scheduled reminders in the Android app", native: true, notified: 0, synced: 1 },
  ])("$name on open", ({ native, notified, synced }) => {
    vi.mocked(isNativeApp).mockReturnValue(native);

    renderHook(() => useLocalReminder());

    expect([vi.mocked(maybeNotifyIncompleteMissions).mock.calls.length, vi.mocked(syncNativeReminders).mock.calls.length]).toEqual([
      notified,
      synced,
    ]);
  });

  it("does not re-check on a timer in the app, whose reminders are already scheduled", () => {
    vi.useFakeTimers();
    vi.mocked(isNativeApp).mockReturnValue(true);
    renderHook(() => useLocalReminder());

    vi.advanceTimersByTime(15 * 60 * 1000);

    expect(vi.mocked(syncNativeReminders).mock.calls.length).toBe(1);
  });

  it("reports a failed reschedule", async () => {
    vi.mocked(isNativeApp).mockReturnValue(true);
    vi.mocked(syncNativeReminders).mockRejectedValueOnce(new Error("plugin missing"));

    renderHook(() => useLocalReminder());
    await Promise.resolve();
    await Promise.resolve();

    expect(reportError).toHaveBeenCalledWith(expect.any(Error), "reminder.native");
  });
});
