/** Calendar day index — same value drives vocabulary, lessons, and quizzes. */
export function dayIndex(now = Date.now()): number {
  return Math.floor(now / 86_400_000);
}

/** Pick the item aligned to today (or a given day index). */
export function pickByDay<T>(items: T[], day = dayIndex()): T {
  if (!items.length) throw new Error("pickByDay: empty list");
  return items[day % items.length];
}
