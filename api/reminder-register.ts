// POST { pushToken, timezone } → 201 { installId, writeKey }.
// Registers one browser install for the daily web-push reminder; see
// api/_lib/reminderApi.ts for what is stored (no account, no content).

import { reminderApiDeps } from "./_lib/firebaseAdmin";
import { handleJson, type Req, type Res } from "./_lib/http";
import { createReminderApi } from "./_lib/reminderApi";

export default async function handler(req: Req, res: Res) {
  // Built per request inside handleJson's guard, so a missing or malformed
  // FIREBASE_SERVICE_ACCOUNT answers a structured 500 rather than crashing.
  await handleJson(req, res, { POST: (body) => createReminderApi(reminderApiDeps()).register(body) });
}
