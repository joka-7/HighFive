// Speech recognition via the Web Speech API (SpeechRecognition). A graceful
// enhancement — feature-detected and falling back to a clear "unsupported"
// state on browsers without it (notably some versions of Firefox/iOS). Mirrors
// the defensive style of tts.ts.

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
  return getCtor() !== null;
}

// Listen once and resolve with the recognized transcript. Rejects on error or
// when recognition is unsupported.
export function recognizeOnce(lang = "en-US"): Promise<string> {
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
