import type { GemListening, GemReading, Level } from "../types";

type Loader<T> = () => Promise<T>;

const READING_LOADERS: Record<Level, Loader<GemReading[]>> = {
  A1: () => import("./offline/a1.reading.json").then((m) => m.default as GemReading[]),
  A2: () => import("./offline/a2.reading.json").then((m) => m.default as GemReading[]),
  B1: () => import("./offline/b1.reading.json").then((m) => m.default as GemReading[]),
  B2: () => import("./offline/b2.reading.json").then((m) => m.default as GemReading[]),
  C1: () => import("./offline/c1.reading.json").then((m) => m.default as GemReading[]),
  C2: () => import("./offline/c2.reading.json").then((m) => m.default as GemReading[]),
};

const LISTENING_LOADERS: Record<Level, Loader<GemListening[]>> = {
  A1: () => import("./offline/a1.listening.json").then((m) => m.default as GemListening[]),
  A2: () => import("./offline/a2.listening.json").then((m) => m.default as GemListening[]),
  B1: () => import("./offline/b1.listening.json").then((m) => m.default as GemListening[]),
  B2: () => import("./offline/b2.listening.json").then((m) => m.default as GemListening[]),
  C1: () => import("./offline/c1.listening.json").then((m) => m.default as GemListening[]),
  C2: () => import("./offline/c2.listening.json").then((m) => m.default as GemListening[]),
};

const SPEAKING_LOADERS: Record<Level, Loader<{ prompts: { text: string; translation: string }[] }[]>> = {
  A1: () => import("./offline/a1.speaking.json").then((m) => m.default),
  A2: () => import("./offline/a2.speaking.json").then((m) => m.default),
  B1: () => import("./offline/b1.speaking.json").then((m) => m.default),
  B2: () => import("./offline/b2.speaking.json").then((m) => m.default),
  C1: () => import("./offline/c1.speaking.json").then((m) => m.default),
  C2: () => import("./offline/c2.speaking.json").then((m) => m.default),
};

// Curated (hand-written) pools. The arrays above are generated from the
// learner's words of the day — always vocabulary-safe, but they read like word
// drills. These are real passages, clips and sentence sets; the content
// service prefers one of them whenever the learner's vocabulary already covers
// it, and falls back to the progressive item otherwise.
const CURATED_READING_LOADERS: Record<Level, Loader<GemReading[]>> = {
  A1: () => import("./offline/a1.reading.curated.json").then((m) => m.default as GemReading[]),
  A2: () => import("./offline/a2.reading.curated.json").then((m) => m.default as GemReading[]),
  B1: () => import("./offline/b1.reading.curated.json").then((m) => m.default as GemReading[]),
  B2: () => import("./offline/b2.reading.curated.json").then((m) => m.default as GemReading[]),
  C1: () => import("./offline/c1.reading.curated.json").then((m) => m.default as GemReading[]),
  C2: () => import("./offline/c2.reading.curated.json").then((m) => m.default as GemReading[]),
};

const CURATED_LISTENING_LOADERS: Record<Level, Loader<GemListening[]>> = {
  A1: () => import("./offline/a1.listening.curated.json").then((m) => m.default as GemListening[]),
  A2: () => import("./offline/a2.listening.curated.json").then((m) => m.default as GemListening[]),
  B1: () => import("./offline/b1.listening.curated.json").then((m) => m.default as GemListening[]),
  B2: () => import("./offline/b2.listening.curated.json").then((m) => m.default as GemListening[]),
  C1: () => import("./offline/c1.listening.curated.json").then((m) => m.default as GemListening[]),
  C2: () => import("./offline/c2.listening.curated.json").then((m) => m.default as GemListening[]),
};

const CURATED_SPEAKING_LOADERS: Record<Level, Loader<{ prompts: { text: string; translation: string }[] }[]>> = {
  A1: () => import("./offline/a1.speaking.curated.json").then((m) => m.default),
  A2: () => import("./offline/a2.speaking.curated.json").then((m) => m.default),
  B1: () => import("./offline/b1.speaking.curated.json").then((m) => m.default),
  B2: () => import("./offline/b2.speaking.curated.json").then((m) => m.default),
  C1: () => import("./offline/c1.speaking.curated.json").then((m) => m.default),
  C2: () => import("./offline/c2.speaking.curated.json").then((m) => m.default),
};

export const READINGS = READING_LOADERS;
export const LISTENINGS = LISTENING_LOADERS;
export const SPEAKINGS = SPEAKING_LOADERS;
export const CURATED_READINGS = CURATED_READING_LOADERS;
export const CURATED_LISTENINGS = CURATED_LISTENING_LOADERS;
export const CURATED_SPEAKINGS = CURATED_SPEAKING_LOADERS;
