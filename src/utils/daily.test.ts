import { describe, expect, it } from "vitest";
import { dayIndex, pickByDay } from "./daily";

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
