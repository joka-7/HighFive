import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import { LingoProvider, useLingo } from "./useLingo";

// Local-mode only for these tests — cloud sync (A2) has its own store-level
// tests below with a controllable mock, but the points/history tests don't
// need Firebase at all and shouldn't depend on it.
vi.mock("../services/firebase", () => ({
  isCloudConfigured: () => false,
  watchAuth: (cb: (user: null) => void) => {
    cb(null);
    return () => {};
  },
  loadCloud: vi.fn(),
  saveCloud: vi.fn(),
  signInWithGoogle: vi.fn(),
  signOut: vi.fn(),
}));

function wrapper({ children }: { children: ReactNode }) {
  return <LingoProvider>{children}</LingoProvider>;
}

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

function renderRegisteredLingo() {
  const { result } = renderHook(() => useLingo(), { wrapper });
  act(() => {
    result.current.registerUser("Dana", "עברית", "A1");
  });
  return result;
}

describe("useLingo — points economy (A7: no unlimited farming)", () => {
  it("awards full points the first time a quiz topic is completed today, reduced on repeat", () => {
    const result = renderRegisteredLingo();
    const before = result.current.progress!.points;

    let firstEarned = 0;
    act(() => {
      firstEarned = result.current.completeQuiz("A1", "Mixed grammar", 5, 5);
    });
    expect(firstEarned).toBe(5 * 25);
    expect(result.current.progress!.points).toBe(before + firstEarned);

    let secondEarned = 0;
    act(() => {
      secondEarned = result.current.completeQuiz("A1", "Mixed grammar", 5, 5);
    });
    expect(secondEarned).toBeLessThan(firstEarned);
    expect(secondEarned).toBe(Math.round(25 * 0.25) * 5);
  });

  it("does not reduce points for a different topic completed the same day", () => {
    const result = renderRegisteredLingo();

    let first = 0;
    let second = 0;
    act(() => {
      first = result.current.completeQuiz("A1", "Mixed grammar", 5, 5);
    });
    act(() => {
      second = result.current.completeQuiz("A1", "Reading", 5, 5);
    });
    expect(second).toBe(first);
  });

  it("gives full Speaking credit for the first round, then reduces", () => {
    const result = renderRegisteredLingo();

    act(() => {
      for (let i = 0; i < 4; i++) result.current.awardSpeakingPoints(100);
    });
    const afterFullRound = result.current.progress!.points;

    act(() => {
      result.current.awardSpeakingPoints(100);
    });
    const fifthGain = result.current.progress!.points - afterFullRound;
    expect(fifthGain).toBeLessThan(20);
    expect(fifthGain).toBe(Math.round(20 * 0.25));
  });
});

describe("useLingo — missions done in another app", () => {
  it("marks the mission, awards points once, and keeps what the learner did", () => {
    const result = renderRegisteredLingo();
    const before = result.current.progress!.points;

    act(() => {
      result.current.completeMission("listening", "  Bohemian Rhapsody  ");
    });

    expect(result.current.dailyMissions.listening).toBe(true);
    expect(result.current.dailyMissions.externalNotes?.listening).toBe("Bohemian Rhapsody");
    expect(result.current.progress!.points).toBe(before + 30);

    // A second mark for the same mission today is a no-op.
    act(() => {
      result.current.completeMission("listening", "another song");
    });
    expect(result.current.progress!.points).toBe(before + 30);
    expect(result.current.dailyMissions.externalNotes?.listening).toBe("Bohemian Rhapsody");
  });

  it("writes the title into the calendar entry", () => {
    const result = renderRegisteredLingo();
    act(() => {
      result.current.completeMission("reading", "BBC article about sleep");
    });

    const entry = result.current.missionLog.find((m) => m.kind === "reading");
    expect(entry?.label).toContain("BBC article about sleep");
  });

  it("logs a plain label when nothing was written", () => {
    const result = renderRegisteredLingo();
    act(() => {
      result.current.completeMission("video");
    });

    const entry = result.current.missionLog.find((m) => m.kind === "video");
    expect(entry?.label).toBe("צפייה באנגלית");
    expect(result.current.dailyMissions.externalNotes?.video).toBeUndefined();
  });

  it("caps a very long note", () => {
    const result = renderRegisteredLingo();
    act(() => {
      result.current.completeMission("talk", "x".repeat(500));
    });
    expect(result.current.dailyMissions.externalNotes?.talk?.length).toBe(120);
  });
});

describe("useLingo — bounded history (A6: Firestore doc can't grow forever)", () => {
  it("caps chat messages at 200, keeping the most recent", () => {
    const result = renderRegisteredLingo();
    act(() => {
      for (let i = 0; i < 210; i++) {
        result.current.addChatMessage({
          role: "user",
          messageText: `msg ${i}`,
          corrections: null,
          level: "A1",
          scenario: "cafe",
        });
      }
    });
    expect(result.current.chatMessages).toHaveLength(200);
    expect(result.current.chatMessages[0].messageText).toBe("msg 10");
    expect(result.current.chatMessages[199].messageText).toBe("msg 209");
  });

  it("caps the mission log at 400, keeping the most recent first", () => {
    const result = renderRegisteredLingo();
    act(() => {
      for (let i = 0; i < 410; i++) {
        result.current.logMission("quiz", `mission ${i}`);
      }
    });
    expect(result.current.missionLog).toHaveLength(400);
    expect(result.current.missionLog[0].label).toBe("mission 409");
  });
});

describe("useLingo — resetAll (A4/A10)", () => {
  it("clears progress and learner data back to a fresh state", () => {
    const result = renderRegisteredLingo();
    act(() => {
      result.current.completeQuiz("A1", "Mixed grammar", 3, 5);
      result.current.logMission("quiz", "x");
    });
    expect(result.current.progress).not.toBeNull();

    act(() => {
      result.current.resetAll();
    });
    expect(result.current.progress).toBeNull();
    expect(result.current.savedWords).toEqual([]);
    expect(result.current.quizHistory).toEqual([]);
    expect(result.current.missionLog).toEqual([]);
  });
});
