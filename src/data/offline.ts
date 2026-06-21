import type { Level, OfflineLevelContent } from "../types";

import a1 from "./offline/a1.json";
import a2 from "./offline/a2.json";
import b1 from "./offline/b1.json";
import b2 from "./offline/b2.json";
import c1 from "./offline/c1.json";
import c2 from "./offline/c2.json";

// Bundled offline content per CEFR level — mirrors the High5 app's
// assets/offline/*.json. Used as a graceful fallback whenever the Gemini API
// key is absent or a live request fails.
const CONTENT: Record<Level, OfflineLevelContent> = {
  A1: a1 as OfflineLevelContent,
  A2: a2 as OfflineLevelContent,
  B1: b1 as OfflineLevelContent,
  B2: b2 as OfflineLevelContent,
  C1: c1 as OfflineLevelContent,
  C2: c2 as OfflineLevelContent,
};

export function loadOfflineContent(level: Level): OfflineLevelContent {
  return CONTENT[level];
}

export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
