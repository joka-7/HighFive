import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import {
  MESSAGING_SW_SCOPE,
  disablePushReminders,
  isRemindersRegistered,
  registerServiceWorker,
  reportReminderDay,
} from "./push";

describe("registerServiceWorker", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("registers the messaging worker outside the app-shell worker's '/' scope", async () => {
    const register = vi.fn().mockResolvedValue({});
    vi.stubGlobal("navigator", { serviceWorker: { register } });

    await registerServiceWorker();

    expect(register).toHaveBeenCalledOnce();
    const [url, options] = register.mock.calls[0] as [string, RegistrationOptions];
    expect(url.startsWith("/firebase-messaging-sw.js")).toBe(true);
    expect(options.scope).toBe(MESSAGING_SW_SCOPE);
    expect(MESSAGING_SW_SCOPE).not.toBe("/");
  });
});

const REGISTRATION_KEY = "high5.reminder_install";
const registration = (reported = {}) =>
  JSON.stringify({ installId: "11111111-2222-3333-4444-555555555555", writeKey: "k".repeat(43), reported });

function stubFetch(status = 204) {
  const calls: { url: string; method: string; body: Record<string, unknown> }[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init: RequestInit) => {
      calls.push({ url, method: String(init.method), body: JSON.parse(String(init.body)) as Record<string, unknown> });
      return new Response(null, { status });
    }),
  );
  return calls;
}

const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

describe("reportReminderDay", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.unstubAllGlobals());

  it.each([
    {
      name: "sends nothing when this browser never opted in",
      stored: null,
      day: { seenDate: "2026-10-21" },
      sent: [] as Record<string, unknown>[],
    },
    {
      name: "reports opening the app, with the timezone the first time",
      stored: registration(),
      day: { seenDate: "2026-10-21" },
      sent: [{ seenDate: "2026-10-21", timezone: tz }],
    },
    {
      name: "does not repeat a report already made today",
      stored: registration({ seenDate: "2026-10-21", timezone: tz }),
      day: { seenDate: "2026-10-21" },
      sent: [],
    },
    {
      name: "reports finishing the day",
      stored: registration({ seenDate: "2026-10-21", timezone: tz }),
      day: { doneDate: "2026-10-21" },
      sent: [{ doneDate: "2026-10-21" }],
    },
  ])("$name", async ({ stored, day, sent }) => {
    if (stored) localStorage.setItem(REGISTRATION_KEY, stored);
    const calls = stubFetch();

    await reportReminderDay(day);

    const reported = calls.map(({ body }) =>
      Object.fromEntries(Object.entries(body).filter(([key]) => key !== "installId" && key !== "writeKey")),
    );
    expect(reported).toEqual(sent);
  });

  it("sends concurrent reports one after another, so neither is repeated or lost", async () => {
    localStorage.setItem(REGISTRATION_KEY, registration());
    const calls = stubFetch();

    await Promise.all([reportReminderDay({ seenDate: "2026-10-21" }), reportReminderDay({ doneDate: "2026-10-21" })]);
    await reportReminderDay({ seenDate: "2026-10-21", doneDate: "2026-10-21" });

    const reported = calls.map(({ body }) =>
      Object.fromEntries(Object.entries(body).filter(([key]) => key !== "installId" && key !== "writeKey")),
    );
    expect(reported).toEqual([{ seenDate: "2026-10-21", timezone: tz }, { doneDate: "2026-10-21" }]);
  });

  it("forgets the registration when the server no longer knows this install", async () => {
    localStorage.setItem(REGISTRATION_KEY, registration());
    stubFetch(404);

    await reportReminderDay({ seenDate: "2026-10-21" });

    expect(isRemindersRegistered()).toBe(false);
  });

  it("keeps the registration and throws on a server error, so the next report retries", async () => {
    localStorage.setItem(REGISTRATION_KEY, registration());
    stubFetch(500);

    await expect(reportReminderDay({ seenDate: "2026-10-21" })).rejects.toThrow();
    expect(isRemindersRegistered()).toBe(true);
  });
});

describe("disablePushReminders", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.unstubAllGlobals());

  it.each([
    { name: "a successful opt-out", status: 204 },
    { name: "an install the server already removed", status: 404 },
  ])("forgets the registration after $name", async ({ status }) => {
    localStorage.setItem(REGISTRATION_KEY, registration());
    const calls = stubFetch(status);

    await disablePushReminders();

    expect([calls[0]?.method, calls[0]?.url, isRemindersRegistered()]).toEqual(["DELETE", "/api/reminder", false]);
  });
});
