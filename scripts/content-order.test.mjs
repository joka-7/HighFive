import { describe, expect, it } from "vitest";
import { applyCurriculumOrder } from "./content-order.mjs";

const bank = ["Dog", "cat", "house"].map((word) => ({ word }));
const order = (...words) => [{ theme: "t", words }];

describe("content-order", () => {
  describe("applyCurriculumOrder", () => {
    it("returns the bank words in the order given, ignoring case", () => {
      const result = applyCurriculumOrder(bank, [{ theme: "a", words: ["house"] }, { theme: "b", words: ["dog", "CAT"] }], "A1");
      expect(result.map((w) => w.word)).toEqual(["house", "Dog", "cat"]);
    });

    it.each([
      { name: "a word listed twice", words: ["dog", "cat", "house", "cat"], message: "listed twice: cat" },
      { name: "a word that is not in the bank", words: ["dog", "cat", "house", "bird"], message: "not in the bank: bird" },
      { name: "a bank word the order forgot", words: ["dog", "cat"], message: "missing from the order: house" },
    ])("throws for $name", ({ words, message }) => {
      expect(() => applyCurriculumOrder(bank, order(...words), "A1")).toThrow(message);
    });
  });
});
