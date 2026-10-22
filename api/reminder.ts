// POST   { installId, writeKey, doneDate?, seenDate?, timezone?, pushToken? } → 204
//        Reports the learner's day (finished / opened) or a changed token or timezone.
// DELETE { installId, writeKey } → 204
//        Opts this install out; the stored record is removed.

import { reminderApiDeps } from "./_lib/firebaseAdmin";
import { handleJson, type Req, type Res } from "./_lib/http";
import { createReminderApi } from "./_lib/reminderApi";

export default async function handler(req: Req, res: Res) {
  // Built per request inside handleJson's guard, so a missing or malformed
  // FIREBASE_SERVICE_ACCOUNT answers a structured 500 rather than crashing.
  const api = () => createReminderApi(reminderApiDeps());
  await handleJson(req, res, {
    POST: (body) => api().update(body),
    DELETE: (body) => api().unregister(body),
  });
}
