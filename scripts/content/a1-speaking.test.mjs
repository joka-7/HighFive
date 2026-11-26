import { describe, it, expect } from "vitest";
import { A1_GRAMMAR } from "./a1-grammar.mjs";
import { A1_SPEAKING } from "./a1-speaking.mjs";

describe("A1_SPEAKING", () => {
  it("has one round for every grammar lesson", () => {
    expect(A1_SPEAKING.length).toBe(A1_GRAMMAR.length);
  });

  it.each(A1_SPEAKING.map((round, day) => [day, round]))("round %i is four bilingual sentences", (_day, round) => {
    const problems = [];
    if (round.prompts.length !== 4) problems.push(`${round.prompts.length} sentences`);
    for (const { text, translation } of round.prompts) {
      if (!text?.trim() || !/[א-ת]/.test(translation ?? "")) problems.push(`incomplete sentence: ${text}`);
    }
    const texts = round.prompts.map((p) => p.text);
    if (new Set(texts).size !== texts.length) problems.push("a sentence is repeated in the round");
    expect(problems).toEqual([]);
  });
});
