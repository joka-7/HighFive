import type { GemListening, GemReading, Level } from "../types";
import { dayIndex, resolveQuarter } from "../utils/daily";

export interface SpeakingSet {
  prompts: { text: string; translation: string }[];
}

type QuarterLoader<T> = (quarter: 1 | 2 | 3 | 4) => Promise<T>;
type Loader<T> = () => Promise<T>;

const READING_LOADERS: Record<Level, QuarterLoader<GemReading[]>> = {
  A1: (q) => import(`./offline/a1.reading.q${q}.json`).then((m) => m.default as GemReading[]),
  A2: (q) => import(`./offline/a2.reading.q${q}.json`).then((m) => m.default as GemReading[]),
  B1: (q) => import(`./offline/b1.reading.q${q}.json`).then((m) => m.default as GemReading[]),
  B2: (q) => import(`./offline/b2.reading.q${q}.json`).then((m) => m.default as GemReading[]),
  C1: (q) => import(`./offline/c1.reading.q${q}.json`).then((m) => m.default as GemReading[]),
  C2: (q) => import(`./offline/c2.reading.q${q}.json`).then((m) => m.default as GemReading[]),
};

const LISTENING_LOADERS: Record<Level, QuarterLoader<GemListening[]>> = {
  A1: (q) => import(`./offline/a1.listening.q${q}.json`).then((m) => m.default as GemListening[]),
  A2: (q) => import(`./offline/a2.listening.q${q}.json`).then((m) => m.default as GemListening[]),
  B1: (q) => import(`./offline/b1.listening.q${q}.json`).then((m) => m.default as GemListening[]),
  B2: (q) => import(`./offline/b2.listening.q${q}.json`).then((m) => m.default as GemListening[]),
  C1: (q) => import(`./offline/c1.listening.q${q}.json`).then((m) => m.default as GemListening[]),
  C2: (q) => import(`./offline/c2.listening.q${q}.json`).then((m) => m.default as GemListening[]),
};

const SPEAKING_LOADERS: Record<Level, QuarterLoader<SpeakingSet[]>> = {
  A1: (q) => import(`./offline/a1.speaking.q${q}.json`).then((m) => m.default),
  A2: (q) => import(`./offline/a2.speaking.q${q}.json`).then((m) => m.default),
  B1: (q) => import(`./offline/b1.speaking.q${q}.json`).then((m) => m.default),
  B2: (q) => import(`./offline/b2.speaking.q${q}.json`).then((m) => m.default),
  C1: (q) => import(`./offline/c1.speaking.q${q}.json`).then((m) => m.default),
  C2: (q) => import(`./offline/c2.speaking.q${q}.json`).then((m) => m.default),
};

// Curated (hand-written) pools. The quarterly arrays above are generated from
// the learner's words of the day — always vocabulary-safe, but they read like
// word drills. These are real passages, clips and sentence sets; the content
// service prefers one of them whenever the learner's vocabulary already
// covers it, and falls back to the progressive item otherwise. They're small
// (tens of items, not hundreds), so unlike the progressive pools they aren't
// split into quarters — one file per level is already a small download.
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

const CURATED_SPEAKING_LOADERS: Record<Level, Loader<SpeakingSet[]>> = {
  A1: () => import("./offline/a1.speaking.curated.json").then((m) => m.default),
  A2: () => import("./offline/a2.speaking.curated.json").then((m) => m.default),
  B1: () => import("./offline/b1.speaking.curated.json").then((m) => m.default),
  B2: () => import("./offline/b2.speaking.curated.json").then((m) => m.default),
  C1: () => import("./offline/c1.speaking.curated.json").then((m) => m.default),
  C2: () => import("./offline/c2.speaking.curated.json").then((m) => m.default),
};

export interface ExtraLoad<T> {
  items: T[];
  /** Index within `items` for the requested day. */
  localDay: number;
}

const readingCache = new Map<string, Promise<GemReading[]>>();
const listeningCache = new Map<string, Promise<GemListening[]>>();
const speakingCache = new Map<string, Promise<SpeakingSet[]>>();
const curatedReadingCache = new Map<Level, Promise<GemReading[]>>();
const curatedListeningCache = new Map<Level, Promise<GemListening[]>>();
const curatedSpeakingCache = new Map<Level, Promise<SpeakingSet[]>>();

function loadQuarter<T>(
  cache: Map<string, Promise<T[]>>,
  loaders: Record<Level, QuarterLoader<T[]>>,
  level: Level,
  day: number,
): Promise<ExtraLoad<T>> {
  const { quarter, localDay } = resolveQuarter(day);
  const key = `${level}-${quarter}`;
  if (!cache.has(key)) cache.set(key, loaders[level](quarter));
  return cache.get(key)!.then((items) => ({ items, localDay }));
}

function loadCurated<T>(
  cache: Map<Level, Promise<T[]>>,
  loaders: Record<Level, Loader<T[]>>,
  level: Level,
): Promise<T[]> {
  if (!cache.has(level)) cache.set(level, loaders[level]());
  return cache.get(level)!;
}

export function loadReadings(level: Level, day = dayIndex()): Promise<ExtraLoad<GemReading>> {
  return loadQuarter(readingCache, READING_LOADERS, level, day);
}

export function loadListenings(level: Level, day = dayIndex()): Promise<ExtraLoad<GemListening>> {
  return loadQuarter(listeningCache, LISTENING_LOADERS, level, day);
}

export function loadSpeakings(level: Level, day = dayIndex()): Promise<ExtraLoad<SpeakingSet>> {
  return loadQuarter(speakingCache, SPEAKING_LOADERS, level, day);
}

export function loadCuratedReadings(level: Level): Promise<GemReading[]> {
  return loadCurated(curatedReadingCache, CURATED_READING_LOADERS, level);
}

export function loadCuratedListenings(level: Level): Promise<GemListening[]> {
  return loadCurated(curatedListeningCache, CURATED_LISTENING_LOADERS, level);
}

export function loadCuratedSpeakings(level: Level): Promise<SpeakingSet[]> {
  return loadCurated(curatedSpeakingCache, CURATED_SPEAKING_LOADERS, level);
}
