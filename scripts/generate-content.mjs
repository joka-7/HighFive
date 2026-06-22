// Offline content generator for HighFive.
//
//   node scripts/generate-content.mjs
//
// Expands the curated banks (scripts/content/*) into a full year of daily
// content per CEFR level and writes it to src/data/offline/. Output is
// deterministic (seeded RNG) so re-running yields identical files.
//
// Grammar questions are built by rule from verified conjugation/article/
// comparative tables, so every correctIndex is correct by construction.
// Vocabulary, reading and listening come from hand-written banks.

import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { VERBS, ADJECTIVES, ARTICLE_NOUNS, PREP_ITEMS, WORD_BANKS } from "./content/banks.mjs";
import { READINGS, LISTENINGS, SPEAKING_SENTENCES } from "./content/passages.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "src", "data", "offline");

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const DAYS = 365; // one full year per level

// --- Deterministic RNG (mulberry32) ------------------------------------------
function rngFrom(seedStr) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
function shuffle(rng, arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build a 4-option MCQ: dedupe distractors, keep the correct answer, shuffle,
// and report the new correctIndex. Pads from a fallback pool if needed.
function mcq(rng, question, correct, distractors, explanation, fallback = []) {
  const opts = [];
  for (const d of [...distractors, ...fallback]) {
    if (d !== correct && !opts.includes(d) && opts.length < 3) opts.push(d);
  }
  if (opts.length < 3) throw new Error(`mcq could not build 4 options for: ${question}`);
  const all = shuffle(rng, [correct, ...opts]);
  return { question, options: all, correctIndex: all.indexOf(correct), explanation };
}

// --- Per-topic question generators (correct by construction) ------------------
const GEN = {
  presentSimple3rd(rng, ctx) {
    const v = pick(rng, ctx.verbs);
    const subj = pick(rng, ["She", "He", "The teacher", "My friend"]);
    return mcq(
      rng,
      `'${subj} ___ every day.' — choose the correct form of "${v.base}".`,
      v.third,
      [v.base, v.ing, v.past, v.pp],
      `עם גוף שלישי יחיד (${subj}) הפועל מקבל סיומת: ${v.third}.`,
      ["to " + v.base, "does " + v.base],
    );
  },
  pastSimple(rng, ctx) {
    const v = pick(rng, ctx.verbs);
    return mcq(
      rng,
      `What is the past simple of "${v.base}"?`,
      v.past,
      [v.base + "ed", v.pp, v.ing, v.base],
      `הצורה בעבר פשוט של ${v.base} (${v.he}) היא ${v.past}.`,
      ["did " + v.base, "has " + v.base],
    );
  },
  pastParticiple(rng, ctx) {
    const v = pick(rng, ctx.verbs);
    return mcq(
      rng,
      `'I have ___ it.' — past participle of "${v.base}"?`,
      v.pp,
      [v.past, v.base, v.ing],
      `ב-Present Perfect משתמשים ב-past participle: ${v.pp}.`,
      ["to " + v.base, "having " + v.base],
    );
  },
  articles(rng, ctx) {
    const n = pick(rng, ctx.nouns);
    return mcq(
      rng,
      `Choose the correct article: '___ ${n.noun}'.`,
      n.art,
      ["a", "an", "the", "—"],
      n.art === "an"
        ? `'${n.noun}' מתחילה בצליל תנועה, לכן 'an'.`
        : `'${n.noun}' מתחילה בצליל עיצור, לכן 'a'.`,
    );
  },
  comparatives(rng, ctx) {
    const a = pick(rng, ctx.adjs);
    return mcq(
      rng,
      `What is the comparative form of "${a.adj}" (${a.he})?`,
      a.comp,
      ["more " + a.adj, "most " + a.adj, a.sup],
      `צורת ההשוואה של ${a.adj} היא ${a.comp}.`,
      [a.adj + "er", a.adj + "est"],
    );
  },
  prepositions(rng, ctx) {
    const p = pick(rng, ctx.preps);
    return mcq(rng, `${p.before}___${p.after}`, p.correct, p.wrong, p.he);
  },
  vocabMeaning(rng, ctx) {
    const w = pick(rng, ctx.words);
    const others = shuffle(
      rng,
      ctx.words.filter((x) => x.translation !== w.translation),
    )
      .slice(0, 5)
      .map((x) => x.translation);
    return mcq(
      rng,
      `What does "${w.word}" mean?`,
      w.translation,
      others,
      `"${w.word}" = ${w.translation}. ${w.definition}.`,
    );
  },
};

// --- Per-level curriculum: rotating grammar/vocab topics ----------------------
// Each topic has a Hebrew explanation (shown in the lesson) and a generator key.
function curriculum(levelIdx) {
  const base = [
    { key: "vocabMeaning", title: "Vocabulary in Context (אוצר מילים בהקשר)", explanation: "בשיעור זה נתרגל מילים שימושיות ברמה שלך. לכל מילה יש תרגום, הגדרה ומשפט דוגמה. נסו לזכור לא רק את התרגום אלא גם איך משתמשים במילה במשפט." },
    { key: "prepositions", title: "Prepositions (מילות יחס)", explanation: "מילות יחס (in, on, at, to, for) מחברות בין מילים ומציינות מקום, זמן או כיוון. שימו לב: 'in' לערים ולתקופות, 'on' למשטחים ולימים, 'at' לשעה מדויקת ולמקום נקודתי." },
  ];
  const byLevel = [
    // A1
    [
      { key: "presentSimple3rd", title: "Present Simple (הווה פשוט)", explanation: "בהווה פשוט, עם גוף שלישי יחיד (he/she/it) מוסיפים לפועל סיומת -s או -es: she works, he goes, it watches. עם I/you/we/they הפועל נשאר בצורת הבסיס." },
      { key: "articles", title: "Articles a / an (תווית a / an)", explanation: "לפני שם עצם ביחיד משתמשים ב-'a' לפני צליל עיצור (a book) וב-'an' לפני צליל תנועה (an apple, an hour). הקובע הוא הצליל, לא האות." },
      { key: "pastSimple", title: "Past Simple (עבר פשוט)", explanation: "עבר פשוט מתאר פעולה שהסתיימה. פעלים רגילים מקבלים -ed (worked), אך פעלים רבים ונפוצים הם חריגים: go→went, eat→ate." },
    ],
    // A2
    [
      { key: "pastSimple", title: "Past Simple (עבר פשוט)", explanation: "עבר פשוט מתאר פעולה שהסתיימה בעבר. שימו לב לפעלים החריגים הנפוצים: buy→bought, think→thought, find→found." },
      { key: "comparatives", title: "Comparatives (יחסת השוואה)", explanation: "להשוואה בין שניים: שם תואר קצר מקבל -er (bigger), שם תואר ארוך מקבל 'more' לפניו (more expensive). יש חריגים: good→better, bad→worse." },
      { key: "presentSimple3rd", title: "Present Simple Review (חזרה על הווה פשוט)", explanation: "תזכורת: עם he/she/it הפועל מקבל -s/-es. שאלות ושלילה נבנות עם do/does." },
    ],
    // B1
    [
      { key: "pastParticiple", title: "Present Perfect (הווה מושלם)", explanation: "הווה מושלם (have/has + V3) מתאר פעולה מהעבר עם קשר להווה. ה-past participle של פעלים חריגים שונה מהעבר הפשוט: see→saw→seen, write→wrote→written." },
      { key: "comparatives", title: "Comparatives & Superlatives (השוואה והפלגה)", explanation: "השוואה בין שניים: -er / more. הפלגה (הטוב ביותר מכולם): -est / most, עם 'the': the biggest, the most important." },
    ],
    // B2
    [
      { key: "pastParticiple", title: "Perfect Tenses (זמני Perfect)", explanation: "זמני ה-Perfect מחברים בין נקודות זמן. שליטה ב-past participle של פעלים חריגים היא הבסיס לבנייתם הנכונה." },
      { key: "prepositions", title: "Dependent Prepositions (מילות יחס קבועות)", explanation: "פעלים ושמות תואר רבים מתחברים למילת יחס קבועה: good at, wait for, depend on. כדאי ללמוד את הצירוף כולו כיחידה אחת." },
    ],
    // C1
    [
      { key: "vocabMeaning", title: "Advanced Lexis (אוצר מילים מתקדם)", explanation: "ברמה זו הדגש הוא על דיוק ועל גוון (nuance). מילים כמו 'mitigate' או 'inherent' מאפשרות להביע רעיונות מורכבים בקצרה ובדייקנות." },
    ],
    // C2
    [
      { key: "vocabMeaning", title: "Precision & Nuance (דיוק וגוון)", explanation: "ברמת C2 ההבדל הוא בין מילה נכונה למילה מדויקת. שליטה במילים כמו 'ubiquitous' או 'tenuous' מעידה על שליטה כמעט-ילידית." },
    ],
  ];
  return [...byLevel[levelIdx], ...base];
}

// --- Build everything for one level ------------------------------------------
function buildLevel(level, levelIdx) {
  const ctx = {
    verbs: VERBS.filter((v) => v.lvl <= levelIdx),
    adjs: ADJECTIVES.filter((a) => a.lvl <= levelIdx),
    nouns: ARTICLE_NOUNS,
    preps: PREP_ITEMS,
    words: WORD_BANKS[level],
  };
  const topics = curriculum(levelIdx);

  // Vocabulary: 365 sets of 5, rotating the word bank so coverage spreads.
  const bank = WORD_BANKS[level];
  const vocabulary = [];
  for (let d = 0; d < DAYS; d++) {
    const words = [];
    for (let j = 0; j < 5; j++) words.push(bank[(d * 3 + j) % bank.length]);
    vocabulary.push({ words });
  }

  // Lessons: 365, rotating the curriculum; each has 3 freshly-generated Qs.
  const lessons = [];
  for (let d = 0; d < DAYS; d++) {
    const topic = topics[d % topics.length];
    const rng = rngFrom(`${level}:lesson:${d}`);
    const questions = [];
    for (let q = 0; q < 3; q++) questions.push(GEN[topic.key](rng, ctx));
    lessons.push({ title: topic.title, explanation: topic.explanation, questions });
  }

  // Quizzes: 365 sets of 5 mixed questions drawn from the level's generators.
  const genKeys = [...new Set(topics.map((t) => t.key))];
  const quizzes = [];
  for (let d = 0; d < DAYS; d++) {
    const rng = rngFrom(`${level}:quiz:${d}`);
    const questions = [];
    for (let q = 0; q < 5; q++) questions.push(GEN[pick(rng, genKeys)](rng, ctx));
    quizzes.push({ questions });
  }

  // Reading & Listening: emit the curated pool as-is. The app picks randomly,
  // so pool size = variety; padding to 365 would only duplicate bytes. Grow the
  // banks in passages.mjs to add variety here.
  const readings = READINGS[level];
  const listenings = LISTENINGS[level];

  // Speaking: 365 sets of 4 sentences, recombined from the level's pool.
  const sent = SPEAKING_SENTENCES[level];
  const speakings = [];
  for (let d = 0; d < DAYS; d++) {
    const rng = rngFrom(`${level}:speak:${d}`);
    const prompts = shuffle(rng, sent).slice(0, 4);
    speakings.push({ prompts });
  }

  return { vocabulary, lessons, quizzes, readings, listenings, speakings };
}

// --- Validation: schema + answer sanity --------------------------------------
function validateQuestion(q, where) {
  if (typeof q.question !== "string" || !q.question) throw new Error(`${where}: empty question`);
  if (!Array.isArray(q.options) || q.options.length !== 4) throw new Error(`${where}: need 4 options`);
  if (new Set(q.options).size !== 4) throw new Error(`${where}: duplicate options: ${q.options.join(" | ")}`);
  if (q.correctIndex < 0 || q.correctIndex > 3) throw new Error(`${where}: correctIndex out of range`);
  if (typeof q.explanation !== "string" || !q.explanation) throw new Error(`${where}: empty explanation`);
}

function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const summary = [];
  for (let i = 0; i < LEVELS.length; i++) {
    const level = LEVELS[i];
    const { vocabulary, lessons, quizzes, readings, listenings, speakings } = buildLevel(level, i);

    // Validate every generated question.
    lessons.forEach((l, d) => l.questions.forEach((q, n) => validateQuestion(q, `${level} lesson ${d} q${n}`)));
    quizzes.forEach((z, d) => z.questions.forEach((q, n) => validateQuestion(q, `${level} quiz ${d} q${n}`)));
    readings.forEach((r, d) => r.questions.forEach((q, n) => validateQuestion(q, `${level} reading ${d} q${n}`)));
    listenings.forEach((r, d) => r.questions.forEach((q, n) => validateQuestion(q, `${level} listening ${d} q${n}`)));
    vocabulary.forEach((v, d) => { if (v.words.length !== 5) throw new Error(`${level} vocab ${d}: need 5 words`); });
    speakings.forEach((s, d) => { if (s.prompts.length !== 4) throw new Error(`${level} speaking ${d}: need 4 prompts`); });

    const lc = level.toLowerCase();
    writeFileSync(join(OUT_DIR, `${lc}.json`), JSON.stringify({ vocabulary, lessons, quizzes }, null, 0));
    writeFileSync(join(OUT_DIR, `${lc}.reading.json`), JSON.stringify(readings, null, 0));
    writeFileSync(join(OUT_DIR, `${lc}.listening.json`), JSON.stringify(listenings, null, 0));
    writeFileSync(join(OUT_DIR, `${lc}.speaking.json`), JSON.stringify(speakings, null, 0));

    const distinctLessons = new Set(lessons.map((l) => JSON.stringify(l))).size;
    summary.push({
      level,
      lessons: lessons.length,
      distinctLessons,
      vocabSets: vocabulary.length,
      quizzes: quizzes.length,
      readingPool: READINGS[level].length,
      listeningPool: LISTENINGS[level].length,
      speakingPool: SPEAKING_SENTENCES[level].length,
    });
  }
  console.table(summary);
  const total = summary.reduce(
    (s, r) => s + r.lessons + r.vocabSets + r.quizzes + DAYS * 3,
    0,
  );
  console.log(`\nGenerated ${DAYS} days/level across ${LEVELS.length} levels. ~${total} content instances written to ${OUT_DIR}`);
}

main();
