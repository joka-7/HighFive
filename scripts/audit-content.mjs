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
import {
  LEVELS,
  buildIrregulars,
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
    fit: levelFit(firstOfEach.map((w) => String(w.word)), level, cefr, irregulars),
    passages: passageStats(written.texts, level, cefr, irregulars),
    incomplete: incompleteWords(firstOfEach),
    examplesMissingWord: firstOfEach
      .filter((w) => w.example && !exampleHasWord(String(w.word), String(w.example), irregulars))
      .map((w) => ({ word: String(w.word), example: String(w.example) })),
  };
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
