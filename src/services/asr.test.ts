import { afterEach, describe, expect, it, vi } from "vitest";
import { asrSupported, recognizeOnce } from "./asr";
import { isNativeApp } from "./platform";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

vi.mock("./platform", () => ({ isNativeApp: vi.fn(() => false) }));
vi.mock("@capacitor-community/speech-recognition", () => ({
  SpeechRecognition: {
    available: vi.fn(async () => ({ available: true })),
    requestPermissions: vi.fn(async () => ({ speechRecognition: "granted" })),
    start: vi.fn(async () => ({ matches: ["hello there"] })),
  },
}));

/** A browser SpeechRecognition that hears `transcript` as soon as it starts. */
function stubBrowserRecognizer(transcript: string) {
  vi.stubGlobal(
    "SpeechRecognition",
    class {
      lang = "";
      onresult: ((e: { results: { transcript: string }[][] }) => void) | null = null;
      start() {
        this.onresult?.({ results: [[{ transcript }]] });
      }
    },
  );
}

describe("asrSupported", () => {
  afterEach(() => {
    vi.mocked(isNativeApp).mockReturnValue(false);
    vi.unstubAllGlobals();
  });

  it.each([
    { name: "the Android app, whose WebView has no SpeechRecognition", native: true, browser: false, supported: true },
    { name: "a browser with SpeechRecognition", native: false, browser: true, supported: true },
    { name: "a browser without it", native: false, browser: false, supported: false },
  ])("is $supported in $name", ({ native, browser, supported }) => {
    vi.mocked(isNativeApp).mockReturnValue(native);
    if (browser) stubBrowserRecognizer("");

    expect(asrSupported()).toBe(supported);
  });
});

describe("recognizeOnce", () => {
  afterEach(() => {
    vi.mocked(isNativeApp).mockReturnValue(false);
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it("listens through the browser on the web", async () => {
    stubBrowserRecognizer("good morning");

    expect(await recognizeOnce()).toBe("good morning");
  });

  it("listens once through the device's recognizer in the Android app", async () => {
    vi.mocked(isNativeApp).mockReturnValue(true);

    const heard = await recognizeOnce("en-US");

    expect([heard, vi.mocked(SpeechRecognition.start).mock.calls[0]?.[0]]).toEqual([
      "hello there",
      { language: "en-US", maxResults: 1, partialResults: false, popup: false },
    ]);
  });

  it.each([
    {
      name: "no recognizer is installed",
      setup: () => vi.mocked(SpeechRecognition.available).mockResolvedValueOnce({ available: false }),
      error: "not available",
    },
    {
      name: "the microphone is refused",
      setup: () => vi.mocked(SpeechRecognition.requestPermissions).mockResolvedValueOnce({ speechRecognition: "denied" }),
      error: "not-allowed",
    },
  ])("rejects without listening when $name", async ({ setup, error }) => {
    vi.mocked(isNativeApp).mockReturnValue(true);
    setup();

    await expect(recognizeOnce()).rejects.toThrow(error);
    expect(SpeechRecognition.start).not.toHaveBeenCalled();
  });
});
