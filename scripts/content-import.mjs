// Markdown → content banks — `npm run content:import`.
//
// The reverse of content-report.mjs: reads docs/content/{A1..C2}.md and writes
// scripts/content/from-markdown.generated.mjs, which generate-content.mjs
// consumes. That makes the Markdown the thing you edit — add a word, fix a
// translation, rewrite a passage there, run this, and the change reaches the
// app.
//
// The safety property is round-trip equality: `--check` re-reads the Markdown
// and compares it, item by item and field by field, against the hand-written
// banks it was exported from. If those differ in any way the export/import pair
// is lossy and must not be trusted, so --check exits non-zero and prints the
// first differences instead of writing anything.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const docs = join(root, "docs", "content");

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

// --- markdown primitives -------------------------------------------------

const unesc = (s) => s.replace(/\\\|/g, "|").trim();

/** Rows of the table starting at `i` (a header line), as cell arrays. */
function readTable(lines, i) {
  const rows = [];
  let n = i + 2; // skip header + separator
  while (n < lines.length && lines[n].startsWith("|")) {
    rows.push(
      lines[n]
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split(/(?<!\\)\|/)
        .map(unesc),
    );
    n++;
  }
  return { rows, next: n };
}

/** The blockquote body starting at `i`, with the `> ` prefixes removed. */
function readQuote(lines, i) {
  const body = [];
  let n = i;
  while (n < lines.length && lines[n].startsWith(">")) {
    body.push(lines[n].replace(/^>\s?/, ""));
    n++;
  }
  return { text: body.join("\n").trim(), next: n };
}

/**
 * One question block: the **Qn.** line, an optional Hebrew line, the option
 * table, and the italic explanation.
 */
function readQuestion(lines, i) {
  const q = {};
  q.question = unesc(lines[i].replace(/^\*\*Q\d+\.\*\*\s*/, ""));
  let n = i + 1;
  if (/^\*\*Q\d+ \(He\)\.\*\*/.test(lines[n] ?? "")) {
    q.questionHe = unesc(lines[n].replace(/^\*\*Q\d+ \(He\)\.\*\*\s*/, ""));
    n++;
  }
  while (n < lines.length && !lines[n].startsWith("|")) n++;
  const { rows, next } = readTable(lines, n);
  q.options = rows.map((r) => r[1]);
  const he = rows.map((r) => r[2]);
  if (he.some(Boolean)) q.optionsHe = he;
  q.correctIndex = rows.findIndex((r) => r[0] === "✓");
  n = next;
  while (n < lines.length && lines[n].trim() === "") n++;
  if (/^\*[^*]/.test(lines[n] ?? "")) {
    q.explanation = unesc(lines[n].replace(/^\*|\*$/g, ""));
    n++;
  }
  return { question: q, next: n };
}

// --- parse one level page ------------------------------------------------

function parseLevel(level) {
  const lines = readFileSync(join(docs, `${level}.md`), "utf8").split("\n");
  const out = { words: [], readings: [], listenings: [], speaking: [] };
  let section = null;
  let item = null;

  // `item.data` accumulates fields in whatever order they're read off the
  // page; closeItem rebuilds the object with an explicit key order matching
  // the bank helpers (R()/L()) so JSON.stringify output — and therefore any
  // diff against previously-generated content — reflects real changes only,
  // not incidental JS property-insertion order.
  const closeItem = () => {
    if (!item) return;
    if (item.kind === "reading") {
      const { title, text, textHe, glossary, questions } = item.data;
      out.readings.push(
        textHe !== undefined
          ? { title, text, textHe, glossary, questions }
          : { title, text, glossary, questions },
      );
    }
    if (item.kind === "listening") {
      const { transcript, transcriptHe, questions } = item.data;
      out.listenings.push(
        transcriptHe !== undefined
          ? { transcript, transcriptHe, questions }
          : { transcript, questions },
      );
    }
    item = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      closeItem();
      section = line.slice(3).trim();
      continue;
    }

    if (line.startsWith("### ")) {
      closeItem();
      const heading = line.slice(4).trim();
      if (section === "Reading passages") {
        item = { kind: "reading", data: { title: heading.replace(/^R\d+\.\s*/, ""), glossary: [], questions: [] } };
      } else if (section === "Listening clips") {
        item = { kind: "listening", data: { questions: [] } };
      }
      continue;
    }

    // Word / speaking tables live directly under their section heading.
    if (line.startsWith("| # |") && section === "Words") {
      const { rows, next } = readTable(lines, i);
      for (const r of rows) {
        // Field order matches the hand-written banks (word, partOfSpeech,
        // definition, example, translation, [exampleHe]) purely so a diff
        // against previously-generated JSON stays about content, not JSON key
        // order — the app itself doesn't care about property order.
        const word = {
          word: r[1], partOfSpeech: r[2], definition: r[4], example: r[5], translation: r[3],
        };
        if (r[6]) word.exampleHe = r[6];
        out.words.push(word);
      }
      i = next - 1;
      continue;
    }
    if (line.startsWith("| # |") && section === "Speaking sentences") {
      const { rows, next } = readTable(lines, i);
      for (const r of rows) out.speaking.push({ text: r[1], translation: r[2] });
      i = next - 1;
      continue;
    }

    if (!item) continue;

    if (line.startsWith("**Text (English)**") || line.startsWith("**Transcript (English)**")) {
      while (lines[++i].trim() === "");
      const { text, next } = readQuote(lines, i);
      if (item.kind === "reading") item.data.text = text;
      else item.data.transcript = text;
      i = next - 1;
      continue;
    }
    if (line.startsWith("**Text (Hebrew)**") || line.startsWith("**Transcript (Hebrew)**")) {
      while (lines[++i].trim() === "");
      const { text, next } = readQuote(lines, i);
      if (item.kind === "reading") item.data.textHe = text;
      else item.data.transcriptHe = text;
      i = next - 1;
      continue;
    }
    if (line.startsWith("| Word |") && item.kind === "reading") {
      const { rows, next } = readTable(lines, i);
      item.data.glossary = rows.map((r) => ({
        // Field order matches the g() bank helper (word, partOfSpeech,
        // definition, example, translation) for diff-quiet regeneration.
        word: r[0], partOfSpeech: r[1], definition: r[3], example: r[4], translation: r[2],
      }));
      i = next - 1;
      continue;
    }
    if (/^\*\*Q\d+\.\*\*/.test(line)) {
      const { question, next } = readQuestion(lines, i);
      item.data.questions.push(question);
      i = next - 1;
      continue;
    }
  }

  closeItem();
  return out;
}

const parsed = Object.fromEntries(LEVELS.map((l) => [l, parseLevel(l)]));

// --- round-trip check ----------------------------------------------------

/**
 * The hand-written banks, merged in the exact order generate-content.mjs
 * consumes them, so arrays line up 1:1 with what the Markdown parsed. Sourced
 * from rounds.mjs rather than re-derived here — see that file for why
 * pattern-matching the export names undercounts (round 2's speaking bank has
 * no numeric suffix).
 */
async function liveBanks() {
  const { bankContent } = await import(join(here, "content", "rounds.mjs"));
  return bankContent();
}

/** Compare ignoring key order and undefined-vs-absent, which don't matter. */
function normalise(value) {
  if (Array.isArray(value)) return value.map(normalise);
  if (value && typeof value === "object") {
    const out = {};
    for (const k of Object.keys(value).sort()) {
      if (value[k] !== undefined) out[k] = normalise(value[k]);
    }
    return out;
  }
  return value;
}

function diffs(live, mine, kind) {
  const found = [];
  for (const level of LEVELS) {
    const a = live[kind][level] ?? [];
    const b = mine[level][kind] ?? [];
    if (a.length !== b.length) {
      found.push(`${level} ${kind}: bank has ${a.length} items, Markdown has ${b.length}`);
      continue;
    }
    for (let i = 0; i < a.length; i++) {
      const x = JSON.stringify(normalise(a[i]));
      const y = JSON.stringify(normalise(b[i]));
      if (x !== y) found.push(`${level} ${kind}[${i}]:\n    bank: ${x}\n     md:  ${y}`);
    }
  }
  return found;
}

const live = await liveBanks();
const problems = [
  ...diffs(live, parsed, "words"),
  ...diffs(live, parsed, "readings"),
  ...diffs(live, parsed, "listenings"),
  ...diffs(live, parsed, "speaking"),
];

if (process.argv.includes("--check")) {
  if (problems.length) {
    console.error(`Round-trip is lossy — ${problems.length} difference(s):\n`);
    for (const p of problems.slice(0, 20)) console.error(`  - ${p}`);
    if (problems.length > 20) console.error(`  … and ${problems.length - 20} more`);
    process.exit(1);
  }
  console.log("Round-trip clean: Markdown reproduces every bank item exactly.");
  process.exit(0);
}

// --- emit ----------------------------------------------------------------

const counts = LEVELS.map(
  (l) =>
    `//   ${l}: ${parsed[l].words.length} words, ${parsed[l].readings.length} readings, ` +
    `${parsed[l].listenings.length} listenings, ${parsed[l].speaking.length} speaking`,
).join("\n");

const body = `// GENERATED FILE — do not edit.
//
// Written by scripts/content-import.mjs from docs/content/*.md. Edit the
// Markdown and run \`npm run content:import\`, then \`npm run content\`.
//
${counts}

export const WORDS_BY_LEVEL = ${JSON.stringify(Object.fromEntries(LEVELS.map((l) => [l, parsed[l].words])), null, 2)};

export const READINGS_BY_LEVEL = ${JSON.stringify(Object.fromEntries(LEVELS.map((l) => [l, parsed[l].readings])), null, 2)};

export const LISTENINGS_BY_LEVEL = ${JSON.stringify(Object.fromEntries(LEVELS.map((l) => [l, parsed[l].listenings])), null, 2)};

export const SPEAKING_BY_LEVEL = ${JSON.stringify(Object.fromEntries(LEVELS.map((l) => [l, parsed[l].speaking])), null, 2)};
`;

writeFileSync(join(here, "content", "from-markdown.generated.mjs"), body, "utf8");

const total = (kind) => LEVELS.reduce((s, l) => s + parsed[l][kind].length, 0);
console.log(
  `Imported from docs/content/: ${total("words")} words, ${total("readings")} readings, ` +
    `${total("listenings")} listenings, ${total("speaking")} speaking sentences.`,
);
if (problems.length) {
  console.warn(
    `\nNote: ${problems.length} item(s) differ from the original hand-written banks — ` +
      `expected if you have edited the Markdown, alarming if you have not.`,
  );
}
