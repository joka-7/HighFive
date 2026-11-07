// The one place that asks whether this is the Android app (Capacitor shell)
// rather than a browser, so every platform branch reads the same way.

import { Capacitor } from "@capacitor/core";

export function isNativeApp(): boolean {
  return Capacitor.isNativePlatform();
}
