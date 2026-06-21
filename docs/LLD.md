# Low-Level Design

Module-level detail to accompany `docs/HLD.md`.

## `src/types.ts`

Domain model, ported from the original Kotlin entities/response shapes:

- `Level` — `"A1" | "A2" | "B1" | "B2" | "C1" | "C2"` (CEFR).
- `GemWord` / `GemWordList` / `GemQuestion` / `GemLesson` / `GemQuiz` /
  `GemDialogueReply` — shapes returned by AI providers (and mirrored exactly
  in the offline JSON files), parsed straight into these interfaces.
- `UserProgress`, `SavedWord`, `ChatMessage`, `QuizHistory` — persisted state,
  one interface per `localStorage`-backed "table" (replaces Room entities).
- `Screen` — the union of all navigable screens; `App.tsx` switches on this.

## `src/store/useLingo.tsx`

React Context + `localStorage`, replacing the Room database.

- Keys: `high5.progress`, `high5.saved_words`, `high5.chat_messages`,
  `high5.quiz_history`.
- Each piece of state is a `useState` initialized via `load<T>(key, fallback)`
  and written back on every change via a matching `useEffect`.
- Streak logic runs once on mount: same calendar day → unchanged; exactly one
  day later → `streak + 1`; any larger gap → reset to `1`.
- Points awarded: `+10` save word, `+50` once/day + `20`/correct answer
  (daily lesson), `25`/correct answer (practice quiz), `+15`/dialogue turn —
  all ported verbatim from `LingoViewModel`.
- `resetAll()` clears all four keys; used by the Settings "danger zone".
- Exposes `useLingo()` hook; throws if used outside `<LingoProvider>` (mounted
  once in `main.tsx`, wrapping `<App>`).

## `src/services/ai.ts`

- `ProviderId = "gemini" | "groq" | "ollama" | "anthropic" | "openai"`.
- `PROVIDERS: Record<ProviderId, ProviderInfo>` — static metadata per provider
  (display name, free flag, default model, input placeholder, key-signup
  URL/text). `ollama.noKey = true` switches the Settings UI from an API-key
  field to a local server URL field.
- `localStorage` keys: `aiProvider`, `aiApiKey`, `aiModel`, `ollamaUrl` —
  intentionally identical names to the JobFlowTracker app.
- `loadAIConfig()` / `saveAIConfig(partial)` / `clearAIConfig()` — read/merge/
  reset; `saveAIConfig` falls back to `PROVIDERS[provider].defaultModel` when
  no model override is given.
- `isAIReady()` — `true` if a key is set, or if the provider is Ollama (no key
  required).
- `complete(prompt, systemInstruction?)` — single entry point used by every
  feature. Switches on `provider`:
  - **gemini** — `generateContent` REST endpoint, `systemInstruction` field.
  - **anthropic** — `/v1/messages`, requires the
    `anthropic-dangerous-direct-browser-access: true` header (browser calls
    are normally blocked by Anthropic's CORS policy otherwise).
  - **ollama** — local `/api/generate`; the URL is validated before fetching
    to avoid sending requests to an attacker-controlled host if the stored
    value were ever corrupted.
  - **openai / groq** — both speak the OpenAI-compatible `/chat/completions`
    shape, so they share one code path with a different `baseUrl`.
  - Every branch returns the raw text response; callers parse it as JSON.

## `src/services/content.ts`

Four generator functions, one per feature, each following the same shape:

```
if (!isAIReady()) return <random offline pick>;
try {
  return parseJson<T>(await complete(prompt, systemInstruction));
} catch {
  return <random offline pick>;
}
```

- `generateLevelAdaptiveWords(level)` → `GemWordList`
- `generateDailyLesson(level, topic)` → `GemLesson`
- `generatePracticeQuiz(level, topic)` → `GemQuiz`
- `generateDialogueReply(level, scenario, history, newText)` → `GemDialogueReply`
  — the one exception: it has **no offline fallback** (a roleplay conversation
  can't be canned) and throws if no provider is configured; the
  `DialogueCoach` screen catches this and prompts the user to add a key.

Prompts and system instructions are copied verbatim from `LingoRepository.kt`
to preserve content/scoring parity with the Android app.

## `src/utils/json.ts`

- `cleanJson(raw)` — strips ```` ```json ```` / ```` ``` ```` fences that some
  providers wrap responses in, then trims whitespace.
- `parseJson<T>(raw)` — `JSON.parse(cleanJson(raw)) as T`.

## `src/data/offline.ts` + `src/data/offline/*.json`

- One JSON file per CEFR level (`a1.json` … `c2.json`), each shaped as
  `OfflineLevelContent` (`vocabulary`, `lessons`, `quizzes` arrays).
- `loadOfflineContent(level)` returns the matching bundle.
- `pickRandom(list)` picks one entry — used so repeated offline use doesn't
  always show the same content.

## `src/data/placement.ts`

- `PLACEMENT_QUESTIONS` — 3 fixed multiple-choice questions used during
  onboarding.
- `levelFromScore(score)` — `0–1 → A1`, `2 → B1`, `3 → C1` (coarse 3-question
  placement, matching the original app's mapping).

## `src/App.tsx`

- Top-level switch: renders `<Onboarding>` while `progress` is `null`,
  otherwise renders the active `Screen` plus a top bar (brand/back + points/
  streak/level chips) and a bottom nav (`dashboard`, `lesson`, `vocabulary`,
  `progress`, `settings`).
- `go(screen)` is passed down to screens that need to navigate (e.g. Dashboard
  tiles, DialogueCoach's "add a key" prompt).

## `src/screens/Settings.tsx`

- Local form state seeded from `loadAIConfig()`; provider buttons drive which
  input is shown (Ollama URL vs. password-style API key field with a
  show/hide toggle).
- "Save" calls `saveAIConfig`; "Clear" calls `clearAIConfig` and resets local
  form state to defaults. A separate "danger zone" card calls
  `useLingo().resetAll()` behind a `confirm()` prompt.

## Testing notes

- `src/test-setup.ts` registers `@testing-library/jest-dom` matchers and an
  `afterEach(cleanup)` — required because Vitest's `globals` option is off in
  this project, so Testing Library's automatic cleanup detection (which looks
  for a global `afterEach`) doesn't fire on its own.
- Integration tests render real screens inside a real `<LingoProvider>` (no
  mocking of the store), only relying on `localStorage.clear()` between tests
  for isolation.
- E2E tests (`e2e/*.spec.ts`) run against a production build via
  `vite preview`, driven by Playwright; CI installs Chromium with
  `--with-deps` since GitHub's runners need the system libraries Playwright
  doesn't bundle.
