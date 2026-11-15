// Which bank words a day teaches, for the content generator.
//
// Days walk the bank `perDay` words at a time, wrapping around. When the bank
// size divides by `perDay`, plain wrapping repeats the same day sets after
// bankSize / perDay days (a 415-word bank gave only 83 distinct days, and
// every reading and quiz built from them repeated too), so each further pass
// then starts one word later. Either way a year gets min(365, bankSize)
// distinct days: a run of consecutive words can start at only bankSize places.

/** Indices into a bank of `bankSize` words for day `day` (0-based). */
export function wordIndicesForDay(day, bankSize, perDay) {
  if (!Number.isInteger(bankSize) || bankSize < perDay) throw new Error(`a bank needs at least ${perDay} words, got ${bankSize}`);
  const firstSlot = day * perDay;
  const pass = bankSize % perDay === 0 ? Math.floor(firstSlot / bankSize) : 0;
  const start = (firstSlot + pass) % bankSize;
  return Array.from({ length: perDay }, (_, j) => (start + j) % bankSize);
}
