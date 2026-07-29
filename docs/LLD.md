# Low-Level Design

Module-level detail to accompany `docs/HLD.md`.

## `src/main.tsx`

Application entry point. Applies the saved theme *before* first paint
(`applyTheme(loadPrefs().theme)`, to avoid a flash of the wrong theme), then
mounts `<App>` inside `<LingoProvider>` within `<StrictMode>`.

## `src/App.tsx`

Shell + navigation (no router library):

- Holds the active `Screen` in a single `useState` and switches on it in
  `renderScreen()`.
- **Onboarding gate:** while `progress` is `null`, renders `<Onboarding>`
  full-screen and nothing else.
- **Top bar:** on the dashboard shows `✋ High5`; on any other screen a back
  button (`→ {Hebrew title}`) returning to the dashboard. The right side always
  shows three chips: `✨ points`, `🔥 streak`, and the CEFR `level`.
- **Bottom nav (`NAV`):** 5 tiles — `dashboard`, `lesson`, `vocabulary`,
  `progress`, `settings`. The other 8 screens are reached from Dashboard tiles
  or in-screen buttons via the `go(screen)` callback.
- `TITLES` maps every `Screen` to its Hebrew title.

## `src/types.ts`

Domain model, ported from the original Kotlin entities/response shapes:

- `Level` — `"A1" | "A2" | "B1" | "B2" | "C1" | "C2"` (CEFR); `LEVELS` array.
- **AI/content shapes** (mirrored exactly in the offline JSON): `GemWord` /
  `GemWordList` / `GemQuestion` / `GemLesson` / `GemDialogueReply` / `GemQuiz` /
  `GemReading` (title/text/glossary/questions) / `GemListening`
  (transcript/questions) / `GemSpeaking` (`prompts: {text, translation}[]`) /
  `OfflineLevelContent`.
- **Persisted entities** (one interface per `localStorage`-backed "table",
  replacing Room entities): `UserProgress`, `SavedWord` (with optional Leitner
  fields `srsLevel` / `nextReviewAt` / `reviewCount`), `ChatMessage`,
  `QuizHistory`.
- `DailyMissionFlag` / `DailyMissionsState` — the day's checklist behind the
  five operations. Besides one boolean per mission it carries `externalNotes`,
  a per-mission record of *what* the learner did in another app (a song title,
  a video name), which is what the calendar entry is labelled with.
- `Screen` — the union of every navigable screen; `App.tsx` switches on this.

## `src/store/useLingo.tsx`

React Context + `localStorage` (+ optional Firestore), replacing the Room
database. Exposes the `useLingo()` hook, which throws if used outside
`<LingoProvider>` (mounted once in `main.tsx`).

- **localStorage keys:** `high5.progress`, `high5.saved_words`,
  `high5.chat_messages`, `high5.quiz_history`, plus `high5.cloud_session`
  (remembers the user opted into cloud sync, so the Firebase SDK is only eagerly
  loaded on startup for returning signed-in users).
- Each of the four persisted slices is a `useState` initialised via
  `load<T>(key, fallback)` and written back on every change via a matching
  `useEffect` (this is also the offline cache in Account mode).
- **Streak logic** runs once on mount: same calendar day → unchanged; exactly
  the next day → `streak + 1`; any larger gap → reset to `1`.
- **Points** (ported verbatim from `LingoViewModel`):
  - `+10` — save a new word (`toggleSaveWord`).
  - `+5` — remembered a word in review (`reviewWord` with `remembered = true`).
  - `+50` once/day + `20`/correct — daily lesson (`completeLesson`, guarded by
    `dailyLessonCompletedText === today`).
  - `25`/correct — practice quiz, and also Reading/Listening comprehension
    (they route through `completeQuiz`).
  - `+15` — each user dialogue turn (`addChatMessage`).
  - up to `+20` scaled by accuracy — speaking (screen calls `addPoints`).
- **Spaced-repetition (Leitner):** `toggleSaveWord` inserts new words at box 0
  with `nextReviewAt = now` (immediately due). `dueWords()` returns non-mastered
  words whose review time has arrived. `reviewWord(id, remembered)` calls
  `scheduleNext` (from `utils/srs`) to advance/reset the box + next-review time,
  increments `reviewCount`, and auto-masters at the top box.
- **Cloud sync:** `startAuthWatch()` (idempotent) subscribes via `watchAuth`; on
  sign-in it pulls the user's Firestore doc if present, else seeds the cloud
  from local state. A debounced (800 ms) `useEffect` mirrors state up to
  Firestore while signed in. `signIn` / `signOut` wrap the firebase service;
  `cloudConfigured` / `user` / `authReady` expose cloud state to the UI.
- `resetAll()` clears all four learning slices; used by the Settings "danger
  zone".
- **Full API** (`LingoContextValue`): `progress`, `savedWords`, `chatMessages`,
  `quizHistory`, `cloudConfigured`, `user`, `authReady`, `signIn`, `signOut`,
  `registerUser`, `updateLevel`, `addPoints`, `isWordSaved`, `toggleSaveWord`,
  `toggleMastered`, `dueWords`, `reviewWord`, `completeLesson`, `completeQuiz`,
  `addChatMessage`, `clearChat`, `resetAll`.

## `src/services/ai.ts`

- `ProviderId = "gemini" | "groq" | "ollama" | "anthropic" | "openai"`.
- `PROVIDERS: Record<ProviderId, ProviderInfo>` — static metadata per provider
  (display name, `free` flag, `defaultModel`, input placeholder, key-signup
  URL/text). `ollama.noKey = true` switches the Settings UI from an API-key
  field to a local server URL field.
- **localStorage keys:** `aiProvider`, `aiApiKey`, `aiModel`, `ollamaUrl` —
  intentionally identical names to the JobFlowTracker app.
- `loadAIConfig()` / `saveAIConfig(partial)` / `clearAIConfig()` — read/merge/
  reset; `loadAIConfig` falls back to `PROVIDERS[provider].defaultModel` when no
  model override is stored, and to `gemini` for an unknown provider.
- `isAIReady()` — `true` if the provider is Ollama (no key required), else if an
  API key is set.
- `validateOllamaUrl(url)` — requires HTTPS unless the host is
  localhost/127.0.0.1/::1, to avoid sending requests to an attacker-controlled
  host if the stored value were ever corrupted.
- `complete(prompt, systemInstruction?)` — single non-streaming entry point used
  by every feature. Throws early if a key is required but missing, then switches
  on `provider`:
  - **gemini** — `:generateContent` REST endpoint; `responseMimeType:
    "application/json"`; `systemInstruction` field.
  - **anthropic** — `/v1/messages`, requires the
    `anthropic-dangerous-direct-browser-access: true` header (browser calls are
    otherwise blocked by Anthropic's CORS policy); optional `system` field.
  - **ollama** — local `/api/generate` with `format: "json"`; the URL is
    validated first, and `systemInstruction` is prepended to the prompt.
  - **openai / groq** — both speak the OpenAI-compatible `/chat/completions`
    shape with `response_format: { type: "json_object" }`, so they share one
    code path with a different `baseUrl`.
  - Every branch returns the raw text response; callers parse it as JSON.
- `errorText(res)` builds a friendly `AI request failed: ...` message from the
  provider's error body.

## `src/services/content.ts`

Seven generator functions, one per feature. Each (except dialogue) follows the
same offline-fallback shape:

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
- `generateReading(level, topic)` → `GemReading`
- `generateListening(level, topic)` → `GemListening`
- `generateSpeaking(level, topic)` → `GemSpeaking`
- `generateDialogueReply(level, scenario, history, newText)` →
  `GemDialogueReply` — the one exception: it has **no offline fallback** (a
  roleplay conversation can't be canned) and throws if no provider is
  configured; the `DialogueCoach` screen catches this and prompts the user to
  add a key.

The first three fall back to `loadOfflineContent(level).{vocabulary,lessons,
quizzes}`. Reading/Listening/Speaking pick from two bundled pools, in order:

1. **Curated** (`CURATED_READINGS | CURATED_LISTENINGS | CURATED_SPEAKINGS`) —
   hand-written passages/clips/sentence sets. `findVocabSafeItem` returns one
   only if its unknown-word count is within `CURATED_TOLERANCE[level][skill]`,
   and `null` otherwise.
2. **Progressive** (`READINGS | LISTENINGS | SPEAKINGS`) — the day-aligned item
   generated from today's five words, which is always safe. `pickVocabSafeItem`
   walks from the day index and, in the worst case, returns the item with the
   fewest unknown words.

The tolerance widens with the CEFR level: a curated item is written *for* its
level, and the tracked bank (a few hundred content words) is a fair model of an
A1 learner but a large undercount by C1. Three things decide what counts as
"unknown" — `starterWords` (function words plus the high-frequency English no
bank teaches), `levelVocabulary(level)` (every bank word at or below the
learner's level), and `isKnownToken`'s morphology, which maps `streets` back to
`street`. Prompts and
system instructions are copied verbatim from `LingoRepository.kt` to preserve
content/scoring parity with the Android app.

## `src/services/firebase.ts`

Optional cloud sync (Google sign-in + Firestore), all opt-in:

- `isCloudConfigured()` — `true` only when the minimum Firebase config
  (apiKey/projectId/appId) is present. The web config ships defaults and can be
  overridden by `VITE_FIREBASE_*` env vars; it is a public client identifier,
  not a secret (access is controlled by `firestore.rules`).
- The Firebase SDK is imported lazily via dynamic `import()` inside
  `ensureInit()` (memoised), so it never enters the main bundle for Local-mode
  users.
- `watchAuth(cb)` — subscribes to sign-in state; a no-op returning `null` when
  unconfigured. `signInWithGoogle()` / `signOut()` wrap the auth flow.
- `loadCloud(uid)` / `saveCloud(uid, data)` — read/write the whole app state
  (`CloudData`) as a single `users/{uid}` document.

## `src/services/prefs.ts`

Lightweight UI-chrome preferences, kept separate from learning progress so they
never touch it:

- `Prefs = { theme: "light" | "dark"; speechSpeed: "slow" | "normal" | "fast" }`,
  persisted under `high5.prefs`.
- `loadPrefs()` / `savePrefs()` — tolerant of missing/corrupt storage (falls
  back to defaults).
- `applyTheme(theme)` — reflects the theme onto `html[data-theme]` for CSS; safe
  to call before React mounts.
- `SPEECH_RATES` / `speechRate()` — resolves the saved speed to a numeric rate
  for `tts.speak()`.

## `src/services/tts.ts` / `src/services/asr.ts`

Web Speech API wrappers, both feature-detected and safe to no-op where
unsupported:

- `tts.speak(text, lang="en-US", rate?)` — cancels any in-flight utterance and
  speaks; uses the saved speech-speed preference when no explicit `rate` given.
  `ttsSupported()` gates UI.
- `asr.recognizeOnce(lang="en-US")` — resolves once with the recognised
  transcript (rejects on error / when unsupported). `asrSupported()` gates the
  "speak" button so browsers without recognition still show the sentence + model
  audio.

## `src/services/pwa.ts`

- `usePwaInstall()` — React hook that stashes the `beforeinstallprompt` event and
  exposes `{ canInstall, installed, install() }` to trigger the native install
  flow on demand.
- `canShare()` / `shareApp()` — Web Share API helpers (used from Settings /
  Dashboard), degrading gracefully where unsupported (e.g. iOS install is via
  the Share menu).

## `src/utils/json.ts`

- `cleanJson(raw)` — strips ```` ```json ```` / ```` ``` ```` fences that some
  providers wrap responses in, then trims. Mirrors `LingoRepository.cleanJson`.
- `parseJson<T>(raw)` — `JSON.parse(cleanJson(raw)) as T`.

## `src/utils/srs.ts`

Pure Leitner spaced-repetition logic (no React/storage dependency, so it's
trivially unit-testable):

- `INTERVALS_DAYS = [0, 1, 3, 7, 16, 35]`, `MAX_SRS_LEVEL = 5`.
- `scheduleNext(srsLevel, remembered, now?)` — promotes one box (capped) on
  success, resets to box 0 on failure, and returns the next `{srsLevel,
  nextReviewAt}`. `now` is injectable for deterministic tests.
- `isSrsMastered(level)` — `true` at the top box.
- `isDue(nextReviewAt, now?)` — `true` when the review time has arrived (never
  scheduled ⇒ due immediately).

## `src/utils/score.ts`

- `normalizeWords(text)` — lowercases, strips punctuation (keeps letters/
  digits/apostrophes) and splits into words.
- `scoreSpeaking(target, spoken)` — order-insensitive percentage of target words
  detected (a duplicate-consuming `Map` so repeated words must be matched in
  kind), plus the list of `missed` words.

## `src/data/offline.ts` + `src/data/extras.ts` + `src/data/offline/*.json`

- `offline.ts` — `LOADERS: Record<Level, () => Promise<OfflineLevelContent>>`
  using dynamic `import("./offline/a1.json")` etc., so each ~1 MB level chunk is
  code-split and downloaded on demand; results are memoised in a `Map`.
  `loadOfflineContent(level)` returns the level bundle; `pickRandom(list)` picks
  one entry so repeated offline use doesn't always show the same content.
- `extras.ts` — the same lazy-loader pattern for the three "real-use" pillars
  (`READING_LOADERS` / `LISTENING_LOADERS` / `SPEAKING_LOADERS`, one import per
  level per type). `pickExtra(loaders, level)` returns a random item, **falling
  back to the nearest level with content** so the offline path never breaks.
- `offline/*.json` — generated by `scripts/generate-content.mjs` (`npm run
  content`): `a1.json … c2.json` (`{vocabulary, lessons, quizzes}`, a full year
  each) plus `*.reading.json` / `*.listening.json` / `*.speaking.json` per level
  (progressive, 365 items each) and `*.reading.curated.json` /
  `*.listening.curated.json` / `*.speaking.curated.json` (hand-written, small).
  A curated reading/listening item is only emitted if it is fully bilingual
  (`textHe`/`transcriptHe` + `questionHe` on every question). These are build
  artifacts and must be generated before build/tests.

## `src/data/placement.ts`

- `PLACEMENT_QUESTIONS` — 6 fixed grammar multiple-choice questions of
  increasing difficulty, one targeting each CEFR band (A1 → C2), used during
  onboarding.
- `levelFromScore(score)` — `≤1 → A1`, `2 → A2`, `3 → B1`, `4 → B2`, `5 → C1`,
  else `C2`.

## `src/data/topics.ts`

- `LESSON_TOPICS`, `QUIZ_TOPICS`, `READING_TOPICS`, `LISTENING_TOPICS`,
  `SPEAKING_TOPICS` — topic pools for the AI-generated pillars.
- `DIALOGUE_SCENARIOS` — 16 roleplay scenarios (`{id, label (Hebrew), en}`) for
  the Dialogue Coach.
- `topicForToday(topics)` — deterministic per-day pick
  (`floor(Date.now()/86_400_000) % len`), so everyone gets the same daily topic.

## `src/screens/*` and shared components

- **Shared:** `QuizRunner` (MCQ engine — dot progress, reveal correct/wrong +
  Hebrew explanation, `onFinish(score)`), `WordCard` (TTS + save toggle),
  `Spinner`.
- **`Onboarding`** — multi-step flow: enter name, then take the 6-question
  placement test or pick a level manually; calls `registerUser`.
- **`Dashboard`** — tile grid routing to every feature; greeting card (with the
  day's position in the five-day cycle); "no AI key" banner (→ Settings); PWA
  install banner; a due-count badge on the Review tile from `dueWords()`.
- **`DailyMissions`** ("חמש ביום") — the five operations from
  `data/operations.ts` plus the day's words, or the Memorization card on the
  cycle's fifth day. Each operation card offers its in-app path *and* an
  external one: quick links to other apps, a "what did you do?" field, and a
  mark-as-done button that calls `completeMission(flag, note)`.
- **`Memorize`** ("שינון") — loads the words of the current cycle's learning
  days (`utils/cycle.ts`), shows them as a tap-to-reveal self-test list, then
  runs `buildMemorizationQuiz` (`utils/memorize.ts`) through `QuizRunner` and
  scores it as the `Memorization` quiz topic, which completes the mission.
- **`DailyLesson`** — phases `reading → quiz → done`; fetches today's lesson,
  shows the Hebrew explanation, runs the 3-question quiz, then `completeLesson`.
- **`Vocabulary`** — 5 level-adaptive flashcards with a "new words" refresh;
  save/unsave via `toggleSaveWord`.
- **`DialogueCoach`** — AI roleplay chat over 16 scenarios; requires a key
  (shows a CTA to Settings otherwise); filters chat by scenario+level; shows
  Hebrew corrections; TTS on assistant replies.
- **`PracticeQuiz`** — 5-question quiz on today's quiz topic; result screen;
  `completeQuiz`.
- **`Review`** — spaced-repetition session: snapshots the due queue on mount,
  reveal → self-grade ("knew it" +5 / "didn't"), reschedules via `reviewWord`.
- **`Reading`** — Reading Lab: passage + tap-to-translate glossary (save into
  SRS) + 2 comprehension questions (scored through `completeQuiz` as "Reading").
- **`Listening`** — plays a TTS clip (normal/slow), 2 comprehension questions,
  reveals the transcript.
- **`Speaking`** — read 4 sentences aloud; `recognizeOnce` + `scoreSpeaking`
  grade pronunciation; awards up to +20 scaled by accuracy; graceful when ASR is
  unsupported.
- **`SavedWords`** — lists saved words; TTS, toggle mastered, delete.
- **`Progress`** — stat grid (points, streak, saved, mastered), CEFR level
  switcher (`updateLevel`), last-10 quiz history.
- **`Settings`** — AI provider/key/model form (Ollama-URL variant + show/hide
  key), theme toggle, speech speed, learning level, PWA install/share, Google
  cloud sign-in/out, and a "reset all" danger zone (`resetAll` behind a
  `confirm()`).

## Testing notes

- **Runner config:** Vitest is configured inside `vite.config.ts`
  (`environment: "jsdom"`, `setupFiles: ["./src/test-setup.ts"]`, excludes
  `e2e/**`). `test-setup.ts` registers `@testing-library/jest-dom` matchers and
  an `afterEach(cleanup)` — required because Vitest's `globals` option is off in
  this project, so Testing Library's automatic cleanup doesn't fire on its own.
- **Unit tests:** `utils/json`, `utils/srs`, `utils/score`, `services/ai`,
  `services/prefs`, `data/placement`, `data/offline` (the last asserts the full
  generated corpus shape, so it requires the generated JSON to exist).
- **Integration tests** render real screens inside a real `<LingoProvider>` (no
  store mocking), relying on `localStorage.clear()` between tests for isolation:
  `App.integration.test.tsx` (onboarding → dashboard → nav) and
  `screens/Settings.integration.test.tsx` (provider save/clear flow).
- **E2E** (`e2e/*.spec.ts`) run against a production build via `vite preview`,
  driven by Playwright; CI installs Chromium with `--with-deps` since GitHub's
  runners need the system libraries Playwright doesn't bundle.
