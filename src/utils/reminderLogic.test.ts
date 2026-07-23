import { describe, expect, it } from "vitest";
import { missionsCompleteToday, shouldSendReminder, type ReminderUserData } from "./reminderLogic";

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
      grammar: true,
    };
    expect(missionsCompleteToday(missions, "2026-07-23")).toBe(true);
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
