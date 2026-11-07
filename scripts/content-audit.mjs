// Pure checks behind `npm run content:audit` (scripts/audit-content.mjs).
//
// Nothing here reads files: the CLI loads the generated content, the source
// passages and the CEFR reference lists, and hands them in. That keeps every
// rule testable with small fixtures (content-audit.test.mjs).

export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

const levelIndex = (level) => LEVELS.indexOf(level);

/**
 * Parse a CEFR word list CSV (headword,pos,CEFR,...) into headword → level.
 * A headword listed under several parts of speech keeps its lowest level, the
 * sense a learner meets first. "a.m./A.M./am" style headwords count as each
 * spelling. Only the first three columns are read; none of them is ever quoted
 * in the CEFR-J or Octanove files.
 * @param {string} csv
 * @returns {Map<string, string>}
 */
export function parseCefrCsv(csv) {
  const index = new Map();
  for (const line of csv.split(/\r?\n/).slice(1)) {
    const [headword = "", , level = ""] = line.split(",");
    if (!LEVELS.includes(level)) continue;
    for (const spelling of headword.split("/")) {
      const key = spelling.trim().toLowerCase();
      if (!key) continue;
      const known = index.get(key);
      if (!known || levelIndex(level) < levelIndex(known)) index.set(key, level);
    }
  }
  return index;
}

/** Merge reference lists; an earlier (lower) level wins. */
export function mergeCefrIndexes(...indexes) {
  const merged = new Map();
  for (const index of indexes) {
    for (const [word, level] of index) {
      const known = merged.get(word);
      if (!known || levelIndex(level) < levelIndex(known)) merged.set(word, level);
    }
  }
  return merged;
}

// Prefixes that form compound verbs from an irregular base (under+go → underwent).
const COMPOUND_PREFIXES = ["be", "under", "fore", "over", "with", "out", "mis", "up", "re", "for"];

/**
 * Irregular forms from the generator's own tables, both ways: base → forms
 * and form → base.
 * @param {{base: string, third: string, past: string, pp: string, ing: string}[]} verbs
 * @param {{sg: string, pl: string}[]} plurals
 */
export function buildIrregulars(verbs, plurals) {
  const forms = new Map();
  const bases = new Map();
  const add = (base, list) => {
    forms.set(base, new Set([...(forms.get(base) ?? []), ...list]));
    for (const form of list) if (!bases.has(form)) bases.set(form, base);
  };
  for (const v of verbs) add(v.base, [v.third, v.past, v.pp, v.ing]);
  for (const p of plurals) add(p.sg, [p.pl]);
  return { forms, bases };
}

/** Regular inflections of a word: plurals, -ed, -ing, and their spelling rules. */
function regularForms(word) {
  const forms = [word, `${word}s`, `${word}es`, `${word}ed`, `${word}d`, `${word}ing`];
  if (/[^aeiou]y$/.test(word)) forms.push(`${word.slice(0, -1)}ies`, `${word.slice(0, -1)}ied`);
  if (word.endsWith("e")) forms.push(`${word.slice(0, -1)}ing`);
  if (/[^aeiou][aeiou][bdgklmnprt]$/.test(word)) {
    const last = word.slice(-1);
    forms.push(`${word}${last}ed`, `${word}${last}ing`);
  }
  return forms;
}

/** Irregular forms of a word, including compounds built on an irregular base. */
function irregularForms(word, irregulars) {
  const direct = [...(irregulars.forms.get(word) ?? [])];
  const compound = COMPOUND_PREFIXES.filter((p) => word.startsWith(p) && word.length > p.length).flatMap(
    (p) => [...(irregulars.forms.get(word.slice(p.length)) ?? [])].map((form) => p + form),
  );
  return [...direct, ...compound];
}

/** Lowercased word tokens of a text; a contraction keeps only its word ("I've" → "i"). */
export function tokenize(text) {
  return (text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) ?? []).map((t) => t.split("'")[0] ?? t);
}

/** Levenshtein distance, bounded: returns limit + 1 as soon as it is exceeded. */
function editDistance(a, b, limit) {
  if (Math.abs(a.length - b.length) > limit) return limit + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i += 1) {
    const row = [i];
    for (let j = 1; j <= b.length; j += 1) {
      row[j] = Math.min((prev[j] ?? 0) + 1, (row[j - 1] ?? 0) + 1, (prev[j - 1] ?? 0) + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    if (Math.min(...row) > limit) return limit + 1;
    prev = row;
  }
  return prev[b.length] ?? limit + 1;
}

/**
 * Whether an example sentence uses its headword, in any inflection. Irregular
 * forms the tables don't list ("ring" → "rang") are accepted when a token is
 * one edit away from a word of four letters or more. Multi-word headwords must
 * appear as written.
 */
export function exampleHasWord(word, example, irregulars) {
  const target = word.toLowerCase();
  const sentence = example.toLowerCase();
  if (target.includes(" ")) return sentence.includes(target);
  const forms = new Set([...regularForms(target), ...irregularForms(target, irregulars)]);
  return tokenize(sentence).some(
    (token) => forms.has(token) || (target.length >= 4 && token[0] === target[0] && editDistance(token, target, 1) <= 1),
  );
}

/** Possible dictionary forms of an inflected token, most likely first. */
export function lemmaCandidates(token, irregulars) {
  const candidates = [token];
  const base = irregulars.bases.get(token);
  if (base) candidates.push(base);
  const strip = (suffix, add = "") =>
    token.endsWith(suffix) && token.length > suffix.length + 1 ? [token.slice(0, -suffix.length) + add] : [];
  candidates.push(...strip("ies", "y"), ...strip("ied", "y"), ...strip("es"), ...strip("s"));
  candidates.push(...strip("ed"), ...strip("d"), ...strip("ing"), ...strip("ing", "e"));
  if (/([bdgklmnprt])\1(ed|ing)$/.test(token)) candidates.push(token.replace(/([bdgklmnprt])\1(ed|ing)$/, "$1"));
  return candidates;
}

/** The CEFR level of a word or inflected token, or null when no list has it. */
export function cefrLevelOf(token, cefr, irregulars) {
  for (const candidate of lemmaCandidates(token.toLowerCase(), irregulars)) {
    const level = cefr.get(candidate);
    if (level) return level;
  }
  return null;
}

/**
 * Compare a level's taught words with the reference lists. "Near" means one
 * level away, which is within the lists' own uncertainty; two or more levels
 * either way is reported word by word.
 * @param {string[]} words
 * @param {string} level
 */
export function levelFit(words, level, cefr, irregulars) {
  const fit = { same: 0, near: 0, harder: [], easier: [], unlisted: [] };
  for (const word of words) {
    const ref = cefrLevelOf(word, cefr, irregulars);
    if (!ref) {
      fit.unlisted.push(word);
      continue;
    }
    const gap = levelIndex(ref) - levelIndex(level);
    if (gap === 0) fit.same += 1;
    else if (Math.abs(gap) === 1) fit.near += 1;
    else (gap > 0 ? fit.harder : fit.easier).push({ word, ref });
  }
  return fit;
}

/**
 * Difficulty signals for a set of passages at one level: average sentence
 * length, and the share of word tokens whose reference level is above it or
 * that no list has (names, rare words, forms the lemmatiser misses).
 * @param {string[]} texts
 */
export function passageStats(texts, level, cefr, irregulars) {
  let tokens = 0;
  let sentences = 0;
  let above = 0;
  let unlisted = 0;
  for (const text of texts) {
    sentences += text.split(/[.!?]+/).filter((s) => tokenize(s).length > 0).length;
    for (const token of tokenize(text)) {
      tokens += 1;
      const ref = cefrLevelOf(token, cefr, irregulars);
      if (!ref) unlisted += 1;
      else if (levelIndex(ref) > levelIndex(level)) above += 1;
    }
  }
  const pct = (n) => (tokens ? Math.round((1000 * n) / tokens) / 10 : 0);
  return {
    passages: texts.length,
    avgSentenceWords: sentences ? Math.round((10 * tokens) / sentences) / 10 : 0,
    abovePct: pct(above),
    unlistedPct: pct(unlisted),
  };
}

/** Words taught at more than one level. @param {Record<string, string[]>} wordsByLevel */
export function crossLevelDuplicates(wordsByLevel) {
  const levelsOf = new Map();
  for (const level of LEVELS) {
    for (const word of new Set((wordsByLevel[level] ?? []).map((w) => w.toLowerCase()))) {
      levelsOf.set(word, [...(levelsOf.get(word) ?? []), level]);
    }
  }
  return [...levelsOf]
    .filter(([, levels]) => levels.length > 1)
    .map(([word, levels]) => ({ word, levels }))
    .sort((a, b) => a.word.localeCompare(b.word));
}

const WORD_FIELDS = ["word", "partOfSpeech", "definition", "example", "translation"];

/** Word entries with an empty required field. */
export function incompleteWords(entries) {
  return entries
    .map((entry) => ({ word: String(entry.word ?? ""), missing: WORD_FIELDS.filter((f) => !String(entry[f] ?? "").trim()) }))
    .filter((e) => e.missing.length > 0);
}

/** How often a list's items repeat: total slots, unique items, slots per item. */
export function repetition(items) {
  const unique = new Set(items).size;
  return { total: items.length, unique, perItem: unique ? Math.round((10 * items.length) / unique) / 10 : 0 };
}

/** The rules CI enforces. Anything else in the report is information, not a gate. */
export function violations(audit) {
  return audit.levels.flatMap(({ level, incomplete, examplesMissingWord }) => [
    ...incomplete.map((e) => `${level} "${e.word}": missing ${e.missing.join(", ")}`),
    ...examplesMissingWord.map((e) => `${level} "${e.word}": example does not use the word: ${e.example}`),
  ]);
}

const table = (header, rows) =>
  [`| ${header.join(" | ")} |`, `|${header.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");

const wordList = (items) => (items.length ? items.join(", ") : "none");

function summarySection(levels) {
  const rows = levels.map((l) => [
    l.level,
    l.words.unique,
    `${l.words.perItem}×`,
    l.grammarTopics,
    l.quizQuestions.unique,
    `${l.dailyReadings.unique} / ${l.dailyReadings.total}`,
    `${l.handWritten.readings.shown} / ${l.handWritten.readings.written}`,
    `${l.handWritten.listenings.shown} / ${l.handWritten.listenings.written}`,
    `${l.handWritten.speaking.shown} / ${l.handWritten.speaking.written}`,
  ]);
  return [
    "## Summary",
    "",
    "A year is 365 days: 1,825 word slots (five a day) and 1,825 quiz questions per level.",
    "",
    table(
      ["Level", "Unique words", "Each word shown", "Grammar topics", "Unique quiz questions", "Unique daily readings", "Readings shown / written", "Listenings shown / written", "Speaking sentences shown / written"],
      rows,
    ),
    "",
    "Hand-written items are only shown once they have a Hebrew translation (`textHe` / `transcriptHe`, `questionHe` on every question; speaking sentences in full rounds of four).",
  ].join("\n");
}

function fitSection(levels) {
  const rows = levels.map((l) => [l.level, l.fit.same, l.fit.near, l.fit.harder.length, l.fit.easier.length, l.fit.unlisted.length]);
  const details = levels.flatMap((l) => [
    `### ${l.level}`,
    "",
    `- **Two or more levels harder:** ${wordList(l.fit.harder.map((w) => `${w.word} (${w.ref})`))}`,
    `- **Two or more levels easier:** ${wordList(l.fit.easier.map((w) => `${w.word} (${w.ref})`))}`,
    `- **In neither list:** ${wordList(l.fit.unlisted)}`,
    "",
  ]);
  return [
    "## Words against the CEFR lists",
    "",
    "Reference: CEFR-J 1.5 (A1–B2) and Octanove C1/C2 1.0 (`scripts/content/cefr/`). One level off is within the lists' own uncertainty.",
    "",
    table(["Level", "Same level", "One level off", "2+ harder", "2+ easier", "In neither list"], rows),
    "",
    ...details,
  ].join("\n");
}

function passageSection(levels) {
  const rows = levels.map((l) => [l.level, l.passages.passages, l.passages.avgSentenceWords, `${l.passages.abovePct}%`, `${l.passages.unlistedPct}%`]);
  return [
    "## Hand-written passages",
    "",
    "All hand-written readings and listening transcripts, shown or not. \"Above level\" counts word tokens the lists put above the passage's level; \"in neither list\" is mostly names and forms the checker can't trace to a dictionary word.",
    "",
    table(["Level", "Passages", "Words per sentence", "Above level", "In neither list"], rows),
  ].join("\n");
}

function duplicateSection(duplicates) {
  return [
    "## Words taught at more than one level",
    "",
    duplicates.length ? duplicates.map((d) => `- ${d.word}: ${d.levels.join(", ")}`).join("\n") : "None.",
  ].join("\n");
}

function hiddenSection(levels) {
  const blocks = levels.flatMap((l) => {
    const items = [...l.handWritten.readings.hidden, ...l.handWritten.listenings.hidden];
    return items.length ? [`<details><summary>${l.level}: ${items.length}</summary>`, "", ...items.map((t) => `- ${t}`), "", "</details>", ""] : [];
  });
  return ["## Hand-written passages not shown (missing Hebrew)", "", ...(blocks.length ? blocks : ["None."])].join("\n");
}

function rulesSection(found) {
  return [
    "## Rules CI enforces",
    "",
    "Every word entry has a word, part of speech, definition, example and translation, and its example uses the word.",
    "",
    found.length ? found.map((v) => `- ${v}`).join("\n") : "All pass.",
  ].join("\n");
}

/** The generated part of docs/CONTENT-AUDIT.md. */
export function renderReport(audit) {
  return [
    summarySection(audit.levels),
    fitSection(audit.levels),
    passageSection(audit.levels),
    duplicateSection(audit.duplicates),
    hiddenSection(audit.levels),
    rulesSection(violations(audit)),
  ].join("\n\n");
}

export const BEGIN_MARKER = "<!-- BEGIN GENERATED: npm run content:audit -->";
export const END_MARKER = "<!-- END GENERATED -->";

/** Replace the generated region of a document, keeping the prose around it. */
export function replaceGenerated(document, generated) {
  const start = document.indexOf(BEGIN_MARKER);
  const end = document.indexOf(END_MARKER);
  if (start === -1 || end === -1 || end < start) throw new Error("docs/CONTENT-AUDIT.md has no generated region markers");
  return `${document.slice(0, start + BEGIN_MARKER.length)}\n${generated}\n${document.slice(end)}`;
}
