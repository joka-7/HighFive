// Daily "you haven't done today's missions" push reminder — triggered hourly
// by .github/workflows/mission-reminder.yml (Vercel's free Hobby plan only
// allows once-a-day cron, which can't respect each user's own local time, so
// the actual scheduling lives in GitHub Actions; this endpoint just does the
// per-user check on every hourly call and lets shouldSendReminder() decide who
// is actually due right now).
//
// Not part of the Vite app (see tsconfig.json's "include") — Vercel builds
// this file independently as a Node.js Serverless Function.

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";
import { shouldSendReminder, type ReminderUserData } from "../src/utils/reminderLogic";

// Local hour (in each user's own timezone) the reminder targets.
const TARGET_HOUR = 18;

function initAdmin() {
  if (getApps().length > 0) return;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT is not set");
  initializeApp({ credential: cert(JSON.parse(raw)) });
}

// Minimal request/response shape (avoids depending on @vercel/node just for
// types) — Vercel's Node runtime passes an IncomingMessage-like req and a
// ServerResponse extended with status()/json() helpers.
interface Req {
  headers: { authorization?: string };
}
interface Res {
  status(code: number): Res;
  json(body: unknown): void;
}

export default async function handler(req: Req, res: Res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  initAdmin();
  const db = getFirestore();
  const messaging = getMessaging();
  const now = new Date();

  const snap = await db.collection("users").where("pushToken", "!=", null).get();

  let sent = 0;
  let cleared = 0;

  await Promise.all(
    snap.docs.map(async (docSnap) => {
      const data = docSnap.data() as ReminderUserData;
      if (!shouldSendReminder(data, now, TARGET_HOUR)) return;

      try {
        await messaging.send({
          token: data.pushToken as string,
          notification: {
            title: "High5 — היי, לא שוכחים היום? 👋",
            body: "עוד לא השלמת את המשימות היומיות שלך. כמה דקות מספיקות!",
          },
          webpush: { fcmOptions: { link: "/" } },
        });
        sent++;
      } catch (err: unknown) {
        const code = (err as { code?: string })?.code;
        if (code === "messaging/registration-token-not-registered") {
          await docSnap.ref.set({ pushToken: null }, { merge: true });
          cleared++;
        }
      }
    }),
  );

  res.status(200).json({ checked: snap.size, sent, cleared });
}
