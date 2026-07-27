import type { LearnedWordEntry, Level, SavedWord } from "../types";
import { LEVELS } from "../types";
import { starterWords } from "../data/starter-words";
import { isSrsMastered } from "./srs";

/** Content words (non-starter) learned while at this CEFR level. */
export function countLearnedAtLevel(
  learnedWords: Record<string, LearnedWordEntry>,
  level: Level,
): number {
  const starter = starterWords(level);
  return Object.values(learnedWords).filter(
    (e) => e.level === level && !starter.has(e.word.toLowerCase()),
  ).length;
}

/**
 * A saved word counts as mastered once it's either marked mastered manually
 * or has reached the top SRS box. Shared definition — Progress.tsx used to
 * count only `isMastered` while this file also counted SRS-mastered words,
 * so the same word could be "mastered" on one screen and not the other.
 */
export function countMastered(savedWords: SavedWord[]): number {
  return savedWords.filter((w) => w.isMastered || isSrsMastered(w.srsLevel)).length;
}

/** Saved words mastered (SRS top box or manual) at this level. */
export function countMasteredAtLevel(savedWords: SavedWord[], level: Level): number {
  return countMastered(savedWords.filter((w) => w.level === level));
}

export function nextLevel(level: Level): Level | null {
  const idx = LEVELS.indexOf(level);
  return idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null;
}

/** Words needed at the current level before auto-promotion. */
export const LEARNED_TO_ADVANCE: Record<Level, number> = {
  A1: 40,
  A2: 40,
  B1: 45,
  B2: 45,
  C1: 50,
  C2: 50,
};

/** Mastered saved words needed alongside learned count (soft gate). */
export const MASTERED_TO_ADVANCE: Record<Level, number> = {
  A1: 5,
  A2: 8,
  B1: 10,
  B2: 10,
  C1: 12,
  C2: 15,
};

/** Returns the next level when promotion criteria are met, else null. */
export function promotionTarget(
  current: Level,
  learnedWords: Record<string, LearnedWordEntry>,
  savedWords: SavedWord[],
): Level | null {
  const next = nextLevel(current);
  if (!next) return null;
  const learned = countLearnedAtLevel(learnedWords, current);
  const mastered = countMasteredAtLevel(savedWords, current);
  if (learned >= LEARNED_TO_ADVANCE[current] && mastered >= MASTERED_TO_ADVANCE[current]) {
    return next;
  }
  return null;
}

/** Saved words due for review that are at or below the learner's current level. */
export function isWordAtOrBelowLevel(wordLevel: Level, current: Level): boolean {
  return LEVELS.indexOf(wordLevel) <= LEVELS.indexOf(current);
}
