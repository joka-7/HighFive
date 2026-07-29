// Multi-provider AI layer — mirrors JobFlowTracker's provider model and
// localStorage configuration (aiProvider / aiApiKey / aiModel / ollamaUrl), so
// users add a key the same way across both apps.
//
// Unlike JobFlowTracker's streaming chat, High5 needs structured JSON back, so
// this exposes a single non-streaming `complete()` that returns the full text
// for each provider; callers parse the JSON.

export interface ProviderInfo {
  id: ProviderId;
  name: string;
  free: boolean;
  noKey?: boolean;
  defaultModel: string;
  placeholder: string;
  infoUrl: string;
  infoText: string;
}

export type ProviderId = "gemini" | "groq" | "ollama" | "anthropic" | "openai";

export const PROVIDERS: Record<ProviderId, ProviderInfo> = {
  gemini: {
    id: "gemini",
    name: "Google Gemini",
    free: false,
    defaultModel: "gemini-2.0-flash",
    placeholder: "AIza...",
    infoUrl: "https://aistudio.google.com/app/apikey",
    infoText: "מפתח חינמי מ-Google AI Studio →",
  },
  groq: {
    id: "groq",
    name: "Groq",
    free: true,
    defaultModel: "llama-3.1-8b-instant",
    placeholder: "gsk_...",
    infoUrl: "https://console.groq.com/keys",
    infoText: "מפתח חינמי מ-Groq Console →",
  },
  ollama: {
    id: "ollama",
    name: "Ollama (מקומי)",
    free: true,
    noKey: true,
    defaultModel: "llama3.2",
    placeholder: "http://localhost:11434",
    infoUrl: "https://ollama.ai",
    infoText: "התקנת Ollama במחשב שלך →",
  },
  anthropic: {
    id: "anthropic",
    name: "Anthropic Claude",
    free: false,
    defaultModel: "claude-haiku-4-5-20251001",
    placeholder: "sk-ant-...",
    infoUrl: "https://console.anthropic.com/settings/keys",
    infoText: "מפתח מ-Anthropic Console →",
  },
  openai: {
    id: "openai",
    name: "OpenAI",
    free: false,
    defaultModel: "gpt-4o-mini",
    placeholder: "sk-...",
    infoUrl: "https://platform.openai.com/api-keys",
    infoText: "מפתח מ-OpenAI Platform →",
  },
};

export interface AIConfig {
  provider: ProviderId;
  apiKey: string;
  model: string;
  ollamaUrl: string;
}

const KEYS = {
  provider: "aiProvider",
  apiKey: "aiApiKey",
  model: "aiModel",
  ollamaUrl: "ollamaUrl",
} as const;

export function loadAIConfig(): AIConfig {
  const provider = (localStorage.getItem(KEYS.provider) as ProviderId) || "gemini";
  const known = PROVIDERS[provider] ? provider : "gemini";
  return {
    provider: known,
    apiKey: (localStorage.getItem(KEYS.apiKey) || "").trim(),
    model: (localStorage.getItem(KEYS.model) || "").trim() || PROVIDERS[known].defaultModel,
    ollamaUrl: (localStorage.getItem(KEYS.ollamaUrl) || "http://localhost:11434").trim(),
  };
}

export function saveAIConfig(cfg: Partial<AIConfig>): void {
  if (cfg.provider !== undefined) localStorage.setItem(KEYS.provider, cfg.provider);
  if (cfg.apiKey !== undefined) localStorage.setItem(KEYS.apiKey, cfg.apiKey.trim());
  if (cfg.model !== undefined) localStorage.setItem(KEYS.model, cfg.model.trim());
  if (cfg.ollamaUrl !== undefined) localStorage.setItem(KEYS.ollamaUrl, cfg.ollamaUrl.trim());
}

export function clearAIConfig(): void {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}

export function isAIReady(): boolean {
  const cfg = loadAIConfig();
  if (cfg.provider === "ollama") return true;
  return cfg.apiKey.length > 0;
}

// Validate Ollama URL — HTTPS only, or localhost (mirrors JobFlowTracker).
function validateOllamaUrl(url: string): string {
  const parsed = new URL(url);
  const isLocalhost = ["localhost", "127.0.0.1", "::1"].includes(parsed.hostname);
  if (!isLocalhost && parsed.protocol !== "https:") {
    throw new Error("Remote Ollama must use HTTPS.");
  }
  return parsed.origin;
}

// Every provider call gets a hard timeout (nothing previously bounded most of
// them — only Speaking had its own bespoke Promise.race) and one retry on a
// transient failure (429/5xx), with a short backoff. Callers can also pass
// their own AbortSignal (e.g. abort on component unmount) — that's merged
// with the timeout's own controller, and an external abort is never retried,
// since that's a deliberate cancellation, not a transient failure.
const REQUEST_TIMEOUT_MS = 20_000;
const RETRY_DELAY_MS = 600;

function isRetryableStatus(status: number): boolean {
  return status === 429 || (status >= 500 && status < 600);
}

function withTimeout(externalSignal?: AbortSignal): {
  signal: AbortSignal;
  cleanup: () => void;
} {
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  if (externalSignal) {
    if (externalSignal.aborted) controller.abort();
    else externalSignal.addEventListener("abort", onAbort);
  }
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  return {
    signal: controller.signal,
    cleanup: () => {
      clearTimeout(timer);
      externalSignal?.removeEventListener("abort", onAbort);
    },
  };
}

async function fetchWithRetry(
  url: string,
  init: RequestInit,
  externalSignal?: AbortSignal,
): Promise<Response> {
  for (let attempt = 0; ; attempt++) {
    const { signal, cleanup } = withTimeout(externalSignal);
    try {
      const res = await fetch(url, { ...init, signal });
      cleanup();
      if (attempt === 0 && isRetryableStatus(res.status)) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
        continue;
      }
      return res;
    } catch (err) {
      cleanup();
      // A caller-initiated cancellation (unmount, new request superseding
      // this one) should propagate immediately — retrying it would just
      // start a request nobody wants anymore.
      if (externalSignal?.aborted || attempt > 0) throw err;
      await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
    }
  }
}

/**
 * Non-streaming completion. Returns the raw text response from the active
 * provider. `systemInstruction` is applied per provider's native mechanism.
 * `signal` optionally cancels the request (e.g. the calling screen unmounted)
 * — independent of the timeout/retry behavior above, which always applies.
 */
export async function complete(
  prompt: string,
  systemInstruction?: string,
  signal?: AbortSignal,
): Promise<string> {
  const { provider, apiKey, model, ollamaUrl } = loadAIConfig();

  if (provider !== "ollama" && !apiKey) {
    throw new Error("API key is not configured");
  }

  if (provider === "gemini") {
    // The key travels in a header rather than the `?key=` query string — a
    // URL ends up in proxy/server access logs and browser history, while a
    // header does not. Gemini supports both; this is the safer one.
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    const body = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.7 },
      ...(systemInstruction
        ? { systemInstruction: { parts: [{ text: systemInstruction }] } }
        : {}),
    };
    const res = await fetchWithRetry(
      url,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify(body),
      },
      signal,
    );
    if (!res.ok) throw new Error(await errorText(res));
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  }

  if (provider === "anthropic") {
    const res = await fetchWithRetry(
      "https://api.anthropic.com/v1/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model,
          max_tokens: 1500,
          ...(systemInstruction ? { system: systemInstruction } : {}),
          messages: [{ role: "user", content: prompt }],
        }),
      },
      signal,
    );
    if (!res.ok) throw new Error(await errorText(res));
    const data = await res.json();
    return data.content?.[0]?.text ?? "";
  }

  if (provider === "ollama") {
    const validUrl = validateOllamaUrl(ollamaUrl);
    const fullPrompt = systemInstruction ? `${systemInstruction}\n\n${prompt}` : prompt;
    const res = await fetchWithRetry(
      `${validUrl}/api/generate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, prompt: fullPrompt, stream: false, format: "json" }),
      },
      signal,
    );
    if (!res.ok) throw new Error(`Ollama error: HTTP ${res.status}. Is Ollama running?`);
    const data = await res.json();
    return data.response ?? "";
  }

  // OpenAI / Groq (OpenAI-compatible chat completions)
  const base = {
    openai: "https://api.openai.com/v1/chat/completions",
    groq: "https://api.groq.com/openai/v1/chat/completions",
  }[provider];
  const messages = [
    ...(systemInstruction ? [{ role: "system", content: systemInstruction }] : []),
    { role: "user", content: prompt },
  ];
  const res = await fetchWithRetry(
    base,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    },
    signal,
  );
  if (!res.ok) throw new Error(await errorText(res));
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

async function errorText(res: Response): Promise<string> {
  const body = await res.json().catch(() => ({}) as Record<string, unknown>);
  const msg =
    (body as { error?: { message?: string } }).error?.message ?? `HTTP ${res.status}`;
  return `AI request failed: ${msg}`;
}
