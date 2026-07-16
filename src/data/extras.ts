import type { GemListening, GemReading, Level } from "../types";
import { dayIndex, pickByDay } from "../utils/daily";

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

export const READINGS = READING_LOADERS;
export const LISTENINGS = LISTENING_LOADERS;
export const SPEAKINGS = SPEAKING_LOADERS;

/** Load today's item for the exact level (365 day-aligned items). */
export async function pickByDayExtra<T>(
  loaders: Record<Level, Loader<T[]>>,
  level: Level,
  day = dayIndex(),
): Promise<T> {
  const items = await loaders[level]();
  if (!items?.length) throw new Error(`No offline content for level ${level}`);
  return pickByDay(items, day);
}
