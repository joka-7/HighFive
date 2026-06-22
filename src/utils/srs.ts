// Spaced-repetition scheduling (Leitner system). Pure functions, no React or
// storage dependency, so the interval logic is easy to unit-test.
//
// A word lives in a "box" (srsLevel). Remembering it promotes it to the next
// box and pushes the next review further out; forgetting it drops it back to
// box 0, due again tomorrow. Reaching the top box means the word is mastered.

// Days until the next review for each box.
export const INTERVALS_DAYS = [0, 1, 3, 7, 16, 35] as const;

export const MAX_SRS_LEVEL = INTERVALS_DAYS.length - 1;

const DAY_MS = 86_400_000;

export interface SrsState {
  srsLevel: number;
  nextReviewAt: number;
}

// Compute the next SRS box + review time given the current box and whether the
// learner remembered the word. `now` is injectable for deterministic tests.
export function scheduleNext(
  srsLevel: number,
  remembered: boolean,
  now: number = Date.now(),
): SrsState {
  const current = Number.isFinite(srsLevel) ? Math.max(0, Math.floor(srsLevel)) : 0;
  const nextLevel = remembered ? Math.min(current + 1, MAX_SRS_LEVEL) : 0;
  const days = INTERVALS_DAYS[nextLevel];
  return { srsLevel: nextLevel, nextReviewAt: now + days * DAY_MS };
}

// A word counts as mastered once it reaches the final box.
export function isSrsMastered(srsLevel: number | undefined): boolean {
  return (srsLevel ?? 0) >= MAX_SRS_LEVEL;
}

// True when a word is due for review (no schedule yet → due immediately).
export function isDue(nextReviewAt: number | undefined, now: number = Date.now()): boolean {
  return (nextReviewAt ?? 0) <= now;
}
