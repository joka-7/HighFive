// Speech recognition via the Web Speech API (SpeechRecognition). A graceful
// enhancement — feature-detected and falling back to a clear "unsupported"
// state on browsers without it (notably some versions of Firefox/iOS). Mirrors
// the defensive style of tts.ts.

import { isNativeApp } from "./platform";

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error?: string }) => void) | null;
  onend: (() => void) | null;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function asrSupported(): boolean {
  return isNativeApp() || getCtor() !== null;
}

// Android's WebView has no SpeechRecognition, so the app listens through the
// device's recognizer. Whether one is installed is only known by asking it.
async function recognizeNative(lang: string): Promise<string> {
  const { SpeechRecognition } = await import("@capacitor-community/speech-recognition");
  const { available } = await SpeechRecognition.available();
  if (!available) throw new Error("Speech recognition is not available on this device.");
  const permission = await SpeechRecognition.requestPermissions();
  if (permission.speechRecognition !== "granted") throw new Error("not-allowed");
  const { matches } = await SpeechRecognition.start({ language: lang, maxResults: 1, partialResults: false, popup: false });
  return matches?.[0] ?? "";
}

// Listen once and resolve with the recognized transcript. Rejects on error or
// when recognition is unsupported.
export function recognizeOnce(lang = "en-US"): Promise<string> {
  if (isNativeApp()) return recognizeNative(lang);
  return new Promise((resolve, reject) => {
    const Ctor = getCtor();
    if (!Ctor) {
      reject(new Error("Speech recognition is not supported in this browser."));
      return;
    }
    const rec = new Ctor();
    rec.lang = lang;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    let settled = false;

    rec.onresult = (e) => {
      settled = true;
      resolve(e.results?.[0]?.[0]?.transcript ?? "");
    };
    rec.onerror = (e) => {
      settled = true;
      reject(new Error(e.error ?? "speech-recognition-error"));
    };
    rec.onend = () => {
      if (!settled) resolve("");
    };

    rec.start();
  });
}
