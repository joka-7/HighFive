import { afterEach, describe, expect, it } from "vitest";
import {
  loadPrefs,
  savePrefs,
  speechRate,
  SPEECH_RATES,
  applyTheme,
} from "./prefs";

afterEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

const defaults = {
  theme: "light" as const,
  speechSpeed: "normal" as const,
  remindersEnabled: false,
  reminderHour: 18,
};

describe("prefs", () => {
  it("returns defaults when nothing is stored", () => {
    expect(loadPrefs()).toEqual(defaults);
  });

  it("round-trips saved preferences", () => {
    savePrefs({
      theme: "dark",
      speechSpeed: "fast",
      remindersEnabled: true,
      reminderHour: 20,
    });
    expect(loadPrefs()).toEqual({
      theme: "dark",
      speechSpeed: "fast",
      remindersEnabled: true,
      reminderHour: 20,
    });
  });

  it("merges partial stored prefs over defaults", () => {
    localStorage.setItem("high5.prefs", JSON.stringify({ theme: "dark" }));
    expect(loadPrefs()).toEqual({ ...defaults, theme: "dark" });
  });

  it("tolerates corrupt JSON", () => {
    localStorage.setItem("high5.prefs", "{not json");
    expect(loadPrefs()).toEqual(defaults);
  });

  it("resolves speech rate from the saved speed", () => {
    expect(speechRate()).toBe(SPEECH_RATES.normal);
    savePrefs({ ...defaults, speechSpeed: "slow" });
    expect(speechRate()).toBe(SPEECH_RATES.slow);
  });

  it("applies the theme to the document element", () => {
    applyTheme("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
    applyTheme("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
