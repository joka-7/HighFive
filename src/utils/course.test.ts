import { describe, it, expect } from "vitest";
import type { CourseProgress } from "../types";
import { contentDay, finishCourseDay, isValidCourses, NEW_COURSE, reviewWindow } from "./course";
import { dateKeyFromTs } from "./missions";

// 2026-07-26 is a Sunday; local midnight of each weekday wherever tests run.
const at = (offset: number) => new Date(2026, 6, 26 + offset).getTime();
const done = (daysDone: number, lastOffset: number | null): CourseProgress => ({
  daysDone,
  lastDoneDate: lastOffset === null ? null : dateKeyFromTs(at(lastOffset)),
});

describe("contentDay", () => {
  it.each([
    ["new learner on a learning day starts at day 0", NEW_COURSE, 0, 0],
    ["unfinished learning day shows the next lesson", done(3, -3), 0, 3],
    ["after finishing today, today's lesson stays", done(4, 0), 0, 3],
    ["a long absence does not skip lessons", done(7, -200), 2, 7],
    ["review day shows the latest finished lesson", done(5, 4), 5, 4],
    ["review day for a new learner clamps to 0", NEW_COURSE, 5, 0],
  ])("%s", (_name, course, offset, expected) => {
    expect(contentDay(course, at(offset))).toBe(expected);
  });
});

describe("finishCourseDay", () => {
  it("advances once on a learning day and records the day", () => {
    expect(finishCourseDay(NEW_COURSE, at(1))).toEqual(done(1, 1));
  });

  it("ignores a second finish on the same day", () => {
    const once = finishCourseDay(NEW_COURSE, at(1));
    expect(finishCourseDay(once, at(1))).toBe(once);
  });

  it.each([5, 6])("does not advance on review day offset %i", (offset) => {
    expect(finishCourseDay(NEW_COURSE, at(offset))).toBe(NEW_COURSE);
  });

  it("advances again the next learning day", () => {
    const monday = finishCourseDay(NEW_COURSE, at(1));
    expect(finishCourseDay(monday, at(2)).daysDone).toBe(2);
  });
});

describe("isValidCourses", () => {
  it.each([
    ["an empty map", {}, true],
    ["a finished-days record", { A1: { daysDone: 3, lastDoneDate: "2026-07-27" } }, true],
    ["a fresh record", { A1: NEW_COURSE }, true],
    ["a string daysDone", { A1: { daysDone: "3", lastDoneDate: null } }, false],
    ["a negative daysDone", { A1: { daysDone: -1, lastDoneDate: null } }, false],
    ["a missing lastDoneDate", { A1: { daysDone: 1 } }, false],
    ["an array", [], false],
    ["null", null, false],
  ])("%s -> %s", (_name, value, expected) => {
    expect(isValidCourses(value)).toBe(expected);
  });
});

describe("reviewWindow", () => {
  it.each([
    [0, [0]],
    [2, [0, 1, 2]],
    [4, [0, 1, 2, 3, 4]],
    [11, [7, 8, 9, 10, 11]],
  ])("ending at course day %i covers %j", (day, expected) => {
    expect(reviewWindow(day)).toEqual(expected);
  });
});
