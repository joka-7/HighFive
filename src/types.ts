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
  questionHe?: string;
  options: string[];
  optionsHe?: string[];
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

// Reading Lab — a short level-adapted passage with a key-word glossary and
// comprehension questions. Addresses "reading live texts".
export interface GemReading {
  title: string; // English + (Hebrew)
  text: string; // the passage, in English
  textHe?: string;
  glossary: GemWord[]; // key words with Hebrew (reuses GemWord)
  questions: GemQuestion[]; // comprehension MCQs (reuses GemQuestion)
}

// Listening practice — a spoken sentence/short dialogue (played via TTS) with
// comprehension questions. Addresses "understanding natural speech".
export interface GemListening {
  transcript: string; // sentence / short dialogue, in English
  transcriptHe?: string;
  questions: GemQuestion[];
}

// Speaking practice — sentences the learner reads aloud, scored against speech
// recognition. Addresses "actually speaking the language".
export interface GemSpeaking {
  prompts: { text: string; translation: string }[];
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

/** A word the learner has seen in the app (vocabulary screen or saved). */
export interface LearnedWordEntry {
  word: string;
  translation: string;
  level: Level;
  firstSeenAt: number;
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
  // --- Spaced-repetition (Leitner) fields. Optional so words saved before this
  // feature still load; they are backfilled on first review. ---
  srsLevel?: number; // 0..INTERVALS.length-1 box
  nextReviewAt?: number; // ms timestamp — due when <= now
  reviewCount?: number;
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

/** A completed learning activity shown on the mission calendar. */
export type MissionKind =
  | "lesson"
  | "quiz"
  | "reading"
  | "listening"
  | "speaking"
  | "review"
  | "dialogue"
  | "video"
  | "words";

export interface MissionLog {
  id: string;
  kind: MissionKind;
  label: string;
  timestamp: number;
  score?: number;
  total?: number;
}

// Daily Missions — a small daily checklist ("watch a video in English",
// "talk with the AI coach in English"). The user marks each mission done for
// the day and earns points; `date` gates re-claiming and resets the missions
// each new day (mirrors dailyLessonCompletedText's date-key pattern).
export interface DailyMissionsState {
  date: string;
  video: boolean;
  talk: boolean;
  words: boolean; // auto-completes once 5 words are saved that day
  reading: boolean; // auto-completes on finishing a Reading Lab article
  grammar: boolean; // auto-completes on finishing the Daily Lesson
  // Number of Speaking-practice attempts scored today. Optional so state
  // persisted before this field existed still loads; treated as 0 when
  // absent. Drives diminishing points after the first full round so re-
  // recording the same sentence can't be farmed for unlimited points.
  speakingCount?: number;
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
  | "settings"
  | "review"
  | "reading"
  | "listening"
  | "speaking"
  | "calendar"
  | "missions";
