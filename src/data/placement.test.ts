import { describe, it, expect } from "vitest";
import { PLACEMENT_QUESTIONS, levelFromScore } from "./placement";

describe("placement test", () => {
  it("maps scores across all six CEFR levels", () => {
    expect(levelFromScore(0)).toBe("A1");
    expect(levelFromScore(1)).toBe("A1");
    expect(levelFromScore(2)).toBe("A2");
    expect(levelFromScore(3)).toBe("B1");
    expect(levelFromScore(4)).toBe("B2");
    expect(levelFromScore(5)).toBe("C1");
    expect(levelFromScore(6)).toBe("C2");
  });

  it("has well-formed questions with valid correct indexes", () => {
    expect(PLACEMENT_QUESTIONS.length).toBe(6);
    for (const q of PLACEMENT_QUESTIONS) {
      expect(q.options.length).toBe(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(q.options.length);
      expect(q.explanation.length).toBeGreaterThan(0);
    }
  });
});
