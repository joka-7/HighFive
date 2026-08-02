import { describe, expect, it } from "vitest";
import {
  isReviewDateKey,
  missionsCompleteToday,
  shouldSendReminder,
  type ReminderUserData,
} from "./reminderLogic";

const TARGET_HOUR = 18;
const NOW = new Date("2026-07-23T18:30:00Z"); // 18:xx UTC

function baseUser(overrides: Partial<ReminderUserData> = {}): ReminderUserData {
  return {
    pushToken: "token-123",
    timezone: "UTC",
    progress: { lastActiveTimestamp: Date.parse("2026-07-22T10:00:00Z") },
    dailyMissions: {
      date: "2026-07-23",
      video: false,
      talk: false,
      words: false,
      reading: false,
      listening: false,
      speaking: false,
      grammar: false,
    },
    ...overrides,
  };
}

describe("missionsCompleteToday", () => {
  it("is false when the mission date doesn't match today", () => {
    const missions = {
      date: "2026-07-22",
      video: true,
      talk: true,
      words: true,
      reading: true,
      listening: true,
      speaking: true,
      grammar: true,
    };
    expect(missionsCompleteToday(missions, "2026-07-23")).toBe(false);
  });

  it("is false when any mission is still incomplete", () => {
    const missions = {
      date: "2026-07-23",
      video: true,
      talk: true,
      words: true,
      reading: true,
      grammar: false,
    };
    expect(missionsCompleteToday(missions, "2026-07-23")).toBe(false);
  });

  it("is true when every mission is done for today", () => {
    const missions = {
      date: "2026-07-23",
      video: true,
      talk: true,
      words: true,
      reading: true,
      listening: true,
      speaking: true,
      grammar: true,
    };
    expect(missionsCompleteToday(missions, "2026-07-23")).toBe(true);
  });

  // 2026-07-23 is a Thursday (a learning day); 2026-07-24 is a Friday.
  it("wants the week's review, not new words, on a review day", () => {
    const done = {
      video: true,
      talk: true,
      reading: true,
      listening: true,
      speaking: true,
      grammar: true,
    };
    // Friday: the memorization round is what completes the vocabulary slot.
    expect(
      missionsCompleteToday(
        { date: "2026-07-24", words: false, memorization: true, ...done },
        "2026-07-24",
      ),
    ).toBe(true);
    expect(
      missionsCompleteToday(
        { date: "2026-07-24", words: true, memorization: false, ...done },
        "2026-07-24",
      ),
    ).toBe(false);
    // Thursday: new words, and a memorization round doesn't stand in for them.
    expect(
      missionsCompleteToday(
        { date: "2026-07-23", words: false, memorization: true, ...done },
        "2026-07-23",
      ),
    ).toBe(false);
  });
});

describe("isReviewDateKey", () => {
  it("marks Friday and Saturday as review days", () => {
    // 2026-07-26 is a Sunday, so 07-31 is Friday and 08-01 is Saturday.
    expect(["2026-07-26", "2026-07-27", "2026-07-28", "2026-07-29", "2026-07-30"].map(isReviewDateKey))
      .toEqual([false, false, false, false, false]);
    expect(["2026-07-31", "2026-08-01"].map(isReviewDateKey)).toEqual([true, true]);
  });
});

describe("shouldSendReminder", () => {
  it("sends when it's the target hour, the user was inactive today, and missions are incomplete", () => {
    expect(shouldSendReminder(baseUser(), NOW, TARGET_HOUR)).toBe(true);
  });

  it("skips users without a push token or timezone", () => {
    expect(shouldSendReminder(baseUser({ pushToken: null }), NOW, TARGET_HOUR)).toBe(false);
    expect(shouldSendReminder(baseUser({ timezone: null }), NOW, TARGET_HOUR)).toBe(false);
  });

  it("skips when it isn't the target local hour", () => {
    const notYet = new Date("2026-07-23T12:00:00Z");
    expect(shouldSendReminder(baseUser(), notYet, TARGET_HOUR)).toBe(false);
  });

  it("skips a user who already opened the app today", () => {
    const activeToday = baseUser({
      progress: { lastActiveTimestamp: Date.parse("2026-07-23T09:00:00Z") },
    });
    expect(shouldSendReminder(activeToday, NOW, TARGET_HOUR)).toBe(false);
  });

  it("skips a user who already finished all of today's missions", () => {
    const allDone = baseUser({
      dailyMissions: {
        date: "2026-07-23",
        video: true,
        talk: true,
        words: true,
        reading: true,
        listening: true,
        speaking: true,
        grammar: true,
      },
    });
    expect(shouldSendReminder(allDone, NOW, TARGET_HOUR)).toBe(false);
  });

  it("evaluates the hour in the user's own timezone, not UTC", () => {
    // 2026-07-23T18:30:00Z is 14:30 in New York (EDT, UTC-4) — not 18:00 there.
    const nyUser = baseUser({ timezone: "America/New_York" });
    expect(shouldSendReminder(nyUser, NOW, TARGET_HOUR)).toBe(false);
    expect(shouldSendReminder(nyUser, NOW, 14)).toBe(true);
  });

  it("returns false for an invalid timezone instead of throwing", () => {
    expect(shouldSendReminder(baseUser({ timezone: "Not/AZone" }), NOW, TARGET_HOUR)).toBe(false);
  });
});
