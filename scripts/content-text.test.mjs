import { describe, expect, it } from "vitest";
import { blankWordInText, wordFormInText } from "./content-text.mjs";

describe("content-text", () => {
  describe("wordFormInText", () => {
    it.each([
      { name: "a single word", text: "My house is big.", word: "house", form: "house" },
      { name: "a regular inflection", text: "The baby cried.", word: "cry", form: "cried" },
      { name: "a past tense of a word ending in e", text: "The balloon exploded.", word: "explode", form: "exploded" },
      { name: "a phrase as written", text: "I wake up at seven.", word: "wake up", form: "wake up" },
      { name: "a phrase with an inflected first word", text: "They are still waiting for the bus.", word: "wait for", form: "waiting for" },
      { name: "a phrase starting a sentence", text: "Strangely enough, it was open.", word: "strangely enough", form: "Strangely enough" },
      { name: "a contraction in a phrase", text: "I can't stand loud music.", word: "can't stand", form: "can't stand" },
      { name: "a hyphenated word", text: "Keep it up-to-date.", word: "up-to-date", form: "up-to-date" },
      { name: "nothing when the phrase is split", text: "Show me around.", word: "show around", form: null },
      { name: "nothing inside a longer word", text: "The seat is upholstered.", word: "up", form: null },
      { name: "nothing for an empty text", text: "", word: "house", form: null },
    ])("finds $name", ({ text, word, form }) => {
      expect(wordFormInText(text, word)).toBe(form);
    });
  });

  describe("blankWordInText", () => {
    it.each([
      { text: "My house is big.", word: "house", blanked: "My ___ is big." },
      { text: "They are still waiting for the bus.", word: "wait for", blanked: "They are still ___ the bus." },
      { text: "No match here.", word: "house", blanked: "No match here." },
    ])("blanks $word in “$text”", ({ text, word, blanked }) => {
      expect(blankWordInText(text, word)).toBe(blanked);
    });
  });
});
