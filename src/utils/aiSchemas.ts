// Runtime shape checks for AI responses. A provider can return valid JSON
// that isn't the shape asked for (a renamed field, a string where an array
// belongs, `{}`); casting that to a Gem* type defers the crash to whichever
// screen first reads the missing field. These throw instead. The content
// generators in services/content.ts fall back to offline content on a throw;
// the dialogue reply and question translation have no offline copy, so their
// callers show an error. Same convention as utils/backup.ts.

import type {
  GemDialogueReply,
  GemLesson,
  GemQuestion,
  GemQuiz,
  GemSpeaking,
  GemWord,
  GemWordList,
} from "../types";

export interface GemQuestionTranslation {
  question: string;
  options: string[];
}

export class AiResponseShapeError extends Error {
  constructor(what: string) {
    super(`AI response: ${what}`);
    this.name = "AiResponseShapeError";
  }
}

type Obj = Record<string, unknown>;

function isObject(v: unknown): v is Obj {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every(isString);
}

function requireObject(v: unknown, what: string): Obj {
  if (!isObject(v)) throw new AiResponseShapeError(`${what} is not an object`);
  return v;
}

function requireStrings(o: Obj, keys: readonly string[], what: string): void {
  for (const k of keys) {
    if (!isString(o[k])) throw new AiResponseShapeError(`${what}.${k} is not a string`);
  }
}

function requireArray(v: unknown, what: string): unknown[] {
  if (!Array.isArray(v)) throw new AiResponseShapeError(`${what} is not an array`);
  return v;
}

function asWord(v: unknown, what: string): GemWord {
  const o = requireObject(v, what);
  requireStrings(o, ["word", "partOfSpeech", "definition", "example", "translation"], what);
  return o as unknown as GemWord;
}

function asQuestion(v: unknown, what: string): GemQuestion {
  const o = requireObject(v, what);
  requireStrings(o, ["question", "explanation"], what);
  if (!isStringArray(o.options) || o.options.length < 2) {
    throw new AiResponseShapeError(`${what}.options needs at least 2 strings`);
  }
  const { correctIndex } = o;
  if (
    typeof correctIndex !== "number" ||
    !Number.isInteger(correctIndex) ||
    correctIndex < 0 ||
    correctIndex >= o.options.length
  ) {
    throw new AiResponseShapeError(`${what}.correctIndex is not a valid option index`);
  }
  // The Hebrew fields are optional (GemQuestion), and QuizRunner already
  // copes with a missing translation. A malformed one (models often send
  // null, or drop an option) is dropped rather than discarding the question.
  const { questionHe, optionsHe, ...required } = o;
  return {
    ...(required as unknown as GemQuestion),
    ...(isString(questionHe) ? { questionHe } : {}),
    ...(isStringArray(optionsHe) && optionsHe.length === o.options.length ? { optionsHe } : {}),
  };
}

function asQuestions(v: unknown, what: string): GemQuestion[] {
  return requireArray(v, what).map((q, i) => asQuestion(q, `${what}[${i}]`));
}

export function asWordList(v: unknown): GemWordList {
  const o = requireObject(v, "word list");
  return { words: requireArray(o.words, "words").map((w, i) => asWord(w, `words[${i}]`)) };
}

export function asLesson(v: unknown): GemLesson {
  const o = requireObject(v, "lesson");
  requireStrings(o, ["title", "explanation"], "lesson");
  return {
    title: o.title as string,
    explanation: o.explanation as string,
    questions: asQuestions(o.questions, "lesson.questions"),
  };
}

export function asQuiz(v: unknown): GemQuiz {
  const o = requireObject(v, "quiz");
  return { questions: asQuestions(o.questions, "quiz.questions") };
}

export function asDialogueReply(v: unknown): GemDialogueReply {
  const o = requireObject(v, "dialogue reply");
  requireStrings(o, ["reply"], "dialogue reply");
  // Models variously send null, omit the field, or send "" for "no
  // corrections" — all mean the same thing to the screen.
  const { corrections } = o;
  if (corrections !== null && corrections !== undefined && !isString(corrections)) {
    throw new AiResponseShapeError("dialogue reply.corrections is not a string or null");
  }
  return { reply: o.reply as string, corrections: corrections ? corrections : null };
}

export function asSpeaking(v: unknown): GemSpeaking {
  const o = requireObject(v, "speaking");
  const prompts = requireArray(o.prompts, "speaking.prompts").map((p, i) => {
    const po = requireObject(p, `speaking.prompts[${i}]`);
    requireStrings(po, ["text", "translation"], `speaking.prompts[${i}]`);
    return { text: po.text as string, translation: po.translation as string };
  });
  return { prompts };
}

/** `optionCount` is how many options were sent, so a translation that
 * dropped or added one is rejected instead of misaligning the answers. */
export function asQuestionTranslation(v: unknown, optionCount: number): GemQuestionTranslation {
  const o = requireObject(v, "translation");
  requireStrings(o, ["question"], "translation");
  if (!isStringArray(o.options) || o.options.length !== optionCount) {
    throw new AiResponseShapeError(`translation.options must be ${optionCount} strings`);
  }
  return { question: o.question as string, options: o.options };
}
