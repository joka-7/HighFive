// API key store — ported from High5's ApiKeyStore.kt (DataStore → localStorage).
// Falls back to the build-time VITE_GEMINI_API_KEY env var when the user has
// not entered a key in Settings.

const STORAGE_KEY = "high5.gemini_api_key";

export function getApiKey(): string {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && stored.trim()) return stored.trim();
  return (import.meta.env.VITE_GEMINI_API_KEY ?? "").trim();
}

export function setApiKey(key: string): void {
  localStorage.setItem(STORAGE_KEY, key.trim());
}

export function clearApiKey(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasApiKey(): boolean {
  return getApiKey().length > 0;
}
