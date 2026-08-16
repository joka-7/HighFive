// One-off migration script (not part of the regular pipeline) — resolves
// the level-audit findings in docs/content/LEVEL-AUDIT.md:
//   1. 58 cross-level word duplicates
//   2. 15 C1-grade words relocated out of the B2 bank
// Removes lines by exact `word: "X"` match within the correct LEVEL: [ ]
// block (bank files are one word-object per line), and appends captured
// object literals into banks.mjs's C1 array for the relocations.
//
// Run once, then: npm run content:report && npm run content:import && npm run content

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const bank = (f) => join(here, "content", f);

// [file, level, word] — remove this line (redundant lower-value copy).
const REMOVALS = [
  // A1 ↔ A2 duplicates: keep A1 (basic vocab), remove from A2.
  ["banks.mjs", "A2", "money"], ["banks.mjs", "A2", "always"], ["banks.mjs", "A2", "cheap"],
  ["banks.mjs", "A2", "quiet"], ["banks.mjs", "A2", "afraid"], ["banks.mjs", "A2", "ticket"],
  ["wordbank-extra.mjs", "A2", "airport"], ["wordbank-extra.mjs", "A2", "beach"],
  ["wordbank-extra.mjs", "A2", "healthy"], ["wordbank-extra.mjs", "A2", "holiday"],
  ["wordbank-extra.mjs", "A2", "restaurant"], ["wordbank-extra.mjs", "A2", "river"],
  ["wordbank-extra.mjs", "A2", "station"], ["wordbank-extra.mjs", "A2", "surprised"],
  ["wordbank-extra.mjs", "A2", "worried"],
  ["wordbank-extra2.mjs", "A2", "free"], ["wordbank-extra2.mjs", "A2", "full"],
  ["wordbank-extra2.mjs", "A2", "heavy"], ["wordbank-extra2.mjs", "A2", "strong"],
  ["wordbank-extra2.mjs", "A2", "together"],
  ["wordbank-extra3.mjs", "A2", "angry"], ["wordbank-extra3.mjs", "A2", "bored"],
  ["wordbank-extra3.mjs", "A2", "carry"], ["wordbank-extra3.mjs", "A2", "drop"],
  ["wordbank-extra3.mjs", "A2", "excited"], ["wordbank-extra3.mjs", "A2", "favourite"],
  ["wordbank-extra3.mjs", "A2", "hungry"], ["wordbank-extra3.mjs", "A2", "lose"],
  ["wordbank-extra3.mjs", "A2", "sick"], ["wordbank-extra3.mjs", "A2", "thirsty"],
  ["wordbank-extra3.mjs", "A2", "throw"],
  ["wordbank-extra4.mjs", "A2", "funny"], ["wordbank-extra4.mjs", "A2", "proud"],
  ["wordbank-extra5.mjs", "A2", "cook"], ["wordbank-extra5.mjs", "A2", "laugh"],
  ["wordbank-extra6.mjs", "A2", "rest"], ["wordbank-extra6.mjs", "A2", "share"],
  ["wordbank-extra7.mjs", "A2", "hug"],
  ["wordbank-extra8.mjs", "A2", "book"], ["wordbank-extra8.mjs", "A2", "delicious"],
  ["wordbank-extra8.mjs", "A2", "sweet"],

  // A2 ↔ B1 duplicates: keep A2 (common functional verbs), remove from B1.
  ["banks.mjs", "B1", "achieve"], ["banks.mjs", "B1", "explain"], ["banks.mjs", "B1", "improve"],
  ["banks.mjs", "B1", "realize"], ["banks.mjs", "B1", "recommend"], ["banks.mjs", "B1", "suggest"],
  ["wordbank-extra.mjs", "B1", "apologize"], ["wordbank-extra.mjs", "B1", "complain"],
  ["wordbank-extra2.mjs", "B1", "compare"],
  ["wordbank-extra3.mjs", "B1", "notice"],
  ["wordbank-extra4.mjs", "B1", "celebrate"],
  ["wordbank-extra6.mjs", "B1", "decorate"],

  // A1 ↔ B1: keep A1, remove from B1.
  ["wordbank-extra6.mjs", "B1", "feed"],

  // B1 ↔ B2: keep B1, remove from B2.
  ["banks.mjs", "B2", "consequence"],

  // B2 ↔ C1: these two are genuinely C1-grade (LEVEL-AUDIT finding #1) —
  // keep C1's copy, remove B2's. No relocation needed, C1 already has them.
  ["wordbank-extra2.mjs", "B2", "diminish"], ["wordbank-extra2.mjs", "B2", "facilitate"],

  // C1 ↔ C2: keep C1, remove from C2.
  ["banks.mjs", "C2", "pragmatic"],
];

// [file, level, word] — remove from B2, then re-add (as-is) to C1 in
// banks.mjs. These are the 15 words LEVEL-AUDIT finding #1 names as
// C1-grade vocabulary that landed in the B2 bank.
const RELOCATIONS_B2_TO_C1 = [
  ["wordbank-extra8.mjs", "postulate"], ["wordbank-extra8.mjs", "refute"],
  ["wordbank-extra8.mjs", "stipulate"], ["wordbank-extra8.mjs", "supersede"],
  ["wordbank-extra8.mjs", "underpin"], ["wordbank-extra8.mjs", "substantiate"],
  ["wordbank-extra8.mjs", "optimize"], ["wordbank-extra8.mjs", "streamline"],
  ["wordbank-extra8.mjs", "rigorous"], ["wordbank-extra8.mjs", "rationale"],
  ["wordbank-extra8.mjs", "premise"], ["wordbank-extra8.mjs", "discourse"],
  ["wordbank-extra10.mjs", "catalyst"], ["wordbank-extra10.mjs", "envisage"],
  ["wordbank-extra10.mjs", "iterate"],
];

function removeWordLine(filePath, level, word, { capture = false } = {}) {
  const lines = readFileSync(filePath, "utf8").split("\n");
  let inLevel = false;
  let depth = 0; // bracket depth within the target level's array
  let captured = null;
  const out = [];
  for (const line of lines) {
    const levelHeader = new RegExp(`^\\s*${level}:\\s*\\[`);
    if (levelHeader.test(line)) inLevel = true;
    if (inLevel) {
      // A line at the same indentation closing with "]," ends this level's array.
      if (/^\s*\],?\s*$/.test(line) && depth === 0) inLevel = false;
    }
    const wordMatch = inLevel && new RegExp(`word:\\s*"${word}"[,\\s]`).test(line);
    if (wordMatch) {
      captured = line;
      continue; // drop this line
    }
    out.push(line);
  }
  if (!captured) throw new Error(`"${word}" not found in ${level}: [ ] of ${filePath}`);
  writeFileSync(filePath, out.join("\n"), "utf8");
  return captured;
}

function insertIntoBanksC1(objectLiteralLine) {
  const p = bank("banks.mjs");
  const lines = readFileSync(p, "utf8").split("\n");
  // Find the C1 array in WORD_BANKS and insert just before its closing "],".
  let inC1 = false;
  let insertAt = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*C1:\s*\[/.test(lines[i])) inC1 = true;
    if (inC1 && /^\s*\],?\s*$/.test(lines[i])) {
      insertAt = i;
      break;
    }
  }
  if (insertAt === -1) throw new Error("C1 array not found in banks.mjs WORD_BANKS");
  lines.splice(insertAt, 0, objectLiteralLine);
  writeFileSync(p, lines.join("\n"), "utf8");
}

let removed = 0;
for (const [file, level, word] of REMOVALS) {
  removeWordLine(bank(file), level, word);
  removed++;
}
console.log(`Removed ${removed} duplicate word entries.`);

let relocated = 0;
for (const [file, word] of RELOCATIONS_B2_TO_C1) {
  const line = removeWordLine(bank(file), "B2", word);
  insertIntoBanksC1(line);
  relocated++;
}
console.log(`Relocated ${relocated} words from B2 to C1.`);
