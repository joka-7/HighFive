// Tells the store when the Android app comes back to the foreground. Android
// keeps a backgrounded app alive, and its WebView does not reliably fire
// `visibilitychange` on return, so without this the app never pulls changes
// made on another device until it is killed and cold-started.

import { App } from "@capacitor/app";
import { isNativeApp } from "./platform";

/** Calls `callback` each time the Android app resumes; a no-op in a browser. Returns an unsubscribe. */
export function onAppResume(callback: () => void): () => void {
  if (!isNativeApp()) return () => {};
  const handle = App.addListener("resume", callback);
  return () => {
    void handle.then((h) => h.remove());
  };
}
