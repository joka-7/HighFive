// Puts a level's word bank into a hand-made teaching order.
//
// `order` is a list of themes, each with the words it teaches. Every bank word
// must appear exactly once and every listed word must exist, otherwise the
// order and the bank have drifted apart and the generator should stop rather
// than silently teach a different set of words. Matching ignores case.

/** `words` re-sorted into the order of `order`; throws if the two disagree. */
export function applyCurriculumOrder(words, order, label) {
  const bank = new Map();
  for (const w of words) bank.set(w.word.toLowerCase(), w);

  const listed = order.flatMap((theme) => theme.words);
  const seen = new Set();
  const duplicates = [];
  const unknown = [];
  for (const name of listed) {
    const key = name.toLowerCase();
    if (seen.has(key)) duplicates.push(name);
    seen.add(key);
    if (!bank.has(key)) unknown.push(name);
  }
  const missing = [...bank.keys()].filter((key) => !seen.has(key));

  const problems = [
    duplicates.length ? `listed twice: ${duplicates.join(", ")}` : "",
    unknown.length ? `not in the bank: ${unknown.join(", ")}` : "",
    missing.length ? `missing from the order: ${missing.join(", ")}` : "",
  ].filter(Boolean);
  if (problems.length) throw new Error(`${label} word order does not match its bank — ${problems.join("; ")}`);

  return listed.map((name) => bank.get(name.toLowerCase()));
}
