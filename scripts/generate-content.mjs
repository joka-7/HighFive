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
import {
  VERBS,
  ADJECTIVES,
  ARTICLE_NOUNS,
  PREP_ITEMS,
  IRREGULAR_PLURALS,
  COUNT_NOUNS,
  MODAL_ITEMS,
  WORD_BANKS,
} from "./content/banks.mjs";
import { READINGS, LISTENINGS, SPEAKING_SENTENCES } from "./content/passages.mjs";
import { MORE_WORDS } from "./content/wordbank-extra.mjs";
import { MORE_WORDS2 } from "./content/wordbank-extra2.mjs";
import { MORE_WORDS3 } from "./content/wordbank-extra3.mjs";
import { MORE_WORDS4 } from "./content/wordbank-extra4.mjs";
import { MORE_WORDS5 } from "./content/wordbank-extra5.mjs";
import { MORE_WORDS6 } from "./content/wordbank-extra6.mjs";
import { MORE_WORDS7 } from "./content/wordbank-extra7.mjs";
import { MORE_WORDS8 } from "./content/wordbank-extra8.mjs";
import { MORE_WORDS9 } from "./content/wordbank-extra9.mjs";
import { MORE_READINGS, MORE_LISTENINGS } from "./content/passages-extra.mjs";
import { MORE_READINGS2, MORE_LISTENINGS2, MORE_SPEAKING } from "./content/passages-extra2.mjs";
import { MORE_READINGS3, MORE_LISTENINGS3, MORE_SPEAKING3 } from "./content/passages-extra3.mjs";
import { MORE_READINGS4, MORE_LISTENINGS4, MORE_SPEAKING4 } from "./content/passages-extra4.mjs";
import { MORE_READINGS5, MORE_LISTENINGS5, MORE_SPEAKING5 } from "./content/passages-extra5.mjs";
import { MORE_READINGS6, MORE_LISTENINGS6, MORE_SPEAKING6 } from "./content/passages-extra6.mjs";
import { MORE_READINGS7, MORE_LISTENINGS7, MORE_SPEAKING7 } from "./content/passages-extra7.mjs";
import { MORE_READINGS8, MORE_LISTENINGS8, MORE_SPEAKING8 } from "./content/passages-extra8.mjs";

// All extra vocabulary rounds, merged in order. Append new rounds here.
const WORD_ROUNDS = [MORE_WORDS, MORE_WORDS2, MORE_WORDS3, MORE_WORDS4, MORE_WORDS5, MORE_WORDS6, MORE_WORDS7, MORE_WORDS8, MORE_WORDS9];
const READING_ROUNDS = [MORE_READINGS, MORE_READINGS2, MORE_READINGS3, MORE_READINGS4, MORE_READINGS5, MORE_READINGS6, MORE_READINGS7, MORE_READINGS8];
const LISTENING_ROUNDS = [MORE_LISTENINGS, MORE_LISTENINGS2, MORE_LISTENINGS3, MORE_LISTENINGS4, MORE_LISTENINGS5, MORE_LISTENINGS6, MORE_LISTENINGS7, MORE_LISTENINGS8];
const SPEAKING_ROUNDS = [MORE_SPEAKING, MORE_SPEAKING3, MORE_SPEAKING4, MORE_SPEAKING5, MORE_SPEAKING6, MORE_SPEAKING7, MORE_SPEAKING8];
const merge = (rounds, level) => rounds.flatMap((r) => r[level] || []);

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

// Build a 4-option MCQ with optional Hebrew translations for question/options.
function mcq(rng, question, correct, distractors, explanation, fallback = [], he = {}) {
  const opts = [];
  for (const d of [...distractors, ...fallback]) {
    if (d !== correct && !opts.includes(d) && opts.length < 3) opts.push(d);
  }
  if (opts.length < 3) throw new Error(`mcq could not build 4 options for: ${question}`);
  const all = shuffle(rng, [correct, ...opts]);
  const out = {
    question,
    options: all,
    correctIndex: all.indexOf(correct),
    explanation,
  };
  if (he.questionHe) out.questionHe = he.questionHe;
  if (he.optionsHe) out.optionsHe = he.optionsHe;
  return out;
}

// Build `count` questions that are distinct within the set. `make` produces one
// (already randomized) question; we retry when it repeats a question text
// already chosen, so no lesson/quiz shows the same question twice. Retries are
// bounded so a small generator pool can't loop forever — the guard in main()
// then fails the build if a set still couldn't be filled with unique questions.
function genDistinct(make, count, maxTriesPerItem = 60) {
  const out = [];
  const seen = new Set();
  let tries = 0;
  while (out.length < count && tries < count * maxTriesPerItem) {
    tries++;
    const q = make();
    if (seen.has(q.question)) continue;
    seen.add(q.question);
    out.push(q);
  }
  return out;
}

// Simple sentence templates using only starter grammar + one target word.
const READ_TEMPLATES = [
  { en: (w) => `I like ${w.word}.`, he: (w) => `אני אוהב את ${w.translation}.` },
  { en: (w) => `I have ${w.word}.`, he: (w) => `יש לי ${w.translation}.` },
  { en: (w) => `This is my ${w.word}.`, he: (w) => `זה ה${w.translation} שלי.` },
  { en: (w) => `I see ${w.word}.`, he: (w) => `אני רואה ${w.translation}.` },
  { en: (w) => `We use ${w.word}.`, he: (w) => `אנחנו משתמשים ב${w.translation}.` },
];

function buildProgressiveReading(day, vocabulary, bank, rng) {
  const today = vocabulary[day].words;
  const glossary = today.slice(0, 3);
  const sentences = today.map((w, i) => READ_TEMPLATES[i % READ_TEMPLATES.length]);
  const text = sentences.map((t, i) => t.en(today[i])).join(" ");
  const textHe = sentences.map((t, i) => t.he(today[i])).join(" ");
  const title = `Today's Words (מילות היום)`;
  const distractorPool = bank.map((w) => w.word).filter((w) => !today.some((t) => t.word === w));

  const w0 = today[0];
  const w1 = today[1] ?? today[0];
  const q1 = mcq(
    rng,
    `Which word means "${w0.translation}"?`,
    w0.word,
    shuffle(rng, distractorPool).slice(0, 3),
    `המילה "${w0.word}" פירושה ${w0.translation}.`,
    ["table", "chair", "window"],
    {
      questionHe: `איזו מילה פירושה "${w0.translation}"?`,
      optionsHe: shuffle(rng, [w0.word, ...shuffle(rng, distractorPool).slice(0, 3)]).map((opt) => {
        const hit = bank.find((b) => b.word === opt);
        return hit ? hit.translation : opt;
      }),
    },
  );
  // Fix optionsHe order to match shuffled options in q1
  q1.optionsHe = q1.options.map((opt) => {
    const hit = [...today, ...bank].find((b) => b.word === opt);
    return hit ? hit.translation : opt;
  });

  const q2 = mcq(
    rng,
    `Which word means "${w1.translation}"?`,
    w1.word,
    shuffle(rng, distractorPool).slice(0, 3),
    `המילה "${w1.word}" פירושה ${w1.translation}.`,
    ["happy", "sad", "big"],
    { questionHe: `איזו מילה פירושה "${w1.translation}"?` },
  );
  q2.optionsHe = q2.options.map((opt) => {
    const hit = [...today, ...bank].find((b) => b.word === opt);
    return hit ? hit.translation : opt;
  });

  return { title, text, textHe, glossary, questions: [q1, q2] };
}

function buildProgressiveListening(day, vocabulary, bank, rng) {
  const reading = buildProgressiveReading(day, vocabulary, bank, rng);
  const transcript = reading.text;
  const transcriptHe = reading.textHe;
  return { transcript, transcriptHe, questions: reading.questions };
}

function buildProgressiveSpeaking(day, vocabulary) {
  const today = vocabulary[day].words;
  const prompts = [];
  for (let i = 0; i < 4; i++) {
    const w = today[i % today.length];
    const t = READ_TEMPLATES[i % READ_TEMPLATES.length];
    prompts.push({ text: t.en(w), translation: t.he(w) });
  }
  return { prompts };
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
  plurals(rng, ctx) {
    const n = pick(rng, ctx.plurals);
    return mcq(
      rng,
      `What is the plural of "${n.sg}" (${n.he})?`,
      n.pl,
      [n.sg + "s", n.sg + "es"],
      `הרבים של ${n.sg} הוא ${n.pl} (צורה חריגה — לא רק תוספת s).`,
      [n.pl + "s", n.sg + "ren"],
    );
  },
  quantifier(rng, ctx) {
    const n = pick(rng, ctx.countNouns);
    const correct = n.type === "uncount" ? "much" : "many";
    return mcq(
      rng,
      `'How ___ ${n.noun} do you need?'`,
      correct,
      ["much", "many", "some", "any"].filter((x) => x !== correct),
      n.type === "uncount"
        ? `'${n.noun}' (${n.he}) אינו נספר, ולכן 'much'.`
        : `'${n.noun}' (${n.he}) נספר ברבים, ולכן 'many'.`,
    );
  },
  presentContinuous(rng, ctx) {
    const v = pick(rng, ctx.verbs);
    return mcq(
      rng,
      `'She is ___ now.' — the -ing form of "${v.base}"?`,
      v.ing,
      [v.base + "ing", v.base, v.third],
      `צורת ה-ing של ${v.base} היא ${v.ing}.`,
      ["been " + v.ing, "to " + v.base],
    );
  },
  modals(rng, ctx) {
    const m = pick(rng, ctx.modals);
    return mcq(rng, `${m.before}___${m.after}`, m.correct, m.wrong, m.he);
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
      { key: "plurals", title: "Plural Nouns (שמות עצם ברבים)", explanation: "רוב שמות העצם מקבלים -s ברבים (book→books), אך יש חריגים שצריך לזכור בעל-פה: child→children, man→men, foot→feet." },
      { key: "presentContinuous", title: "Present Continuous (הווה ממושך)", explanation: "הווה ממושך (am/is/are + V-ing) מתאר פעולה שקורית עכשיו: She is running. שימו לב לכתיב: run→running (הכפלת אות), make→making (השמטת e)." },
    ],
    // A2
    [
      { key: "pastSimple", title: "Past Simple (עבר פשוט)", explanation: "עבר פשוט מתאר פעולה שהסתיימה בעבר. שימו לב לפעלים החריגים הנפוצים: buy→bought, think→thought, find→found." },
      { key: "comparatives", title: "Comparatives (יחסת השוואה)", explanation: "להשוואה בין שניים: שם תואר קצר מקבל -er (bigger), שם תואר ארוך מקבל 'more' לפניו (more expensive). יש חריגים: good→better, bad→worse." },
      { key: "quantifier", title: "Much / Many (כמת)", explanation: "עם שמות עצם שאינם נספרים משתמשים ב-'much' (much water), ועם שמות עצם נספרים ברבים ב-'many' (many books)." },
      { key: "presentSimple3rd", title: "Present Simple Review (חזרה על הווה פשוט)", explanation: "תזכורת: עם he/she/it הפועל מקבל -s/-es. שאלות ושלילה נבנות עם do/does." },
      { key: "prepositions", title: "Prepositions of Time & Place (מילות יחס)", explanation: "'in' לערים, חודשים ושנים; 'on' לימים ולמשטחים; 'at' לשעה מדויקת ולמקום נקודתי." },
    ],
    // B1
    [
      { key: "pastParticiple", title: "Present Perfect (הווה מושלם)", explanation: "הווה מושלם (have/has + V3) מתאר פעולה מהעבר עם קשר להווה. ה-past participle של פעלים חריגים שונה מהעבר הפשוט: see→saw→seen, write→wrote→written." },
      { key: "comparatives", title: "Comparatives & Superlatives (השוואה והפלגה)", explanation: "השוואה בין שניים: -er / more. הפלגה (הטוב ביותר מכולם): -est / most, עם 'the': the biggest, the most important." },
      { key: "modals", title: "Modal Verbs (פעלים מודאליים)", explanation: "פעלי עזר מודאליים משנים את משמעות הפועל: can (יכולת), should (המלצה), must (הכרח), might (אפשרות), mustn't (איסור)." },
      { key: "prepositions", title: "Dependent Prepositions (מילות יחס קבועות)", explanation: "פעלים ושמות תואר רבים מתחברים למילת יחס קבועה: good at, wait for, depend on, interested in. כדאי ללמוד את הצירוף כולו כיחידה אחת." },
    ],
    // B2
    [
      { key: "pastParticiple", title: "Perfect Tenses (זמני Perfect)", explanation: "זמני ה-Perfect מחברים בין נקודות זמן. שליטה ב-past participle של פעלים חריגים היא הבסיס לבנייתם הנכונה." },
      { key: "prepositions", title: "Dependent Prepositions (מילות יחס קבועות)", explanation: "פעלים ושמות תואר רבים מתחברים למילת יחס קבועה: good at, wait for, depend on. כדאי ללמוד את הצירוף כולו כיחידה אחת." },
      { key: "modals", title: "Modals of Deduction & Advice (מודאליים)", explanation: "מודאליים מביעים גם הסקה והמלצה: must (בטוח), might (ייתכן), should (כדאי), mustn't (אסור). שימו לב להבדל ביניהם." },
      { key: "vocabMeaning", title: "Academic Vocabulary (אוצר מילים אקדמי)", explanation: "ברמה זו נכנסות מילים מופשטות ונפוצות בכתיבה רשמית: significant, establish, demonstrate, framework. למדו אותן בהקשר." },
    ],
    // C1
    [
      { key: "vocabMeaning", title: "Advanced Lexis (אוצר מילים מתקדם)", explanation: "ברמה זו הדגש הוא על דיוק ועל גוון (nuance). מילים כמו 'mitigate' או 'inherent' מאפשרות להביע רעיונות מורכבים בקצרה ובדייקנות." },
      { key: "vocabMeaning", title: "Connectors & Register (מילות קישור ומשלב)", explanation: "מילים כמו nevertheless, albeit, notwithstanding מעלות את המשלב של הטקסט. שליטה בהן מבדילה כתיבה שוטפת מכתיבה מתקדמת." },
    ],
    // C2
    [
      { key: "vocabMeaning", title: "Precision & Nuance (דיוק וגוון)", explanation: "ברמת C2 ההבדל הוא בין מילה נכונה למילה מדויקת. שליטה במילים כמו 'ubiquitous' או 'tenuous' מעידה על שליטה כמעט-ילידית." },
      { key: "vocabMeaning", title: "Idiomatic & Formal Lexis (אוצר מילים גבוה)", explanation: "ברמה הגבוהה ביותר משלבים מילים נדירות ומדויקות כמו 'quintessential' או 'cogent' באופן טבעי וללא מאמץ ניכר." },
    ],
  ];
  return [...byLevel[levelIdx], ...base];
}

// --- Build everything for one level ------------------------------------------
function buildLevel(level, levelIdx) {
  const allWords = [...WORD_BANKS[level], ...merge(WORD_ROUNDS, level)];
  const ctx = {
    verbs: VERBS.filter((v) => v.lvl <= levelIdx),
    adjs: ADJECTIVES.filter((a) => a.lvl <= levelIdx),
    nouns: ARTICLE_NOUNS,
    preps: PREP_ITEMS,
    plurals: IRREGULAR_PLURALS,
    countNouns: COUNT_NOUNS,
    modals: MODAL_ITEMS,
    words: allWords,
  };
  const topics = curriculum(levelIdx);

  // Vocabulary: 365 sets of 5, rotating the word bank so coverage spreads.
  const bank = allWords;
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
    const questions = genDistinct(() => GEN[topic.key](rng, ctx), 3);
    lessons.push({ title: topic.title, explanation: topic.explanation, questions });
  }

  // Quizzes: 365 sets of 5 mixed questions drawn from the level's generators.
  const genKeys = [...new Set(topics.map((t) => t.key))];
  const quizzes = [];
  for (let d = 0; d < DAYS; d++) {
    const rng = rngFrom(`${level}:quiz:${d}`);
    const questions = genDistinct(() => GEN[pick(rng, genKeys)](rng, ctx), 5);
    quizzes.push({ questions });
  }

  // Reading & Listening: 365 progressive sets using only cumulative vocabulary.
  const readings = [];
  const listenings = [];
  for (let d = 0; d < DAYS; d++) {
    const rng = rngFrom(`${level}:read:${d}`);
    readings.push(buildProgressiveReading(d, vocabulary, bank, rng));
    listenings.push(buildProgressiveListening(d, vocabulary, bank, rng));
  }

  // Speaking: 365 progressive sets tied to today's vocabulary.
  const speakings = [];
  for (let d = 0; d < DAYS; d++) {
    speakings.push(buildProgressiveSpeaking(d, vocabulary));
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

// A lesson/quiz must have the expected number of questions, all distinct — no
// learner should see the same question twice in one set.
function validateQuestionSet(questions, expected, where) {
  if (questions.length !== expected) {
    throw new Error(`${where}: expected ${expected} questions, got ${questions.length}`);
  }
  const texts = questions.map((q) => q.question);
  if (new Set(texts).size !== texts.length) {
    throw new Error(`${where}: duplicate question within the set`);
  }
}

function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const summary = [];
  for (let i = 0; i < LEVELS.length; i++) {
    const level = LEVELS[i];

    // Sanity-check the merged source word bank: no duplicate words, no missing
    // fields (base + extra together).
    const mergedBank = [...WORD_BANKS[level], ...merge(WORD_ROUNDS, level)];
    const bankWords = mergedBank.map((w) => w.word);
    const dup = bankWords.find((w, n) => bankWords.indexOf(w) !== n);
    if (dup) throw new Error(`${level} word bank has duplicate word: "${dup}"`);
    for (const w of mergedBank) {
      if (!w.word || !w.translation || !w.definition || !w.example) {
        throw new Error(`${level} word bank: incomplete entry ${JSON.stringify(w)}`);
      }
    }

    const { vocabulary, lessons, quizzes, readings, listenings, speakings } = buildLevel(level, i);

    // Validate every generated question, and that each set has the right number
    // of distinct questions.
    lessons.forEach((l, d) => {
      validateQuestionSet(l.questions, 3, `${level} lesson ${d}`);
      l.questions.forEach((q, n) => validateQuestion(q, `${level} lesson ${d} q${n}`));
    });
    quizzes.forEach((z, d) => {
      validateQuestionSet(z.questions, 5, `${level} quiz ${d}`);
      z.questions.forEach((q, n) => validateQuestion(q, `${level} quiz ${d} q${n}`));
    });
    readings.forEach((r, d) => {
      if (!r.textHe) throw new Error(`${level} reading ${d}: missing textHe`);
      r.questions.forEach((q, n) => validateQuestion(q, `${level} reading ${d} q${n}`));
    });
    listenings.forEach((r, d) => {
      if (!r.transcriptHe) throw new Error(`${level} listening ${d}: missing transcriptHe`);
      r.questions.forEach((q, n) => validateQuestion(q, `${level} listening ${d} q${n}`));
    });
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
      distinctWords: mergedBank.length,
      lessons: lessons.length,
      distinctLessons,
      vocabSets: vocabulary.length,
      quizzes: quizzes.length,
      readingPool: readings.length,
      listeningPool: listenings.length,
      speakingPool: speakings.length,
      speakingSentences: SPEAKING_SENTENCES[level].length + merge(SPEAKING_ROUNDS, level).length,
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
