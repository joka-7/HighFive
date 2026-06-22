// Pronunciation/speaking scoring. Pure functions so the matching logic can be
// unit-tested without a real speech recognizer. We compare the words the
// recognizer heard against the target sentence (order-insensitive), which is
// forgiving enough for learners while still rewarding accuracy.

export function normalizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, " ") // drop punctuation, keep letters/digits/'
    .split(/\s+/)
    .filter(Boolean);
}

export interface SpeakingScore {
  score: number; // 0..100
  missed: string[]; // target words not detected in the spoken text
}

// Score `spoken` against `target`: the percentage of target words that were
// recognized, plus the list of words that were missed.
export function scoreSpeaking(target: string, spoken: string): SpeakingScore {
  const targetWords = normalizeWords(target);
  if (targetWords.length === 0) return { score: 0, missed: [] };

  const heard = new Map<string, number>();
  for (const w of normalizeWords(spoken)) {
    heard.set(w, (heard.get(w) ?? 0) + 1);
  }

  const missed: string[] = [];
  let matched = 0;
  for (const w of targetWords) {
    const count = heard.get(w) ?? 0;
    if (count > 0) {
      matched += 1;
      heard.set(w, count - 1); // consume so duplicates must be matched in kind
    } else {
      missed.push(w);
    }
  }

  return { score: Math.round((matched / targetWords.length) * 100), missed };
}
