import { describe, expect, it } from "vitest";
import { LEVELS } from "../types";
import { linksForLevel, OPERATIONS, type Operation } from "./operations";

const op = (id: Operation["id"]) => {
  const found = OPERATIONS.find((o) => o.id === id);
  if (!found) throw new Error(`no operation ${id}`);
  return found;
};

describe("operations", () => {
  describe("linksForLevel", () => {
    it.each([
      { name: "gives A1 learners the kids' video search and not TED", id: "see", level: "A1", has: "YouTube — English for kids", lacks: "TED Talks" },
      { name: "gives C2 learners TED and not the beginner video search", id: "see", level: "C2", has: "TED Talks", lacks: "YouTube — English for kids" },
      { name: "gives A2 learners the beginner podcast search, not 6 Minute English", id: "listen", level: "A2", has: "Spotify — podcasts for beginners", lacks: "BBC Podcasts" },
      { name: "gives B1 learners 6 Minute English", id: "listen", level: "B1", has: "BBC Podcasts", lacks: "Spotify — podcasts for beginners" },
      { name: "gives A1 learners News in Levels, not BBC News", id: "read", level: "A1", has: "News in Levels", lacks: "BBC News" },
      { name: "gives C1 learners BBC News, not News in Levels", id: "read", level: "C1", has: "BBC News", lacks: "News in Levels" },
      { name: "keeps a link with no levels at every level", id: "talk", level: "B2", has: "ChatGPT", lacks: "TED Talks" },
    ] as const)("$name", ({ id, level, has, lacks }) => {
      const labels = linksForLevel(op(id), level).map((l) => l.label);

      expect([labels.includes(has), labels.includes(lacks)]).toEqual([true, false]);
    });

    it("leaves every operation at least one link at every level", () => {
      const empty = OPERATIONS.flatMap((o) => LEVELS.filter((level) => linksForLevel(o, level).length === 0).map((level) => `${o.id}@${level}`));

      expect(empty).toEqual([]);
    });
  });
});
