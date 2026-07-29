import { beforeAll, describe, it, expect } from "vitest";
import { loadOfflineContent, pickByDay } from "./offline";
import { loadListenings, loadReadings } from "./extras";
import { LEVELS } from "../types";
import type { GemListening, GemReading, Level, OfflineLevelContent } from "../types";
import { QUARTER_SIZES, dayIndex } from "../utils/daily";

// Content now ships as 4 quarter files per level instead of one 365-entry
// file (see C1 / scripts/generate-content.mjs) — load one representative day
// from each quarter so these tests still cover the full year.
const QUARTER_START_DAYS = QUARTER_SIZES.reduce<number[]>((acc, _size, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + QUARTER_SIZES[i - 1]);
  return acc;
}, []);

const contentByQuarter: Record<Level, OfflineLevelContent[]> = {} as Record<Level, OfflineLevelContent[]>;
const readingsByQuarter: Record<Level, GemReading[][]> = {} as Record<Level, GemReading[][]>;
const listeningsByQuarter: Record<Level, GemListening[][]> = {} as Record<Level, GemListening[][]>;

beforeAll(async () => {
  await Promise.all(
    LEVELS.map(async (level) => {
      contentByQuarter[level] = await Promise.all(
        QUARTER_START_DAYS.map(async (day) => (await loadOfflineContent(level, day)).content),
      );
      readingsByQuarter[level] = await Promise.all(
        QUARTER_START_DAYS.map(async (day) => (await loadReadings(level, day)).items),
      );
      listeningsByQuarter[level] = await Promise.all(
        QUARTER_START_DAYS.map(async (day) => (await loadListenings(level, day)).items),
      );
    }),
  );
}, 60_000);

function fullYear<T>(quarters: T[][]): T[] {
  return quarters.flat();
}

describe("offline content library", () => {
  it("each quarter has the size scripts/generate-content.mjs wrote, summing to a full year (365)", () => {
    for (const level of LEVELS) {
      contentByQuarter[level].forEach((q, i) => {
        expect(q.vocabulary.length).toBe(QUARTER_SIZES[i]);
        expect(q.lessons.length).toBe(QUARTER_SIZES[i]);
        expect(q.quizzes.length).toBe(QUARTER_SIZES[i]);
      });
      expect(fullYear(contentByQuarter[level].map((q) => q.vocabulary)).length).toBe(365);
      expect(fullYear(contentByQuarter[level].map((q) => q.lessons)).length).toBe(365);
      expect(fullYear(contentByQuarter[level].map((q) => q.quizzes)).length).toBe(365);
    }
  });

  it("has valid question shapes on sampled sets from every quarter", () => {
    for (const level of LEVELS) {
      contentByQuarter[level].forEach((q, i) => {
        const sample = [
          ...q.lessons[0].questions,
          ...q.quizzes[0].questions,
          ...readingsByQuarter[level][i][0].questions,
          ...listeningsByQuarter[level][i][0].questions,
        ];
        for (const question of sample) {
          expect(question.options.length).toBe(4);
          expect(new Set(question.options).size).toBe(4);
          expect(question.correctIndex).toBeGreaterThanOrEqual(0);
          expect(question.correctIndex).toBeLessThan(question.options.length);
          expect(question.explanation).toBeTruthy();
        }
      });
    }
  });

  it("has no duplicate question within a single lesson or quiz", () => {
    for (const level of LEVELS) {
      for (const q of contentByQuarter[level]) {
        for (const set of [q.lessons[0], q.quizzes[0]]) {
          const texts = set.questions.map((question) => question.question);
          expect(new Set(texts).size).toBe(texts.length);
        }
      }
    }
  });

  it("has complete word entries at the start and end of every quarter", () => {
    for (const level of LEVELS) {
      for (const q of contentByQuarter[level]) {
        for (const list of [q.vocabulary[0], q.vocabulary[q.vocabulary.length - 1]]) {
          expect(list.words.length).toBe(5);
          for (const w of list.words) {
            expect(w.word).toBeTruthy();
            expect(w.translation).toBeTruthy();
            expect(w.example).toBeTruthy();
          }
        }
      }
    }
  });

  it("day-indexed vocabulary resolves the same quarter+localDay pair on repeated loads for today", async () => {
    const day = dayIndex();
    for (const level of LEVELS) {
      const a = await loadOfflineContent(level, day);
      const b = await loadOfflineContent(level, day);
      expect(a.localDay).toBe(b.localDay);
      expect(pickByDay(a.content.vocabulary, a.localDay)).toEqual(
        pickByDay(b.content.vocabulary, b.localDay),
      );
    }
  });

  it("reading and listening bundles sum to a full year (365) with Hebrew translations", () => {
    for (const level of LEVELS) {
      const r = fullYear(readingsByQuarter[level]);
      const l = fullYear(listeningsByQuarter[level]);
      expect(r.length).toBe(365);
      expect(l.length).toBe(365);
      expect(r[0].textHe).toBeTruthy();
      expect(l[0].transcriptHe).toBeTruthy();
      expect(r[0].questions[0].questionHe).toBeTruthy();
    }
  });
});
