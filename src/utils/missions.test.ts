import { describe, it, expect } from "vitest";
import {
  allMissions,
  buildMonthGrid,
  dateKeyFromTs,
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
