// Gemini service — faithful web port of High5's GeminiClient.kt + the prompt
// logic in LingoRepository.kt. Calls the same REST endpoint
// (gemini-2.0-flash:generateContent) with the same system instructions and
// prompts, and falls back to bundled offline content on any failure.

import type {
  ChatMessage,
  GemDialogueReply,
  GemLesson,
  GemQuiz,
  GemWordList,
  Level,
} from "../types";
import { getApiKey } from "./apiKey";
import { loadOfflineContent, pickRandom } from "../data/offline";

const BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

interface Part {
  text?: string;
}
interface Content {
  parts: Part[];
}
interface GenerateContentRequest {
  contents: Content[];
  generationConfig?: { responseMimeType?: string; temperature?: number };
  systemInstruction?: Content;
}
interface GenerateContentResponse {
  candidates?: { content?: { parts?: Part[] } }[];
}

async function callGemini(
  prompt: string,
  apiKey: string,
  systemInstruction?: string,
): Promise<string> {
  const body: GenerateContentRequest = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json", temperature: 0.7 },
    systemInstruction: systemInstruction
      ? { parts: [{ text: systemInstruction }] }
      : undefined,
  };

  const res = await fetch(`${BASE_URL}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Gemini request failed (${res.status}): ${detail.slice(0, 200)}`);
  }

  const data: GenerateContentResponse = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini");
  return text;
}

// Mirrors LingoRepository.cleanJson — strips ```json fences if present.
function cleanJson(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith("```json")) cleaned = cleaned.slice("```json".length);
  else if (cleaned.startsWith("```")) cleaned = cleaned.slice("```".length);
  if (cleaned.endsWith("```")) cleaned = cleaned.slice(0, -3);
  return cleaned.trim();
}

function parseJson<T>(raw: string): T {
  return JSON.parse(cleanJson(raw)) as T;
}

// --- Vocabulary ---
export async function generateLevelAdaptiveWords(level: Level): Promise<GemWordList> {
  const apiKey = getApiKey();
  if (!apiKey) return pickRandom(loadOfflineContent(level).vocabulary);

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
    return parseJson<GemWordList>(await callGemini(prompt, apiKey, systemInstruction));
  } catch {
    return pickRandom(loadOfflineContent(level).vocabulary);
  }
}

// --- Daily Lesson ---
export async function generateDailyLesson(level: Level, topic: string): Promise<GemLesson> {
  const apiKey = getApiKey();
  if (!apiKey) return pickRandom(loadOfflineContent(level).lessons);

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
    return parseJson<GemLesson>(await callGemini(prompt, apiKey, systemInstruction));
  } catch {
    return pickRandom(loadOfflineContent(level).lessons);
  }
}

// --- Dialogue Coach (requires an API key) ---
export async function generateDialogueReply(
  level: Level,
  scenario: string,
  history: ChatMessage[],
  newText: string,
): Promise<GemDialogueReply> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("Dialogue Coach requires a Gemini API key.");

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

  return parseJson<GemDialogueReply>(await callGemini(prompt, apiKey, systemInstruction));
}

// --- Practice Quiz ---
export async function generatePracticeQuiz(level: Level, topic: string): Promise<GemQuiz> {
  const apiKey = getApiKey();
  if (!apiKey) return pickRandom(loadOfflineContent(level).quizzes);

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
    return parseJson<GemQuiz>(await callGemini(prompt, apiKey, systemInstruction));
  } catch {
    return pickRandom(loadOfflineContent(level).quizzes);
  }
}
