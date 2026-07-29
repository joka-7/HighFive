import { describe, expect, it } from "vitest";
import { starterWords } from "../data/starter-words";
import {
  buildAllowedVocabulary,
  contentUsesOnlyAllowedVocab,
  findUnknownWords,
  findVocabSafeItem,
  pickVocabSafeItem,
} from "./vocabulary";

describe("vocabulary utils", () => {
  it("starter words are always allowed", () => {
    const allowed = starterWords("A1");
    expect(findUnknownWords("I am at the park.", allowed)).toEqual(["park"]);
    expect(findUnknownWords("I go to you.", allowed)).toEqual([]);
  });

  it("findUnknownWords catches upper-level tokens", () => {
    const allowed = new Set(["i", "like", "cat"]);
    expect(findUnknownWords("I like my elephant.", allowed)).toContain("elephant");
  });

  it("buildAllowedVocabulary merges learned and today", () => {
    const allowed = buildAllowedVocabulary("A1", ["house"], [
      { word: "garden", partOfSpeech: "noun", definition: "x", example: "y", translation: "z" },
    ]);
    expect(allowed.has("house")).toBe(true);
    expect(allowed.has("garden")).toBe(true);
    expect(allowed.has("the")).toBe(true);
  });

  it("contentUsesOnlyAllowedVocab validates multiple strings", () => {
    const allowed = starterWords("A1");
    expect(contentUsesOnlyAllowedVocab(["I go to you.", "She is at the."], allowed)).toBe(true);
  });

  it("accepts inflected forms of a known word", () => {
    const allowed = new Set(["street", "carry", "run", "make", "quick"]);
    expect(findUnknownWords("streets carried running making quickly", allowed)).toEqual([]);
    expect(findUnknownWords("streetlight", allowed)).toEqual(["streetlight"]);
  });

  it("findVocabSafeItem returns null when nothing is within tolerance", () => {
    const allowed = starterWords("A1");
    const items = [{ textsToCheck: ["A zebra and an elephant."], id: 0 }];
    expect(findVocabSafeItem(items, allowed, 0)).toBeNull();
    // Two unknown words ("zebra", "elephant") — allowed once tolerance is 2.
    expect(findVocabSafeItem(items, allowed, 0, 1)).toBeNull();
    expect(findVocabSafeItem(items, allowed, 0, 2)?.id).toBe(0);
  });

  it("pickVocabSafeItem prefers day-indexed valid item", () => {
    const allowed = new Set([...starterWords("A1"), "happy"]);
    const items = [
      { textsToCheck: ["I see a zebra."], id: 0 },
      { textsToCheck: ["I am happy."], id: 1 },
    ];
    const picked = pickVocabSafeItem(items, allowed, 0);
    expect(picked.id).toBe(1);
  });
});
