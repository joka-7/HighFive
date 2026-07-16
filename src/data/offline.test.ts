import { beforeAll, describe, it, expect } from "vitest";
import { loadOfflineContent } from "./offline";
import { LEVELS } from "../types";
import type { Level, OfflineLevelContent } from "../types";

// Loading the full generated corpus (six ~1 MB level bundles) through Vite's
// JSON transform takes several seconds, which is more than Vitest's 5s default
// per-test timeout — especially under load from the rest of the suite. Warm all
// levels once here, with a generous timeout, so the tests below read from the
// memoized cache and stay fast and deterministic.
const content: Record<Level, OfflineLevelContent> = {} as Record<Level, OfflineLevelContent>;

beforeAll(async () => {
  await Promise.all(
    LEVELS.map(async (level) => {
      content[level] = await loadOfflineContent(level);
    }),
  );
}, 60_000);

describe("offline content library", () => {
  it("provides a full year (365) of vocabulary, lessons, and quizzes per level", () => {
    for (const level of LEVELS) {
      expect(content[level].vocabulary.length).toBe(365);
      expect(content[level].lessons.length).toBe(365);
      expect(content[level].quizzes.length).toBe(365);
    }
  });

  it("has valid question shapes (4 unique options, in-range correctIndex)", () => {
    for (const level of LEVELS) {
      const allQuestions = [
        ...content[level].lessons.flatMap((l) => l.questions),
        ...content[level].quizzes.flatMap((q) => q.questions),
      ];
      expect(allQuestions.length).toBeGreaterThan(0);
      for (const q of allQuestions) {
        expect(q.options.length).toBe(4);
        expect(new Set(q.options).size).toBe(4);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
        expect(q.explanation).toBeTruthy();
      }
    }
  });

  it("has no duplicate question within a single lesson or quiz", () => {
    for (const level of LEVELS) {
      const sets = [...content[level].lessons, ...content[level].quizzes];
      for (const set of sets) {
        const texts = set.questions.map((q) => q.question);
        expect(new Set(texts).size).toBe(texts.length);
      }
    }
  });

  it("has complete word entries", () => {
    for (const level of LEVELS) {
      for (const list of content[level].vocabulary) {
        expect(list.words.length).toBe(5);
        for (const w of list.words) {
          expect(w.word).toBeTruthy();
          expect(w.translation).toBeTruthy();
          expect(w.example).toBeTruthy();
        }
      }
    }
  });
});
