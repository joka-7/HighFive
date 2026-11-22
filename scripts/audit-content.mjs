// Content audit for HighFive.
//
//   npm run content:audit            rewrite the generated part of docs/CONTENT-AUDIT.md
//   npm run content:audit -- --check fail if that report is stale or a CI rule breaks
//
// Reads what learners actually get (src/data/offline/*.json, written by
// scripts/generate-content.mjs) and the hand-written passages it is built from
// (scripts/content/passages*.mjs), and compares the taught words with the CEFR
// reference lists in scripts/content/cefr/. The rules live in content-audit.mjs.

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { IRREGULAR_PLURALS, VERBS } from "./content/banks.mjs";
import { LEVEL_OVERRIDES } from "./content/level-overrides.mjs";
import {
  LEVELS,
  aboveLevelWords,
  buildIrregulars,
  tokenize,
  crossLevelDuplicates,
  exampleHasWord,
  incompleteWords,
  levelFit,
  mergeCefrIndexes,
  parseCefrCsv,
  passageStats,
  renderReport,
  repetition,
  replaceGenerated,
  violations,
  withOverrides,
} from "./content-audit.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OFFLINE = join(ROOT, "src", "data", "offline");
const CONTENT = join(ROOT, "scripts", "content");
const REPORT = join(ROOT, "docs", "CONTENT-AUDIT.md");
const QUARTERS = [1, 2, 3, 4];

const readJson = (file) => JSON.parse(readFileSync(join(OFFLINE, file), "utf8"));

/** Every export of every passages*.mjs, grouped by kind (the generator uses all of them). */
async function loadSourcePassages() {
  const files = readdirSync(CONTENT).filter((f) => /^passages.*\.mjs$/.test(f)).sort();
  const groups = { readings: [], listenings: [], speaking: [] };
  for (const file of files) {
    const mod = await import(pathToFileURL(join(CONTENT, file)).href);
    for (const [name, byLevel] of Object.entries(mod)) {
      if (/READINGS/.test(name)) groups.readings.push(byLevel);
      else if (/LISTENINGS/.test(name)) groups.listenings.push(byLevel);
      else if (/SPEAKING/.test(name)) groups.speaking.push(byLevel);
    }
  }
  return groups;
}

const bilingual = (questions) => Array.isArray(questions) && questions.length > 0 && questions.every((q) => q.questionHe);
const opening = (text) => `${String(text).split(/\s+/).slice(0, 8).join(" ")}…`;

function handWritten(source, level) {
  const of = (groups) => groups.flatMap((g) => g[level] ?? []);
  const readings = of(source.readings);
  const listenings = of(source.listenings);
  const speaking = of(source.speaking).filter((s) => s && s.text);
  const hiddenReadings = readings.filter((r) => !(r.textHe && bilingual(r.questions)));
  const hiddenListenings = listenings.filter((l) => !(l.transcriptHe && bilingual(l.questions)));
  const translated = speaking.filter((s) => s.translation).length;
  return {
    texts: [...readings.map((r) => r.text), ...listenings.map((l) => l.transcript)],
    readings: { written: readings.length, shown: readings.length - hiddenReadings.length, hidden: hiddenReadings.map((r) => `Reading: ${r.title ?? opening(r.text)}`) },
    listenings: { written: listenings.length, shown: listenings.length - hiddenListenings.length, hidden: hiddenListenings.map((l) => `Listening: ${opening(l.transcript)}`) },
    speaking: { written: speaking.length, shown: translated - (translated % 4) },
  };
}

/** Every English sentence a learner sees at `level`, grouped by part of the app. */
function learnerTexts(level) {
  const lc = level.toLowerCase();
  const daily = QUARTERS.map((q) => readJson(`${lc}.q${q}.json`));
  // Each question and option is its own sentence, so a capitalised option is never mistaken for a name.
  const asked = (q) => [q.question, ...q.options].join(". ");
  const of = (kind) => [...QUARTERS.flatMap((q) => readJson(`${lc}.${kind}.q${q}.json`)), ...readJson(`${lc}.${kind}.curated.json`)];
  const words = [...new Map(daily.flatMap((d) => d.vocabulary.flatMap((day) => day.words)).map((w) => [w.word, w])).values()];
  return [
    { kind: "word example", items: words.map((w) => ({ text: String(w.example), own: String(w.word) })) },
    { kind: "daily quiz", items: daily.flatMap((d) => d.quizzes.flatMap((z) => z.questions)).map((q) => ({ text: asked(q) })) },
    { kind: "grammar question", items: daily.flatMap((d) => d.lessons.flatMap((l) => l.questions)).map((q) => ({ text: asked(q) })) },
    {
      kind: "reading",
      items: of("reading").map((r) => ({
        text: [r.text, ...(r.glossary ?? []).map((g) => g.example), ...(r.questions ?? []).map(asked)].join(". "),
        own: (r.glossary ?? []).map((g) => g.word).join(" "),
      })),
    },
    { kind: "listening", items: of("listening").map((l) => ({ text: [l.transcript, ...(l.questions ?? []).map(asked)].join(". ") })) },
    { kind: "speaking", items: of("speaking").flatMap((s) => s.prompts).map((p) => ({ text: String(p.text) })) },
  ];
}

/**
 * Sentences at `level` with words above it. `known` is every word taught at
 * or below the level; an item's own headword or glossary words also pass.
 */
function aboveLevel(level, cefr, irregulars, known) {
  const items = [];
  const byKind = learnerTexts(level).map(({ kind, items: all }) => {
    const seen = new Map();
    const counts = new Map();
    for (const { text, own = "" } of all) {
      const key = `${text}\u0000${own}`;
      if (seen.has(key)) continue;
      const allowed = new Set([...known, ...tokenize(own)]);
      const words = aboveLevelWords(text, level, cefr, irregulars, allowed);
      seen.set(key, words);
      for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1);
      if (words.length) items.push({ kind, text: opening(text), words });
    }
    const flagged = [...seen.values()].filter((w) => w.length).length;
    const top = [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 8).map(([w, n]) => `${w} (${n})`);
    return { kind, items: seen.size, flagged, top };
  });
  return { byKind, items };
}

function auditLevel(level, source, cefr, irregulars) {
  const lc = level.toLowerCase();
  const daily = QUARTERS.map((q) => readJson(`${lc}.q${q}.json`));
  const wordEntries = daily.flatMap((d) => d.vocabulary.flatMap((day) => day.words));
  const firstOfEach = [...new Map(wordEntries.map((w) => [String(w.word).toLowerCase(), w])).values()];
  const readings = QUARTERS.flatMap((q) => readJson(`${lc}.reading.q${q}.json`).map((r) => r.text));
  const written = handWritten(source, level);
  return {
    level,
    words: repetition(wordEntries.map((w) => String(w.word).toLowerCase())),
    uniqueWords: firstOfEach.map((w) => String(w.word)),
    grammarTopics: new Set(daily.flatMap((d) => d.lessons.map((l) => l.title))).size,
    quizQuestions: repetition(daily.flatMap((d) => d.quizzes.flatMap((z) => z.questions.map((q) => q.question)))),
    dailyReadings: repetition(readings),
    handWritten: written,
    fit: levelFit(firstOfEach.map((w) => String(w.word)), level, withOverrides(cefr, LEVEL_OVERRIDES), irregulars),
    passages: passageStats(written.texts, level, withOverrides(cefr, LEVEL_OVERRIDES), irregulars),
    incomplete: incompleteWords(firstOfEach),
    aboveLevel: aboveLevel(level, withOverrides(cefr, LEVEL_OVERRIDES), irregulars, taughtUpTo(level)),
    examplesMissingWord: firstOfEach
      .filter((w) => w.example && !exampleHasWord(String(w.word), String(w.example), irregulars))
      .map((w) => ({ word: String(w.word), example: String(w.example) })),
  };
}

/** Every word taught at or below `level`, as lowercase tokens (each part of a phrase counts). */
function taughtUpTo(level) {
  const known = new Set();
  for (const lower of LEVELS.slice(0, LEVELS.indexOf(level) + 1)) {
    for (const q of QUARTERS) {
      for (const day of readJson(`${lower.toLowerCase()}.q${q}.json`).vocabulary) {
        for (const w of day.words) for (const t of tokenize(String(w.word))) known.add(t);
      }
    }
  }
  return known;
}

async function buildAudit() {
  const csv = (name) => readFileSync(join(CONTENT, "cefr", name), "utf8");
  const cefr = mergeCefrIndexes(
    parseCefrCsv(csv("cefrj-vocabulary-profile-1.5.csv")),
    parseCefrCsv(csv("octanove-vocabulary-profile-c1c2-1.0.csv")),
  );
  const irregulars = buildIrregulars(VERBS, IRREGULAR_PLURALS);
  const source = await loadSourcePassages();
  const levels = LEVELS.map((level) => auditLevel(level, source, cefr, irregulars));
  const duplicates = crossLevelDuplicates(Object.fromEntries(levels.map((l) => [l.level, l.uniqueWords])));
  return { levels, duplicates };
}

const audit = await buildAudit();
const current = readFileSync(REPORT, "utf8");
const next = replaceGenerated(current, renderReport(audit));

if (process.argv.includes("--check")) {
  const problems = violations(audit);
  for (const problem of problems) console.error(problem);
  if (next !== current) console.error("docs/CONTENT-AUDIT.md is stale: run `npm run content:audit` and commit the result.");
  process.exitCode = problems.length > 0 || next !== current ? 1 : 0;
} else {
  writeFileSync(REPORT, next);
  console.log(`wrote ${REPORT}`);
}
