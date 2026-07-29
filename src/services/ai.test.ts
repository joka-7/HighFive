import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  PROVIDERS,
  loadAIConfig,
  saveAIConfig,
  clearAIConfig,
  isAIReady,
  complete,
} from "./ai";

beforeEach(() => {
  localStorage.clear();
});

describe("AI config", () => {
  it("defaults to gemini with its default model and no key", () => {
    const cfg = loadAIConfig();
    expect(cfg.provider).toBe("gemini");
    expect(cfg.model).toBe(PROVIDERS.gemini.defaultModel);
    expect(cfg.apiKey).toBe("");
    expect(isAIReady()).toBe(false);
  });

  it("round-trips a saved provider, key, and model", () => {
    saveAIConfig({ provider: "groq", apiKey: "gsk_test", model: "custom-model" });
    const cfg = loadAIConfig();
    expect(cfg.provider).toBe("groq");
    expect(cfg.apiKey).toBe("gsk_test");
    expect(cfg.model).toBe("custom-model");
    expect(isAIReady()).toBe(true);
  });

  it("falls back to the provider default model when none is stored", () => {
    saveAIConfig({ provider: "openai", apiKey: "sk-test" });
    expect(loadAIConfig().model).toBe(PROVIDERS.openai.defaultModel);
  });

  it("treats Ollama as ready without a key", () => {
    saveAIConfig({ provider: "ollama", apiKey: "" });
    expect(isAIReady()).toBe(true);
  });

  it("clears all stored config", () => {
    saveAIConfig({ provider: "anthropic", apiKey: "sk-ant-test" });
    clearAIConfig();
    expect(loadAIConfig().provider).toBe("gemini");
    expect(isAIReady()).toBe(false);
  });
});

// complete()'s timeout/retry/cancellation (C3) — mocked fetch, groq chosen
// arbitrarily since it's a plain OpenAI-compatible POST with no extra
// provider-specific wrapping to account for.
function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("complete() — request resilience", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    saveAIConfig({ provider: "groq", apiKey: "gsk_test", model: "test-model" });
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.useRealTimers();
  });

  it("retries once on a 429 and succeeds on the second attempt", async () => {
    let calls = 0;
    global.fetch = vi.fn(async () => {
      calls += 1;
      if (calls === 1) return jsonResponse(429, { error: { message: "rate limited" } });
      return jsonResponse(200, { choices: [{ message: { content: "ok" } }] });
    });

    const result = await complete("prompt");
    expect(result).toBe("ok");
    expect(calls).toBe(2);
  });

  it("does not retry a second time — fails after one retry on persistent 5xx", async () => {
    let calls = 0;
    global.fetch = vi.fn(async () => {
      calls += 1;
      return jsonResponse(503, { error: { message: "unavailable" } });
    });

    await expect(complete("prompt")).rejects.toThrow(/unavailable/);
    expect(calls).toBe(2);
  });

  it("does not retry a caller-initiated cancellation", async () => {
    let calls = 0;
    global.fetch = vi.fn((_url: string | URL | Request, init?: RequestInit) => {
      calls += 1;
      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => {
          reject(new DOMException("Aborted", "AbortError"));
        });
      });
    });

    const controller = new AbortController();
    const pending = complete("prompt", undefined, controller.signal);
    controller.abort();

    await expect(pending).rejects.toMatchObject({ name: "AbortError" });
    expect(calls).toBe(1);
  });
});
