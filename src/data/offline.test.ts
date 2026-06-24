import { describe, it, expect } from "vitest";
import { loadOfflineContent } from "./offline";
import { LEVELS } from "../types";

describe("offline content library", () => {
  it("provides a full year (365) of vocabulary, lessons, and quizzes per level", async () => {
    for (const level of LEVELS) {
      const content = await loadOfflineContent(level);
      expect(content.vocabulary.length).toBe(365);
      expect(content.lessons.length).toBe(365);
      expect(content.quizzes.length).toBe(365);
    }
  });

  it("has valid question shapes (4 unique options, in-range correctIndex)", async () => {
    for (const level of LEVELS) {
      const content = await loadOfflineContent(level);
      const allQuestions = [
        ...content.lessons.flatMap((l) => l.questions),
        ...content.quizzes.flatMap((q) => q.questions),
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

  it("has complete word entries", async () => {
    for (const level of LEVELS) {
      const content = await loadOfflineContent(level);
      for (const list of content.vocabulary) {
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
