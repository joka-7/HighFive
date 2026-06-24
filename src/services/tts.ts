// Text-to-speech via the Web Speech API — the web equivalent of the High5
// app's TextToSpeech integration for pronunciation practice.

import { speechRate } from "./prefs";

export function speak(text: string, lang = "en-US", rate?: number): void {
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
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
