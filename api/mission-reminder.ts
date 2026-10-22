// Daily "you haven't done today's missions" push reminder — triggered hourly
// by .github/workflows/mission-reminder.yml (Vercel's free Hobby plan only
// allows once-a-day cron, which can't respect each learner's own local time,
// so the scheduling lives in GitHub Actions; this endpoint checks every
// registered install on each hourly call and lets shouldSendReminder() decide
// who is due right now).
//
// It reads only the reminders collection (see api/_lib/reminderApi.ts): a push
// token, a timezone and two dates per install — never anyone's progress.
//
// Not part of the Vite app — Vercel builds this file independently as a
// Node.js Serverless Function. Type-checked by tsconfig.api.json.

import { getMessaging, type TokenMessage } from "firebase-admin/messaging";
import { shouldSendReminder } from "../src/utils/reminderLogic";
import { isAuthorizedCronRequest } from "./_lib/cronAuth";
import { firestoreReminderStore, initAdmin } from "./_lib/firebaseAdmin";
import type { Req, Res } from "./_lib/http";
import type { ReminderStore } from "./_lib/reminderApi";

// Local hour (in each learner's own timezone) the reminder targets.
const TARGET_HOUR = 18;
// Firestore page size, and FCM's per-call maximum for sendEach().
const PAGE_SIZE = 500;
// FCM codes meaning the token will never work again — drop the install so it
// stops being scanned and we stop paying for a send that can't land.
const DEAD_TOKEN_CODES = new Set([
  "messaging/registration-token-not-registered",
  "messaging/invalid-registration-token",
]);

interface RunCounts {
  checked: number;
  sent: number;
  removed: number;
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
  store: ReminderStore,
  page: { id: string; install: Parameters<typeof shouldSendReminder>[0] }[],
  now: Date,
  counts: RunCounts,
): Promise<void> {
  const due = page.filter(({ install }) => shouldSendReminder(install, now, TARGET_HOUR));
  if (due.length === 0) return;

  const result = await getMessaging().sendEach(due.map(({ install }) => reminderMessage(install.pushToken)));
  counts.sent += result.successCount;

  const dead = result.responses.flatMap((r, i) => {
    if (r.success) return [];
    const entry = due[i];
    if (entry && r.error && DEAD_TOKEN_CODES.has(r.error.code)) return [entry.id];
    counts.failed++;
    return [];
  });
  await Promise.all(dead.map((id) => store.remove(id)));
  counts.removed += dead.length;
}

export default async function handler(req: Req, res: Res) {
  if (!isAuthorizedCronRequest(req.headers.authorization, process.env.CRON_SECRET)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  initAdmin();
  const store = firestoreReminderStore();
  const now = new Date();
  const counts: RunCounts = { checked: 0, sent: 0, removed: 0, failed: 0 };

  // Paged so a large install base neither loads into memory at once nor fires
  // one unbounded burst of sends at FCM.
  let afterId: string | null = null;
  for (;;) {
    const page = await store.page(afterId, PAGE_SIZE);
    counts.checked += page.length;
    await remindPage(store, page, now, counts);
    if (page.length < PAGE_SIZE) break;
    afterId = page[page.length - 1]?.id ?? null;
  }

  // Structured, aggregate-only (no tokens or ids) so Vercel's function logs
  // show each run's outcome without exposing anyone.
  console.log(JSON.stringify({ event: "mission-reminder.run", ...counts }));
  res.status(200).json(counts);
}
