import { afterEach, describe, it, expect, vi } from "vitest";
import {
  allMissions,
  buildMonthGrid,
  dateKeyFromTs,
  previousDateKey,
  kindFromQuizTopic,
  missionsByDate,
} from "./missions";
import type { MissionLog, QuizHistory, UserProgress } from "../types";

describe("missions utils", () => {
  it("maps quiz topics to mission kinds", () => {
    expect(kindFromQuizTopic("Reading")).toBe("reading");
    expect(kindFromQuizTopic("Listening")).toBe("listening");
    expect(kindFromQuizTopic("Mixed grammar")).toBe("quiz");
  });

  it("merges mission log, quiz history, and today's lesson", () => {
    const quiz: QuizHistory = {
      id: "q1",
      level: "A1",
      topic: "Reading",
      score: 2,
      totalQuestions: 2,
      timestamp: Date.parse("2026-07-10T10:00:00"),
    };
    const log: MissionLog[] = [
      {
        id: "m1",
        kind: "lesson",
        label: "שיעור יומי",
        timestamp: Date.parse("2026-07-11T09:00:00"),
      },
    ];
    const progress = {
      dailyLessonCompletedText: "2026-07-16",
    } as UserProgress;

    const merged = allMissions(log, [quiz], progress);
    expect(merged).toHaveLength(3);
    expect(merged.some((m) => m.kind === "reading")).toBe(true);
    expect(merged.some((m) => m.id === "lesson-2026-07-16")).toBe(true);
  });

  it("groups missions by calendar date", () => {
    const ts = Date.parse("2026-03-05T15:00:00");
    const map = missionsByDate([
      { id: "1", kind: "quiz", label: "חידון", timestamp: ts },
    ]);
    expect(map.get(dateKeyFromTs(ts))?.length).toBe(1);
  });

  it("builds a 42-cell Sunday-first month grid", () => {
    const cells = buildMonthGrid(2026, 6); // July 2026
    expect(cells).toHaveLength(42);
    expect(cells.filter((c) => c.inMonth).length).toBe(31);
    expect(cells.find((c) => c.inMonth && c.day === 1)?.dateKey).toBe("2026-07-01");
  });
});

describe("previousDateKey", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it.each([
    { name: "an ordinary day", tz: "UTC", local: [2026, 5, 15, 12, 0], expected: "2026-06-14" },
    { name: "the first of a month", tz: "UTC", local: [2026, 2, 1, 9, 0], expected: "2026-02-28" },
    { name: "the first of a year", tz: "UTC", local: [2026, 0, 1, 0, 5], expected: "2025-12-31" },
    // 2026-03-08 is a 23-hour day in New York; 00:30 the next day minus 24h
    // would land on 03-07.
    { name: "just after a spring-forward day", tz: "America/New_York", local: [2026, 2, 9, 0, 30], expected: "2026-03-08" },
    // Israel springs forward on 2026-03-27.
    { name: "just after Israel's spring-forward day", tz: "Asia/Jerusalem", local: [2026, 2, 28, 0, 30], expected: "2026-03-27" },
  ])("$name → $expected", ({ tz, local, expected }) => {
    vi.stubEnv("TZ", tz);
    const [y, mo, d, h, mi] = local as [number, number, number, number, number];
    expect(previousDateKey(new Date(y, mo, d, h, mi).getTime())).toBe(expected);
  });
});
