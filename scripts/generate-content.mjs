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
import { MORE_WORDS10 } from "./content/wordbank-extra10.mjs";
import { MORE_READINGS, MORE_LISTENINGS } from "./content/passages-extra.mjs";
import { MORE_READINGS2, MORE_LISTENINGS2, MORE_SPEAKING } from "./content/passages-extra2.mjs";
import { MORE_READINGS3, MORE_LISTENINGS3, MORE_SPEAKING3 } from "./content/passages-extra3.mjs";
import { MORE_READINGS4, MORE_LISTENINGS4, MORE_SPEAKING4 } from "./content/passages-extra4.mjs";
import { MORE_READINGS5, MORE_LISTENINGS5, MORE_SPEAKING5 } from "./content/passages-extra5.mjs";
import { MORE_READINGS6, MORE_LISTENINGS6, MORE_SPEAKING6 } from "./content/passages-extra6.mjs";
import { MORE_READINGS7, MORE_LISTENINGS7, MORE_SPEAKING7 } from "./content/passages-extra7.mjs";
import { MORE_READINGS8, MORE_LISTENINGS8, MORE_SPEAKING8 } from "./content/passages-extra8.mjs";
import { MORE_READINGS9, MORE_LISTENINGS9, MORE_SPEAKING9 } from "./content/passages-extra9.mjs";

// All extra vocabulary rounds, merged in order. Append new rounds here.
const WORD_ROUNDS = [MORE_WORDS, MORE_WORDS2, MORE_WORDS3, MORE_WORDS4, MORE_WORDS5, MORE_WORDS6, MORE_WORDS7, MORE_WORDS8, MORE_WORDS9, MORE_WORDS10];
const READING_ROUNDS = [MORE_READINGS, MORE_READINGS2, MORE_READINGS3, MORE_READINGS4, MORE_READINGS5, MORE_READINGS6, MORE_READINGS7, MORE_READINGS8, MORE_READINGS9];
const LISTENING_ROUNDS = [MORE_LISTENINGS, MORE_LISTENINGS2, MORE_LISTENINGS3, MORE_LISTENINGS4, MORE_LISTENINGS5, MORE_LISTENINGS6, MORE_LISTENINGS7, MORE_LISTENINGS8, MORE_LISTENINGS9];
const SPEAKING_ROUNDS = [MORE_SPEAKING, MORE_SPEAKING3, MORE_SPEAKING4, MORE_SPEAKING5, MORE_SPEAKING6, MORE_SPEAKING7, MORE_SPEAKING8, MORE_SPEAKING9];
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
  if (he.optionHe) out.optionsHe = all.map((opt) => he.optionHe(opt));
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

import { EXAMPLE_HE } from "./content/example-he.mjs";

// Last-resort English fallbacks when the example sentence lacks the target word.
const FALLBACK_EN = {
  verb: [
    (w) => `I ${w.word} every day.`,
    (w) => `Please ${w.word}.`,
    (w) => `She can ${w.word}.`,
  ],
  noun: [
    (w) => `I see the ${w.word}.`,
    (w) => `This is a ${w.word}.`,
    (w) => `I like the ${w.word}.`,
  ],
  adjective: [
    (w) => `It is ${w.word}.`,
    (w) => `She looks ${w.word}.`,
    (w) => `That is very ${w.word}.`,
  ],
  adverb: [
    (w) => `She walks ${w.word}.`,
    (w) => `He speaks ${w.word}.`,
  ],
  conjunction: [(w) => `I stayed home ${w.word} I was tired.`],
  preposition: [(w) => `The book is ${w.word} the table.`],
};
const FALLBACK_HE = {
  verb: [
    (w) => `אני ${w.translation} כל יום.`,
    (w) => `בבקשה ${w.translation}.`,
    (w) => `היא יכולה ${w.translation}.`,
  ],
  noun: [
    (w) => `אני רואה את ה${w.translation}.`,
    (w) => `זה ${w.translation}.`,
    (w) => `אני אוהב את ה${w.translation}.`,
  ],
  adjective: [
    (w) => `זה ${w.translation}.`,
    (w) => `היא נראית ${w.translation}.`,
    (w) => `זה מאוד ${w.translation}.`,
  ],
  adverb: [
    (w) => `היא הולכת ${w.translation}.`,
    (w) => `הוא מדבר ${w.translation}.`,
  ],
  conjunction: [(w) => `נשארתי בבית ${w.translation} הייתי עייף.`],
  preposition: [(w) => `הספר ${w.translation} השולחן.`],
};

function wordFormInText(text, word) {
  if (!text || !word) return null;
  const tokens = text.match(/\b[\w']+\b/g) || [];
  const lw = word.toLowerCase();
  const candidates = [lw, lw + "s", lw + "es", lw + "ed", lw + "ing"];
  if (lw.endsWith("e")) candidates.push(lw.slice(0, -1) + "ing");
  if (lw.endsWith("y")) candidates.push(lw.slice(0, -1) + "ies", lw.slice(0, -1) + "ied");
  for (const tok of tokens) {
    const lt = tok.toLowerCase();
    if (candidates.includes(lt)) return tok;
  }
  return null;
}

function blankWordInText(text, word) {
  const form = wordFormInText(text, word);
  if (!form) return text;
  const escaped = form.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(`\\b${escaped}\\b`, "i"), "___");
}

function enrichWord(w, level) {
  const key = `${level}:${w.word}`;
  const exampleHe = w.exampleHe ?? EXAMPLE_HE[key];
  return exampleHe ? { ...w, exampleHe } : { ...w };
}

function englishSentence(w, templateIndex = 0) {
  if (w.example && wordFormInText(w.example, w.word)) return w.example;
  const pos = w.partOfSpeech || "noun";
  const fallbacks = FALLBACK_EN[pos] || FALLBACK_EN.noun;
  return fallbacks[templateIndex % fallbacks.length](w);
}

function hebrewSentence(w, level, templateIndex = 0) {
  const enriched = enrichWord(w, level);
  if (enriched.exampleHe) return enriched.exampleHe;
  const pos = w.partOfSpeech || "noun";
  const fallbacks = FALLBACK_HE[pos] || FALLBACK_HE.noun;
  return fallbacks[templateIndex % fallbacks.length](w);
}

function sentenceForWord(w, level, templateIndex = 0) {
  return englishSentence(w, templateIndex);
}

/** Ask which English word fits a real sentence — not a circular "which word is X". */
function buildExampleMcq(rng, w, today, bank, distractorPool, contextNote, level, templateIndex = 0,
                          hint = "") {
  const sentence = blankWordInText(sentenceForWord(w, level, templateIndex), w.word);
  const hintSuffix = hint ? ` ${hint}` : "";
  const context =
    contextNote === "from the passage"
      ? "מתוך הקטע"
      : contextNote
        ? contextNote
        : null;
  return mcq(
    rng,
    `Which word completes the sentence: "${sentence}"${hintSuffix}`,
    w.word,
    shuffle(rng, distractorPool).slice(0, 3),
    `"${w.word}" = ${w.translation}. ${w.definition}.`,
    ["table", "chair", "window"],
    {
      questionHe: `איזו מילה משלימה את המשפט: "${sentence}"?${hintSuffix}${context ? ` (${context})` : ""}`,
      optionHe: (opt) => wordTranslation(opt, today, bank),
    },
  );
}

function uniqueExampleMcq(rng, w, today, bank, distractorPool, contextNote, level, startTemplate,
                          usedQuestions) {
  const hints = [
    "",
    `(${w.definition})`,
    w.partOfSpeech ? `(a ${w.partOfSpeech})` : "",
    `(${w.word.length} letters)`,
  ].filter((h, i, arr) => h !== "" || i === 0);
  const templateCount = 5;
  for (let t = 0; t < templateCount; t++) {
    const ti = (startTemplate + t) % templateCount;
    for (const hint of hints) {
      const q = buildExampleMcq(rng, w, today, bank, distractorPool, contextNote, level, ti, hint);
      if (!usedQuestions.has(q.question)) return q;
    }
  }
  const fallback = buildExampleMcq(
    rng, w, today, bank, distractorPool, contextNote, level, startTemplate,
    `(today's word #${today.indexOf(w) + 1})`,
  );
  return fallback;
}

function buildProgressiveReading(day, vocabulary, bank, level, rng) {
  const today = vocabulary[day].words;
  const glossary = today.slice(0, 3);
  const sentences = today.map((w, i) => englishSentence(w, i));
  const text = sentences.join(" ");
  const textHe = today.map((w, i) => hebrewSentence(w, level, i)).join(" ");
  const title = `Today's Words (מילות היום)`;
  const distractorPool = bank.map((w) => w.word).filter((w) => !today.some((t) => t.word === w));

  const w0 = today[0];
  const w1 = today[1] ?? today[0];
  const q1 = buildExampleMcq(rng, w0, today, bank, distractorPool, "from the passage", level, 0);
  const q2 = buildExampleMcq(rng, w1, today, bank, distractorPool, "from the passage", level, 1);

  return { title, text, textHe, glossary, questions: [q1, q2] };
}

function wordTranslation(opt, today, bank) {
  const hit = today.find((b) => b.word === opt) ?? bank.find((b) => b.word === opt);
  return hit ? hit.translation : opt;
}

function buildProgressiveQuiz(day, vocabulary, bank, level, rng) {
  const today = vocabulary[day].words;
  const distractorPool = bank.map((w) => w.word).filter((w) => !today.some((t) => t.word === w));
  const usedQuestions = new Set();
  const questions = today.map((w, i) => {
    const q = uniqueExampleMcq(rng, w, today, bank, distractorPool, null, level, i, usedQuestions);
    usedQuestions.add(q.question);
    return q;
  });
  return { questions };
}

function buildProgressiveListening(day, vocabulary, bank, level, rng) {
  const reading = buildProgressiveReading(day, vocabulary, bank, level, rng);
  const transcript = reading.text;
  const transcriptHe = reading.textHe;
  return { transcript, transcriptHe, questions: reading.questions };
}

function buildProgressiveSpeaking(day, vocabulary, level) {
  const today = vocabulary[day].words;
  const prompts = [];
  for (let i = 0; i < 4; i++) {
    const w = today[i % today.length];
    prompts.push({
      text: englishSentence(w, i),
      translation: hebrewSentence(w, level, i),
    });
  }
  return { prompts };
}

// --- Curated pools ------------------------------------------------------------
// The day-aligned reading/listening arrays above are *progressive*: they are
// built from the learner's five words of the day, so they are always
// vocabulary-safe but they read like word drills. The curated banks in
// scripts/content/passages*.mjs are real hand-written passages — the app
// prefers one of those whenever the learner's vocabulary already covers it
// (see services/content.ts) and falls back to the progressive text otherwise.
//
// An item only qualifies if it is fully bilingual, because the Reading and
// Listening screens require a Hebrew translation and the quiz runner shows
// Hebrew questions. Add `textHe`/`transcriptHe` + `questionHe` to an older
// round (see passages-extra9.mjs for the shape) and it joins the pool.

function questionsAreBilingual(questions) {
  return (
    Array.isArray(questions) &&
    questions.length > 0 &&
    questions.every((q) => typeof q.questionHe === "string" && q.questionHe.length > 0)
  );
}

function curatedReadings(level) {
  return [...READINGS[level], ...merge(READING_ROUNDS, level)].filter(
    (r) => r.textHe && questionsAreBilingual(r.questions),
  );
}

function curatedListenings(level) {
  return [...LISTENINGS[level], ...merge(LISTENING_ROUNDS, level)].filter(
    (l) => l.transcriptHe && questionsAreBilingual(l.questions),
  );
}

/** Curated speaking sentences grouped into full rounds of 4. */
function curatedSpeaking(level) {
  const sentences = [...SPEAKING_SENTENCES[level], ...merge(SPEAKING_ROUNDS, level)].filter(
    (s) => s && s.text && s.translation,
  );
  const sets = [];
  for (let i = 0; i + 4 <= sentences.length; i += 4) {
    sets.push({ prompts: sentences.slice(i, i + 4) });
  }
  return sets;
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
      {
        questionHe: `'${subj} ___ every day.' — בחרו את הצורה הנכונה של "${v.base}" (${v.he}).`,
        optionHe: (opt) => opt,
      },
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
      {
        questionHe: `מה הצורה בעבר פשוט של "${v.base}" (${v.he})?`,
        optionHe: (opt) => opt,
      },
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
      {
        questionHe: `'I have ___ it.' — מה ה-past participle של "${v.base}" (${v.he})?`,
        optionHe: (opt) => opt,
      },
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
      ["some", "any"],
      {
        questionHe: `בחרו את ה-article הנכון: '___ ${n.noun}'.`,
        optionHe: (opt) => opt,
      },
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
      {
        questionHe: `מה צורת ההשוואה (comparative) של "${a.adj}" (${a.he})?`,
        optionHe: (opt) => opt,
      },
    );
  },
  prepositions(rng, ctx) {
    const p = pick(rng, ctx.preps);
    return mcq(rng, `${p.before}___${p.after}`, p.correct, p.wrong, p.he, [], {
      questionHe: p.questionHe ?? `${p.before}___${p.after}`,
      optionHe: (opt) => opt,
    });
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
      {
        questionHe: `מה הרבים של "${n.sg}" (${n.he})?`,
        optionHe: (opt) => opt,
      },
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
      ["few", "little"],
      {
        questionHe: `'How ___ ${n.noun} do you need?' — בחרו את המילה הנכונה.`,
        optionHe: (opt) => opt,
      },
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
      {
        questionHe: `'She is ___ now.' — מה צורת ה-ing של "${v.base}" (${v.he})?`,
        optionHe: (opt) => opt,
      },
    );
  },
  modals(rng, ctx) {
    const m = pick(rng, ctx.modals);
    return mcq(rng, `${m.before}___${m.after}`, m.correct, m.wrong, m.he, [], {
      questionHe: m.questionHe ?? `${m.before}___${m.after}`,
      optionHe: (opt) => opt,
    });
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
      ["שולחן", "דלת", "חלון"],
      {
        questionHe: `מה הפירוש של "${w.word}"?`,
        optionHe: (opt) => opt,
      },
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

  // Vocabulary: 365 sets of 5, walking the word bank five at a time. The
  // stride matches the set size on purpose — with a smaller stride consecutive
  // days overlapped, so a "five new words a day" promise really delivered
  // three, and a five-day cycle covered fewer than the 20 words the
  // Memorization day reviews (see src/utils/cycle.ts).
  const bank = allWords.map((w) => enrichWord(w, level));
  const vocabulary = [];
  for (let d = 0; d < DAYS; d++) {
    const words = [];
    for (let j = 0; j < 5; j++) words.push(bank[(d * 5 + j) % bank.length]);
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

  // Quizzes: 365 progressive sets using today's vocabulary words.
  const quizzes = [];
  for (let d = 0; d < DAYS; d++) {
    const rng = rngFrom(`${level}:quiz:${d}`);
    quizzes.push(buildProgressiveQuiz(d, vocabulary, bank, level, rng));
  }

  // Reading & Listening: 365 progressive sets using only cumulative vocabulary.
  const readings = [];
  const listenings = [];
  for (let d = 0; d < DAYS; d++) {
    const rng = rngFrom(`${level}:read:${d}`);
    readings.push(buildProgressiveReading(d, vocabulary, bank, level, rng));
    listenings.push(buildProgressiveListening(d, vocabulary, bank, level, rng));
  }

  // Speaking: 365 progressive sets tied to today's vocabulary.
  const speakings = [];
  for (let d = 0; d < DAYS; d++) {
    speakings.push(buildProgressiveSpeaking(d, vocabulary, level));
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
  if (typeof q.questionHe !== "string" || !q.questionHe) throw new Error(`${where}: missing questionHe`);
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
  // Flat per-level word list (tokens only). The app unions every level at or
  // below the learner's into their allowed vocabulary, so content is judged
  // against everything the curriculum teaches up to that point rather than
  // against the current level's bank alone.
  const vocabIndex = {};
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
      if (!enrichWord(w, level).exampleHe) {
        throw new Error(`${level} word bank: missing exampleHe for "${w.word}"`);
      }
    }

    vocabIndex[level] = [
      ...new Set(
        mergedBank.flatMap((w) => w.word.toLowerCase().split(/\s+/).filter(Boolean)),
      ),
    ].sort();

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
    vocabulary.forEach((v, d) => {
      if (v.words.length !== 5) throw new Error(`${level} vocab ${d}: need 5 words`);
      if (new Set(v.words.map((w) => w.word)).size !== 5) {
        throw new Error(`${level} vocab ${d}: repeated word in the day's five`);
      }
    });
    // A five-day cycle must expose 20 distinct words — that is what the
    // Memorization day reviews.
    for (let d = 0; d + 4 <= vocabulary.length; d += 5) {
      const cycle = vocabulary.slice(d, d + 4).flatMap((v) => v.words.map((w) => w.word));
      if (new Set(cycle).size !== 20) {
        throw new Error(`${level} cycle at day ${d}: expected 20 distinct words`);
      }
    }
    speakings.forEach((s, d) => { if (s.prompts.length !== 4) throw new Error(`${level} speaking ${d}: need 4 prompts`); });

    // Curated (hand-written) pools, validated to the same standard.
    const readingPool = curatedReadings(level);
    const listeningPool = curatedListenings(level);
    const speakingPool = curatedSpeaking(level);
    readingPool.forEach((r, d) => {
      if (!r.text || !r.textHe) throw new Error(`${level} curated reading ${d}: missing text`);
      if (!Array.isArray(r.glossary) || r.glossary.length === 0) {
        throw new Error(`${level} curated reading ${d}: empty glossary`);
      }
      r.questions.forEach((q, n) => validateQuestion(q, `${level} curated reading ${d} q${n}`));
    });
    listeningPool.forEach((l, d) => {
      if (!l.transcript || !l.transcriptHe) {
        throw new Error(`${level} curated listening ${d}: missing transcript`);
      }
      l.questions.forEach((q, n) => validateQuestion(q, `${level} curated listening ${d} q${n}`));
    });
    speakingPool.forEach((s, d) => {
      if (s.prompts.length !== 4) throw new Error(`${level} curated speaking ${d}: need 4 prompts`);
    });

    const lc = level.toLowerCase();
    writeFileSync(join(OUT_DIR, `${lc}.json`), JSON.stringify({ vocabulary, lessons, quizzes }, null, 0));
    writeFileSync(join(OUT_DIR, `${lc}.reading.json`), JSON.stringify(readings, null, 0));
    writeFileSync(join(OUT_DIR, `${lc}.listening.json`), JSON.stringify(listenings, null, 0));
    writeFileSync(join(OUT_DIR, `${lc}.speaking.json`), JSON.stringify(speakings, null, 0));
    writeFileSync(join(OUT_DIR, `${lc}.reading.curated.json`), JSON.stringify(readingPool, null, 0));
    writeFileSync(join(OUT_DIR, `${lc}.listening.curated.json`), JSON.stringify(listeningPool, null, 0));
    writeFileSync(join(OUT_DIR, `${lc}.speaking.curated.json`), JSON.stringify(speakingPool, null, 0));

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
      curatedReadings: readingPool.length,
      curatedListenings: listeningPool.length,
      curatedSpeakingSets: speakingPool.length,
    });
  }
  writeFileSync(join(OUT_DIR, "vocab-index.json"), JSON.stringify(vocabIndex, null, 0));

  console.table(summary);
  const total = summary.reduce(
    (s, r) => s + r.lessons + r.vocabSets + r.quizzes + DAYS * 3,
    0,
  );
  console.log(`\nGenerated ${DAYS} days/level across ${LEVELS.length} levels. ~${total} content instances written to ${OUT_DIR}`);
}

main();
