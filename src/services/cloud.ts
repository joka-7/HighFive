// Composition root for cloud sync: the one Drive client the app uses, wired
// to the real fetch, browser storage and the pending-change ledger. Tests
// build their own with createDriveSync and fakes instead.
//
// VITE_GOOGLE_CLIENT_ID is the OAuth *Web* client ID — a public identifier
// that appears in every sign-in URL, not a secret. Unset, sync is off and the
// app runs purely on localStorage.

import { createDriveSync } from "./driveSync";
import { clearPendingIds } from "../utils/pendingSync";

export const driveSync = createDriveSync({
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "",
  fetchImpl: (url, init) => fetch(url, init),
  onLanded: (collection, ids) => clearPendingIds(collection, ids),
});
