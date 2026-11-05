// Text-to-speech via the Web Speech API — the web equivalent of the High5
// app's TextToSpeech integration for pronunciation practice.

import { speechRate } from "./prefs";
import { isNativeApp } from "./platform";
import { reportError } from "./errors";

// Android's WebView has no speechSynthesis, so the app speaks through the
// device's own TTS engine instead. Each call replaces what is still playing.
async function speakNative(text: string, lang: string, rate: number): Promise<void> {
  const { TextToSpeech } = await import("@capacitor-community/text-to-speech");
  await TextToSpeech.speak({ text, lang, rate });
}

export function speak(text: string, lang = "en-US", rate?: number): void {
  if (isNativeApp()) {
    speakNative(text, lang, rate ?? speechRate()).catch((err: unknown) => reportError(err, "tts.native"));
    return;
  }
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  // Fall back to the user's saved speech-speed preference when no explicit
  // rate is passed by the caller.
  utterance.rate = rate ?? speechRate();
  window.speechSynthesis.speak(utterance);
}

export function ttsSupported(): boolean {
  if (isNativeApp()) return true;
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
