// Content report generator — `npm run content:report`.
//
// Walks every editable content bank and writes a human-readable Markdown
// inventory to docs/content/. The point is review and editing by a person:
// the app's src/data/offline/*.json is a *generated* artifact (17 MB, a year
// of daily material per level), so it is useless to read and pointless to
// edit. The banks under scripts/content/ are the real source, and this report
// is a readable view of them, with each item labelled by the file it lives in
// so an edit can be made where it will actually survive `npm run content`.
//
// Regenerate after editing a bank to keep the report honest.

import { mkdirSync, writeFileSync } from "node:fs";
import { register } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { bankContent, LEVELS } from "./content/rounds.mjs";

// Lets the src/data/*.ts imports below resolve their extensionless specifiers.
register(new URL("./ts-extension-hook.mjs", import.meta.url));

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const outDir = join(root, "docs", "content");
const bank = (f) => join(here, "content", f);

// --- loading -------------------------------------------------------------

/** Bank files are plain ESM data, so they import directly. */
async function load(file) {
  return import(bank(file));
}

/** Node strips the types; the registered hook supplies the .ts extension. */
function loadTs(relPath) {
  return import(pathToFileURL(join(root, relPath)).href);
}

// --- markdown helpers ----------------------------------------------------

const esc = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n+/g, " ").trim();
const anchor = (s) => s.toLowerCase().replace(/[^a-z0-9֐-׿]+/g, "-").replace(/^-|-$/g, "");

function table(headers, rows) {
  const out = [`| ${headers.join(" | ")} |`, `|${headers.map(() => "---").join("|")}|`];
  for (const r of rows) out.push(`| ${r.map(esc).join(" | ")} |`);
  return out.join("\n");
}

/**
 * A multiple-choice question. Options go in a table rather than a checklist so
 * an option and its Hebrew never need a separator inside one line — the
 * importer has to read this back exactly, and an em dash inside an option
 * would otherwise be indistinguishable from the one joining the two languages.
 * Tick the ✓ column to move the correct answer.
 */
function questionBlock(q, n) {
  const lines = [`**Q${n}.** ${esc(q.question)}`];
  if (q.questionHe) lines.push(`**Q${n} (He).** ${esc(q.questionHe)}`);
  lines.push("");
  lines.push(
    table(
      ["✓", "Option (En)", "Option (He)"],
      q.options.map((opt, i) => [i === q.correctIndex ? "✓" : "", opt, q.optionsHe?.[i] ?? ""]),
    ),
  );
  if (q.explanation) {
    lines.push("");
    lines.push(`*${esc(q.explanation)}*`);
  }
  return lines.join("\n");
}

/** A labelled blockquote — labels keep English and Hebrew bodies unambiguous. */
function quoted(label, text) {
  return [`**${label}**`, "", `> ${String(text).replace(/\n/g, "\n> ")}`, ""];
}

// --- gather --------------------------------------------------------------

// Single source of truth for which bank exports feed which round, in
// generator order — see rounds.mjs for why this can't be re-derived by
// pattern-matching export names (round 2's speaking bank breaks the pattern).
const { words, readings, listenings, speaking } = bankContent({ withSource: true });

// Grammar tables (VERBS, ADJECTIVES, …) aren't part of the word/passage
// rounds above — loaded separately, only for the grammar-banks.md page.
const banks = await load("banks.mjs");

const topics = await loadTs("src/data/topics.ts");
const videos = await loadTs("src/data/videos.ts");
const operations = await loadTs("src/data/operations.ts");
const placement = await loadTs("src/data/placement.ts");

// --- per-level pages -----------------------------------------------------

mkdirSync(outDir, { recursive: true });

for (const level of LEVELS) {
  const w = words[level];
  const r = readings[level];
  const li = listenings[level];
  const sp = speaking[level];

  // Same word twice in a level is worth seeing — the generator dedupes, so a
  // duplicate silently wastes a slot rather than failing.
  const seen = new Map();
  const dupes = [];
  for (const item of w) {
    const key = item.word.toLowerCase();
    if (seen.has(key)) dupes.push(`${item.word} (${seen.get(key)} + ${item.source})`);
    else seen.set(key, item.source);
  }

  const md = [];
  md.push(`# ${level} — content inventory`);
  md.push("");
  md.push(`[← all levels](./README.md)`);
  md.push("");
  md.push(
    table(
      ["Section", "Items"],
      [
        [`[Words](#words)`, w.length],
        [`[Reading passages](#reading-passages)`, r.length],
        [`[Listening clips](#listening-clips)`, li.length],
        [`[Speaking sentences](#speaking-sentences)`, sp.length],
      ],
    ),
  );
  md.push("");

  if (dupes.length) {
    md.push(`> ⚠️ **${dupes.length} duplicate word(s)** in this level — the generator keeps the first and drops the rest:`);
    md.push(">");
    for (const d of dupes) md.push(`> - ${d}`);
    md.push("");
  }

  md.push("## Words");
  md.push("");
  md.push(`${w.length} words. Edit a cell directly; "Bank" is just where the word originated.`);
  md.push("");
  md.push(
    table(
      ["#", "Word", "Part of speech", "Hebrew", "Definition (He)", "Example (En)", "Example (He)", "Bank"],
      w.map((x, i) => [
        i + 1, x.word, x.partOfSpeech, x.translation, x.definition, x.example, x.exampleHe ?? "", x.source,
      ]),
    ),
  );
  md.push("");

  md.push("## Reading passages");
  md.push("");
  md.push(`${r.length} passages. Each has a glossary and comprehension questions.`);
  md.push("");
  r.forEach((item, i) => {
    md.push(`### R${i + 1}. ${item.title}`);
    md.push("");
    md.push(`*Source: \`scripts/content/${item.source}\`*`);
    md.push("");
    md.push(...quoted("Text (English)", item.text));
    if (item.textHe) md.push(...quoted("Text (Hebrew)", item.textHe));
    if (item.glossary?.length) {
      md.push("**Glossary**");
      md.push("");
      md.push(
        table(
          ["Word", "Part of speech", "Hebrew", "Definition (He)", "Example"],
          item.glossary.map((g) => [g.word, g.partOfSpeech, g.translation, g.definition, g.example]),
        ),
      );
      md.push("");
    }
    item.questions?.forEach((q, n) => {
      md.push(questionBlock(q, n + 1));
      md.push("");
    });
  });

  md.push("## Listening clips");
  md.push("");
  md.push(`${li.length} clips. The transcript is what the app speaks aloud (TTS).`);
  md.push("");
  li.forEach((item, i) => {
    md.push(`### L${i + 1}`);
    md.push("");
    md.push(`*Source: \`scripts/content/${item.source}\`*`);
    md.push("");
    md.push(...quoted("Transcript (English)", item.transcript));
    if (item.transcriptHe) md.push(...quoted("Transcript (Hebrew)", item.transcriptHe));
    item.questions?.forEach((q, n) => {
      md.push(questionBlock(q, n + 1));
      md.push("");
    });
  });

  md.push("## Speaking sentences");
  md.push("");
  md.push(`${sp.length} sentences the learner reads aloud; speech recognition scores them.`);
  md.push("");
  md.push(
    table(
      ["#", "Sentence (En)", "Hebrew", "Bank"],
      sp.map((x, i) => [i + 1, x.text, x.translation, x.source]),
    ),
  );
  md.push("");

  writeFileSync(join(outDir, `${level}.md`), md.join("\n"), "utf8");
}

// --- links, media and app-wide copy --------------------------------------

{
  const md = [];
  md.push("# Links, media and app-wide content");
  md.push("");
  md.push("[← all levels](./README.md)");
  md.push("");
  md.push("Everything here is level-independent (except the videos, which are tagged by level).");
  md.push("");

  md.push("## External links on the daily board");
  md.push("");
  md.push("Shown under *“עשיתי את זה באפליקציה אחרת”* on each of the five operations.");
  md.push("Edit in `src/data/operations.ts`.");
  md.push("");
  md.push(
    table(
      ["#", "Operation", "Title (He)", "Link", "URL"],
      operations.OPERATIONS.flatMap((op, i) =>
        op.links.map((l) => [i + 1, op.id, op.title, l.label, l.url]),
      ),
    ),
  );
  md.push("");

  md.push("### Operation copy");
  md.push("");
  md.push(
    table(
      ["#", "id", "Emoji", "Title", "Subtitle", "In-app screen", "CTA", "Alt screen", "Alt CTA", "External prompt", "Placeholder"],
      operations.OPERATIONS.map((op, i) => [
        i + 1, op.id, op.emoji, op.title, op.sub, op.screen, op.cta,
        op.altScreen ?? "—", op.altCta ?? "—", op.externalLabel, op.externalPlaceholder,
      ]),
    ),
  );
  md.push("");

  md.push("## Daily videos");
  md.push("");
  md.push("One embedded YouTube video per day, picked by level. Edit in `src/data/videos.ts`.");
  md.push("");
  md.push(
    table(
      ["#", "Level", "Title (En)", "Title (He)", "YouTube ID", "URL"],
      LEVELS.flatMap((level) =>
        (videos.VIDEOS_BY_LEVEL[level] ?? []).map((v, i) => [
          i + 1, level, v.title, v.titleHe, v.youtubeId,
          `https://www.youtube.com/watch?v=${v.youtubeId}`,
        ]),
      ),
    ),
  );
  md.push("");

  md.push("## Dialogue scenarios");
  md.push("");
  md.push("Roleplay openers for the AI conversation coach. Edit in `src/data/topics.ts`.");
  md.push("");
  md.push(
    table(
      ["#", "id", "Label (He)", "Scenario (En)"],
      topics.DIALOGUE_SCENARIOS.map((s, i) => [i + 1, s.id, s.label, s.en]),
    ),
  );
  md.push("");

  md.push("## Daily topic pools");
  md.push("");
  md.push("One topic per day is picked from each pool. Edit in `src/data/topics.ts`.");
  md.push("");
  for (const [name, list] of [
    ["Lesson topics", topics.LESSON_TOPICS],
    ["Quiz topics", topics.QUIZ_TOPICS],
    ["Reading topics", topics.READING_TOPICS],
    ["Listening topics", topics.LISTENING_TOPICS],
    ["Speaking topics", topics.SPEAKING_TOPICS],
  ]) {
    if (!list) continue;
    md.push(`### ${name} (${list.length})`);
    md.push("");
    for (const t of list) md.push(`- ${t}`);
    md.push("");
  }

  md.push("## Placement test");
  md.push("");
  md.push("Six questions shown during onboarding; the score picks the starting level. Edit in `src/data/placement.ts`.");
  md.push("");
  placement.PLACEMENT_QUESTIONS.forEach((q, i) => {
    md.push(questionBlock(q, i + 1));
    md.push("");
  });

  writeFileSync(join(outDir, "links-and-media.md"), md.join("\n"), "utf8");
}

// --- grammar banks -------------------------------------------------------

{
  const md = [];
  md.push("# Grammar banks");
  md.push("");
  md.push("[← all levels](./README.md)");
  md.push("");
  md.push(
    "The daily lesson and practice quiz questions are built *correct-by-construction* from these tables " +
      "rather than written one by one, so every answer key is right by definition. `lvl` is the lowest CEFR " +
      "band an item is used at (0 = A1). Edit in `scripts/content/banks.mjs`.",
  );
  md.push("");

  md.push(`## Verbs (${banks.VERBS.length})`);
  md.push("");
  md.push(
    table(
      ["Base", "3rd person", "Past", "Past participle", "-ing", "Hebrew", "lvl"],
      banks.VERBS.map((v) => [v.base, v.third, v.past, v.pp, v.ing, v.he, v.lvl]),
    ),
  );
  md.push("");

  md.push(`## Adjectives (${banks.ADJECTIVES.length})`);
  md.push("");
  md.push(
    table(
      ["Adjective", "Comparative", "Superlative", "Hebrew", "lvl"],
      banks.ADJECTIVES.map((a) => [a.adj, a.comp, a.sup, a.he, a.lvl]),
    ),
  );
  md.push("");

  md.push(`## Articles a/an (${banks.ARTICLE_NOUNS.length})`);
  md.push("");
  md.push(
    table(
      ["Noun", "Article", "Hebrew"],
      banks.ARTICLE_NOUNS.map((a) => [a.noun, a.art, a.he]),
    ),
  );
  md.push("");

  md.push(`## Prepositions (${banks.PREP_ITEMS.length})`);
  md.push("");
  md.push(
    table(
      ["Sentence", "Correct", "Distractors", "Note (He)"],
      banks.PREP_ITEMS.map((p) => [
        `${p.before}___${p.after}`, p.correct, p.wrong.join(", "), p.he,
      ]),
    ),
  );
  md.push("");

  md.push(`## Irregular plurals (${banks.IRREGULAR_PLURALS.length})`);
  md.push("");
  md.push(
    table(
      ["Singular", "Plural", "Hebrew"],
      banks.IRREGULAR_PLURALS.map((p) => [p.sg, p.pl, p.he]),
    ),
  );
  md.push("");

  md.push(`## Countable / uncountable (${banks.COUNT_NOUNS.length})`);
  md.push("");
  md.push(
    table(
      ["Noun", "Type", "Hebrew"],
      banks.COUNT_NOUNS.map((c) => [c.noun, c.type, c.he]),
    ),
  );
  md.push("");

  md.push(`## Modals (${banks.MODAL_ITEMS.length})`);
  md.push("");
  md.push(
    table(
      ["Sentence", "Correct", "Distractors", "Note (He)"],
      banks.MODAL_ITEMS.map((m) => [
        `${m.before}___${m.after}`, m.correct, m.wrong.join(", "), m.he,
      ]),
    ),
  );
  md.push("");

  writeFileSync(join(outDir, "grammar-banks.md"), md.join("\n"), "utf8");
}

// --- index ---------------------------------------------------------------

{
  const total = (o) => LEVELS.reduce((s, l) => s + o[l].length, 0);
  const md = [];
  md.push("# High5 content inventory");
  md.push("");
  md.push(
    "Every word, sentence, passage and link the app can show, by CEFR level, and — for words, " +
      "reading, listening and speaking — the place to edit them. See **How editing works** below " +
      "before changing anything.",
  );
  md.push("");
  md.push(
    "Editing content? Check **[LEVEL-AUDIT.md](./LEVEL-AUDIT.md)** first — it flags specific " +
      "words and passages that are already miscalibrated for their level, so a fix doesn't just " +
      "add to the pile.",
  );
  md.push("");

  md.push("## Totals");
  md.push("");
  md.push(
    table(
      ["Level", "Words", "Reading passages", "Listening clips", "Speaking sentences", "Page"],
      LEVELS.map((l) => [
        l, words[l].length, readings[l].length, listenings[l].length, speaking[l].length, `[${l}.md](./${l}.md)`,
      ]).concat([
        ["**All**", total(words), total(readings), total(listenings), total(speaking), ""],
      ]),
    ),
  );
  md.push("");
  md.push(
    table(
      ["Also", "Items", "Page"],
      [
        ["External links (daily board)", operations.OPERATIONS.reduce((s, o) => s + o.links.length, 0), "[links-and-media.md](./links-and-media.md)"],
        ["Daily videos", LEVELS.reduce((s, l) => s + (videos.VIDEOS_BY_LEVEL[l] ?? []).length, 0), "[links-and-media.md](./links-and-media.md)"],
        ["Dialogue scenarios", topics.DIALOGUE_SCENARIOS.length, "[links-and-media.md](./links-and-media.md)"],
        ["Placement questions", placement.PLACEMENT_QUESTIONS.length, "[links-and-media.md](./links-and-media.md)"],
        ["Grammar bank rows", banks.VERBS.length + banks.ADJECTIVES.length + banks.ARTICLE_NOUNS.length + banks.PREP_ITEMS.length + banks.IRREGULAR_PLURALS.length + banks.COUNT_NOUNS.length + banks.MODAL_ITEMS.length, "[grammar-banks.md](./grammar-banks.md)"],
      ],
    ),
  );
  md.push("");

  md.push("## How editing works");
  md.push("");
  md.push(
    "**Words, reading passages, listening clips and speaking sentences are edited right here, " +
      "in these Markdown pages.** Change a translation, fix a sentence, add a row to a table — " +
      "then run:",
  );
  md.push("");
  md.push("```bash");
  md.push("npm run content:import  # docs/content/*.md → scripts/content/from-markdown.generated.mjs");
  md.push("npm run content          # → src/data/offline/*.json, what the app actually ships");
  md.push("npm test                 # offline.test.ts checks the generated corpus");
  md.push("```");
  md.push("");
  md.push(
    "Keep the table/heading structure intact — `content:import` parses these pages back into " +
      "data, so a word needs its full table row (`| # | word | part of speech | Hebrew | " +
      "definition | example (En) | example (He) | bank |`) and a question needs its ✓ column " +
      "on the correct option. `content:import` prints how many items ended up differing from " +
      "the original hand-written banks — that number growing is expected once you've made real " +
      "edits, not a sign anything broke.",
  );
  md.push("");
  md.push(
    "⚠️ **Don't run `npm run content:report` after you've started editing.** It rebuilds every " +
      "page from `scripts/content/*.mjs` — the *original* hand-written banks these pages were " +
      "bootstrapped from — and would overwrite your edits with that original content. It's a " +
      "reset button, not a refresh button.",
  );
  md.push("");
  md.push(
    table(
      ["To change…", "Edit"],
      [
        ["Vocabulary words", "the **Words** table on the level's page"],
        ["Reading passages", "the passage under **Reading passages**"],
        ["Listening clips", "the transcript under **Listening clips**"],
        ["Speaking sentences", "the **Speaking sentences** table"],
        ["Grammar question tables", "`scripts/content/banks.mjs` — no Markdown page yet"],
        ["External links / operation copy", "`src/data/operations.ts`"],
        ["Daily videos", "`src/data/videos.ts`"],
        ["Topics and dialogue scenarios", "`src/data/topics.ts`"],
        ["Placement test", "`src/data/placement.ts`"],
      ],
    ),
  );
  md.push("");

  md.push("## What the learner actually sees");
  md.push("");
  md.push(
    "These banks are the pool, not the schedule. `scripts/generate-content.mjs` expands them with a " +
      "seeded RNG into a **full year of daily material per level** (`src/data/offline/*.json`, ~17 MB, " +
      "quarter-split so a learner downloads only the current quarter). Per day that is 5 words, one lesson, " +
      "one quiz, one reading, one listening and one speaking set — so the same bank item recurs across the " +
      "year rather than being seen once.",
  );
  md.push("");
  md.push(
    "AI-backed features (lesson, vocabulary, quiz, speaking) use a live provider when an API key is set " +
      "and fall back to this bundled content otherwise. Reading and listening are always bundled. " +
      "The dialogue coach is the only feature with no offline content at all.",
  );
  md.push("");

  writeFileSync(join(outDir, "README.md"), md.join("\n"), "utf8");
}

console.log(`Wrote ${LEVELS.length + 3} pages to docs/content/`);
