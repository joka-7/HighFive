// Level-consistency audit — one-off, not wired into npm scripts.
//
// Computes objective, cheap-to-compute signals per CEFR level so a human (or
// Claude) can target manual review at real outliers instead of reading all
// ~1800 words and ~650 passages/sentences blind:
//
//   - Flesch-Kincaid grade level per reading/listening passage (readability
//     proxy: sentence length + syllable density) — should rise A1 → C2.
//   - Word length / syllable count for vocabulary — a rough proxy for
//     lexical difficulty; genuinely mismatched words still need a human's
//     CEFR knowledge to catch (short ≠ easy: "ilk" vs "understand").
//   - Cross-level word duplicates — the same word issued as "new vocabulary"
//     at two levels wastes a slot and is a mechanical, zero-judgment bug.
//   - Grammar tense/structure markers per passage (passive voice, modals,
//     conditionals, relative clauses) as a coarse complexity signal.
//
// Prints a summary; run with --words or --passages to dump full per-level
// lists for direct reading.

import { bankContent, LEVELS } from "./content/rounds.mjs";

const { words, readings, listenings, speaking } = bankContent();

// --- syllable / readability heuristics ------------------------------------

function countSyllables(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  const groups = w.match(/[aeiouy]+/g) || [];
  let n = groups.length;
  if (w.endsWith("e") && !w.endsWith("le") && n > 1) n -= 1;
  return Math.max(1, n);
}

function tokenize(text) {
  return (text.match(/[A-Za-z']+/g) || []).filter(Boolean);
}

function sentences(text) {
  return (text.match(/[^.!?]+[.!?]+/g) || [text]).filter((s) => s.trim());
}

/** Flesch-Kincaid Grade Level. Rough CEFR mapping: A1≈0-2, A2≈2-4, B1≈4-6, B2≈6-8, C1≈8-11, C2≈11+. */
function fkGrade(text) {
  const words_ = tokenize(text);
  const sents = sentences(text);
  if (words_.length === 0 || sents.length === 0) return 0;
  const syll = words_.reduce((s, w) => s + countSyllables(w), 0);
  return 0.39 * (words_.length / sents.length) + 11.8 * (syll / words_.length) - 15.59;
}

function avg(arr) {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}

// Coarse grammar-complexity markers (counts per 100 words), case-insensitive.
const MARKERS = {
  passive: /\b(is|are|was|were|been|being|be)\s+\w+ed\b/gi,
  modal: /\b(might|could|should|would|must|ought to|may)\b/gi,
  conditional: /\b(if|unless|were to|had\s+\w+ed)\b/gi,
  relativeClause: /\b(which|who|whom|whose|that)\s+\w+/gi,
  connective: /\b(however|although|nevertheless|whereas|therefore|moreover|furthermore|despite|in spite of)\b/gi,
  perfect: /\b(have|has|had)\s+\w+ed\b/gi,
};

function markerRates(text) {
  const wordCount = tokenize(text).length || 1;
  const out = {};
  for (const [name, re] of Object.entries(MARKERS)) {
    out[name] = ((text.match(re) || []).length / wordCount) * 100;
  }
  return out;
}

// --- per-level passage stats ------------------------------------------------

console.log("=== Reading passages — readability ===");
console.log("level  n   avgFK  minFK  maxFK  avgSentLen  avgWordLen  passive  modal  cond  relClause  connective");
for (const level of LEVELS) {
  const items = readings[level];
  const fks = items.map((r) => fkGrade(r.text));
  const sentLens = items.flatMap((r) => sentences(r.text).map((s) => tokenize(s).length));
  const wordLens = items.flatMap((r) => tokenize(r.text).map((w) => w.length));
  const markers = items.map((r) => markerRates(r.text));
  const m = (k) => avg(markers.map((x) => x[k])).toFixed(2);
  console.log(
    level.padEnd(6),
    String(items.length).padEnd(3),
    avg(fks).toFixed(1).padEnd(6),
    Math.min(...fks).toFixed(1).padEnd(6),
    Math.max(...fks).toFixed(1).padEnd(6),
    avg(sentLens).toFixed(1).padEnd(11),
    avg(wordLens).toFixed(2).padEnd(11),
    m("passive").padEnd(8),
    m("modal").padEnd(6),
    m("conditional").padEnd(5),
    m("relativeClause").padEnd(10),
    m("connective"),
  );
}

console.log("\n=== Listening clips — readability ===");
console.log("level  n   avgFK  minFK  maxFK  avgSentLen  avgWordLen");
for (const level of LEVELS) {
  const items = listenings[level];
  const fks = items.map((l) => fkGrade(l.transcript));
  const sentLens = items.flatMap((l) => sentences(l.transcript).map((s) => tokenize(s).length));
  const wordLens = items.flatMap((l) => tokenize(l.transcript).map((w) => w.length));
  console.log(
    level.padEnd(6),
    String(items.length).padEnd(3),
    avg(fks).toFixed(1).padEnd(6),
    Math.min(...fks).toFixed(1).padEnd(6),
    Math.max(...fks).toFixed(1).padEnd(6),
    avg(sentLens).toFixed(1).padEnd(11),
    avg(wordLens).toFixed(2),
  );
}

console.log("\n=== Speaking sentences — length ===");
console.log("level  n    avgWords  minWords  maxWords  avgWordLen");
for (const level of LEVELS) {
  const items = speaking[level];
  const lens = items.map((s) => tokenize(s.text).length);
  const wordLens = items.flatMap((s) => tokenize(s.text).map((w) => w.length));
  console.log(
    level.padEnd(6),
    String(items.length).padEnd(4),
    avg(lens).toFixed(1).padEnd(9),
    String(Math.min(...lens)).padEnd(9),
    String(Math.max(...lens)).padEnd(9),
    avg(wordLens).toFixed(2),
  );
}

console.log("\n=== Vocabulary — word length / syllables ===");
console.log("level  n     avgLen  avgSyll  maxSyll  1-syllable%  4+syllable%");
for (const level of LEVELS) {
  const items = words[level];
  const lens = items.map((w) => w.word.length);
  const sylls = items.map((w) => countSyllables(w.word));
  const oneSyll = (sylls.filter((s) => s === 1).length / items.length) * 100;
  const fourPlus = (sylls.filter((s) => s >= 4).length / items.length) * 100;
  console.log(
    level.padEnd(6),
    String(items.length).padEnd(5),
    avg(lens).toFixed(2).padEnd(7),
    avg(sylls).toFixed(2).padEnd(8),
    String(Math.max(...sylls)).padEnd(8),
    oneSyll.toFixed(1).padEnd(12),
    fourPlus.toFixed(1),
  );
}

// --- cross-level word duplicates -------------------------------------------

console.log("\n=== Cross-level word duplicates (mechanical bug, not judgment) ===");
const seenAt = new Map(); // word -> level
let dupeCount = 0;
for (const level of LEVELS) {
  for (const w of words[level]) {
    const key = w.word.toLowerCase();
    if (seenAt.has(key)) {
      console.log(`  "${w.word}": ${seenAt.get(key)} and ${level}`);
      dupeCount++;
    } else {
      seenAt.set(key, level);
    }
  }
}
console.log(dupeCount ? `${dupeCount} cross-level duplicate(s).` : "None.");

// --- outlier flags: FK grade far outside the level's expected band --------

const EXPECTED_FK = { A1: [-1, 3], A2: [1, 5], B1: [3, 7], B2: [5, 9], C1: [7, 12], C2: [9, 16] };

console.log("\n=== Reading passages with FK grade outside expected band ===");
for (const level of LEVELS) {
  const [lo, hi] = EXPECTED_FK[level];
  readings[level].forEach((r, i) => {
    const g = fkGrade(r.text);
    if (g < lo || g > hi) {
      console.log(`  ${level} R${i + 1} "${r.title}": FK ${g.toFixed(1)} (expected ${lo}-${hi})`);
    }
  });
}

console.log("\n=== Listening clips with FK grade outside expected band ===");
for (const level of LEVELS) {
  const [lo, hi] = EXPECTED_FK[level];
  listenings[level].forEach((l, i) => {
    const g = fkGrade(l.transcript);
    if (g < lo || g > hi) {
      console.log(`  ${level} L${i + 1}: FK ${g.toFixed(1)} (expected ${lo}-${hi}) — "${l.transcript.slice(0, 70)}..."`);
    }
  });
}

// --- optional full dumps ----------------------------------------------------

if (process.argv.includes("--words")) {
  console.log("\n=== Full word lists (word only) ===");
  for (const level of LEVELS) {
    console.log(`\n-- ${level} (${words[level].length}) --`);
    console.log(words[level].map((w) => w.word).join(", "));
  }
}
