import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./ai", () => ({
  isAIReady: vi.fn(() => false),
  complete: vi.fn(),
}));

import { isAIReady, complete } from "./ai";
import {
  generateDailyLesson,
  generateDialogueReply,
  generateListening,
  generatePracticeQuiz,
  generateReading,
  generateSpeaking,
} from "./content";
import curatedA1 from "../data/offline/a1.reading.curated.json";
import { tokenizeEnglish } from "../utils/vocabulary";
import type { GemReading } from "../types";

beforeEach(() => {
  vi.mocked(isAIReady).mockReturnValue(false);
  vi.mocked(complete).mockReset();
});

describe("content service — offline fallbacks (no AI key)", () => {
  it("generateReading returns bundled content with Hebrew text", async () => {
    const reading = await generateReading("A1", []);
    expect(reading.text.length).toBeGreaterThan(10);
    expect(reading.textHe).toBeTruthy();
    expect(reading.questions.length).toBeGreaterThan(0);
    expect(complete).not.toHaveBeenCalled();
  });

  it("generateListening returns bundled content with Hebrew transcript", async () => {
    const clip = await generateListening("A1", []);
    expect(clip.transcript.length).toBeGreaterThan(5);
    expect(clip.transcriptHe).toBeTruthy();
    expect(clip.questions.length).toBeGreaterThan(0);
  });

  it("generateDailyLesson returns a lesson with questions from the offline pool", async () => {
    const lesson = await generateDailyLesson("A1", "Greetings", []);
    expect(lesson.title).toBeTruthy();
    expect(lesson.questions.length).toBeGreaterThanOrEqual(2);
  });

  it("generatePracticeQuiz returns offline questions when AI is off", async () => {
    const quiz = await generatePracticeQuiz("A1", "Mixed grammar", []);
    expect(quiz.questions.length).toBeGreaterThanOrEqual(3);
  });

  it("generateDialogueReply requires an AI key", async () => {
    await expect(
      generateDialogueReply("A1", "cafe", [], "Hello", []),
    ).rejects.toThrow(/requires an AI provider key/);
  });
});

describe("content service — AI failure falls back to offline", () => {
  it("generateDailyLesson falls back when complete() throws", async () => {
    vi.mocked(isAIReady).mockReturnValue(true);
    vi.mocked(complete).mockRejectedValue(new Error("network"));
    const lesson = await generateDailyLesson("A1", "Greetings", []);
    expect(lesson.questions.length).toBeGreaterThanOrEqual(2);
  });

  it("generatePracticeQuiz falls back when AI returns unusable JSON", async () => {
    vi.mocked(isAIReady).mockReturnValue(true);
    vi.mocked(complete).mockResolvedValue("not-json{{{");
    const quiz = await generatePracticeQuiz("A1", "Mixed grammar", []);
    expect(quiz.questions.length).toBeGreaterThanOrEqual(3);
  });
});

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

describe("offline content selection — curated vs. progressive", () => {
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
