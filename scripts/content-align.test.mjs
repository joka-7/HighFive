import { describe, expect, it } from "vitest";
import { alignToWeeks, themeScore } from "./content-align.mjs";

const textOf = (item) => item.text;

describe("content-align", () => {
  describe("themeScore", () => {
    it.each([
      { name: "words from the week", text: "The dog and the cat", week: ["dog", "cat"], score: 2 },
      { name: "a repeated word counted once", text: "dog dog dog", week: ["dog"], score: 1 },
      { name: "a plural of a week word", text: "I see two dogs", week: ["dog"], score: 1 },
      { name: "no week words", text: "I eat bread", week: ["dog", "cat"], score: 0 },
      { name: "case differences", text: "DOG", week: ["dog"], score: 1 },
    ])("scores $name", ({ text, week, score }) => {
      expect(themeScore(text, week)).toBe(score);
    });
  });

  describe("alignToWeeks", () => {
    const items = [
      { id: "food", text: "bread and milk" },
      { id: "pets", text: "my dog and my cat" },
      { id: "school", text: "a book at school" },
      { id: "pets2", text: "the dog sleeps" },
    ];

    it("puts each week's best-matching items first, one week after another", () => {
      const weeks = [["dog", "cat"], ["book", "school"], ["bread", "milk"]];
      expect(alignToWeeks(items, textOf, weeks, 1).map((i) => i.id)).toEqual(["pets", "school", "food", "pets2"]);
    });

    it("keeps the original order for items that match equally", () => {
      expect(alignToWeeks(items, textOf, [["zebra"]], 2).map((i) => i.id)).toEqual(["food", "pets", "school", "pets2"]);
    });

    it("keeps every item exactly once, appending those no week took", () => {
      const result = alignToWeeks(items, textOf, [["dog"]], 1);
      expect(result.map((i) => i.id).sort()).toEqual(["food", "pets", "pets2", "school"]);
    });

    it("returns the items unchanged when there are no weeks", () => {
      expect(alignToWeeks(items, textOf, [], 5)).toEqual(items);
    });

    it("stops cleanly when there are fewer items than the weeks ask for", () => {
      expect(alignToWeeks(items, textOf, [["dog"], ["book"], ["bread"], ["milk"], ["cat"]], 2)).toHaveLength(4);
    });
  });
});
