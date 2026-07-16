// English-learning content generation — ported from High5's LingoRepository.kt.
// Falls back to bundled offline content on any failure or when no provider key
// is configured. Content is day-aligned and vocabulary-safe (progressive unlock).

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
import { LISTENINGS, READINGS, SPEAKINGS, pickByDayExtra } from "../data/extras";
import { parseJson } from "../utils/json";
import {
  contentUsesOnlyAllowedVocab,
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
  const allowed = buildAllowedVocabulary(level, learnedKeys, todaysWords);
  const todayWordList = todaysWords.map((w) => w.word).join(", ");
  return { allowed, todaysWords, todayWordList };
}

function vocabPromptBlock(ctx: ContentContext): string {
  const allowedList = [...ctx.allowed].sort().slice(0, 200).join(", ");
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
function ensureLessonHebrew(lesson: GemLesson): GemLesson {
  return {
    ...lesson,
    questions: lesson.questions.map((q) => ({
      ...q,
      questionHe: q.questionHe ?? q.explanation,
    })),
  };
}

function ensureQuizHebrew(quiz: GemQuiz): GemQuiz {
  const questions = quiz.questions.map((q) => ({
    ...q,
    questionHe: q.questionHe ?? q.explanation,
  }));
  return { questions };
}

function ensureReadingHebrew(reading: GemReading): GemReading {
  if (!reading.textHe) throw new Error("reading: missing textHe");
  const questions = reading.questions.map((q) => ({
    ...q,
    questionHe: q.questionHe ?? q.explanation,
  }));
  return { ...reading, questions };
}

async function pickOfflineReading(
  level: Level,
  allowed: Set<string>,
  day: number,
): Promise<GemReading> {
  const items = await READINGS[level]();
  const pool = items.map((r) => ({ ...r, textsToCheck: readingTexts(r) }));
  const picked = pickVocabSafeItem(pool, allowed, day);
  const { textsToCheck: _, ...reading } = picked;
  return reading;
}


// --- Vocabulary ---
export async function generateLevelAdaptiveWords(
  level: Level,
  day = dayIndex(),
): Promise<GemWordList> {
  const bundle = await loadOfflineContent(level);
  const list = pickByDay(bundle.vocabulary, day);

  if (!isAIReady()) return list;

  const ctx = await buildContentContext(level, [], day);
  const prompt = `Generate exactly these 5 vocabulary words for CEFR level ${level} (words of the day):
${ctx.todayWordList}
For each word, provide: word, partOfSpeech, definition (HEBREW), example (English, using ONLY allowed vocabulary), translation (Hebrew).
${vocabPromptBlock(ctx)}

Return JSON: { "words": [{ "word": "...", "partOfSpeech": "...", "definition": "עברית", "example": "...", "translation": "עברית" }] }`;

  const systemInstruction =
    "You are High5's expert English-Hebrew lexicographer. Design vocabulary lists adapted to CEFR levels with Hebrew explanations for native Hebrew speakers.";

  try {
    const result = parseJson<GemWordList>(await complete(prompt, systemInstruction));
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
): Promise<GemLesson> {
  const bundle = await loadOfflineContent(level);
  const offlinePool = bundle.lessons.map((l) => ({ ...l, textsToCheck: lessonTexts(l) }));
  const ctx = await buildContentContext(level, learnedKeys, day);

  if (!isAIReady()) {
    return ensureLessonHebrew(pickVocabSafeItem(offlinePool, ctx.allowed, day));
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
    const result = ensureLessonHebrew(parseJson<GemLesson>(await complete(prompt, systemInstruction)));
    validateOrThrow(lessonTexts(result), ctx.allowed, "lesson");
    return result;
  } catch {
    return ensureLessonHebrew(pickVocabSafeItem(offlinePool, ctx.allowed, day));
  }
}

// --- Dialogue Coach (requires a configured provider) ---
export async function generateDialogueReply(
  level: Level,
  scenario: string,
  history: ChatMessage[],
  newText: string,
  learnedKeys: Iterable<string>,
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

  const result = parseJson<GemDialogueReply>(await complete(prompt, systemInstruction));
  validateOrThrow([result.reply, newText], ctx.allowed, "dialogue");
  return result;
}

// --- Practice Quiz ---
export async function generatePracticeQuiz(
  level: Level,
  topic: string,
  learnedKeys: Iterable<string>,
  day = dayIndex(),
): Promise<GemQuiz> {
  const bundle = await loadOfflineContent(level);
  const offlinePool = bundle.quizzes.map((q) => ({ ...q, textsToCheck: quizTexts(q) }));
  const ctx = await buildContentContext(level, learnedKeys, day);

  if (!isAIReady()) {
    return ensureQuizHebrew(pickVocabSafeItem(offlinePool, ctx.allowed, day));
  }

  const prompt = `Generate 5 multiple choice questions for CEFR level ${level} on "${topic}".
${vocabPromptBlock(ctx)}
Questions and options in English; explanations in HEBREW.
Each question: question, questionHe (Hebrew), options (4 strings), optionsHe (4 Hebrew strings), correctIndex (0-based), explanation (Hebrew)

Return as JSON.`;

  const systemInstruction =
    "You are High5's assessment evaluator. Compose accurate multiple-choice tests for English learners. All explanations in Hebrew.";

  try {
    const result = ensureQuizHebrew(parseJson<GemQuiz>(await complete(prompt, systemInstruction)));
    validateOrThrow(quizTexts(result), ctx.allowed, "quiz");
    return result;
  } catch {
    return ensureQuizHebrew(pickVocabSafeItem(offlinePool, ctx.allowed, day));
  }
}

// --- Reading Lab ---
export async function generateReading(
  level: Level,
  topic: string,
  learnedKeys: Iterable<string>,
  day = dayIndex(),
): Promise<GemReading> {
  const ctx = await buildContentContext(level, learnedKeys, day);

  if (!isAIReady()) {
    return ensureReadingHebrew(await pickOfflineReading(level, ctx.allowed, day));
  }

  const prompt = `Write a short, engaging English reading passage for CEFR level ${level} on the theme: "${topic}".
${vocabPromptBlock(ctx)}
The passage should be 4-6 sentences using ONLY allowed vocabulary.
Provide:
- title (English + Hebrew translation in parentheses)
- text (English), textHe (full Hebrew translation — REQUIRED)
- glossary: 3 key words from today's list. Each: word, partOfSpeech, definition (HEBREW), example (English), translation (Hebrew)
- questions: exactly 2 comprehension MCQs with questionHe and optionsHe

Return as JSON.`;

  const systemInstruction =
    "You are High5's reading tutor. Write natural, level-appropriate English passages with Hebrew glossary and Hebrew explanations for Israeli learners.";

  try {
    const result = ensureReadingHebrew(parseJson<GemReading>(await complete(prompt, systemInstruction)));
    validateOrThrow(readingTexts(result), ctx.allowed, "reading");
    return result;
  } catch {
    return ensureReadingHebrew(await pickOfflineReading(level, ctx.allowed, day));
  }
}

// --- Listening practice ---
export async function generateListening(
  level: Level,
  topic: string,
  learnedKeys: Iterable<string>,
  day = dayIndex(),
): Promise<GemListening> {
  const ctx = await buildContentContext(level, learnedKeys, day);

  if (!isAIReady()) {
    return pickByDayExtra(LISTENINGS, level, day);
  }

  const prompt = `Create a short English listening exercise for CEFR level ${level} on: "${topic}".
${vocabPromptBlock(ctx)}
Provide:
- transcript: 1-3 sentences using ONLY allowed vocabulary
- transcriptHe: full Hebrew translation
- questions: exactly 2 comprehension MCQs with questionHe and optionsHe

Return as JSON.`;

  const systemInstruction =
    "You are High5's listening-comprehension tutor. Write natural spoken-style English with Hebrew explanations.";

  try {
    const result = parseJson<GemListening>(await complete(prompt, systemInstruction));
    validateOrThrow(listeningTexts(result), ctx.allowed, "listening");
    return result;
  } catch {
    return pickByDayExtra(LISTENINGS, level, day);
  }
}

// --- Speaking practice ---
export async function generateSpeaking(
  level: Level,
  topic: string,
  learnedKeys: Iterable<string>,
  day = dayIndex(),
): Promise<GemSpeaking> {
  const ctx = await buildContentContext(level, learnedKeys, day);

  if (!isAIReady()) {
    const set = await pickByDayExtra(SPEAKINGS, level, day);
    const safe = set.prompts.filter((p) =>
      contentUsesOnlyAllowedVocab([p.text], ctx.allowed),
    );
    if (safe.length >= 4) return { prompts: safe.slice(0, 4) };
    return set;
  }

  const prompt = `Create an English speaking practice set for CEFR level ${level} on: "${topic}".
${vocabPromptBlock(ctx)}
Provide 4 useful sentences the learner should read aloud, each with a Hebrew translation.
Use ONLY allowed vocabulary.

Return as JSON:
{
  "prompts": [{ "text": "English sentence to say", "translation": "תרגום לעברית" }]
}`;

  const systemInstruction =
    "You are High5's pronunciation coach. Provide practical English sentences with Hebrew translations for Israeli learners.";

  try {
    const result = parseJson<GemSpeaking>(await complete(prompt, systemInstruction));
    validateOrThrow(speakingTexts(result), ctx.allowed, "speaking");
    return result;
  } catch {
    return pickByDayExtra(SPEAKINGS, level, day);
  }
}

/** Export helper for screens that need today's words synchronously from cache. */
export { expandWordTokens };
