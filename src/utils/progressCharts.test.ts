import { describe, it, expect } from "vitest";
import { missionsPerDay, quizScorePerDay } from "./progressCharts";
import type { MissionLog, QuizHistory } from "../types";

describe("progressCharts", () => {
  it("counts missions into a fixed day window", () => {
    const now = Date.parse("2026-07-27T15:00:00");
    const missions: MissionLog[] = [
      { id: "1", kind: "quiz", label: "a", timestamp: Date.parse("2026-07-27T10:00:00") },
      { id: "2", kind: "reading", label: "b", timestamp: Date.parse("2026-07-27T11:00:00") },
      { id: "3", kind: "video", label: "c", timestamp: Date.parse("2026-07-21T11:00:00") },
    ];
    const series = missionsPerDay(missions, 7, now);
    expect(series).toHaveLength(7);
    expect(series[6]).toMatchObject({ dateKey: "2026-07-27", value: 2 });
    expect(series[0]).toMatchObject({ dateKey: "2026-07-21", value: 1 });
  });

  it("averages quiz scores as percents per day", () => {
    const now = Date.parse("2026-07-27T15:00:00");
    const history: QuizHistory[] = [
      {
        id: "1",
        level: "A1",
        topic: "Reading",
        score: 2,
        totalQuestions: 4,
        timestamp: Date.parse("2026-07-27T10:00:00"),
      },
      {
        id: "2",
        level: "A1",
        topic: "Listening",
        score: 4,
        totalQuestions: 4,
        timestamp: Date.parse("2026-07-27T12:00:00"),
      },
    ];
    const series = quizScorePerDay(history, 3, now);
    expect(series[2].value).toBe(75); // (2+4)/(4+4)
  });
});
