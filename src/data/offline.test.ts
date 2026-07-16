import { beforeAll, describe, it, expect } from "vitest";
import { loadOfflineContent, pickByDay } from "./offline";
import { LISTENINGS, READINGS } from "./extras";
import { LEVELS } from "../types";
import type { GemListening, GemReading, Level, OfflineLevelContent } from "../types";
import { dayIndex } from "../utils/daily";

const content: Record<Level, OfflineLevelContent> = {} as Record<Level, OfflineLevelContent>;
const readings: Partial<Record<Level, GemReading[]>> = {};
const listenings: Partial<Record<Level, GemListening[]>> = {};

beforeAll(async () => {
  await Promise.all(
    LEVELS.map(async (level) => {
      content[level] = await loadOfflineContent(level);
      readings[level] = await READINGS[level]();
      listenings[level] = await LISTENINGS[level]();
    }),
  );
}, 60_000);

describe("offline content library", () => {
  it("provides a full year (365) of vocabulary, lessons, and quizzes per level", () => {
    for (const level of LEVELS) {
      expect(content[level].vocabulary.length).toBe(365);
      expect(content[level].lessons.length).toBe(365);
      expect(content[level].quizzes.length).toBe(365);
    }
  });

  it("has valid question shapes on sampled sets", () => {
    for (const level of LEVELS) {
      const sample = [
        ...content[level].lessons[0].questions,
        ...content[level].quizzes[0].questions,
        ...readings[level]![0].questions,
        ...listenings[level]![0].questions,
      ];
      for (const q of sample) {
        expect(q.options.length).toBe(4);
        expect(new Set(q.options).size).toBe(4);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
        expect(q.explanation).toBeTruthy();
      }
    }
  });

  it("has no duplicate question within a single lesson or quiz", () => {
    for (const level of LEVELS) {
      for (const set of [content[level].lessons[0], content[level].quizzes[0]]) {
        const texts = set.questions.map((q) => q.question);
        expect(new Set(texts).size).toBe(texts.length);
      }
    }
  });

  it("has complete word entries", () => {
    for (const level of LEVELS) {
      for (const list of [content[level].vocabulary[0], content[level].vocabulary[100]]) {
        expect(list.words.length).toBe(5);
        for (const w of list.words) {
          expect(w.word).toBeTruthy();
          expect(w.translation).toBeTruthy();
          expect(w.example).toBeTruthy();
        }
      }
    }
  });

  it("day-indexed vocabulary is stable for today", () => {
    const day = dayIndex();
    for (const level of LEVELS) {
      const a = pickByDay(content[level].vocabulary, day);
      const b = pickByDay(content[level].vocabulary, day);
      expect(a).toEqual(b);
    }
  });

  it("reading and listening bundles have 365 items with Hebrew translations", () => {
    for (const level of LEVELS) {
      const r = readings[level]!;
      const l = listenings[level]!;
      expect(r.length).toBe(365);
      expect(l.length).toBe(365);
      expect(r[0].textHe).toBeTruthy();
      expect(l[0].transcriptHe).toBeTruthy();
      expect(r[0].questions[0].questionHe).toBeTruthy();
    }
  });
});
