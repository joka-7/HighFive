// Web Push (FCM) opt-in for the "you haven't done today's missions" reminder.
//
// No account is involved: this browser registers itself with the reminder
// endpoint (api/reminder-register.ts) and keeps the returned install id and
// write key locally. Afterwards it reports only two facts — that the learner
// opened the app today, and that they finished every mission today — so the
// hourly sender knows whom to skip. The server never sees progress, words or
// a Google account (see api/_lib/reminderApi.ts).

import { firebaseConfig, isPushConfigured } from "./firebase";

const REGISTRATION_KEY = "high5.reminder_install";

// A scope holds exactly one service worker, and the Workbox app-shell worker
// (services/pwa.ts) already owns "/". Registering the messaging worker there
// too would evict the offline precache — and the next page load would evict
// the messaging worker right back. This is the scope the Firebase SDK itself
// uses for its default registration.
export const MESSAGING_SW_SCOPE = "/firebase-cloud-messaging-push-scope";

interface Registration {
  readonly installId: string;
  readonly writeKey: string;
  /** What this browser last reported, so a report is sent at most once a day. */
  readonly reported?: { doneDate?: string; seenDate?: string; timezone?: string };
}

export function isPushSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

export function pushPermission(): NotificationPermission | "unsupported" {
  if (!isPushSupported()) return "unsupported";
  return Notification.permission;
}

function readRegistration(): Registration | null {
  try {
    const raw = localStorage.getItem(REGISTRATION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Registration> | null;
    return parsed && typeof parsed.installId === "string" && typeof parsed.writeKey === "string"
      ? (parsed as Registration)
      : null;
  } catch {
    return null;
  }
}

function writeRegistration(registration: Registration | null): void {
  try {
    if (registration) localStorage.setItem(REGISTRATION_KEY, JSON.stringify(registration));
    else localStorage.removeItem(REGISTRATION_KEY);
  } catch {
    // Blocked storage: reminders just can't be reported from this session.
  }
}

/** True once this browser has opted in to reminders. */
export function isRemindersRegistered(): boolean {
  return readRegistration() !== null;
}

// firebase-messaging-sw.js is a static file (public/), never processed by
// Vite, so it can't read import.meta.env — the live config is passed in the
// registration URL's query string instead, and the SW reads it from there.
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration> {
  const params = new URLSearchParams(
    Object.entries(firebaseConfig).filter(([, v]) => Boolean(v)) as [string, string][],
  );
  return navigator.serviceWorker.register(`/firebase-messaging-sw.js?${params.toString()}`, {
    scope: MESSAGING_SW_SCOPE,
  });
}

const timezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

async function postJson(url: string, method: "POST" | "DELETE", body: unknown): Promise<Response> {
  return fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
}

export interface EnablePushResult {
  ok: boolean;
  error?: "not-configured" | "unsupported" | "denied" | "no-token" | "failed";
}

export async function enablePushReminders(): Promise<EnablePushResult> {
  if (!isPushConfigured()) return { ok: false, error: "not-configured" };
  if (!isPushSupported()) return { ok: false, error: "unsupported" };

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return { ok: false, error: "denied" };

    const registration = await registerServiceWorker();
    const { initializeApp, getApps } = await import("firebase/app");
    const { getMessaging, getToken } = await import("firebase/messaging");
    const app = getApps()[0] ?? initializeApp(firebaseConfig);
    const pushToken = await getToken(getMessaging(app), {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
    if (!pushToken) return { ok: false, error: "no-token" };

    const tz = timezone();
    const res = await postJson("/api/reminder-register", "POST", { pushToken, timezone: tz });
    if (!res.ok) return { ok: false, error: "failed" };
    const body = (await res.json()) as { installId?: unknown; writeKey?: unknown };
    if (typeof body.installId !== "string" || typeof body.writeKey !== "string") return { ok: false, error: "failed" };
    writeRegistration({ installId: body.installId, writeKey: body.writeKey, reported: { timezone: tz } });
    return { ok: true };
  } catch {
    return { ok: false, error: "failed" };
  }
}

/**
 * Tell the reminder sender about today: opened the app (`seenDate`) and/or
 * finished every mission (`doneDate`). Sends only what changed since the last
 * report, and nothing at all when this browser never opted in.
 */
// Reports run one at a time: two at once (seen and done on load) would each
// read the stored registration and overwrite the other's record of what was sent.
let reportChain: Promise<void> = Promise.resolve();

export function reportReminderDay(day: { seenDate?: string; doneDate?: string }): Promise<void> {
  const next = reportChain.then(() => sendReminderDay(day));
  reportChain = next.catch(() => {});
  return next;
}

async function sendReminderDay(day: { seenDate?: string; doneDate?: string }): Promise<void> {
  const registration = readRegistration();
  if (!registration) return;
  const reported = registration.reported ?? {};
  const tz = timezone();
  const update: Record<string, string> = {};
  if (day.seenDate && day.seenDate !== reported.seenDate) update.seenDate = day.seenDate;
  if (day.doneDate && day.doneDate !== reported.doneDate) update.doneDate = day.doneDate;
  if (tz !== reported.timezone) update.timezone = tz;
  if (Object.keys(update).length === 0) return;

  const res = await postJson("/api/reminder", "POST", {
    installId: registration.installId,
    writeKey: registration.writeKey,
    ...update,
  });
  // The server no longer knows this install (removed as a dead token): stop
  // reporting, and let the settings screen offer to opt in again.
  if (res.status === 404) {
    writeRegistration(null);
    return;
  }
  if (!res.ok) throw new Error(`reminder report failed (${res.status})`);
  writeRegistration({ ...registration, reported: { ...reported, ...update } });
}

export async function disablePushReminders(): Promise<void> {
  const registration = readRegistration();
  if (!registration) return;
  const res = await postJson("/api/reminder", "DELETE", {
    installId: registration.installId,
    writeKey: registration.writeKey,
  });
  if (!res.ok && res.status !== 404) throw new Error(`reminder opt-out failed (${res.status})`);
  writeRegistration(null);
}
