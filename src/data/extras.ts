import type { GemListening, GemReading, Level } from "../types";
import { dayIndex, resolveQuarter } from "../utils/daily";

export interface SpeakingSet {
  prompts: { text: string; translation: string }[];
}

type QuarterLoader<T> = (quarter: 1 | 2 | 3 | 4) => Promise<T>;

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

export interface ExtraLoad<T> {
  items: T[];
  /** Index within `items` for the requested day. */
  localDay: number;
}

const readingCache = new Map<string, Promise<GemReading[]>>();
const listeningCache = new Map<string, Promise<GemListening[]>>();
const speakingCache = new Map<string, Promise<SpeakingSet[]>>();

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

export function loadReadings(level: Level, day = dayIndex()): Promise<ExtraLoad<GemReading>> {
  return loadQuarter(readingCache, READING_LOADERS, level, day);
}

export function loadListenings(level: Level, day = dayIndex()): Promise<ExtraLoad<GemListening>> {
  return loadQuarter(listeningCache, LISTENING_LOADERS, level, day);
}

export function loadSpeakings(level: Level, day = dayIndex()): Promise<ExtraLoad<SpeakingSet>> {
  return loadQuarter(speakingCache, SPEAKING_LOADERS, level, day);
}
