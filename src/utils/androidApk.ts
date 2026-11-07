// The Android app is published as a GitHub release by .github/workflows/android.yml.
// `latest/download/<asset>` always resolves to the newest release's file, so the
// link needs no version number.
export const ANDROID_APK_URL = "https://github.com/joka-7/HighFive/releases/latest/download/High5.apk";

/**
 * True in a browser running on Android, the only place the APK can be
 * installed. The website offers it there; the app itself never does.
 */
export function isAndroidBrowser(userAgent: string): boolean {
  return /Android/i.test(userAgent);
}
