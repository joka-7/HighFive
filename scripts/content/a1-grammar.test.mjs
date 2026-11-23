import { describe, it, expect } from "vitest";
import { A1_GRAMMAR, A1_GRAMMAR_WEEKS } from "./a1-grammar.mjs";

describe("A1_GRAMMAR", () => {
  it("has whole weeks of five lessons, within the 35-week plan", () => {
    expect([A1_GRAMMAR.length % 5, A1_GRAMMAR.length <= A1_GRAMMAR_WEEKS.length * 5]).toEqual([0, true]);
  });

  it.each(A1_GRAMMAR.map((l, day) => [day, l]))("lesson %i is a well-formed 3-question set", (_day, l) => {
    const problems = [];
    if (!l.title || !l.explanation) problems.push("missing title or explanation");
    if (l.questions.length !== 3) problems.push(`${l.questions.length} questions`);
    if (new Set(l.questions.map((q) => q.question)).size !== l.questions.length) problems.push("repeated question");
    for (const q of l.questions) {
      if (q.options.length !== 4 || new Set(q.options).size !== 4) problems.push(`options of "${q.question}"`);
      if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex > 3) problems.push(`answer of "${q.question}"`);
      if (!q.explanation || !q.questionHe || q.optionsHe?.length !== 4) problems.push(`Hebrew of "${q.question}"`);
    }
    expect(problems).toEqual([]);
  });

  it("gives every lesson a different title", () => {
    const titles = A1_GRAMMAR.map((l) => l.title);
    expect(titles.length - new Set(titles).size).toBe(0);
  });

  it("numbers the weeks 1..N in order", () => {
    expect(A1_GRAMMAR_WEEKS.map((w) => w.week)).toEqual(A1_GRAMMAR_WEEKS.map((_, i) => i + 1));
  });
});
