// Lightweight user-preferences store (theme + speech speed), persisted to
// localStorage just like the rest of High5's local-mode data. Kept separate
// from the Lingo store so UI chrome settings never touch learning progress.

export type Theme = "light" | "dark";
export type SpeechSpeed = "slow" | "normal" | "fast";

export interface Prefs {
  theme: Theme;
  speechSpeed: SpeechSpeed;
}

const KEY = "high5.prefs";

const DEFAULTS: Prefs = { theme: "light", speechSpeed: "normal" };

export const SPEECH_RATES: Record<SpeechSpeed, number> = {
  slow: 0.7,
  normal: 0.95,
  fast: 1.15,
};

export function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Prefs>) } : { ...DEFAULTS };
  } catch {
    return { ...DEFAULTS };
  }
}

export function savePrefs(prefs: Prefs): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch {
    // Storage unavailable (private mode) — preferences just won't persist.
  }
}

// Reflects the current theme onto the document so CSS can react via
// html[data-theme="dark"]. Safe to call before React mounts.
export function applyTheme(theme: Theme): void {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
}

// Resolve the speech rate to feed tts.speak() from the saved preference.
export function speechRate(): number {
  return SPEECH_RATES[loadPrefs().speechSpeed];
}
