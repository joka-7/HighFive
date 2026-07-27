import { describe, it, expect, beforeEach } from "vitest";
import { clearAllDailyCaches, loadDailyCache, saveDailyCache } from "./dailyCache";

beforeEach(() => {
  localStorage.clear();
});

describe("dailyCache", () => {
  it("round-trips data for the same day and level", () => {
    saveDailyCache("k", "A1", { hello: "world" });
    expect(loadDailyCache("k", "A1")).toEqual({ hello: "world" });
  });

  it("misses when the level differs", () => {
    saveDailyCache("k", "A1", { hello: "world" });
    expect(loadDailyCache("k", "B1")).toBeNull();
  });

  it("clearAllDailyCaches removes every key ever saved, across screens (A10)", () => {
    saveDailyCache("high5.lesson_today.v2", "A1", { a: 1 });
    saveDailyCache("high5.reading_today.v5", "B2", { b: 2 });
    saveDailyCache("high5.speaking_today.v5", "C1", { c: 3 });

    clearAllDailyCaches();

    expect(loadDailyCache("high5.lesson_today.v2", "A1")).toBeNull();
    expect(loadDailyCache("high5.reading_today.v5", "B2")).toBeNull();
    expect(loadDailyCache("high5.speaking_today.v5", "C1")).toBeNull();
    expect(localStorage.getItem("high5.lesson_today.v2")).toBeNull();
  });
});
