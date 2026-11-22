// Would the app actually show each hand-written reading / listening?
//
//   npm run content && node scripts/check-curated.mjs A1 [--from 36]
//
// Applies the app's own rule (CURATED_TOLERANCE + unknownWordsIn, loaded from
// src/ through Vite so it cannot drift) to the generated curated pools, for a
// learner who has studied the level's word cards but nothing else. Exits 1
// when an item is over the tolerance, i.e. when the app would skip it and
// fall back to generated text. `--from N` only checks items from index N on.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OFFLINE = join(ROOT, "src/data/offline");

/** Items over their tolerance: [{ index, unknown }]. Pure; the app's rule is injected. */
export function overTolerance(items, textsOf, allowed, tolerance, unknownWordsIn) {
  return items
    .map((item, index) => ({ index, unknown: unknownWordsIn({ textsToCheck: textsOf(item) }, allowed) }))
    .filter((r) => r.unknown.length > tolerance);
}

async function main() {
  const [level = "A1", ...rest] = process.argv.slice(2);
  const from = rest.includes("--from") ? Number(rest[rest.indexOf("--from") + 1]) : 0;
  const vite = await createServer({ root: ROOT, server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
  try {
    const vocab = await vite.ssrLoadModule("/src/utils/vocabulary.ts");
    const content = await vite.ssrLoadModule("/src/services/content.ts");
    const index = JSON.parse(readFileSync(join(OFFLINE, "vocab-index.json"), "utf8"));
    const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
    const below = levels.slice(0, levels.indexOf(level) + 1).flatMap((l) => index[l] ?? []);
    const allowed = vocab.buildAllowedVocabulary(level, [], [], below);
    const tol = content.CURATED_TOLERANCE[level];
    let bad = 0;
    for (const [kind, textsOf, max] of [
      ["reading", vocab.readingTexts, tol.reading],
      ["listening", vocab.listeningTexts, tol.listening],
    ]) {
      const items = JSON.parse(readFileSync(join(OFFLINE, `${level.toLowerCase()}.${kind}.curated.json`), "utf8"));
      const over = overTolerance(items.slice(from), textsOf, allowed, max, vocab.unknownWordsIn)
        .map((r) => ({ ...r, index: r.index + from }));
      for (const r of over) console.log(`${level} ${kind} #${r.index} (max ${max}): ${r.unknown.join(", ")}`);
      bad += over.length;
      console.log(`${level} ${kind}: ${items.length - from - over.length}/${items.length - from} shown`);
    }
    process.exitCode = bad ? 1 : 0;
  } finally {
    await vite.close();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
