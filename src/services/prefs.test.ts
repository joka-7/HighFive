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

describe("prefs", () => {
  it("returns defaults when nothing is stored", () => {
    expect(loadPrefs()).toEqual({ theme: "light", speechSpeed: "normal" });
  });

  it("round-trips saved preferences", () => {
    savePrefs({ theme: "dark", speechSpeed: "fast" });
    expect(loadPrefs()).toEqual({ theme: "dark", speechSpeed: "fast" });
  });

  it("merges partial stored prefs over defaults", () => {
    localStorage.setItem("high5.prefs", JSON.stringify({ theme: "dark" }));
    expect(loadPrefs()).toEqual({ theme: "dark", speechSpeed: "normal" });
  });

  it("tolerates corrupt JSON", () => {
    localStorage.setItem("high5.prefs", "{not json");
    expect(loadPrefs()).toEqual({ theme: "light", speechSpeed: "normal" });
  });

  it("resolves speech rate from the saved speed", () => {
    expect(speechRate()).toBe(SPEECH_RATES.normal);
    savePrefs({ theme: "light", speechSpeed: "slow" });
    expect(speechRate()).toBe(SPEECH_RATES.slow);
  });

  it("applies the theme to the document element", () => {
    applyTheme("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
    applyTheme("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
