import type { MissionKind, MissionLog, QuizHistory, UserProgress } from "../types";

export const MISSION_ICONS: Record<MissionKind, string> = {
  lesson: "📚",
  quiz: "🧠",
  reading: "📖",
  listening: "🎧",
  speaking: "🎤",
  review: "🔁",
  dialogue: "💬",
  video: "🎬",
  words: "🃏",
};

export function dateKeyFromTs(ts: number): string {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function kindFromQuizTopic(topic: string): MissionKind {
  if (topic === "Reading") return "reading";
  if (topic === "Listening") return "listening";
  return "quiz";
}

export function quizToMission(q: QuizHistory): MissionLog {
  const kind = kindFromQuizTopic(q.topic);
  const label =
    q.topic === "Reading"
      ? DAILY_CHECKLIST_LABELS.reading.label
      : q.topic === "Listening"
        ? "האזנה"
        : q.topic;
  return {
    id: q.id,
    kind,
    label,
    timestamp: q.timestamp,
    score: q.score,
    total: q.totalQuestions,
  };
}

/** Labels for daily checklist missions logged to the calendar. */
export const DAILY_CHECKLIST_LABELS: Record<
  "video" | "talk" | "words" | "reading" | "grammar",
  { kind: MissionKind; label: string }
> = {
  video: { kind: "video", label: "צפייה בסרטון באנגלית" },
  talk: { kind: "dialogue", label: "שיחה עם מאמן AI" },
  words: { kind: "words", label: "למידת 5 מילים" },
  reading: { kind: "reading", label: "קריאת מאמר" },
  grammar: { kind: "lesson", label: "שיעור דקדוק" },
};

/** Merge persisted mission log with legacy quiz rows and today's lesson flag. */
export function allMissions(
  missionLog: MissionLog[],
  quizHistory: QuizHistory[],
  progress: UserProgress | null,
): MissionLog[] {
  const byId = new Map<string, MissionLog>();
  for (const q of quizHistory) byId.set(q.id, quizToMission(q));
  for (const m of missionLog) byId.set(m.id, m);

  const merged = [...byId.values()];
  if (progress?.dailyLessonCompletedText) {
    const day = progress.dailyLessonCompletedText;
    const hasLesson = merged.some(
      (m) => m.kind === "lesson" && dateKeyFromTs(m.timestamp) === day,
    );
    if (!hasLesson) {
      merged.push({
        id: `lesson-${day}`,
        kind: "lesson",
        label: DAILY_CHECKLIST_LABELS.grammar.label,
        timestamp: Date.parse(`${day}T12:00:00`),
      });
    }
  }

  return merged.sort((a, b) => b.timestamp - a.timestamp);
}

export function missionsByDate(missions: MissionLog[]): Map<string, MissionLog[]> {
  const map = new Map<string, MissionLog[]>();
  for (const m of missions) {
    const key = dateKeyFromTs(m.timestamp);
    const list = map.get(key) ?? [];
    list.push(m);
    map.set(key, list);
  }
  return map;
}

export interface CalendarCell {
  dateKey: string;
  day: number;
  inMonth: boolean;
}

/** Sunday-first month grid (6 rows × 7 cols) for the calendar UI. */
export function buildMonthGrid(year: number, month: number): CalendarCell[] {
  const first = new Date(year, month, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: CalendarCell[] = [];

  for (let i = 0; i < startPad; i++) {
    const d = new Date(year, month, -startPad + i + 1);
    cells.push({
      dateKey: dateKeyFromTs(d.getTime()),
      day: d.getDate(),
      inMonth: false,
    });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    cells.push({
      dateKey: dateKeyFromTs(d.getTime()),
      day,
      inMonth: true,
    });
  }
  while (cells.length % 7 !== 0 || cells.length < 42) {
    const last = cells[cells.length - 1];
    const next = new Date(last.dateKey);
    next.setDate(next.getDate() + 1);
    cells.push({
      dateKey: dateKeyFromTs(next.getTime()),
      day: next.getDate(),
      inMonth: false,
    });
  }
  return cells.slice(0, 42);
}

export const HEBREW_MONTHS = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];

export const HEBREW_WEEKDAYS = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];
