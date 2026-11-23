import type { Level } from "../types";

// Lessons (five words each) in a level's course, written by
// scripts/generate-content.mjs. Loaded on demand like the vocabulary index.
export async function loadCourseLength(level: Level): Promise<number> {
  const lengths = (await import("./offline/course-length.json")).default as Record<Level, number>;
  return lengths[level];
}
