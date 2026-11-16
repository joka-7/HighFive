import { describe, expect, it } from "vitest";
import { shuffleOptions } from "./content-questions.mjs";

/** A deterministic stand-in for the generator's seeded RNG. */
const sequence = (...values) => {
  let i = 0;
  return () => values[i++ % values.length];
};

const question = {
  question: "What did the writer try?",
  options: ["Writing a book", "Reading ten pages a day", "A reading class", "Speed reading"],
  optionsHe: ["לכתוב ספר", "לקרוא עשרה עמודים ביום", "שיעור קריאה", "קריאה מהירה"],
  correctIndex: 1,
  explanation: "'reading just ten pages a day'.",
};

describe("content-questions", () => {
  describe("shuffleOptions", () => {
    it.each([
      { name: "moves the answer key with the right answer", random: sequence(0.1, 0.1, 0.1) },
      { name: "keeps the answer when the order happens not to change", random: sequence(0.99, 0.99, 0.99) },
      { name: "works for any draw", random: sequence(0.5, 0.2, 0.7) },
    ])("$name", ({ random }) => {
      const shuffled = shuffleOptions(question, random);

      expect([
        shuffled.options[shuffled.correctIndex],
        shuffled.optionsHe?.[shuffled.correctIndex],
        [...shuffled.options].sort(),
        shuffled.options.map((o) => question.optionsHe[question.options.indexOf(o)]),
      ]).toEqual(["Reading ten pages a day", "לקרוא עשרה עמודים ביום", [...question.options].sort(), shuffled.optionsHe]);
    });

    it("spreads the right answer across positions", () => {
      let seed = 1;
      const random = () => ((seed = (seed * 48271) % 2147483647) / 2147483647);
      const positions = new Set(Array.from({ length: 40 }, () => shuffleOptions(question, random).correctIndex));

      expect(positions.size).toBe(4);
    });

    it("leaves a question without Hebrew options without them", () => {
      const { optionsHe, ...english } = question;

      expect("optionsHe" in shuffleOptions(english, sequence(0.3))).toBe(false);
    });
  });
});
