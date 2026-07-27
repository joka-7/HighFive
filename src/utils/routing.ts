import type { Screen } from "../types";

const SCREENS: readonly Screen[] = [
  "onboarding",
  "dashboard",
  "lesson",
  "vocabulary",
  "dialogue",
  "quiz",
  "saved",
  "progress",
  "settings",
  "review",
  "reading",
  "listening",
  "speaking",
  "calendar",
  "missions",
] as const;

const SCREEN_SET = new Set<string>(SCREENS);

/** Parse `#/missions` (or `#missions`) into a Screen; unknown → dashboard. */
export function screenFromHash(hash = window.location.hash): Screen {
  const raw = hash.replace(/^#\/?/, "").split(/[?/]/)[0]?.toLowerCase() ?? "";
  if (!raw || raw === "home") return "dashboard";
  return SCREEN_SET.has(raw) ? (raw as Screen) : "dashboard";
}

/** Build a hash for a screen (`#/missions`). Dashboard clears to `#/`. */
export function hashForScreen(screen: Screen): string {
  if (screen === "dashboard" || screen === "onboarding") return "#/";
  return `#/${screen}`;
}

/** Navigate via the hash so refresh/back/share keep the current screen. */
export function navigateHash(screen: Screen, replace = false): void {
  const next = hashForScreen(screen);
  if (replace) {
    history.replaceState(null, "", next);
  } else if (window.location.hash !== next) {
    window.location.hash = next;
  }
}
