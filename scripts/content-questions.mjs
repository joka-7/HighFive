// Answer order for hand-written multiple-choice questions, for the content
// generator. Authors almost always put the right answer second (756 of 800
// hand-written passage questions had it at option B), so a learner could
// guess. Each question's options are reordered by a seeded permutation, with
// the Hebrew options and the answer key moved along with them.

/** `q` with its options in a new order from `random` (a seeded () => [0, 1) source). */
export function shuffleOptions(q, random) {
  const order = q.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const reordered = { ...q, options: order.map((i) => q.options[i]), correctIndex: order.indexOf(q.correctIndex) };
  if (Array.isArray(q.optionsHe)) reordered.optionsHe = order.map((i) => q.optionsHe[i]);
  return reordered;
}
