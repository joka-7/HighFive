// Domain model — ported from High5's Kotlin entities (LingoEntities.kt) and
// Gemini response shapes (GeminiResponses.kt).

export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export const LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

// --- Gemini / content shapes (GeminiResponses.kt) ---

export interface GemWord {
  word: string;
  partOfSpeech: string;
  definition: string; // in Hebrew
  example: string; // English sentence
  translation: string; // Hebrew
}

export interface GemWordList {
  words: GemWord[];
}

export interface GemQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string; // in Hebrew
}

export interface GemLesson {
  title: string;
  explanation: string; // in Hebrew
  questions: GemQuestion[];
}

export interface GemDialogueReply {
  reply: string;
  corrections: string | null;
}

export interface GemQuiz {
  questions: GemQuestion[];
}

export interface OfflineLevelContent {
  vocabulary: GemWordList[];
  lessons: GemLesson[];
  quizzes: GemQuiz[];
}

// --- Persisted entities (LingoEntities.kt → localStorage) ---

export interface UserProgress {
  currentLevel: Level;
  userName: string;
  nativeLanguage: string;
  points: number;
  streak: number;
  lastActiveTimestamp: number;
  dailyLessonCompletedText: string; // date key — prevents multiple daily claims
}

export interface SavedWord {
  id: string;
  word: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  translation: string;
  level: Level;
  isMastered: boolean;
  savedAt: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  messageText: string;
  corrections: string | null;
  level: Level;
  scenario: string;
  timestamp: number;
}

export interface QuizHistory {
  id: string;
  level: Level;
  topic: string;
  score: number;
  totalQuestions: number;
  timestamp: number;
}

export type Screen =
  | "onboarding"
  | "dashboard"
  | "lesson"
  | "vocabulary"
  | "dialogue"
  | "quiz"
  | "saved"
  | "progress"
  | "settings";
