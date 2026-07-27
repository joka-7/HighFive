import { describe, expect, it } from "vitest";
import {
  countLearnedAtLevel,
  countMastered,
  isWordAtOrBelowLevel,
  nextLevel,
  promotionTarget,
} from "./levelProgress";
import type { LearnedWordEntry, SavedWord } from "../types";

describe("levelProgress", () => {
  it("nextLevel steps through CEFR bands", () => {
    expect(nextLevel("A1")).toBe("A2");
    expect(nextLevel("C2")).toBeNull();
  });

  it("isWordAtOrBelowLevel compares level index", () => {
    expect(isWordAtOrBelowLevel("A1", "B1")).toBe(true);
    expect(isWordAtOrBelowLevel("B2", "A2")).toBe(false);
  });

  it("promotionTarget returns A2 when thresholds met", () => {
    const learned: Record<string, LearnedWordEntry> = {};
    for (let i = 0; i < 40; i++) {
      learned[`word${i}`] = {
        word: `word${i}`,
        translation: "x",
        level: "A1",
        firstSeenAt: 1,
      };
    }
    const saved: SavedWord[] = Array.from({ length: 5 }, (_, i) => ({
      id: String(i),
      word: `w${i}`,
      partOfSpeech: "noun",
      definition: "d",
      example: "e",
      translation: "t",
      level: "A1",
      isMastered: true,
      savedAt: 1,
    }));
    expect(promotionTarget("A1", learned, saved)).toBe("A2");
  });

  it("countLearnedAtLevel excludes starter tokens", () => {
    const learned: Record<string, LearnedWordEntry> = {
      the: { word: "the", translation: "the", level: "A1", firstSeenAt: 1 },
      house: { word: "house", translation: "בית", level: "A1", firstSeenAt: 2 },
    };
    expect(countLearnedAtLevel(learned, "A1")).toBe(1);
  });

  it("countMastered counts manually-mastered and SRS-mastered words the same way (A9)", () => {
    const base: Omit<SavedWord, "id" | "isMastered" | "srsLevel"> = {
      word: "w",
      partOfSpeech: "noun",
      definition: "d",
      example: "e",
      translation: "t",
      level: "A1",
      savedAt: 1,
    };
    const saved: SavedWord[] = [
      { ...base, id: "1", isMastered: true }, // manually mastered
      { ...base, id: "2", isMastered: false, srsLevel: 5 }, // top SRS box
      { ...base, id: "3", isMastered: false, srsLevel: 1 }, // neither
    ];
    expect(countMastered(saved)).toBe(2);
  });
});
