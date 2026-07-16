import type { GemQuestion, GemWord, Level } from "../types";
import { expandWordTokens, starterWords } from "../data/starter-words";
import { dayIndex } from "./daily";

/** Split English text into lowercase word tokens. */
export function tokenizeEnglish(text: string): string[] {
  return (text.match(/[a-z']+/gi) ?? []).map((w) => w.toLowerCase().replace(/^'|'$/g, ""));
}

/** Tokens in `text` that are not in `allowed`. */
export function findUnknownWords(text: string, allowed: Set<string>): string[] {
  const seen = new Set<string>();
  const unknown: string[] = [];
  for (const t of tokenizeEnglish(text)) {
    if (allowed.has(t) || seen.has(t)) continue;
    seen.add(t);
    unknown.push(t);
  }
  return unknown;
}

/** True when every token in each text is in `allowed`. */
export function contentUsesOnlyAllowedVocab(texts: string[], allowed: Set<string>): boolean {
  return texts.every((t) => findUnknownWords(t, allowed).length === 0);
}

/** Build allowed vocabulary: starter + learned + today's words. */
export function buildAllowedVocabulary(
  level: Level,
  learned: Iterable<string>,
  todaysWords: GemWord[] = [],
): Set<string> {
  const allowed = new Set(starterWords(level));
  for (const w of learned) {
    for (const t of expandWordTokens(w)) allowed.add(t);
  }
  for (const w of todaysWords) {
    for (const t of expandWordTokens(w.word)) allowed.add(t);
  }
  return allowed;
}

export interface VocabSafeItem {
  textsToCheck: string[];
}

/** Walk pool from startIndex; return first item passing the guard, else fewest unknown. */
export function pickVocabSafeItem<T extends VocabSafeItem>(
  items: T[],
  allowed: Set<string>,
  startIndex = dayIndex(),
): T {
  if (!items.length) throw new Error("pickVocabSafeItem: empty list");
  const n = items.length;
  let best: T | null = null;
  let bestUnknown = Infinity;
  for (let i = 0; i < n; i++) {
    const item = items[(startIndex + i) % n];
    const unknown = item.textsToCheck.flatMap((t) => findUnknownWords(t, allowed));
    if (unknown.length === 0) return item;
    if (unknown.length < bestUnknown) {
      bestUnknown = unknown.length;
      best = item;
    }
  }
  return best ?? items[startIndex % n];
}

export function lessonTexts(lesson: { explanation: string; questions: GemQuestion[] }): string[] {
  return [
    lesson.explanation,
    ...lesson.questions.flatMap((q) => [q.question, ...q.options]),
  ];
}

export function quizTexts(quiz: { questions: GemQuestion[] }): string[] {
  return quiz.questions.flatMap((q) => [q.question, ...q.options]);
}

export function readingTexts(reading: {
  text: string;
  questions: GemQuestion[];
  glossary: { example: string }[];
}): string[] {
  return [
    reading.text,
    ...reading.glossary.map((g) => g.example),
    ...reading.questions.flatMap((q) => [q.question, ...q.options]),
  ];
}

export function listeningTexts(listening: {
  transcript: string;
  questions: GemQuestion[];
}): string[] {
  return [listening.transcript, ...listening.questions.flatMap((q) => [q.question, ...q.options])];
}

export function speakingTexts(speaking: { prompts: { text: string }[] }): string[] {
  return speaking.prompts.map((p) => p.text);
}
