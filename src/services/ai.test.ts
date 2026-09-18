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
  it("defaults to an empty provider list", () => {
    const cfg = loadAIConfig();
    expect(cfg.providers).toEqual([]);
    expect(isAIReady()).toBe(false);
  });

  it("round-trips a saved provider, key, and model", () => {
    saveAIConfig({ providers: [{ provider: "groq", apiKeys: ["gsk_test"], model: "custom-model" }], ollamaUrl: "http://localhost:11434" });
    const cfg = loadAIConfig();
    expect(cfg.providers[0]?.provider).toBe("groq");
    expect(cfg.providers[0]?.apiKeys).toEqual(["gsk_test"]);
    expect(cfg.providers[0]?.model).toBe("custom-model");
    expect(isAIReady()).toBe(true);
  });

  it("falls back to the provider default model when none is stored", () => {
    saveAIConfig({ providers: [{ provider: "openai", apiKeys: ["sk-test"], model: "" }], ollamaUrl: "http://localhost:11434" });
    expect(loadAIConfig().providers[0]?.model).toBe(PROVIDERS.openai.defaultModel);
  });

  it("treats Ollama as ready without a key", () => {
    saveAIConfig({ providers: [{ provider: "ollama", apiKeys: [], model: PROVIDERS.ollama.defaultModel }], ollamaUrl: "http://localhost:11434" });
    expect(isAIReady()).toBe(true);
  });

  it("clears all stored config", () => {
    saveAIConfig({ providers: [{ provider: "anthropic", apiKeys: ["sk-ant-test"], model: PROVIDERS.anthropic.defaultModel }], ollamaUrl: "http://localhost:11434" });
    clearAIConfig();
    expect(loadAIConfig().providers).toEqual([]);
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
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    saveAIConfig({ providers: [{ provider: "groq", apiKeys: ["gsk_test"], model: "test-model" }], ollamaUrl: "http://localhost:11434" });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.useRealTimers();
  });

  it("retries once on a 429 and succeeds on the second attempt", async () => {
    let calls = 0;
    globalThis.fetch = vi.fn(async () => {
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
    globalThis.fetch = vi.fn(async () => {
      calls += 1;
      return jsonResponse(503, { error: { message: "unavailable" } });
    });

    await expect(complete("prompt")).rejects.toThrow(/unavailable/);
    expect(calls).toBe(2);
  });

  it("does not retry a caller-initiated cancellation", async () => {
    let calls = 0;
    globalThis.fetch = vi.fn((_url: string | URL | Request, init?: RequestInit) => {
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

    // The shared package wraps every candidate's failure — abort included —
    // in AllProvidersExhaustedError; with only one provider configured here,
    // what matters is that the abort short-circuits without a second fetch.
    await expect(pending).rejects.toMatchObject({ name: "AllProvidersExhaustedError" });
    expect(calls).toBe(1);
  });
});
