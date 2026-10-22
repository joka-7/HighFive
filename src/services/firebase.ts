// Firebase web config — used only for web-push reminders (FCM). Learning data
// no longer goes anywhere near Firebase: it stays on the device and, if the
// learner connects it, in their own Google Drive (services/driveSync.ts).
//
// Firebase web config is a public client identifier (it ships in every
// client); it comes ONLY from env vars, with deliberately no hardcoded
// fallback project — a fork or preview deploy without a .env must not
// register push tokens against someone else's project. Without the env vars,
// isPushConfigured() is false and the reminder option is hidden.
//
// Exported because the messaging service worker registration needs the same
// config (see services/push.ts).
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "",
};

/** True only when the Firebase config FCM needs, plus a VAPID key, is present. */
export function isPushConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.projectId &&
      firebaseConfig.messagingSenderId &&
      firebaseConfig.appId &&
      import.meta.env.VITE_FIREBASE_VAPID_KEY,
  );
}
