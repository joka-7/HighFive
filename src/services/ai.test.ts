import { describe, it, expect, beforeEach } from "vitest";
import {
  PROVIDERS,
  loadAIConfig,
  saveAIConfig,
  clearAIConfig,
  isAIReady,
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
