import { describe, expect, it } from "vitest";
import { checkForUpdate, readInstalledApp, UpdateCheckError, type AppInfoPort } from "./appUpdate";

const app = (build: string, version = `1.0.${build}`): AppInfoPort => ({
  getInfo: async () => ({ build, version }),
});
const release = (tag_name: unknown) => async () => ({ tag_name });

describe("checkForUpdate", () => {
  it.each([
    {
      name: "reports an update when the latest release has a higher build",
      installed: "100",
      tag: "android-1.0.101",
      expected: { status: "available", installed: { build: 100, version: "1.0.100" }, latestVersion: "1.0.101" },
    },
    {
      name: "compares builds as numbers, not strings (99 → 100)",
      installed: "99",
      tag: "android-1.0.100",
      expected: { status: "available", installed: { build: 99, version: "1.0.99" }, latestVersion: "1.0.100" },
    },
    {
      name: "reports current when the builds match",
      installed: "100",
      tag: "android-1.0.100",
      expected: { status: "current", installed: { build: 100, version: "1.0.100" } },
    },
    {
      name: "reports current when this build is newer than the latest release",
      installed: "105",
      tag: "android-1.0.100",
      expected: { status: "current", installed: { build: 105, version: "1.0.105" } },
    },
  ])("$name", async ({ installed, tag, expected }) => {
    await expect(checkForUpdate({ app: app(installed), fetchJson: release(tag) })).resolves.toEqual(expected);
  });

  it.each([
    { name: "a tag that is not an android release", fetchJson: release("v2.0.0") },
    { name: "a release without a tag name", fetchJson: async () => ({}) },
    { name: "a non-string tag name", fetchJson: release(42) },
    { name: "a response that is not an object", fetchJson: async () => null },
  ])("rejects with UpdateCheckError for $name", async ({ fetchJson }) => {
    await expect(checkForUpdate({ app: app("100"), fetchJson })).rejects.toBeInstanceOf(UpdateCheckError);
  });

  it("passes network failures through instead of swallowing them", async () => {
    const fetchJson = async () => {
      throw new TypeError("Failed to fetch");
    };
    await expect(checkForUpdate({ app: app("100"), fetchJson })).rejects.toThrow("Failed to fetch");
  });
});

describe("readInstalledApp", () => {
  it("rejects a build number that is not an integer", async () => {
    await expect(readInstalledApp(app("abc"))).rejects.toBeInstanceOf(UpdateCheckError);
  });
});
