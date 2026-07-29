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
} from "./content";

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
