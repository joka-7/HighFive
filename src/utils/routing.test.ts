import { describe, it, expect } from "vitest";
import { hashForScreen, screenFromHash } from "./routing";

describe("routing", () => {
  it("parses known hashes and falls back for unknown", () => {
    expect(screenFromHash("#/missions")).toBe("missions");
    expect(screenFromHash("#settings")).toBe("settings");
    expect(screenFromHash("#/")).toBe("dashboard");
    expect(screenFromHash("")).toBe("dashboard");
    expect(screenFromHash("#/nope")).toBe("dashboard");
  });

  it("builds hashes for screens", () => {
    expect(hashForScreen("dashboard")).toBe("#/");
    expect(hashForScreen("reading")).toBe("#/reading");
  });
});
