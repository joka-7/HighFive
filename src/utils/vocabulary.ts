import type { GemQuestion, GemWord, Level } from "../types";
import { expandWordTokens, starterWords } from "../data/starter-words";
import { dayIndex } from "./daily";

/** Split English text into lowercase word tokens. */
export function tokenizeEnglish(text: string): string[] {
  return (text.match(/[a-z']+/gi) ?? []).map((w) => w.toLowerCase().replace(/^'|'$/g, ""));
}

/**
 * Plausible dictionary forms of an inflected token. The vocabulary banks store
 * base forms only, so without this a learner who has met "street" is told that
 * "streets" is an unknown word — which used to make every hand-written passage
 * look far beyond its reader.
 */
function candidateStems(token: string): string[] {
  const out = new Set<string>();
  const add = (s: string) => {
    if (s.length >= 2) out.add(s);
  };
  if (token.endsWith("'s")) add(token.slice(0, -2));
  if (token.endsWith("ies")) add(`${token.slice(0, -3)}y`);
  if (token.endsWith("ied")) add(`${token.slice(0, -3)}y`);
  if (token.endsWith("es")) add(token.slice(0, -2));
  if (token.endsWith("s")) add(token.slice(0, -1));
  if (token.endsWith("ed")) {
    add(token.slice(0, -2));
    add(token.slice(0, -1));
  }
  if (token.endsWith("ing")) {
    add(token.slice(0, -3));
    add(`${token.slice(0, -3)}e`);
  }
  if (token.endsWith("ly")) add(token.slice(0, -2));
  if (token.endsWith("est")) {
    add(token.slice(0, -3));
    add(token.slice(0, -2));
  }
  if (token.endsWith("er")) {
    add(token.slice(0, -2));
    add(token.slice(0, -1));
  }
  // A doubled final consonant before the suffix: running → run, biggest → big.
  for (const s of [...out]) {
    if (/([bdfglmnprt])\1$/.test(s)) add(s.slice(0, -1));
  }
  return [...out];
}

/** True when `token` — or a base form of it — is in `allowed`. */
export function isKnownToken(token: string, allowed: Set<string>): boolean {
  if (allowed.has(token)) return true;
  return candidateStems(token).some((s) => allowed.has(s));
}

/** Tokens in `text` that are not in `allowed`. */
export function findUnknownWords(text: string, allowed: Set<string>): string[] {
  const seen = new Set<string>();
  const unknown: string[] = [];
  for (const t of tokenizeEnglish(text)) {
    if (seen.has(t) || isKnownToken(t, allowed)) continue;
    seen.add(t);
    unknown.push(t);
  }
  return unknown;
}

/** True when every token in each text is in `allowed`. */
export function contentUsesOnlyAllowedVocab(texts: string[], allowed: Set<string>): boolean {
  return texts.every((t) => findUnknownWords(t, allowed).length === 0);
}

/**
 * Build allowed vocabulary: starter + everything taught at or below the
 * learner's level + words they have personally met + today's words.
 *
 * `belowLevel` is the level-cumulative bank (see data/level-vocabulary.ts).
 * Without it a B2 learner counted "people" or "often" as unknown words, simply
 * because those live in the A1/A2 banks they never studied at B2 — which made
 * every hand-written passage unreachable.
 */
export function buildAllowedVocabulary(
  level: Level,
  learned: Iterable<string>,
  todaysWords: GemWord[] = [],
  belowLevel: Iterable<string> = [],
): Set<string> {
  const allowed = new Set(starterWords(level));
  for (const t of belowLevel) allowed.add(t);
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

/** Distinct unknown words across an item's texts. */
export function unknownWordsIn(item: VocabSafeItem, allowed: Set<string>): string[] {
  return [...new Set(item.textsToCheck.flatMap((t) => findUnknownWords(t, allowed)))];
}

/**
 * Like `pickVocabSafeItem`, but returns `null` when nothing in the pool is
 * within reach — used for the curated pools, where a passage the learner
 * can't read yet must not be shown at all (the progressive item is the
 * fallback) rather than shown as the "least bad" option.
 *
 * `maxUnknown` allows a few genuinely new words, because a hand-written
 * passage with a glossary is exactly where meeting one or two is the point.
 * At 0 this is a strict "every token already known" gate.
 */
export function findVocabSafeItem<T extends VocabSafeItem>(
  items: T[],
  allowed: Set<string>,
  startIndex = dayIndex(),
  maxUnknown = 0,
): T | null {
  const n = items.length;
  for (let i = 0; i < n; i++) {
    const item = items[((startIndex % n) + n + i) % n];
    if (unknownWordsIn(item, allowed).length <= maxUnknown) return item;
  }
  return null;
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
