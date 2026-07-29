import { describe, it, expect } from "vitest";
import { generateReading, generateSpeaking } from "./content";
import curatedA1 from "../data/offline/a1.reading.curated.json";
import { tokenizeEnglish } from "../utils/vocabulary";
import type { GemReading } from "../types";

// The progressive (generated) reading is titled from the learner's words of
// the day; a curated passage has its own hand-written title.
const PROGRESSIVE_TITLE = "Today's Words (מילות היום)";

/** Everything a learner would need to have met to read `reading`. */
function vocabularyFor(reading: GemReading): string[] {
  const texts = [
    reading.text,
    ...reading.glossary.map((g) => g.example),
    ...reading.questions.flatMap((q) => [q.question, ...q.options]),
  ];
  return [...new Set(texts.flatMap(tokenizeEnglish))];
}

describe("offline content selection", () => {
  it("always returns a bilingual passage", async () => {
    for (const learned of [[], ["house", "water", "friend"]]) {
      const reading = await generateReading("A1", learned, 0);
      expect(reading.textHe).toBeTruthy();
      expect(reading.questions.length).toBeGreaterThan(0);
      expect(reading.questions.every((q) => q.questionHe)).toBe(true);
    }
  });

  it("serves curated prose at the higher levels, where the gate relaxes", async () => {
    const reading = await generateReading("C2", [], 0);
    expect(reading.title).not.toBe(PROGRESSIVE_TITLE);
    expect(reading.textHe).toBeTruthy();
  });

  it("serves a curated passage once the learner's vocabulary covers it", async () => {
    const target = (curatedA1 as GemReading[])[0];
    const reading = await generateReading("A1", vocabularyFor(target), 0);

    expect(reading.title).not.toBe(PROGRESSIVE_TITLE);
    expect(reading.title).toBe(target.title);
    expect(reading.textHe).toBeTruthy();
    expect(reading.questions.every((q) => q.questionHe)).toBe(true);
  });

  it("always returns a full round of speaking prompts", async () => {
    const easy = await generateSpeaking("A1", "daily life", [], 0);
    expect(easy.prompts).toHaveLength(4);

    const target = (curatedA1 as GemReading[])[0];
    const rich = await generateSpeaking("A1", "daily life", vocabularyFor(target), 0);
    expect(rich.prompts).toHaveLength(4);
  });
});
