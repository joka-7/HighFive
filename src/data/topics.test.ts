import { describe, expect, it } from "vitest";
import { DIALOGUE_SCENARIOS, dialogueScenariosForLevel } from "./topics";

describe("topics", () => {
  describe("DIALOGUE_SCENARIOS", () => {
    it("gives every A1 and A2 scenario a script and three to five target phrases", () => {
      const missing = DIALOGUE_SCENARIOS.filter((s) => s.minLevel === "A1" || s.minLevel === "A2")
        .filter((s) => !s.brief || !s.targetPhrases || s.targetPhrases.length < 3 || s.targetPhrases.length > 5)
        .map((s) => s.id);

      expect(missing).toEqual([]);
    });
  });

  describe("dialogueScenariosForLevel", () => {
    it.each([
      { level: "A1", includes: "cafe", excludes: "airport" },
      { level: "A2", includes: "airport", excludes: "hotel" },
      { level: "B1", includes: "hotel", excludes: "rent" },
    ] as const)("at $level offers $includes and not $excludes", ({ level, includes, excludes }) => {
      const ids = dialogueScenariosForLevel(level).map((s) => s.id);

      expect(ids).toContain(includes);
      expect(ids).not.toContain(excludes);
    });
  });
});
