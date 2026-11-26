// Orders a pool of hand-written items so that the items for each course week
// match that week's words as closely as possible.
//
// The A1 course teaches 25 words a week (see a1-order.mjs) and shows one reading
// and one listening per course day, so day `d` reads `pool[d]`. The passages were
// written by topic, not by week; this reorders them so a week of vocabulary about
// the home is followed by passages about the home. Nothing is added or removed.

const tokens = (text) => (text.toLowerCase().match(/[a-z]+/g) ?? []).map((t) => t.replace(/(es|s)$/, ""));

/** How many distinct words of `weekWords` the item's text uses (plurals count). */
export function themeScore(text, weekWords) {
  const wanted = new Set([...weekWords].map((w) => w.toLowerCase().replace(/(es|s)$/, "")));
  return new Set(tokens(text).filter((t) => wanted.has(t))).size;
}

/**
 * `items` reordered week by week: each week takes the `perWeek` unused items
 * with the highest theme score (ties keep their original order); whatever is
 * left over follows in its original order.
 */
export function alignToWeeks(items, textOf, weekWords, perWeek) {
  const remaining = items.map((item, index) => ({ item, index, text: textOf(item) }));
  const ordered = [];
  for (const words of weekWords) {
    if (remaining.length === 0) break;
    const ranked = remaining
      .map((entry) => ({ entry, score: themeScore(entry.text, words) }))
      .sort((a, b) => b.score - a.score || a.entry.index - b.entry.index)
      .slice(0, perWeek)
      .map(({ entry }) => entry);
    ordered.push(...ranked);
    for (const entry of ranked) remaining.splice(remaining.indexOf(entry), 1);
  }
  return [...ordered, ...remaining].map(({ item }) => item);
}
