/** Calendar day index — same value drives vocabulary, lessons, and quizzes. */
export function dayIndex(now = Date.now()): number {
  return Math.floor(now / 86_400_000);
}

/** Pick the item aligned to today (or a given day index). */
export function pickByDay<T>(items: T[], day = dayIndex()): T {
  if (!items.length) throw new Error("pickByDay: empty list");
  return items[day % items.length];
}

// The bundled offline content (a year of daily lesson/reading/listening/
// speaking material per CEFR level) used to ship as one ~365-entry array per
// level/category — a learner downloaded the whole year just to use today's
// entry. It's now split into 4 quarter files instead (see
// scripts/generate-content.mjs), each roughly a season's worth, cutting what
// a level costs to load to about a quarter of its previous size. These sizes
// must exactly match the split scripts/generate-content.mjs writes.
export const QUARTER_SIZES = [92, 91, 91, 91] as const;
export const DAYS_PER_YEAR = QUARTER_SIZES.reduce((a, b) => a + b, 0); // 365

export interface QuarterLocation {
  /** 1-based quarter number (1-4), matching the `.q{n}.json` file suffix. */
  quarter: 1 | 2 | 3 | 4;
  /** Index within that quarter's array (0-based). */
  localDay: number;
}

/** Which quarter file (and index within it) a given day index falls on. */
export function resolveQuarter(day: number): QuarterLocation {
  const dayOfCycle = ((day % DAYS_PER_YEAR) + DAYS_PER_YEAR) % DAYS_PER_YEAR;
  let acc = 0;
  for (let i = 0; i < QUARTER_SIZES.length; i++) {
    if (dayOfCycle < acc + QUARTER_SIZES[i]) {
      return { quarter: (i + 1) as 1 | 2 | 3 | 4, localDay: dayOfCycle - acc };
    }
    acc += QUARTER_SIZES[i];
  }
  // Unreachable since QUARTER_SIZES sums to DAYS_PER_YEAR, but keeps this
  // function total rather than throwing on a future sizing mistake.
  const lastQuarter = QUARTER_SIZES.length as 1 | 2 | 3 | 4;
  return { quarter: lastQuarter, localDay: QUARTER_SIZES[QUARTER_SIZES.length - 1] - 1 };
}
