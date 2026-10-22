import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useReminderReports } from "./useReminderReports";
import { reportReminderDay } from "../services/push";
import { reportError } from "../services/errors";

vi.mock("../store/useLingo", () => ({ useLingo: () => ({ dailyMissions: { date: "2000-01-01" } }) }));
vi.mock("../services/push", () => ({ reportReminderDay: vi.fn() }));
vi.mock("../services/errors", () => ({ reportError: vi.fn() }));

describe("useReminderReports", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.mocked(reportError).mockClear();
  });

  it.each([
    { name: "ignores a failed report while offline", online: false, reported: 0 },
    { name: "reports a failed report while online", online: true, reported: 1 },
  ])("$name", async ({ online, reported }) => {
    vi.spyOn(navigator, "onLine", "get").mockReturnValue(online);
    vi.mocked(reportReminderDay).mockRejectedValue(new Error("network"));

    renderHook(() => useReminderReports());

    await waitFor(() => expect(reportReminderDay).toHaveBeenCalled());
    await Promise.resolve();
    expect(reportError).toHaveBeenCalledTimes(reported);
  });
});
