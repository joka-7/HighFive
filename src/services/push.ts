// Web Push (FCM) opt-in for the "you haven't done today's missions" reminder.
// Signed-in users only — the daily check runs server-side against Firestore
// (see api/mission-reminder.ts); this module just requests permission,
// registers the messaging service worker, and stores the resulting device
// token + timezone on the user's cloud doc.

import { firebaseConfig, isCloudConfigured, savePushSettings } from "./firebase";

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

// firebase-messaging-sw.js is a static file (public/), never processed by
// Vite, so it can't read import.meta.env — the live config is passed in the
// registration URL's query string instead, and the SW reads it from there.
async function registerServiceWorker(): Promise<ServiceWorkerRegistration> {
  const params = new URLSearchParams(
    Object.entries(firebaseConfig).filter(([, v]) => Boolean(v)) as [string, string][],
  );
  return navigator.serviceWorker.register(`/firebase-messaging-sw.js?${params.toString()}`);
}

export interface EnablePushResult {
  ok: boolean;
  error?: "not-configured" | "unsupported" | "missing-vapid-key" | "denied" | "no-token" | "failed";
}

export async function enablePushReminders(uid: string): Promise<EnablePushResult> {
  if (!isCloudConfigured()) return { ok: false, error: "not-configured" };
  if (!isPushSupported()) return { ok: false, error: "unsupported" };

  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
  if (!vapidKey) return { ok: false, error: "missing-vapid-key" };

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return { ok: false, error: "denied" };

    const registration = await registerServiceWorker();
    const { initializeApp, getApps } = await import("firebase/app");
    const { getMessaging, getToken } = await import("firebase/messaging");
    const app = getApps()[0] ?? initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: registration,
    });
    if (!token) return { ok: false, error: "no-token" };

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    await savePushSettings(uid, token, timezone);
    return { ok: true };
  } catch {
    return { ok: false, error: "failed" };
  }
}

export async function disablePushReminders(uid: string): Promise<void> {
  await savePushSettings(uid, null, null);
}
