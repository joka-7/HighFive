import { describe, expect, it } from "vitest";
import {
  BEGIN_MARKER,
  END_MARKER,
  buildIrregulars,
  cefrLevelOf,
  crossLevelDuplicates,
  exampleHasWord,
  incompleteWords,
  lemmaCandidates,
  levelFit,
  mergeCefrIndexes,
  parseCefrCsv,
  passageStats,
  renderReport,
  repetition,
  replaceGenerated,
  tokenize,
  violations,
} from "./content-audit.mjs";

const irregulars = buildIrregulars(
  [
    { base: "go", third: "goes", past: "went", pp: "gone", ing: "going" },
    { base: "come", third: "comes", past: "came", pp: "come", ing: "coming" },
  ],
  [{ sg: "child", pl: "children" }],
);

const cefr = new Map([
  ["go", "A1"],
  ["child", "A1"],
  ["study", "A2"],
  ["run", "A1"],
  ["house", "A1"],
  ["reveal", "A2"],
  ["mitigate", "C1"],
]);

describe("content-audit", () => {
  describe("parseCefrCsv", () => {
    it.each([
      { name: "reads headword and level, skipping the header", csv: "headword,pos,CEFR\nhouse,noun,A1", expected: [["house", "A1"]] },
      { name: "accepts Windows line endings", csv: "headword,pos,CEFR\r\nhouse,noun,A1\r\n", expected: [["house", "A1"]] },
      { name: "keeps the lowest level of a repeated headword", csv: "h,p,CEFR\nrun,noun,A2\nrun,verb,B1", expected: [["run", "A2"]] },
      { name: "splits slash spellings and lowercases them", csv: "h,p,CEFR\nTV/television,noun,A1", expected: [["tv", "A1"], ["television", "A1"]] },
      { name: "ignores rows without a CEFR level", csv: "h,p,CEFR\nfoo,noun,\nbar,noun,X9", expected: [] },
    ])("$name", ({ csv, expected }) => {
      expect([...parseCefrCsv(csv)]).toEqual(expected);
    });
  });

  describe("mergeCefrIndexes", () => {
    it("keeps every word and the lower level of a word in both lists", () => {
      const merged = mergeCefrIndexes(new Map([["vague", "B1"]]), new Map([["vague", "C1"], ["aloof", "C2"]]));

      expect([...merged]).toEqual([["vague", "B1"], ["aloof", "C2"]]);
    });
  });

  describe("buildIrregulars", () => {
    it("maps bases to their forms and forms back to their bases", () => {
      expect([[...(irregulars.forms.get("go") ?? [])], irregulars.bases.get("children")]).toEqual([
        ["goes", "went", "gone", "going"],
        "child",
      ]);
    });
  });

  describe("tokenize", () => {
    it.each([
      { text: "I've been there.", tokens: ["i", "been", "there"] },
      { text: "Well-known, 3 times!", tokens: ["well", "known", "times"] },
      { text: "", tokens: [] },
    ])("splits $text", ({ text, tokens }) => {
      expect(tokenize(text)).toEqual(tokens);
    });
  });

  describe("exampleHasWord", () => {
    it.each([
      { word: "house", example: "My house is big.", has: true },
      { word: "cry", example: "The baby cried.", has: true },
      { word: "boundary", example: "Set clear boundaries.", has: true },
      { word: "stop", example: "He stopped the car.", has: true },
      { word: "dance", example: "They were dancing.", has: true },
      { word: "go", example: "We went home.", has: true },
      { word: "undergo", example: "He underwent surgery.", has: true },
      { word: "become", example: "She became a teacher.", has: true },
      { word: "ring", example: "The phone rang.", has: true },
      { word: "wake up", example: "I wake up at seven.", has: true },
      { word: "wake up", example: "I woke early.", has: false },
      { word: "house", example: "The flat is small.", has: false },
      { word: "go", example: "So it goes nowhere? No.", has: true },
      { word: "cat", example: "The car is red.", has: false },
    ])("$word in “$example” is $has", ({ word, example, has }) => {
      expect(exampleHasWord(word, example, irregulars)).toBe(has);
    });
  });

  describe("lemmaCandidates", () => {
    it.each([
      { token: "children", includes: "child" },
      { token: "went", includes: "go" },
      { token: "studies", includes: "study" },
      { token: "running", includes: "run" },
      { token: "coming", includes: "come" },
      { token: "revealed", includes: "reveal" },
    ])("offers $includes for $token", ({ token, includes }) => {
      expect(lemmaCandidates(token, irregulars)).toContain(includes);
    });
  });

  describe("cefrLevelOf", () => {
    it.each([
      { token: "Children", level: "A1" },
      { token: "studied", level: "A2" },
      { token: "mitigating", level: "C1" },
      { token: "zyx", level: null },
    ])("rates $token as $level", ({ token, level }) => {
      expect(cefrLevelOf(token, cefr, irregulars)).toBe(level);
    });
  });

  describe("levelFit", () => {
    it("sorts words into same, one off, two or more harder or easier, and unlisted", () => {
      const fit = levelFit(["study", "go", "mitigate", "zyx", "reveal"], "B1", cefr, irregulars);

      expect(fit).toEqual({
        same: 0,
        near: 2,
        harder: [{ word: "mitigate", ref: "C1" }],
        easier: [{ word: "go", ref: "A1" }],
        unlisted: ["zyx"],
      });
    });
  });

  describe("passageStats", () => {
    it.each([
      {
        name: "counts sentences, tokens above the level and tokens no list has",
        texts: ["Children go. We mitigate zyx."],
        expected: { passages: 1, avgSentenceWords: 2.5, abovePct: 20, unlistedPct: 40 },
      },
      { name: "reports zeros for no passages", texts: [], expected: { passages: 0, avgSentenceWords: 0, abovePct: 0, unlistedPct: 0 } },
    ])("$name", ({ texts, expected }) => {
      expect(passageStats(texts, "A2", cefr, irregulars)).toEqual(expected);
    });
  });

  describe("crossLevelDuplicates", () => {
    it("lists words taught at two or more levels, in word order, ignoring case and repeats within a level", () => {
      const duplicates = crossLevelDuplicates({ A1: ["book", "Cook", "book"], A2: ["cook", "book"], B1: ["goal"] });

      expect(duplicates).toEqual([
        { word: "book", levels: ["A1", "A2"] },
        { word: "cook", levels: ["A1", "A2"] },
      ]);
    });
  });

  describe("incompleteWords", () => {
    it("names the empty fields of each incomplete entry and skips complete ones", () => {
      const complete = { word: "a", partOfSpeech: "n", definition: "d", example: "e", translation: "t" };

      expect(incompleteWords([complete, { ...complete, word: "b", example: " ", translation: "" }])).toEqual([
        { word: "b", missing: ["example", "translation"] },
      ]);
    });
  });

  describe("repetition", () => {
    it.each([
      { items: ["a", "b", "a", "a"], expected: { total: 4, unique: 2, perItem: 2 } },
      { items: [], expected: { total: 0, unique: 0, perItem: 0 } },
    ])("summarises $items", ({ items, expected }) => {
      expect(repetition(items)).toEqual(expected);
    });
  });

  const level = (overrides = {}) => ({
    level: "A1",
    words: { total: 10, unique: 5, perItem: 2 },
    grammarTopics: 3,
    quizQuestions: { total: 10, unique: 8, perItem: 1.3 },
    dailyReadings: { total: 10, unique: 10, perItem: 1 },
    handWritten: {
      readings: { written: 2, shown: 1, hidden: ["Reading: Lost"] },
      listenings: { written: 1, shown: 1, hidden: [] },
      speaking: { written: 4, shown: 4 },
    },
    fit: { same: 3, near: 1, harder: [], easier: [], unlisted: ["zyx"] },
    passages: { passages: 3, avgSentenceWords: 6, abovePct: 1, unlistedPct: 2 },
    incomplete: [],
    examplesMissingWord: [],
    ...overrides,
  });

  describe("violations", () => {
    it.each([
      { name: "is empty when every rule holds", levels: [level()], expected: [] },
      {
        name: "names each incomplete entry and each example without its word",
        levels: [
          level({
            incomplete: [{ word: "b", missing: ["example"] }],
            examplesMissingWord: [{ word: "cat", example: "The car is red." }],
          }),
        ],
        expected: ['A1 "b": missing example', 'A1 "cat": example does not use the word: The car is red.'],
      },
    ])("$name", ({ levels, expected }) => {
      expect(violations({ levels, duplicates: [] })).toEqual(expected);
    });
  });

  describe("renderReport", () => {
    it.each([
      { name: "says the CI rules pass", levels: [level()], expected: "All pass." },
      {
        name: "lists each CI rule that breaks",
        levels: [level({ incomplete: [{ word: "b", missing: ["example"] }] })],
        expected: '- A1 "b": missing example',
      },
    ])("$name", ({ levels, expected }) => {
      const report = renderReport({ levels, duplicates: [] });

      expect(report.slice(report.indexOf("## Rules CI enforces"))).toContain(expected);
    });
  });

  describe("replaceGenerated", () => {
    it("rewrites only the region between the markers", () => {
      const document = `# Title\nProse.\n${BEGIN_MARKER}\nold\n${END_MARKER}\nAfter.\n`;

      expect(replaceGenerated(document, "new")).toBe(`# Title\nProse.\n${BEGIN_MARKER}\nnew\n${END_MARKER}\nAfter.\n`);
    });

    it("fails loudly when the markers are missing", () => {
      expect(() => replaceGenerated("# No markers", "new")).toThrow("markers");
    });
  });
});
