import { dateKeyFromTs } from "./missions";
import type { MissionLog, QuizHistory } from "../types";

export interface DayCount {
  dateKey: string;
  label: string; // short Hebrew weekday or day number
  value: number;
}

function dayKeysLastN(n: number, now = Date.now()): string[] {
  const keys: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    keys.push(dateKeyFromTs(now - i * 86_400_000));
  }
  return keys;
}

function shortLabel(dateKey: string): string {
  const d = new Date(`${dateKey}T12:00:00`);
  return String(d.getDate());
}

/** Count missions per day over the last `days` days (0 for empty days). */
export function missionsPerDay(
  missions: MissionLog[],
  days = 14,
  now = Date.now(),
): DayCount[] {
  const keys = dayKeysLastN(days, now);
  const counts = new Map(keys.map((k) => [k, 0]));
  for (const m of missions) {
    const k = dateKeyFromTs(m.timestamp);
    if (counts.has(k)) counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  return keys.map((dateKey) => ({
    dateKey,
    label: shortLabel(dateKey),
    value: counts.get(dateKey) ?? 0,
  }));
}

/** Average quiz score % per day over the last `days` days (0 if no quizzes). */
export function quizScorePerDay(
  history: QuizHistory[],
  days = 14,
  now = Date.now(),
): DayCount[] {
  const keys = dayKeysLastN(days, now);
  const totals = new Map(keys.map((k) => [k, { score: 0, total: 0 }]));
  for (const q of history) {
    const k = dateKeyFromTs(q.timestamp);
    const bucket = totals.get(k);
    if (!bucket) continue;
    bucket.score += q.score;
    bucket.total += q.totalQuestions;
  }
  return keys.map((dateKey) => {
    const b = totals.get(dateKey)!;
    return {
      dateKey,
      label: shortLabel(dateKey),
      value: b.total === 0 ? 0 : Math.round((b.score / b.total) * 100),
    };
  });
}
