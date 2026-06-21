// English-learning content generation — ported from High5's LingoRepository.kt.
// The prompts and system instructions are preserved verbatim from the original;
// only the transport is swapped to the multi-provider `complete()` (Gemini,
// Groq, Anthropic, OpenAI, Ollama). Falls back to bundled offline content on any
// failure or when no provider key is configured.

import type {
  ChatMessage,
  GemDialogueReply,
  GemLesson,
  GemQuiz,
  GemWordList,
  Level,
} from "../types";
import { complete, isAIReady } from "./ai";
import { loadOfflineContent, pickRandom } from "../data/offline";
import { parseJson } from "../utils/json";

// --- Vocabulary ---
export async function generateLevelAdaptiveWords(level: Level): Promise<GemWordList> {
  if (!isAIReady()) return pickRandom(loadOfflineContent(level).vocabulary);

  const prompt = `Generate 5 highly useful, practical English vocabulary words specifically suited for CEFR level ${level}.
For each word, provide:
- word
- partOfSpeech
- definition (clear explanation written entirely in HEBREW)
- example (an English sentence showing proper usage)
- translation (natural Hebrew equivalent)

Return as a single JSON object:
{
  "words": [
    {
      "word": "word string in English",
      "partOfSpeech": "noun/verb/etc.",
      "definition": "הסבר מפורט בעברית",
      "example": "English sentence illustrating use",
      "translation": "תרגום לעברית"
    }
  ]
}`;

  const systemInstruction =
    "You are High5's expert English-Hebrew lexicographer. Design vocabulary lists adapted to CEFR levels with Hebrew explanations for native Hebrew speakers.";

  try {
    return parseJson<GemWordList>(await complete(prompt, systemInstruction));
  } catch {
    return pickRandom(loadOfflineContent(level).vocabulary);
  }
}

// --- Daily Lesson ---
export async function generateDailyLesson(level: Level, topic: string): Promise<GemLesson> {
  if (!isAIReady()) return pickRandom(loadOfflineContent(level).lessons);

  const prompt = `Create an interactive daily English lesson matching CEFR level ${level} on: "${topic}".
All explanations MUST be written in HEBREW.
Provide:
- title (English + Hebrew translation in parentheses)
- explanation: grammar/vocab concept with examples and Hebrew translations
- questions: exactly 3 multiple choice questions (English questions, Hebrew explanations)
  Each question: question, options (4 strings), correctIndex (0-based), explanation (Hebrew)

Return as JSON:
{
  "title": "lesson title",
  "explanation": "הסבר בעברית",
  "questions": [
    {
      "question": "question in English",
      "options": ["option 0", "option 1", "option 2", "option 3"],
      "correctIndex": 0,
      "explanation": "הסבר בעברית"
    }
  ]
}`;

  const systemInstruction =
    "You are High5's English-Hebrew tutor. Write lessons with quizzes. All instructions and explanations must be in Hebrew for Israeli students.";

  try {
    return parseJson<GemLesson>(await complete(prompt, systemInstruction));
  } catch {
    return pickRandom(loadOfflineContent(level).lessons);
  }
}

// --- Dialogue Coach (requires a configured provider) ---
export async function generateDialogueReply(
  level: Level,
  scenario: string,
  history: ChatMessage[],
  newText: string,
): Promise<GemDialogueReply> {
  if (!isAIReady()) throw new Error("Dialogue Coach requires an AI provider key.");

  const chatContext = history
    .map((m) => `${m.role.toUpperCase()}: ${m.messageText}`)
    .join("\n");

  const prompt = `You are an English roleplay partner at CEFR level ${level} under scenario "${scenario}".
The student says: "${newText}"
Conversation history:
${chatContext}

1. Respond naturally at level ${level}.
2. Check the student's message for errors. Provide corrections in HEBREW, or null if perfect.

Return as JSON:
{
  "reply": "natural reply in English",
  "corrections": "תיקונים בעברית או null"
}`;

  const systemInstruction =
    "You are High5's English dialogue partner. Roleplay in English and explain grammar corrections in Hebrew.";

  return parseJson<GemDialogueReply>(await complete(prompt, systemInstruction));
}

// --- Practice Quiz ---
export async function generatePracticeQuiz(level: Level, topic: string): Promise<GemQuiz> {
  if (!isAIReady()) return pickRandom(loadOfflineContent(level).quizzes);

  const prompt = `Generate 5 multiple choice questions for CEFR level ${level} on "${topic}".
Questions and options in English; explanations in HEBREW.
Each question: question, options (4 strings), correctIndex (0-based), explanation (Hebrew)

Return as JSON:
{
  "questions": [
    {
      "question": "question in English",
      "options": ["option 0", "option 1", "option 2", "option 3"],
      "correctIndex": 0,
      "explanation": "הסבר בעברית"
    }
  ]
}`;

  const systemInstruction =
    "You are High5's assessment evaluator. Compose accurate multiple-choice tests for English learners. All explanations in Hebrew.";

  try {
    return parseJson<GemQuiz>(await complete(prompt, systemInstruction));
  } catch {
    return pickRandom(loadOfflineContent(level).quizzes);
  }
}
