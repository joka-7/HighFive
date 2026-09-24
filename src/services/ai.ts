// Multi-provider AI layer — a thin wrapper over
// modeldispatcher-browser-agent, the shared browser-native AI core
// extracted from this app (and JobFlowTracker/KanDOne/StepByLearn, which all
// independently built the same thing). This file exists only to keep every
// existing call site (Settings.tsx, content.ts, QuizRunner.tsx, Dashboard.tsx,
// DialogueCoach.tsx) and this module's own name/signature unchanged — no
// other file in this app needed to change for this migration.
//
// High5 needs structured JSON back (jsonMode: true is always requested,
// matching this file's previous behaviour), unlike JobFlowTracker's
// streaming chat — the shared package supports both, this wrapper only ever
// calls the non-streaming complete().

import {
  PROVIDERS,
  loadConfig,
  saveConfig,
  clearConfig,
  isConfigReady,
  complete as agentComplete,
  type AgentConfig,
  type ProviderId,
} from "modeldispatcher-browser-agent";

export type { ProviderId };
export type ProviderInfo = (typeof PROVIDERS)[ProviderId];
export type AIConfig = AgentConfig;

export { PROVIDERS };

export function loadAIConfig(): AIConfig {
  return loadConfig();
}

export function saveAIConfig(cfg: AIConfig): void {
  saveConfig(cfg);
}

export function clearAIConfig(): void {
  clearConfig();
}

export function isAIReady(): boolean {
  return isConfigReady(loadConfig());
}

/**
 * Non-streaming completion. Returns the raw text response from the active
 * provider. `systemInstruction` is applied per provider's native mechanism.
 * `signal` optionally cancels the request (e.g. the calling screen unmounted)
 * — independent of the shared package's own request timeout, which always
 * applies regardless.
 */
export async function complete(
  prompt: string,
  systemInstruction?: string,
  signal?: AbortSignal,
): Promise<string> {
  const cfg = loadConfig();
  return agentComplete(cfg, prompt, { systemInstruction, jsonMode: true, signal });
}
