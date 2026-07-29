import { dayIndex } from "./daily";

// High5's learning rhythm is a five-day cycle: on days 1–4 the learner meets
// five new words a day (20 in total) and practises the five operations; day 5
// adds no new words and is a **Memorization day** — the whole cycle's words
// come back for recall practice (see screens/Memorize.tsx).

export const CYCLE_DAYS = 5;
/** New words met on each of the cycle's four learning days. */
export const WORDS_PER_DAY = 5;
/** Words carried into a Memorization day (4 learning days × 5 words). */
export const CYCLE_WORD_COUNT = (CYCLE_DAYS - 1) * WORDS_PER_DAY;

/** Position of a day inside its five-day cycle, 1-based (1..5). */
export function cycleDay(day = dayIndex()): number {
  return (((day % CYCLE_DAYS) + CYCLE_DAYS) % CYCLE_DAYS) + 1;
}

/** True on the cycle's fifth day — no new words, memorization instead. */
export function isMemorizationDay(day = dayIndex()): boolean {
  return cycleDay(day) === CYCLE_DAYS;
}

/** Day index of the first day of `day`'s cycle. */
export function cycleStart(day = dayIndex()): number {
  return day - (cycleDay(day) - 1);
}

/** The four learning-day indices of `day`'s cycle, oldest first. */
export function cycleLearningDays(day = dayIndex()): number[] {
  const start = cycleStart(day);
  return Array.from({ length: CYCLE_DAYS - 1 }, (_, i) => start + i);
}
