// English-learning content generation. Falls back to bundled offline content
// on any failure or when no provider key is configured. Content is day-aligned
// and vocabulary-safe (progressive unlock).

import type {
  ChatMessage,
  GemDialogueReply,
  GemLesson,
  GemListening,
  GemQuiz,
  GemReading,
  GemSpeaking,
  GemWord,
  GemWordList,
  Level,
} from "../types";
import { complete, isAIReady } from "./ai";
import { getTodaysWords } from "../data/todays-words";
import { dayIndex, loadOfflineContent, pickByDay } from "../data/offline";
import { levelVocabulary } from "../data/level-vocabulary";
import {
  loadCuratedListenings,
  loadCuratedReadings,
  loadCuratedSpeakings,
  loadListenings,
  loadReadings,
  loadSpeakings,
} from "../data/extras";
import { parseJson } from "../utils/json";
import {
  contentUsesOnlyAllowedVocab,
  findVocabSafeItem,
  lessonTexts,
  listeningTexts,
  pickVocabSafeItem,
  quizTexts,
  readingTexts,
  speakingTexts,
} from "../utils/vocabulary";
import { buildAllowedVocabulary } from "../utils/vocabulary";
import { expandWordTokens } from "../data/starter-words";

export interface ContentContext {
  allowed: Set<string>;
  todaysWords: GemWord[];
  todayWordList: string;
}

/** Build vocabulary context for content generation. */
export async function buildContentContext(
  level: Level,
  learnedKeys: Iterable<string>,
  day = dayIndex(),
): Promise<ContentContext> {
  const todaysWords = await getTodaysWords(level, day);
  const belowLevel = await levelVocabulary(level);
  const allowed = buildAllowedVocabulary(level, learnedKeys, todaysWords, belowLevel);
  const todayWordList = todaysWords.map((w) => w.word).join(", ");
  return { allowed, todaysWords, todayWordList };
}

function vocabPromptBlock(ctx: ContentContext): string {
  // The allowed set is far larger than fits in a prompt, so send an evenly
  // spread sample rather than the first 200 alphabetically — that used to hand
  // the model nothing past the letter "c".
  const all = [...ctx.allowed].sort();
  const step = Math.max(1, Math.ceil(all.length / 200));
  const allowedList = all.filter((_, i) => i % step === 0).join(", ");
  return `Today's 5 words (feature these): ${ctx.todayWordList}.
ALLOWED English vocabulary (use ONLY these words; do not introduce new words): ${allowedList}
(and common function words already implied: I, you, the, is, are, etc.)`;
}

function validateOrThrow(texts: string[], allowed: Set<string>, label: string): void {
  if (!contentUsesOnlyAllowedVocab(texts, allowed)) {
    const bad = texts.flatMap((t) =>
      t.match(/[a-z']+/gi)?.filter((w) => !allowed.has(w.toLowerCase())) ?? [],
    );
    throw new Error(`${label}: vocabulary guard failed (${[...new Set(bad)].slice(0, 5).join(", ")})`);
  }
}
function ensureQuizHebrew(quiz: GemQuiz): GemQuiz {
  return quiz;
}

function ensureLessonHebrew(lesson: GemLesson): GemLesson {
  return lesson;
}

function ensureReadingHebrew(reading: GemReading): GemReading {
  if (!reading.textHe) throw new Error("reading: missing textHe");
  return reading;
}

function ensureListeningHebrew(listening: GemListening): GemListening {
  if (!listening.transcriptHe) throw new Error("listening: missing transcriptHe");
  return listening;
}

// Curated content first: a hand-written passage is a far better read than the
// generated word-of-the-day text, so it wins whenever the learner can handle
// it. `findVocabSafeItem` returns null when nothing is within reach, and we
// fall back to the progressive (always-safe) pool.
//
// How many new words count as "within reach" grows with the level, for two
// reasons. A curated item is written *for* its CEFR level, so it is already
// appropriate by construction. And the app's model of what a learner knows is
// a bank of a few hundred content words — a fair picture at A1, a large
// undercount by C1, where a real learner's vocabulary is many times that. So
// the gate does its strictest work exactly where a wrong call hurts most (a
// beginner facing academic prose) and relaxes as it becomes less informative.
//
// Per skill: Reading tolerates the most, because its glossary explains new
// words on the spot; Speaking the least, since the learner has to pronounce
// every word aloud.
const CURATED_TOLERANCE: Record<Level, { reading: number; listening: number; speaking: number }> = {
  A1: { reading: 3, listening: 2, speaking: 1 },
  A2: { reading: 6, listening: 4, speaking: 2 },
  B1: { reading: 10, listening: 6, speaking: 3 },
  B2: { reading: 20, listening: 12, speaking: 5 },
  C1: { reading: 30, listening: 18, speaking: 7 },
  C2: { reading: 35, listening: 20, speaking: 8 },
};

async function pickOfflineReading(
  level: Level,
  allowed: Set<string>,
  day: number,
): Promise<GemReading> {
  // Curated pools aren't quartered (see data/extras.ts), so they're indexed
  // by the real day; the progressive pool is quartered, so it needs the
  // quarter-local day `loadReadings` resolves.
  const curated = await loadCuratedReadings(level);
  const curatedHit = findVocabSafeItem(
    curated.map((r) => ({ ...r, textsToCheck: readingTexts(r) })),
    allowed,
    day,
    CURATED_TOLERANCE[level].reading,
  );
  const { items, localDay } = await loadReadings(level, day);
  const picked =
    curatedHit ??
    pickVocabSafeItem(
      items.map((r) => ({ ...r, textsToCheck: readingTexts(r) })),
      allowed,
      localDay,
    );
  const { textsToCheck, ...reading } = picked;
  void textsToCheck;
  return reading;
}

async function pickOfflineListening(
  level: Level,
  allowed: Set<string>,
  day: number,
): Promise<GemListening> {
  const curated = await loadCuratedListenings(level);
  const curatedHit = findVocabSafeItem(
    curated.map((l) => ({ ...l, textsToCheck: listeningTexts(l) })),
    allowed,
    day,
    CURATED_TOLERANCE[level].listening,
  );
  const { items, localDay } = await loadListenings(level, day);
  const picked =
    curatedHit ??
    pickVocabSafeItem(
      items.map((l) => ({ ...l, textsToCheck: listeningTexts(l) })),
      allowed,
      localDay,
    );
  const { textsToCheck, ...listening } = picked;
  void textsToCheck;
  return listening;
}


// --- Vocabulary ---
export async function generateLevelAdaptiveWords(
  level: Level,
  day = dayIndex(),
  signal?: AbortSignal,
): Promise<GemWordList> {
  const { content, localDay } = await loadOfflineContent(level, day);
  const list = pickByDay(content.vocabulary, localDay);

  if (!isAIReady()) return list;

  const ctx = await buildContentContext(level, [], day);
  const prompt = `Generate exactly these 5 vocabulary words for CEFR level ${level} (words of the day):
${ctx.todayWordList}
For each word, provide: word, partOfSpeech, definition (HEBREW), example (English, using ONLY allowed vocabulary), translation (Hebrew).
${vocabPromptBlock(ctx)}

Return JSON with EXACTLY 5 words in the array (not 1 — one entry per word of the day above):
{
  "words": [
    { "word": "...", "partOfSpeech": "...", "definition": "עברית", "example": "...", "translation": "עברית" },
    { "word": "...", "partOfSpeech": "...", "definition": "עברית", "example": "...", "translation": "עברית" }
    // ...continue this pattern until the array has all 5 words
  ]
}`;

  const systemInstruction =
    "You are High5's expert English-Hebrew lexicographer. Design vocabulary lists adapted to CEFR levels with Hebrew explanations for native Hebrew speakers.";

  try {
    const result = parseJson<GemWordList>(await complete(prompt, systemInstruction, signal));
    // Same schema-bias risk as Speaking: a model can truncate the array to a
    // single word even when told to provide 5. Fall back rather than show a
    // near-empty word list.
    if (!result.words || result.words.length < 3) {
      throw new Error("vocabulary: AI returned too few words");
    }
    validateOrThrow(
      result.words.flatMap((w) => [w.example, w.word]),
      ctx.allowed,
      "vocabulary",
    );
    return result;
  } catch {
    return list;
  }
}

// --- Daily Lesson ---
export async function generateDailyLesson(
  level: Level,
  topic: string,
  learnedKeys: Iterable<string>,
  day = dayIndex(),
  signal?: AbortSignal,
): Promise<GemLesson> {
  const { content: bundle, localDay } = await loadOfflineContent(level, day);
  const offlinePool = bundle.lessons.map((l) => ({ ...l, textsToCheck: lessonTexts(l) }));
  const ctx = await buildContentContext(level, learnedKeys, day);

  if (!isAIReady()) {
    return ensureLessonHebrew(pickVocabSafeItem(offlinePool, ctx.allowed, localDay));
  }

  const prompt = `Create an interactive daily English lesson matching CEFR level ${level} on: "${topic}".
All explanations MUST be written in HEBREW.
${vocabPromptBlock(ctx)}
Provide:
- title (English + Hebrew translation in parentheses)
- explanation: grammar/vocab concept with examples and Hebrew translations
- questions: exactly 3 multiple choice questions. Each: question, questionHe (Hebrew), options (4 English strings), optionsHe (4 Hebrew strings), correctIndex (0-based), explanation (Hebrew)

Return as JSON with questionHe and optionsHe on every question.`;

  const systemInstruction =
    "You are High5's English-Hebrew tutor. Write lessons with quizzes. All instructions and explanations must be in Hebrew for Israeli students.";

  try {
    const result = ensureLessonHebrew(
      parseJson<GemLesson>(await complete(prompt, systemInstruction, signal)),
    );
    // Same defensive count check as Speaking/Vocabulary: an AI response with
    // too few questions is safer to reject than to show as-is.
    if (!result.questions || result.questions.length < 2) {
      throw new Error("lesson: AI returned too few questions");
    }
    validateOrThrow(lessonTexts(result), ctx.allowed, "lesson");
    return result;
  } catch {
    return ensureLessonHebrew(pickVocabSafeItem(offlinePool, ctx.allowed, localDay));
  }
}

// --- Dialogue Coach (requires a configured provider) ---
export async function generateDialogueReply(
  level: Level,
  scenario: string,
  history: ChatMessage[],
  newText: string,
  learnedKeys: Iterable<string>,
  signal?: AbortSignal,
): Promise<GemDialogueReply> {
  if (!isAIReady()) throw new Error("Dialogue Coach requires an AI provider key.");

  const ctx = await buildContentContext(level, learnedKeys);

  const chatContext = history
    .map((m) => `${m.role.toUpperCase()}: ${m.messageText}`)
    .join("\n");

  const prompt = `You are an English roleplay partner at CEFR level ${level} under scenario "${scenario}".
${vocabPromptBlock(ctx)}
The student says: "${newText}"
Conversation history:
${chatContext}

1. Respond naturally at level ${level} using ONLY allowed vocabulary.
2. Check the student's message for errors. Provide corrections in HEBREW, or null if perfect.

Return as JSON:
{
  "reply": "natural reply in English",
  "corrections": "תיקונים בעברית או null"
}`;

  const systemInstruction =
    "You are High5's English dialogue partner. Roleplay in English and explain grammar corrections in Hebrew.";

  const result = parseJson<GemDialogueReply>(await complete(prompt, systemInstruction, signal));
  validateOrThrow([result.reply, newText], ctx.allowed, "dialogue");
  return result;
}

// --- Practice Quiz ---
export async function generatePracticeQuiz(
  level: Level,
  topic: string,
  learnedKeys: Iterable<string>,
  day = dayIndex(),
  signal?: AbortSignal,
): Promise<GemQuiz> {
  const { content: bundle, localDay } = await loadOfflineContent(level, day);
  const offlinePool = bundle.quizzes.map((q) => ({ ...q, textsToCheck: quizTexts(q) }));
  const ctx = await buildContentContext(level, learnedKeys, day);

  if (!isAIReady()) {
    return ensureQuizHebrew(pickVocabSafeItem(offlinePool, ctx.allowed, localDay));
  }

  const prompt = `Generate 5 multiple choice questions for CEFR level ${level} on "${topic}".
${vocabPromptBlock(ctx)}
Questions and options in English; explanations in HEBREW.
Each question: question, questionHe (Hebrew), options (4 strings), optionsHe (4 Hebrew strings), correctIndex (0-based), explanation (Hebrew)

Return as JSON.`;

  const systemInstruction =
    "You are High5's assessment evaluator. Compose accurate multiple-choice tests for English learners. All explanations in Hebrew.";

  try {
    const result = ensureQuizHebrew(
      parseJson<GemQuiz>(await complete(prompt, systemInstruction, signal)),
    );
    // Same defensive count check as Speaking/Vocabulary: an AI response with
    // too few questions is safer to reject than to show as-is.
    if (!result.questions || result.questions.length < 3) {
      throw new Error("quiz: AI returned too few questions");
    }
    validateOrThrow(quizTexts(result), ctx.allowed, "quiz");
    return result;
  } catch {
    return ensureQuizHebrew(pickVocabSafeItem(offlinePool, ctx.allowed, localDay));
  }
}

// --- Reading Lab ---
export async function generateReading(
  level: Level,
  learnedKeys: Iterable<string>,
  day = dayIndex(),
): Promise<GemReading> {
  const ctx = await buildContentContext(level, learnedKeys, day);
  return ensureReadingHebrew(await pickOfflineReading(level, ctx.allowed, day));
}

// --- Listening practice ---
export async function generateListening(
  level: Level,
  learnedKeys: Iterable<string>,
  day = dayIndex(),
): Promise<GemListening> {
  const ctx = await buildContentContext(level, learnedKeys, day);
  return ensureListeningHebrew(await pickOfflineListening(level, ctx.allowed, day));
}

// --- Speaking practice ---
async function pickOfflineSpeaking(
  level: Level,
  learnedKeys: Iterable<string>,
  day: number,
): Promise<GemSpeaking> {
  const ctx = await buildContentContext(level, learnedKeys, day);
  // Filtering individual prompts out of one day-picked set (the old approach)
  // could collapse a 4-sentence set down to just 1 for a new learner whose
  // allowed vocabulary is still small — that's the offline "only one
  // sentence" bug. Instead, pick a whole SET that best fits the allowed
  // vocabulary (same pattern as pickOfflineReading/pickOfflineListening),
  // so the learner always gets a full round of 4. Curated sets first (not
  // quartered, so indexed by the real day); progressive is quartered, so it
  // needs the quarter-local day `loadSpeakings` resolves.
  const curated = await loadCuratedSpeakings(level);
  const curatedHit = findVocabSafeItem(
    curated.map((s) => ({ ...s, textsToCheck: speakingTexts(s) })),
    ctx.allowed,
    day,
    CURATED_TOLERANCE[level].speaking,
  );
  const { items, localDay } = await loadSpeakings(level, day);
  const picked =
    curatedHit ??
    pickVocabSafeItem(
      items.map((s) => ({ ...s, textsToCheck: speakingTexts(s) })),
      ctx.allowed,
      localDay,
    );
  const { textsToCheck, ...speaking } = picked;
  void textsToCheck;
  return speaking;
}

export async function generateSpeaking(
  level: Level,
  topic: string,
  learnedKeys: Iterable<string>,
  day = dayIndex(),
  signal?: AbortSignal,
): Promise<GemSpeaking> {
  const offline = () => pickOfflineSpeaking(level, learnedKeys, day);

  if (!isAIReady()) {
    return offline();
  }

  const ctx = await buildContentContext(level, learnedKeys, day);

  const prompt = `Create an English speaking practice set for CEFR level ${level} on: "${topic}".
${vocabPromptBlock(ctx)}
Provide 4 useful sentences the learner should read aloud, each with a Hebrew translation.
Use ONLY allowed vocabulary.

Return as JSON with EXACTLY 4 sentences in the array (not 1 — keep adding entries until there are 4):
{
  "prompts": [
    { "text": "first English sentence to say", "translation": "תרגום לעברית" },
    { "text": "second English sentence to say", "translation": "תרגום לעברית" }
    // ...continue this pattern until the array has exactly 4 sentences
  ]
}`;

  const systemInstruction =
    "You are High5's pronunciation coach. Provide practical English sentences with Hebrew translations for Israeli learners.";

  try {
    // complete() applies its own timeout/retry/cancellation now — no need
    // for the bespoke Promise.race this used to have.
    const raw = await complete(prompt, systemInstruction, signal);
    const result = parseJson<GemSpeaking>(raw);
    // A smaller/faster model can collapse the array down to a single entry
    // even when told to provide 4 — this is what caused "only one sentence"
    // in the Speaking tab. Falling back to offline content (which always has
    // a full set) is safer than showing the learner an incomplete round.
    if (!result.prompts || result.prompts.length < 2) {
      throw new Error("speaking: AI returned too few sentences");
    }
    validateOrThrow(speakingTexts(result), ctx.allowed, "speaking");
    return result;
  } catch {
    return offline();
  }
}

// --- On-demand Hebrew translation for a quiz question ---
// A meaningful chunk of the bundled question bank has no real Hebrew for a
// given question (questionHe/optionsHe were left equal to the English text
// at content-generation time) — QuizRunner falls back to this when the
// static translation isn't actually there, so the "show translation" toggle
// still works for a configured AI provider instead of just doing nothing.
export interface GemQuestionTranslation {
  question: string;
  options: string[];
}

export async function translateQuestion(
  question: string,
  options: string[],
  signal?: AbortSignal,
): Promise<GemQuestionTranslation> {
  if (!isAIReady()) throw new Error("Translation requires an AI provider key.");

  const prompt = `Translate the following English quiz question and its answer options into natural, fluent Hebrew, for an Israeli English learner.

Question: "${question}"
Options: ${JSON.stringify(options)}

Return as JSON, preserving the exact same number of options in the same order:
{
  "question": "התרגום של השאלה לעברית",
  "options": ["תרגום 1", "תרגום 2", "..."]
}`;

  const systemInstruction =
    "You are a professional English-to-Hebrew translator for Israeli English learners. Translate naturally and return only the requested JSON.";

  return parseJson<GemQuestionTranslation>(await complete(prompt, systemInstruction, signal));
}

/** Export helper for screens that need today's words synchronously from cache. */
export { expandWordTokens };
