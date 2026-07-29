import { LEVELS, type Level } from "../types";

// Every word the curriculum teaches at or below a level. A learner at B1 has,
// by definition, already passed through A1 and A2, so content that uses those
// words is fair game even if they never opened those flashcards. The index is
// a small tokens-only file (~30 KB for all six levels) written by
// scripts/generate-content.mjs, loaded on demand and memoised.

type VocabIndex = Record<Level, string[]>;

let indexPromise: Promise<VocabIndex> | null = null;
const cache = new Map<Level, Set<string>>();

function loadIndex(): Promise<VocabIndex> {
  if (!indexPromise) {
    indexPromise = import("./offline/vocab-index.json").then(
      (m) => m.default as VocabIndex,
    );
  }
  return indexPromise;
}

/** All bank words at or below `level`, lowercased. */
export async function levelVocabulary(level: Level): Promise<Set<string>> {
  const cached = cache.get(level);
  if (cached) return cached;

  let index: VocabIndex;
  try {
    index = await loadIndex();
  } catch {
    // Missing index (e.g. content not generated) must never break content
    // generation — the learner just falls back to the stricter allowed set.
    return new Set();
  }

  const upTo = LEVELS.slice(0, LEVELS.indexOf(level) + 1);
  const words = new Set(upTo.flatMap((l) => index[l] ?? []));
  cache.set(level, words);
  return words;
}
