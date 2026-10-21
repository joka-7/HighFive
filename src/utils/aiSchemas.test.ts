import { describe, it, expect } from "vitest";
import {
  AiResponseShapeError,
  asDialogueReply,
  asLesson,
  asQuestionTranslation,
  asQuiz,
  asSpeaking,
  asWordList,
} from "./aiSchemas";

const question = {
  question: "She ___ happy.",
  options: ["is", "are"],
  correctIndex: 0,
  explanation: "הסבר",
};
const word = { word: "cat", partOfSpeech: "noun", definition: "חתול", example: "A cat.", translation: "חתול" };

describe("asWordList", () => {
  it("accepts a valid list", () => {
    expect(asWordList({ words: [word] }).words).toEqual([word]);
  });
  it.each([
    { name: "not an object", input: "words" },
    { name: "words missing", input: {} },
    { name: "a word missing its translation", input: { words: [{ ...word, translation: undefined }] } },
  ])("rejects $name", ({ input }) => {
    expect(() => asWordList(input)).toThrow(AiResponseShapeError);
  });
});

describe("asLesson", () => {
  it("accepts a valid lesson", () => {
    const lesson = { title: "be", explanation: "הסבר", questions: [question] };
    expect(asLesson(lesson)).toEqual(lesson);
  });
  it.each([
    { name: "questions as a string", input: { title: "t", explanation: "e", questions: "q" } },
    { name: "correctIndex out of range", input: { title: "t", explanation: "e", questions: [{ ...question, correctIndex: 2 }] } },
    { name: "fractional correctIndex", input: { title: "t", explanation: "e", questions: [{ ...question, correctIndex: 0.5 }] } },
    { name: "a single option", input: { title: "t", explanation: "e", questions: [{ ...question, options: ["is"] }] } },
  ])("rejects $name", ({ input }) => {
    expect(() => asLesson(input)).toThrow(AiResponseShapeError);
  });
});

describe("asLesson — optional Hebrew fields", () => {
  it.each([
    { name: "null questionHe", extra: { questionHe: null } },
    { name: "optionsHe of a different length", extra: { optionsHe: ["הוא"] } },
    { name: "non-array optionsHe", extra: { optionsHe: "הוא" } },
  ])("keeps the question but drops $name", ({ extra }) => {
    const lesson = asLesson({ title: "t", explanation: "e", questions: [{ ...question, ...extra }] });
    expect(lesson.questions[0]).toEqual(question);
  });
  it("keeps valid Hebrew fields", () => {
    const q = { ...question, questionHe: "היא ___ שמחה.", optionsHe: ["is", "are"] };
    expect(asLesson({ title: "t", explanation: "e", questions: [q] }).questions[0]).toEqual(q);
  });
});

describe("asQuiz", () => {
  it("accepts a valid quiz", () => {
    expect(asQuiz({ questions: [question] }).questions).toHaveLength(1);
  });
  it("rejects an empty object", () => {
    expect(() => asQuiz({})).toThrow(AiResponseShapeError);
  });
});

describe("asDialogueReply", () => {
  it.each([
    { name: "null corrections", input: { reply: "Hi!", corrections: null }, expected: null },
    { name: "missing corrections", input: { reply: "Hi!" }, expected: null },
    { name: "empty-string corrections", input: { reply: "Hi!", corrections: "" }, expected: null },
    { name: "real corrections", input: { reply: "Hi!", corrections: "תיקון" }, expected: "תיקון" },
  ])("normalizes $name", ({ input, expected }) => {
    expect(asDialogueReply(input)).toEqual({ reply: "Hi!", corrections: expected });
  });
  it.each([
    { name: "missing reply", input: { corrections: null } },
    { name: "numeric corrections", input: { reply: "Hi!", corrections: 3 } },
  ])("rejects $name", ({ input }) => {
    expect(() => asDialogueReply(input)).toThrow(AiResponseShapeError);
  });
});

describe("asSpeaking", () => {
  it("accepts valid prompts", () => {
    const input = { prompts: [{ text: "Hello.", translation: "שלום." }] };
    expect(asSpeaking(input)).toEqual(input);
  });
  it("rejects a prompt without a translation", () => {
    expect(() => asSpeaking({ prompts: [{ text: "Hello." }] })).toThrow(AiResponseShapeError);
  });
});

describe("asQuestionTranslation", () => {
  it("accepts a translation with the same number of options", () => {
    expect(asQuestionTranslation({ question: "ש", options: ["א", "ב"] }, 2).options).toEqual(["א", "ב"]);
  });
  it("rejects a translation that dropped an option", () => {
    expect(() => asQuestionTranslation({ question: "ש", options: ["א"] }, 2)).toThrow(AiResponseShapeError);
  });
});
