import { describe, expect, it } from "vitest";
import { normalizeWords, scoreSpeaking } from "./score";

describe("normalizeWords", () => {
  it("lowercases, strips punctuation and splits on whitespace", () => {
    expect(normalizeWords("Hello, World!  It's me.")).toEqual([
      "hello",
      "world",
      "it's",
      "me",
    ]);
  });
});

describe("scoreSpeaking", () => {
  it("gives 100 for an exact match ignoring case/punctuation", () => {
    expect(scoreSpeaking("Good morning!", "good morning").score).toBe(100);
  });

  it("scores partial matches and lists the missed words", () => {
    const r = scoreSpeaking("I would like a coffee", "I like coffee");
    expect(r.score).toBe(60); // 3 of 5 words
    expect(r.missed).toEqual(["would", "a"]);
  });

  it("returns 0 when nothing matches", () => {
    expect(scoreSpeaking("hello there", "completely different").score).toBe(0);
  });

  it("handles an empty target safely", () => {
    expect(scoreSpeaking("", "anything")).toEqual({ score: 0, missed: [] });
  });
});
