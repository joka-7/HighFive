import type { GemQuestion, GemWord } from "../types";

// A review day (Friday/Saturday) turns the 25 words met on Sunday–Thursday
// into a mixed recall quiz: half English→Hebrew, half Hebrew→English, so the
// learner has to produce the word and not only recognise it.

export const MEMORIZE_QUESTIONS = 10;
/** A question needs one answer plus three distractors. */
const MIN_WORDS = 4;

/** Deterministic RNG (mulberry32) so the same day builds the same quiz. */
function rngFrom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(rng: () => number, arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Build the memorization quiz over `words`. Returns an empty list when there
 * aren't enough distinct words to make a fair 4-option question.
 */
export function buildMemorizationQuiz(words: GemWord[], seed: number): GemQuestion[] {
  const rng = rngFrom(seed);
  const usable = words.filter((w) => w.word && w.translation);
  if (usable.length < MIN_WORDS) return [];

  const asked = shuffle(rng, usable).slice(0, Math.min(MEMORIZE_QUESTIONS, usable.length));

  return asked.map((w, i) => {
    // Alternate the direction of recall question by question.
    const toHebrew = i % 2 === 0;
    const side = (x: GemWord) => (toHebrew ? x.translation : x.word);
    const correct = side(w);
    const distractors = shuffle(
      rng,
      usable.filter((o) => side(o) !== correct),
    ).slice(0, 3);
    const options = shuffle(rng, [correct, ...distractors.map(side)]);

    return {
      question: toHebrew ? `What does "${w.word}" mean?` : `Which word means "${w.translation}"?`,
      questionHe: toHebrew
        ? `מה הפירוש של "${w.word}"?`
        : `איזו מילה באנגלית פירושה "${w.translation}"?`,
      options,
      correctIndex: options.indexOf(correct),
      explanation: `"${w.word}" = ${w.translation}. ${w.definition}`,
    };
  });
}
