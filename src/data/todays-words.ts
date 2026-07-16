import type { GemWord, Level } from "../types";
import { dayIndex, pickByDay } from "../utils/daily";
import { loadOfflineContent } from "./offline";

/** Today's 5 vocabulary words for the given CEFR level. */
export async function getTodaysWords(level: Level, day = dayIndex()): Promise<GemWord[]> {
  const bundle = await loadOfflineContent(level);
  return pickByDay(bundle.vocabulary, day).words;
}
