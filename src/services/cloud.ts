// Composition root for cloud sync: the one Drive client the app uses, wired
// to the real fetch, browser storage and the pending-change ledger. Tests
// build their own with createDriveSync and fakes instead.
//
// VITE_GOOGLE_CLIENT_ID is the OAuth *Web* client ID — a public identifier
// that appears in every sign-in URL, not a secret. Unset, sync is off and the
// app runs purely on localStorage.

import { createDriveSync, type FetchLike } from "./driveSync";
import { createNativeGoogleAuth } from "./nativeGoogleAuth";
import { isNativeApp } from "./platform";
import { clearPendingIds } from "../utils/pendingSync";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "";
const fetchImpl: FetchLike = (url, init) => fetch(url, init);

export const driveSync = createDriveSync({
  clientId,
  fetchImpl,
  // Google refuses its popup inside the app's WebView; Android signs in natively.
  nativeAuth: isNativeApp() ? createNativeGoogleAuth({ webClientId: clientId, fetchImpl }) : null,
  onLanded: (collection, ids) => clearPendingIds(collection, ids),
});
