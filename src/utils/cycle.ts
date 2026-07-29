import { dayIndex } from "./daily";

// High5's learning rhythm is a calendar week: Sunday through Thursday are
// learning days — five new words each, 25 for the week — and Friday/Saturday
// are review days, where the week's 25 words come back for recall practice
// (see screens/Memorize.tsx) instead of new ones arriving.
//
// `weekday` reads the *local* day of the week while `dayIndex` counts UTC epoch
// days. Deriving `weekStart` from both keeps the day indices returned here
// compatible with the content loaders (`pickByDay`, `getTodaysWords`), and it's
// the same local/UTC mix `dateKeyFromTs` already lives with: a week boundary can
// land an hour off in a far-from-UTC timezone, which nothing here depends on.

/** New words met on each of the week's five learning days. */
export const WORDS_PER_DAY = 5;
/** Learning days per week — Sunday…Thursday. */
export const LEARNING_DAYS = 5;
/** Words carried into a review day (5 learning days × 5 words). */
export const WEEK_WORD_COUNT = LEARNING_DAYS * WORDS_PER_DAY;

/** Local day of the week: 0 = Sunday … 6 = Saturday. */
export function weekday(now = Date.now()): number {
  return new Date(now).getDay();
}

/** True on Friday and Saturday — no new words, the week's 25 come back. */
export function isReviewDay(now = Date.now()): boolean {
  return weekday(now) >= LEARNING_DAYS;
}

/** Position in the week's learning run, 1-based (1..5); null on a review day. */
export function learningDayNumber(now = Date.now()): number | null {
  const wd = weekday(now);
  return wd < LEARNING_DAYS ? wd + 1 : null;
}

/** Day index of this week's Sunday. */
export function weekStart(now = Date.now()): number {
  return dayIndex(now) - weekday(now);
}

/** The five learning-day indices of `now`'s week, oldest first (Sun→Thu). */
export function weekLearningDays(now = Date.now()): number[] {
  const start = weekStart(now);
  return Array.from({ length: LEARNING_DAYS }, (_, i) => start + i);
}
