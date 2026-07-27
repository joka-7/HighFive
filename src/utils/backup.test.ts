import { describe, it, expect } from "vitest";
import { parseProgressBackup, BACKUP_VERSION } from "./backup";

const valid = {
  version: BACKUP_VERSION,
  exportedAt: 1,
  progress: null,
  savedWords: [],
  learnedWords: {},
  chatMessages: [],
  quizHistory: [],
  missionLog: [],
  dailyMissions: {
    date: "",
    video: false,
    talk: false,
    words: false,
    reading: false,
    listening: false,
    speaking: false,
    grammar: false,
  },
};

describe("parseProgressBackup", () => {
  it("accepts a well-formed backup", () => {
    expect(parseProgressBackup(valid).version).toBe(1);
  });

  it("rejects missing version and non-objects", () => {
    expect(() => parseProgressBackup(null)).toThrow(/not an object/);
    expect(() => parseProgressBackup({ ...valid, version: 99 })).toThrow(/unsupported version/);
    expect(() => parseProgressBackup({ ...valid, savedWords: "nope" })).toThrow(/savedWords/);
  });
});
