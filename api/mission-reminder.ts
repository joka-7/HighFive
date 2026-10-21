// Daily "you haven't done today's missions" push reminder — triggered hourly
// by .github/workflows/mission-reminder.yml (Vercel's free Hobby plan only
// allows once-a-day cron, which can't respect each user's own local time, so
// the actual scheduling lives in GitHub Actions; this endpoint just does the
// per-user check on every hourly call and lets shouldSendReminder() decide who
// is actually due right now).
//
// Not part of the Vite app — Vercel builds this file independently as a
// Node.js Serverless Function. Type-checked by tsconfig.api.json.

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type QueryDocumentSnapshot } from "firebase-admin/firestore";
import { getMessaging, type TokenMessage } from "firebase-admin/messaging";
import { shouldSendReminder, type ReminderUserData } from "../src/utils/reminderLogic";
import { isAuthorizedCronRequest } from "./_lib/cronAuth";

// Local hour (in each user's own timezone) the reminder targets.
const TARGET_HOUR = 18;
// Firestore page size, and FCM's per-call maximum for sendEach().
const PAGE_SIZE = 500;
// FCM codes meaning the token will never work again — clear it so the user
// stops being scanned and we stop paying for a send that can't land.
const DEAD_TOKEN_CODES = new Set([
  "messaging/registration-token-not-registered",
  "messaging/invalid-registration-token",
]);

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

interface RunCounts {
  checked: number;
  sent: number;
  cleared: number;
  failed: number;
}

function reminderMessage(token: string): TokenMessage {
  return {
    token,
    notification: {
      title: "High5 — היי, לא שוכחים היום? 👋",
      body: "עוד לא השלמת את המשימות היומיות שלך. כמה דקות מספיקות!",
    },
    webpush: { fcmOptions: { link: "/" } },
  };
}

async function remindPage(
  docs: QueryDocumentSnapshot[],
  now: Date,
  counts: RunCounts,
): Promise<void> {
  const due = docs.filter((d) => shouldSendReminder(d.data() as ReminderUserData, now, TARGET_HOUR));
  if (due.length === 0) return;

  const result = await getMessaging().sendEach(
    due.map((d) => reminderMessage((d.data() as ReminderUserData).pushToken as string)),
  );
  counts.sent += result.successCount;

  const deadTokenDocs = result.responses.flatMap((r, i) => {
    if (r.success) return [];
    const doc = due[i];
    if (doc && r.error && DEAD_TOKEN_CODES.has(r.error.code)) return [doc];
    counts.failed++;
    return [];
  });
  await Promise.all(deadTokenDocs.map((d) => d.ref.set({ pushToken: null }, { merge: true })));
  counts.cleared += deadTokenDocs.length;
}

export default async function handler(req: Req, res: Res) {
  if (!isAuthorizedCronRequest(req.headers.authorization, process.env.CRON_SECRET)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  initAdmin();
  const now = new Date();
  const counts: RunCounts = { checked: 0, sent: 0, cleared: 0, failed: 0 };

  // Paged so a large user base neither loads into memory at once nor fires
  // one unbounded burst of sends at FCM.
  const base = getFirestore().collection("users").where("pushToken", "!=", null).limit(PAGE_SIZE);
  let last: QueryDocumentSnapshot | undefined;
  for (;;) {
    const page = await (last ? base.startAfter(last) : base).get();
    counts.checked += page.size;
    await remindPage(page.docs, now, counts);
    if (page.size < PAGE_SIZE) break;
    last = page.docs[page.docs.length - 1];
  }

  // Structured, aggregate-only (no tokens or user ids) so Vercel's function
  // logs show each run's outcome without exposing anyone.
  console.log(JSON.stringify({ event: "mission-reminder.run", ...counts }));
  res.status(200).json(counts);
}
