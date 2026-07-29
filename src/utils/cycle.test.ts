import { describe, it, expect } from "vitest";
import {
  CYCLE_DAYS,
  CYCLE_WORD_COUNT,
  cycleDay,
  cycleLearningDays,
  cycleStart,
  isMemorizationDay,
} from "./cycle";

describe("five-day cycle", () => {
  it("numbers the days 1..5 and wraps", () => {
    expect(cycleDay(0)).toBe(1);
    expect(cycleDay(3)).toBe(4);
    expect(cycleDay(4)).toBe(5);
    expect(cycleDay(5)).toBe(1);
    expect(cycleDay(9)).toBe(5);
  });

  it("marks every fifth day as a memorization day", () => {
    const days = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(isMemorizationDay);
    expect(days).toEqual([false, false, false, false, true, false, false, false, false, true]);
  });

  it("keeps exactly one memorization day per cycle", () => {
    const flags = Array.from({ length: 50 }, (_, d) => isMemorizationDay(d));
    expect(flags.filter(Boolean)).toHaveLength(50 / CYCLE_DAYS);
  });

  it("lists the four learning days of the current cycle", () => {
    expect(cycleStart(7)).toBe(5);
    expect(cycleLearningDays(7)).toEqual([5, 6, 7, 8]);
    // On a memorization day the whole cycle is already behind the learner.
    expect(cycleLearningDays(9)).toEqual([5, 6, 7, 8]);
    expect(cycleLearningDays(9).every((d) => d < 9)).toBe(true);
  });

  it("covers 20 words per cycle (4 days × 5 words)", () => {
    expect(CYCLE_WORD_COUNT).toBe(20);
  });
});
