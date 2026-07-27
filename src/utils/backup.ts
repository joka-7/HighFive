import type {
  ChatMessage,
  DailyMissionsState,
  LearnedWordEntry,
  MissionLog,
  QuizHistory,
  SavedWord,
  UserProgress,
} from "../types";
import { LEVELS } from "../types";

export const BACKUP_VERSION = 1 as const;

/** Portable snapshot of local learning progress (not AI keys or UI prefs). */
export interface ProgressBackup {
  version: typeof BACKUP_VERSION;
  exportedAt: number;
  progress: UserProgress | null;
  savedWords: SavedWord[];
  learnedWords: Record<string, LearnedWordEntry>;
  chatMessages: ChatMessage[];
  quizHistory: QuizHistory[];
  missionLog: MissionLog[];
  dailyMissions: DailyMissionsState;
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function isLevel(v: unknown): boolean {
  return typeof v === "string" && (LEVELS as string[]).includes(v);
}

/** Validate imported JSON before it reaches the store. Throws on bad shape. */
export function parseProgressBackup(raw: unknown): ProgressBackup {
  if (!isObject(raw)) throw new Error("invalid backup: not an object");
  if (raw.version !== BACKUP_VERSION) {
    throw new Error(`invalid backup: unsupported version ${String(raw.version)}`);
  }
  if (typeof raw.exportedAt !== "number") {
    throw new Error("invalid backup: missing exportedAt");
  }
  if (raw.progress !== null && !isObject(raw.progress)) {
    throw new Error("invalid backup: progress");
  }
  if (raw.progress && !isLevel(raw.progress.currentLevel)) {
    throw new Error("invalid backup: progress.currentLevel");
  }
  if (!Array.isArray(raw.savedWords)) throw new Error("invalid backup: savedWords");
  if (!isObject(raw.learnedWords)) throw new Error("invalid backup: learnedWords");
  if (!Array.isArray(raw.chatMessages)) throw new Error("invalid backup: chatMessages");
  if (!Array.isArray(raw.quizHistory)) throw new Error("invalid backup: quizHistory");
  if (!Array.isArray(raw.missionLog)) throw new Error("invalid backup: missionLog");
  if (!isObject(raw.dailyMissions)) throw new Error("invalid backup: dailyMissions");

  return raw as unknown as ProgressBackup;
}
