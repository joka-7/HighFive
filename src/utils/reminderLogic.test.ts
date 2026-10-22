import { describe, expect, it } from "vitest";
import { isDateKey, isValidTimeZone, shouldSendReminder, type ReminderInstall } from "./reminderLogic";

const TARGET_HOUR = 18;
const NOW = new Date("2026-07-23T18:30:00Z"); // 18:xx UTC

function install(overrides: Partial<ReminderInstall> = {}): ReminderInstall {
  return { pushToken: "token-123", timezone: "UTC", doneDate: null, seenDate: null, ...overrides };
}

describe("shouldSendReminder", () => {
  it.each([
    { name: "sends at the target hour to a learner who neither opened the app nor finished today", over: {}, now: NOW, hour: TARGET_HOUR, sent: true },
    { name: "sends when the dates reported are from earlier days", over: { doneDate: "2026-07-22", seenDate: "2026-07-22" }, now: NOW, hour: TARGET_HOUR, sent: true },
    { name: "skips a learner who opened the app today", over: { seenDate: "2026-07-23" }, now: NOW, hour: TARGET_HOUR, sent: false },
    { name: "skips a learner who finished every mission today", over: { doneDate: "2026-07-23" }, now: NOW, hour: TARGET_HOUR, sent: false },
    { name: "skips when it isn't the target local hour", over: {}, now: new Date("2026-07-23T12:00:00Z"), hour: TARGET_HOUR, sent: false },
    // 18:30Z is 14:30 in New York (EDT), and already the 24th in Tokyo.
    { name: "evaluates the hour in the learner's timezone, not UTC", over: { timezone: "America/New_York" }, now: NOW, hour: 14, sent: true },
    { name: "evaluates 'today' in the learner's timezone", over: { timezone: "Asia/Tokyo", seenDate: "2026-07-23" }, now: new Date("2026-07-24T09:30:00Z"), hour: TARGET_HOUR, sent: true },
    { name: "skips an install with no push token", over: { pushToken: "" }, now: NOW, hour: TARGET_HOUR, sent: false },
    { name: "skips an invalid timezone instead of throwing", over: { timezone: "Not/AZone" }, now: NOW, hour: TARGET_HOUR, sent: false },
  ])("$name", ({ over, now, hour, sent }) => {
    expect(shouldSendReminder(install(over), now, hour)).toBe(sent);
  });
});

describe("isDateKey", () => {
  it.each([
    ["2026-07-23", true],
    ["2026-7-23", false],
    ["2026-07-23T00:00", false],
    [20260723, false],
    [null, false],
  ])("%s → %s", (value, expected) => {
    expect(isDateKey(value)).toBe(expected);
  });
});

describe("isValidTimeZone", () => {
  it.each([
    ["Asia/Jerusalem", true],
    ["UTC", true],
    ["Not/AZone", false],
    ["", false],
    ["x".repeat(65), false],
    [42, false],
  ])("%s → %s", (value, expected) => {
    expect(isValidTimeZone(value)).toBe(expected);
  });
});
