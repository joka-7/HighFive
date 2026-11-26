import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { buildAllowedVocabulary, listeningTexts, lessonTexts, readingTexts, unknownWordsIn } from "../src/utils/vocabulary";
import { CURATED_TOLERANCE } from "../src/services/content";
import { overTolerance } from "./check-curated.mjs";

const textsOf = (item) => [item.text];
const allowed = new Set(["i", "see", "a", "and", "cat", "dog"]);

describe("check-curated", () => {
  describe("overTolerance", () => {
    it.each([
      { name: "an item with only known words", texts: ["I see a cat"], tolerance: 0, over: [] },
      { name: "an item at the tolerance", texts: ["I see a zebra"], tolerance: 1, over: [] },
      { name: "an item one word over the tolerance", texts: ["I see a zebra and a lion"], tolerance: 1, over: [{ index: 0, unknown: ["zebra", "lion"] }] },
      { name: "a repeated unknown word counted once", texts: ["I see a zebra zebra"], tolerance: 1, over: [] },
      { name: "an inflected known word", texts: ["I see cats"], tolerance: 0, over: [] },
    ])("flags $name", ({ texts, tolerance, over }) => {
      const items = texts.map((text) => ({ text }));
      const result = overTolerance(items, textsOf, allowed, tolerance, unknownWordsIn);
      expect(result.map((r) => ({ index: r.index, unknown: r.unknown }))).toEqual(
        over.map((o) => ({ index: o.index, unknown: o.unknown })),
      );
    });

    it("reports the index of each offending item", () => {
      const items = [{ text: "I see a cat" }, { text: "I see a zebra" }, { text: "a dog" }];
      const result = overTolerance(items, textsOf, allowed, 0, unknownWordsIn);
      expect(result.map((r) => r.index)).toEqual([1]);
    });
  });

  describe("the generated A1 pools", () => {
    const read = (file) => JSON.parse(readFileSync(resolve("src/data/offline", file), "utf8"));
    const index = read("vocab-index.json");
    const allowedA1 = buildAllowedVocabulary("A1", [], [], index.A1);
    const tolerance = CURATED_TOLERANCE.A1;

    it.each([
      { kind: "reading", file: "a1.reading.curated.json", textsOf: readingTexts, max: tolerance.reading },
      { kind: "listening", file: "a1.listening.curated.json", textsOf: listeningTexts, max: tolerance.listening },
    ])("shows every $kind passage to a learner who knows the A1 cards", ({ file, textsOf, max }) => {
      const over = overTolerance(read(file), textsOf, allowedA1, max, unknownWordsIn);
      expect(over.map((r) => `#${r.index}: ${r.unknown.join(", ")}`)).toEqual([]);
    });

    it("gives every A1 reading a different title", () => {
      const titles = read("a1.reading.curated.json").map((r) => r.title);
      expect(titles.filter((t, i) => titles.indexOf(t) !== i)).toEqual([]);
    });
  });
});
