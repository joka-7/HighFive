import { describe, expect, it } from "vitest";
import { isAndroidBrowser } from "./androidApk";

describe("isAndroidBrowser", () => {
  it.each([
    { name: "Chrome on Android", ua: "Mozilla/5.0 (Linux; Android 15; Pixel 9) Chrome/141.0 Mobile Safari/537.36", android: true },
    { name: "Safari on iPhone", ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Safari/604.1", android: false },
    { name: "desktop Chrome", ua: "Mozilla/5.0 (X11; Linux x86_64) Chrome/141.0 Safari/537.36", android: false },
    { name: "an empty user agent", ua: "", android: false },
  ])("is $android for $name", ({ ua, android }) => {
    expect(isAndroidBrowser(ua)).toBe(android);
  });
});
