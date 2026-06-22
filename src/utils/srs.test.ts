import { describe, expect, it } from "vitest";
import {
  INTERVALS_DAYS,
  MAX_SRS_LEVEL,
  isDue,
  isSrsMastered,
  scheduleNext,
} from "./srs";

const DAY = 86_400_000;
const NOW = 1_700_000_000_000;

describe("scheduleNext", () => {
  it("promotes to the next box on success and schedules by the interval table", () => {
    const r = scheduleNext(0, true, NOW);
    expect(r.srsLevel).toBe(1);
    expect(r.nextReviewAt).toBe(NOW + INTERVALS_DAYS[1] * DAY);
  });

  it("resets to box 0 (due tomorrow) on failure", () => {
    const r = scheduleNext(3, false, NOW);
    expect(r.srsLevel).toBe(0);
    expect(r.nextReviewAt).toBe(NOW + INTERVALS_DAYS[0] * DAY);
  });

  it("caps at the top box", () => {
    const r = scheduleNext(MAX_SRS_LEVEL, true, NOW);
    expect(r.srsLevel).toBe(MAX_SRS_LEVEL);
  });

  it("handles undefined/invalid current levels as box 0", () => {
    expect(scheduleNext(NaN, true, NOW).srsLevel).toBe(1);
  });
});

describe("isSrsMastered", () => {
  it("is true only at the top box", () => {
    expect(isSrsMastered(MAX_SRS_LEVEL)).toBe(true);
    expect(isSrsMastered(MAX_SRS_LEVEL - 1)).toBe(false);
    expect(isSrsMastered(undefined)).toBe(false);
  });
});

describe("isDue", () => {
  it("treats words with no schedule as due", () => {
    expect(isDue(undefined, NOW)).toBe(true);
  });

  it("compares the review time to now", () => {
    expect(isDue(NOW - 1, NOW)).toBe(true);
    expect(isDue(NOW + 1, NOW)).toBe(false);
  });
});
