import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

beforeEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("reportError", () => {
  it("logs to console when no Sentry DSN is configured", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { reportError } = await import("./errors");
    reportError(new Error("boom"), "test");
    expect(spy).toHaveBeenCalled();
    expect(String(spy.mock.calls[0]?.[0])).toContain("test");
  });
});
