import { describe, expect, it } from "vitest";
import { DAYS_PER_YEAR, QUARTER_SIZES, dayIndex, pickByDay, resolveQuarter } from "./daily";

describe("daily", () => {
  it("dayIndex returns a non-negative integer", () => {
    expect(dayIndex()).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(dayIndex())).toBe(true);
  });

  it("pickByDay selects by modulo", () => {
    const items = ["a", "b", "c"];
    expect(pickByDay(items, 0)).toBe("a");
    expect(pickByDay(items, 1)).toBe("b");
    expect(pickByDay(items, 3)).toBe("a");
  });
});

describe("resolveQuarter", () => {
  it("quarter sizes sum to a full year", () => {
    expect(DAYS_PER_YEAR).toBe(365);
    expect(QUARTER_SIZES.reduce((a, b) => a + b, 0)).toBe(365);
  });

  it("day 0 is the first day of quarter 1", () => {
    expect(resolveQuarter(0)).toEqual({ quarter: 1, localDay: 0 });
  });

  it("resolves the boundary between quarter 1 and quarter 2", () => {
    expect(resolveQuarter(QUARTER_SIZES[0] - 1)).toEqual({ quarter: 1, localDay: QUARTER_SIZES[0] - 1 });
    expect(resolveQuarter(QUARTER_SIZES[0])).toEqual({ quarter: 2, localDay: 0 });
  });

  it("the last day of the year is the last day of quarter 4", () => {
    expect(resolveQuarter(DAYS_PER_YEAR - 1)).toEqual({
      quarter: 4,
      localDay: QUARTER_SIZES[3] - 1,
    });
  });

  it("wraps around after a full year, same as pickByDay's modulo", () => {
    expect(resolveQuarter(DAYS_PER_YEAR)).toEqual({ quarter: 1, localDay: 0 });
    expect(resolveQuarter(DAYS_PER_YEAR * 2 + 5)).toEqual(resolveQuarter(5));
  });

  it("every day of the year maps to exactly one in-range (quarter, localDay) pair", () => {
    for (let day = 0; day < DAYS_PER_YEAR; day++) {
      const { quarter, localDay } = resolveQuarter(day);
      expect(quarter).toBeGreaterThanOrEqual(1);
      expect(quarter).toBeLessThanOrEqual(4);
      expect(localDay).toBeGreaterThanOrEqual(0);
      expect(localDay).toBeLessThan(QUARTER_SIZES[quarter - 1]);
    }
  });
});
