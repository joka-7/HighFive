import { describe, it, expect } from "vitest";
import {
  isReviewDay,
  LEARNING_DAYS,
  learningDayNumber,
  WEEK_WORD_COUNT,
  weekday,
  weekLearningDays,
  weekStart,
  WORDS_PER_DAY,
} from "./cycle";
import { dayIndex } from "./daily";

// 2026-07-26 is a Sunday. Built with the local Date constructor (not Date.UTC)
// so each timestamp is local midnight of that weekday wherever the tests run.
const SUNDAY = new Date(2026, 6, 26).getTime();
const at = (dayOffset: number) => new Date(2026, 6, 26 + dayOffset).getTime();
const WEEK = [0, 1, 2, 3, 4, 5, 6];

describe("the weekly rhythm", () => {
  it("maps Sunday…Saturday onto 0…6", () => {
    expect(WEEK.map((i) => weekday(at(i)))).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it("learns Sunday–Thursday and reviews Friday–Saturday", () => {
    expect(WEEK.map((i) => isReviewDay(at(i)))).toEqual([
      false,
      false,
      false,
      false,
      false,
      true,
      true,
    ]);
  });

  it("numbers the learning days 1..5, with none on a review day", () => {
    expect(WEEK.map((i) => learningDayNumber(at(i)))).toEqual([1, 2, 3, 4, 5, null, null]);
  });

  it("resolves the same Sunday from every day of that week", () => {
    const sunday = dayIndex(SUNDAY);
    for (const i of WEEK) expect(weekStart(at(i))).toBe(sunday);
  });

  it("returns the week's five learning days, stable all week", () => {
    const sunday = dayIndex(SUNDAY);
    const expected = [sunday, sunday + 1, sunday + 2, sunday + 3, sunday + 4];
    for (const i of WEEK) expect(weekLearningDays(at(i))).toEqual(expected);
  });

  it("carries 25 words into a review day", () => {
    expect(WEEK_WORD_COUNT).toBe(25);
    expect(LEARNING_DAYS * WORDS_PER_DAY).toBe(WEEK_WORD_COUNT);
  });
});
