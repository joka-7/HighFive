import { describe, it, expect } from "vitest";
import { loadOfflineContent } from "./offline";
import { LEVELS } from "../types";

describe("offline content library", () => {
  it("provides non-empty vocabulary, lessons, and quizzes for every level", () => {
    for (const level of LEVELS) {
      const content = loadOfflineContent(level);
      expect(content.vocabulary.length).toBeGreaterThan(0);
      expect(content.lessons.length).toBeGreaterThan(0);
      expect(content.quizzes.length).toBeGreaterThan(0);
    }
  });

  it("has valid question shapes (4 options, in-range correctIndex)", () => {
    for (const level of LEVELS) {
      const content = loadOfflineContent(level);
      const allQuestions = [
        ...content.lessons.flatMap((l) => l.questions),
        ...content.quizzes.flatMap((q) => q.questions),
      ];
      expect(allQuestions.length).toBeGreaterThan(0);
      for (const q of allQuestions) {
        expect(q.options.length).toBe(4);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
      }
    }
  });

  it("has complete word entries", () => {
    for (const level of LEVELS) {
      for (const list of loadOfflineContent(level).vocabulary) {
        for (const w of list.words) {
          expect(w.word).toBeTruthy();
          expect(w.translation).toBeTruthy();
          expect(w.example).toBeTruthy();
        }
      }
    }
  });
});
