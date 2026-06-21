import { describe, it, expect } from "vitest";
import { PLACEMENT_QUESTIONS, levelFromScore } from "./placement";

describe("placement test", () => {
  it("maps scores to levels (0-1 → A1, 2 → B1, 3 → C1)", () => {
    expect(levelFromScore(0)).toBe("A1");
    expect(levelFromScore(1)).toBe("A1");
    expect(levelFromScore(2)).toBe("B1");
    expect(levelFromScore(3)).toBe("C1");
  });

  it("has well-formed questions with valid correct indexes", () => {
    expect(PLACEMENT_QUESTIONS.length).toBe(3);
    for (const q of PLACEMENT_QUESTIONS) {
      expect(q.options.length).toBe(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(q.options.length);
      expect(q.explanation.length).toBeGreaterThan(0);
    }
  });
});
