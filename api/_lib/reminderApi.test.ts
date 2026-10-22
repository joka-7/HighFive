import { describe, it, expect } from "vitest";
import { createReminderApi, type ReminderStore, type StoredInstall } from "./reminderApi";

const ID = "11111111-2222-3333-4444-555555555555";
const KEY = "k".repeat(43);
const TOKEN = "t".repeat(40);

/** In-memory reminders collection. */
function memoryStore(seed: Record<string, StoredInstall> = {}) {
  const docs = new Map(Object.entries(seed));
  const store: ReminderStore = {
    create: async (id, install) => {
      docs.set(id, install);
    },
    get: async (id) => docs.get(id) ?? null,
    update: async (id, fields) => {
      const current = docs.get(id);
      if (current) docs.set(id, { ...current, ...fields });
    },
    remove: async (id) => {
      docs.delete(id);
    },
    page: async (afterId, limit) =>
      [...docs.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .filter(([id]) => afterId === null || id > afterId)
        .slice(0, limit)
        .map(([id, install]) => ({ id, install })),
  };
  return { store, docs };
}

const stored = (overrides: Partial<StoredInstall> = {}): StoredInstall => ({
  pushToken: TOKEN,
  timezone: "Asia/Jerusalem",
  doneDate: null,
  seenDate: null,
  writeKeyHash: `hash:${KEY}`,
  ...overrides,
});

function build({ seed = {}, deliverable = true }: { seed?: Record<string, StoredInstall>; deliverable?: boolean } = {}) {
  const memory = memoryStore(seed);
  const api = createReminderApi({
    store: memory.store,
    isDeliverable: async () => deliverable,
    newId: () => ID,
    newWriteKey: () => KEY,
    hashKey: (key) => `hash:${key}`,
    sameHash: (a, b) => a === b,
  });
  return { api, docs: memory.docs };
}

describe("register", () => {
  it("stores only a token, a timezone, empty dates and the key's hash, and returns the key once", async () => {
    const { api, docs } = build();

    const result = await api.register({ pushToken: TOKEN, timezone: "Asia/Jerusalem", email: "dana@example.com" });

    expect(result).toEqual({ status: 201, body: { installId: ID, writeKey: KEY } });
    expect(docs.get(ID)).toEqual(stored());
  });

  it.each([
    { name: "a body that is not an object", body: "hi", deliverable: true },
    { name: "a missing push token", body: { timezone: "UTC" }, deliverable: true },
    { name: "a short push token", body: { pushToken: "abc", timezone: "UTC" }, deliverable: true },
    { name: "an unknown timezone", body: { pushToken: TOKEN, timezone: "Mars/Olympus" }, deliverable: true },
    { name: "a token FCM rejects", body: { pushToken: TOKEN, timezone: "UTC" }, deliverable: false },
  ])("rejects $name with 400 and stores nothing", async ({ body, deliverable }) => {
    const { api, docs } = build({ deliverable });

    const result = await api.register(body);

    expect([result.status, docs.size]).toEqual([400, 0]);
  });
});

describe("update", () => {
  it.each([
    { name: "reports finishing the day", body: { doneDate: "2026-10-21" }, expected: { doneDate: "2026-10-21" } },
    { name: "reports opening the app", body: { seenDate: "2026-10-21" }, expected: { seenDate: "2026-10-21" } },
    { name: "updates a moved timezone", body: { timezone: "Europe/London" }, expected: { timezone: "Europe/London" } },
    { name: "replaces a rotated token", body: { pushToken: "n".repeat(40) }, expected: { pushToken: "n".repeat(40) } },
  ])("$name", async ({ body, expected }) => {
    const { api, docs } = build({ seed: { [ID]: stored() } });

    const result = await api.update({ installId: ID, writeKey: KEY, ...body });

    expect([result.status, docs.get(ID)]).toEqual([204, stored(expected)]);
  });

  it.each([
    { name: "a wrong write key", body: { installId: ID, writeKey: "x".repeat(43), seenDate: "2026-10-21" }, status: 403 },
    { name: "an unknown install", body: { installId: "99999999-2222-3333-4444-555555555555", writeKey: KEY, seenDate: "2026-10-21" }, status: 404 },
    { name: "a malformed install id", body: { installId: "../etc", writeKey: KEY, seenDate: "2026-10-21" }, status: 400 },
    { name: "a malformed date", body: { installId: ID, writeKey: KEY, seenDate: "yesterday" }, status: 400 },
    { name: "an empty update", body: { installId: ID, writeKey: KEY }, status: 400 },
    { name: "an attempt to overwrite the key hash", body: { installId: ID, writeKey: KEY, writeKeyHash: "mine" }, status: 400 },
  ])("refuses $name and leaves the record unchanged", async ({ body, status }) => {
    const { api, docs } = build({ seed: { [ID]: stored() } });

    const result = await api.update(body);

    expect([result.status, docs.get(ID)]).toEqual([status, stored()]);
  });
});

describe("unregister", () => {
  it.each([
    { name: "removes the install with the right key", key: KEY, remaining: 0, status: 204 },
    { name: "refuses a wrong key", key: "x".repeat(43), remaining: 1, status: 403 },
  ])("$name", async ({ key, remaining, status }) => {
    const { api, docs } = build({ seed: { [ID]: stored() } });

    const result = await api.unregister({ installId: ID, writeKey: key });

    expect([result.status, docs.size]).toEqual([status, remaining]);
  });

  it("treats an already-removed install as done", async () => {
    const { api } = build();

    expect((await api.unregister({ installId: ID, writeKey: KEY })).status).toBe(204);
  });
});
