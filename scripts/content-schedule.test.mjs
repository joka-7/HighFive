import { describe, expect, it } from "vitest";
import { wordIndicesForDay } from "./content-schedule.mjs";

const distinctDaySets = (bankSize, days, perDay = 5) =>
  new Set(Array.from({ length: days }, (_, d) => wordIndicesForDay(d, bankSize, perDay).join(","))).size;

describe("content-schedule", () => {
  describe("wordIndicesForDay", () => {
    it.each([
      { name: "walks the bank five words a day on the first pass", day: 1, bankSize: 12, indices: [5, 6, 7, 8, 9] },
      { name: "wraps around the end of the bank", day: 2, bankSize: 12, indices: [10, 11, 0, 1, 2] },
      { name: "starts each later pass one word further on when the bank divides by five", day: 2, bankSize: 10, indices: [1, 2, 3, 4, 5] },
    ])("$name", ({ day, bankSize, indices }) => {
      expect(wordIndicesForDay(day, bankSize, 5)).toEqual(indices);
    });

    it.each([
      { bankSize: 415, distinct: 365 },
      { bankSize: 245, distinct: 245 },
      { bankSize: 326, distinct: 326 },
    ])("gives a year $distinct distinct day sets from a $bankSize-word bank", ({ bankSize, distinct }) => {
      expect(distinctDaySets(bankSize, 365)).toBe(distinct);
    });

    it("fails loudly on a bank smaller than one day", () => {
      expect(() => wordIndicesForDay(0, 3, 5)).toThrow("at least 5 words");
    });
  });
});
