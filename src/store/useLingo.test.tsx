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
    const sampleWord = {
      word: "apple",
      partOfSpeech: "noun",
      definition: "תפוח",
      example: "I eat an apple.",
      translation: "תפוח",
      level: "A1" as const,
    };
    const result = renderRegisteredLingo();
    act(() => {
      result.current.completeQuiz("A1", "Mixed grammar", 3, 5);
      result.current.logMission("quiz", "x");
      result.current.toggleSaveWord(sampleWord);
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

describe("useLingo — streak, SRS, and mission auto-complete", () => {
  it("starts a new user with streak 1", () => {
    const result = renderRegisteredLingo();
    expect(result.current.progress!.streak).toBe(1);
  });

  it("saves a word with SRS fields and grades reviewWord", () => {
    const result = renderRegisteredLingo();
    act(() => {
      result.current.toggleSaveWord({
        word: "book",
        partOfSpeech: "noun",
        definition: "ספר",
        example: "I read a book.",
        translation: "ספר",
        level: "A1",
      });
    });
    expect(result.current.savedWords).toHaveLength(1);
    expect(result.current.savedWords[0].srsLevel).toBe(0);
    expect(result.current.isWordSaved("book")).toBe(true);
    expect(result.current.dueWords().some((w) => w.word === "book")).toBe(true);

    const id = result.current.savedWords[0].id;
    const pointsBefore = result.current.progress!.points;
    act(() => {
      result.current.reviewWord(id, true);
    });
    expect(result.current.savedWords[0].srsLevel).toBeGreaterThan(0);
    expect(result.current.progress!.points).toBe(pointsBefore + 5);
  });

  it("auto-completes the reading mission after a Reading quiz today", () => {
    const result = renderRegisteredLingo();
    expect(result.current.dailyMissions.reading).toBe(false);
    act(() => {
      result.current.completeQuiz("A1", "Reading", 3, 3);
    });
    expect(result.current.dailyMissions.reading).toBe(true);
  });

  it("auto-completes the words mission after saving 5 words today", () => {
    const result = renderRegisteredLingo();
    act(() => {
      for (let i = 0; i < 5; i++) {
        result.current.toggleSaveWord({
          word: `word${i}`,
          partOfSpeech: "noun",
          definition: "ד",
          example: "I see it.",
          translation: "ד",
          level: "A1",
        });
      }
    });
    expect(result.current.todayWordCount).toBe(5);
    expect(result.current.dailyMissions.words).toBe(true);
  });

  it("awards mission points once for manually completing video", () => {
    const result = renderRegisteredLingo();
    const before = result.current.progress!.points;
    act(() => {
      result.current.completeMission("video");
    });
    expect(result.current.dailyMissions.video).toBe(true);
    expect(result.current.progress!.points).toBe(before + 30);
    act(() => {
      result.current.completeMission("video");
    });
    expect(result.current.progress!.points).toBe(before + 30);
  });
});

describe("useLingo — export / import progress", () => {
  it("round-trips progress through exportProgress and importProgress", () => {
    const result = renderRegisteredLingo();
    act(() => {
      result.current.completeQuiz("A1", "Mixed grammar", 4, 5);
      result.current.toggleSaveWord({
        word: "cat",
        partOfSpeech: "noun",
        definition: "חתול",
        example: "The cat sits.",
        translation: "חתול",
        level: "A1",
      });
    });
    const backup = result.current.exportProgress();
    expect(backup.version).toBe(1);
    expect(backup.savedWords).toHaveLength(1);

    act(() => {
      result.current.resetAll();
    });
    expect(result.current.progress).toBeNull();

    act(() => {
      result.current.importProgress(backup);
    });
    expect(result.current.progress!.userName).toBe("Dana");
    expect(result.current.savedWords[0].word).toBe("cat");
    expect(result.current.quizHistory).toHaveLength(1);
  });
});
