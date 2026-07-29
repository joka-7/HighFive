import { describe, it, expect } from "vitest";
import { buildMemorizationQuiz, MEMORIZE_QUESTIONS } from "./memorize";
import type { GemWord } from "../types";

function words(n: number): GemWord[] {
  return Array.from({ length: n }, (_, i) => ({
    word: `word${i}`,
    partOfSpeech: "noun",
    definition: `הגדרה ${i}`,
    example: `This is word${i}.`,
    translation: `מילה${i}`,
  }));
}

describe("buildMemorizationQuiz", () => {
  it("builds four-option questions whose correctIndex is the right answer", () => {
    const pool = words(20);
    const quiz = buildMemorizationQuiz(pool, 42);

    expect(quiz).toHaveLength(MEMORIZE_QUESTIONS);
    for (const q of quiz) {
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
      const answer = q.options[q.correctIndex];
      // The answer is always one side of the pair named in the question.
      const asked = q.question.match(/"([^"]+)"/)?.[1];
      const pair = pool.find((w) => w.word === asked || w.translation === asked);
      expect(pair).toBeDefined();
      expect([pair!.word, pair!.translation]).toContain(answer);
      expect(answer).not.toBe(asked);
      expect(q.questionHe).toBeTruthy();
    }
  });

  it("asks in both directions", () => {
    const quiz = buildMemorizationQuiz(words(20), 7);
    expect(quiz.some((q) => q.question.startsWith("What does"))).toBe(true);
    expect(quiz.some((q) => q.question.startsWith("Which word"))).toBe(true);
  });

  it("is deterministic for a given seed", () => {
    const pool = words(20);
    expect(buildMemorizationQuiz(pool, 3)).toEqual(buildMemorizationQuiz(pool, 3));
    expect(buildMemorizationQuiz(pool, 3)).not.toEqual(buildMemorizationQuiz(pool, 4));
  });

  it("returns nothing when there are too few words for four options", () => {
    expect(buildMemorizationQuiz(words(3), 1)).toEqual([]);
  });

  it("never runs out of questions with a short cycle list", () => {
    const quiz = buildMemorizationQuiz(words(4), 1);
    expect(quiz).toHaveLength(4);
    for (const q of quiz) expect(q.options).toHaveLength(4);
  });
});
