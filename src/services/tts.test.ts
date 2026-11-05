import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { speak, ttsSupported } from "./tts";
import { isNativeApp } from "./platform";
import { reportError } from "./errors";
import { TextToSpeech } from "@capacitor-community/text-to-speech";

vi.mock("./platform", () => ({ isNativeApp: vi.fn(() => false) }));
vi.mock("./errors", () => ({ reportError: vi.fn() }));
vi.mock("@capacitor-community/text-to-speech", () => ({ TextToSpeech: { speak: vi.fn(async () => {}) } }));

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("speak", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => {
    vi.mocked(isNativeApp).mockReturnValue(false);
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it("speaks through the browser's speechSynthesis on the web", () => {
    const synth = { cancel: vi.fn(), speak: vi.fn() };
    vi.stubGlobal("speechSynthesis", synth);
    vi.stubGlobal("SpeechSynthesisUtterance", class { lang = ""; rate = 1; constructor(public text: string) {} });

    speak("hello", "en-US", 0.8);

    expect(synth.speak.mock.calls[0]?.[0]).toMatchObject({ text: "hello", lang: "en-US", rate: 0.8 });
  });

  it("speaks through the device's TTS engine in the Android app", async () => {
    vi.mocked(isNativeApp).mockReturnValue(true);

    speak("hello", "en-US", 0.8);
    await flush();

    expect(TextToSpeech.speak).toHaveBeenCalledWith({ text: "hello", lang: "en-US", rate: 0.8 });
  });

  it("reports a native TTS failure instead of dropping it", async () => {
    vi.mocked(isNativeApp).mockReturnValue(true);
    vi.mocked(TextToSpeech.speak).mockRejectedValueOnce(new Error("no engine"));

    speak("hello");
    await flush();

    expect(reportError).toHaveBeenCalledWith(expect.any(Error), "tts.native");
  });
});

describe("ttsSupported", () => {
  afterEach(() => {
    vi.mocked(isNativeApp).mockReturnValue(false);
    vi.unstubAllGlobals();
  });

  it.each([
    { name: "the Android app, whose WebView has no speechSynthesis", native: true, synth: false, supported: true },
    { name: "a browser with speechSynthesis", native: false, synth: true, supported: true },
    { name: "a browser without it", native: false, synth: false, supported: false },
  ])("is $supported in $name", ({ native, synth, supported }) => {
    vi.mocked(isNativeApp).mockReturnValue(native);
    if (synth) vi.stubGlobal("speechSynthesis", {});
    else Reflect.deleteProperty(window, "speechSynthesis");

    expect(ttsSupported()).toBe(supported);
  });
});
