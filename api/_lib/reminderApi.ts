// Request handling for the web-push reminder registration, kept free of
// Firebase and Vercel so it can be tested with fakes. The real wiring is in
// api/reminder-register.ts and api/reminder.ts.
//
// Each browser install registers once and gets back an install id plus a
// random write key; the server keeps only the key's SHA-256. Every later
// update or removal must present that key, so nobody can edit or silence
// another install's reminders. What's stored is exactly ReminderInstall — a
// push token, a timezone and two dates — and nothing that identifies a person.

import { isDateKey, isValidTimeZone, type ReminderInstall } from "../../src/utils/reminderLogic";

export interface StoredInstall extends ReminderInstall {
  readonly writeKeyHash: string;
}

export type InstallUpdate = Partial<Pick<StoredInstall, "pushToken" | "timezone" | "doneDate" | "seenDate">>;

/** Where installs live (reminders/{installId} in Firestore). */
export interface ReminderStore {
  create(id: string, install: StoredInstall): Promise<void>;
  get(id: string): Promise<StoredInstall | null>;
  update(id: string, fields: InstallUpdate): Promise<void>;
  remove(id: string): Promise<void>;
  /** Installs ordered by id, starting after `afterId`. */
  page(afterId: string | null, limit: number): Promise<{ id: string; install: StoredInstall }[]>;
}

export interface ReminderApiDeps {
  readonly store: ReminderStore;
  /** True when FCM accepts the token (a dry-run send). */
  readonly isDeliverable: (pushToken: string) => Promise<boolean>;
  readonly newId: () => string;
  readonly newWriteKey: () => string;
  readonly hashKey: (key: string) => string;
  /** Constant-time comparison of two hashes. */
  readonly sameHash: (a: string, b: string) => boolean;
}

export interface ApiResult {
  readonly status: number;
  readonly body: unknown;
}

const INSTALL_ID = /^[0-9a-f-]{36}$/;
const WRITE_KEY = /^[A-Za-z0-9_-]{43}$/;

function isPushToken(value: unknown): value is string {
  return typeof value === "string" && value.length >= 20 && value.length <= 4096;
}

type Obj = Record<string, unknown>;
const isObject = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);

const bad = (error: string): ApiResult => ({ status: 400, body: { error } });

/** Optional date field: absent, null, or YYYY-MM-DD. */
function optionalDate(body: Obj, field: "doneDate" | "seenDate"): { ok: true; value?: string | null } | { ok: false } {
  if (!(field in body)) return { ok: true };
  const value = body[field];
  if (value === null || isDateKey(value)) return { ok: true, value };
  return { ok: false };
}

export function createReminderApi({ store, isDeliverable, newId, newWriteKey, hashKey, sameHash }: ReminderApiDeps) {
  /** The install the body names, if its write key matches; otherwise the error to return. */
  async function authorize(body: unknown): Promise<{ id: string; body: Obj } | ApiResult> {
    if (!isObject(body)) return bad("expected a JSON object");
    const { installId, writeKey } = body;
    if (typeof installId !== "string" || !INSTALL_ID.test(installId)) return bad("invalid installId");
    if (typeof writeKey !== "string" || !WRITE_KEY.test(writeKey)) return bad("invalid writeKey");
    const stored = await store.get(installId);
    if (!stored) return { status: 404, body: { error: "unknown install" } };
    if (!sameHash(stored.writeKeyHash, hashKey(writeKey))) return { status: 403, body: { error: "forbidden" } };
    return { id: installId, body };
  }

  return {
    async register(body: unknown): Promise<ApiResult> {
      if (!isObject(body)) return bad("expected a JSON object");
      const { pushToken, timezone } = body;
      if (!isPushToken(pushToken)) return bad("invalid pushToken");
      if (!isValidTimeZone(timezone)) return bad("invalid timezone");
      if (!(await isDeliverable(pushToken))) return bad("push token rejected");
      const installId = newId();
      const writeKey = newWriteKey();
      await store.create(installId, {
        pushToken,
        timezone,
        doneDate: null,
        seenDate: null,
        writeKeyHash: hashKey(writeKey),
      });
      return { status: 201, body: { installId, writeKey } };
    },

    async update(body: unknown): Promise<ApiResult> {
      const auth = await authorize(body);
      if ("status" in auth) return auth;
      const fields: { -readonly [K in keyof InstallUpdate]: InstallUpdate[K] } = {};
      for (const field of ["doneDate", "seenDate"] as const) {
        const parsed = optionalDate(auth.body, field);
        if (!parsed.ok) return bad(`invalid ${field}`);
        if (parsed.value !== undefined) fields[field] = parsed.value;
      }
      if ("timezone" in auth.body) {
        if (!isValidTimeZone(auth.body.timezone)) return bad("invalid timezone");
        fields.timezone = auth.body.timezone;
      }
      if ("pushToken" in auth.body) {
        const token = auth.body.pushToken;
        if (!isPushToken(token)) return bad("invalid pushToken");
        if (!(await isDeliverable(token))) return bad("push token rejected");
        fields.pushToken = token;
      }
      if (Object.keys(fields).length === 0) return bad("nothing to update");
      await store.update(auth.id, fields);
      return { status: 204, body: null };
    },

    async unregister(body: unknown): Promise<ApiResult> {
      const auth = await authorize(body);
      if ("status" in auth) return auth.status === 404 ? { status: 204, body: null } : auth;
      await store.remove(auth.id);
      return { status: 204, body: null };
    },
  };
}

export type ReminderApi = ReturnType<typeof createReminderApi>;
