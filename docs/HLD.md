# High-Level Design

## Overview

High5 (`✋ High5`) is a client-only, Hebrew-first single-page PWA
(React 18 + Vite + TypeScript) that teaches English to Hebrew speakers. It is a
web port of the original High5 Android app (Kotlin / Jetpack Compose), keeping
the same content, prompts and scoring rules. The UI is right-to-left Hebrew.

There is no backend of its own. The app runs in two persistence modes:

- **Local mode (default):** all state lives in the browser (`localStorage`) and
  every AI call goes directly from the browser to the chosen provider's REST
  API. No account, no server, no env vars required.
- **Account mode (optional):** if a Firebase project is configured, the user can
  sign in with Google and their progress syncs to Firestore under their `uid`,
  so it follows them across devices. Local mode always remains the offline
  cache underneath.

The learning surface is organised as feature "pillars" — Daily Lesson,
Vocabulary, Dialogue Coach, Practice Quiz, Spaced-Repetition Review, Reading,
Listening and Speaking — each backed by AI when a key is configured and by
bundled offline content otherwise.

```
┌──────────────────────────────────────────────────────────────────────┐
│                              Browser (SPA, RTL)                        │
│                                                                        │
│  ┌─────────────┐     ┌──────────────────┐     ┌────────────────────┐   │
│  │  Screens    │────▶│  LingoProvider   │────▶│    localStorage     │   │
│  │ (React UI:  │     │ (React Context:  │     │ high5.progress /    │   │
│  │  13 screens)│◀────│  state + points  │     │ saved_words / chat /│   │
│  └──────┬──────┘     │  + streak + SRS) │     │ quiz_history + prefs│   │
│         │            └────────┬─────────┘     │ + AI config keys    │   │
│         │                     │               └────────────────────┘   │
│         │                     │ (debounced, only when signed in)        │
│         │                     ▼                                         │
│         │            ┌──────────────────┐   HTTPS   ┌───────────────┐   │
│         │            │  firebase.ts     │──────────▶│  Firestore    │   │
│         │            │ (lazy import(),  │           │ users/{uid}   │   │
│         │            │  Google sign-in) │           └───────────────┘   │
│         ▼                                                               │
│  ┌─────────────┐     ┌──────────────────┐                              │
│  │ content.ts  │────▶│     ai.ts        │                              │
│  │ (prompts,   │     │ complete(prompt) │                              │
│  │  per pillar)│     │  provider switch │                              │
│  └──────┬──────┘     └────────┬─────────┘                              │
│         │ no key / any failure │ HTTPS                                  │
│         ▼                      ▼                                        │
│  ┌───────────────────┐  ┌──────────────────────────────────────────┐  │
│  │ offline.ts /       │  │ Gemini / Groq / OpenAI / Anthropic /      │  │
│  │ extras.ts          │  │ Ollama (local)                            │  │
│  │ (generated JSON,   │  └──────────────────────────────────────────┘  │
│  │  code-split chunks)│                                                 │
│  └───────────────────┘  Web platform: Web Speech (TTS/ASR), PWA install │
└──────────────────────────────────────────────────────────────────────┘
```

## Major components

| Component | Responsibility |
|---|---|
| `src/screens/*` | One React component per `Screen` — onboarding, dashboard, daily lesson, vocabulary, dialogue coach, practice quiz, spaced-repetition review, reading, listening, speaking, saved words, progress, settings (13 in total). |
| `src/App.tsx` | Shell + navigation: gates on onboarding, switches on the active `Screen`, renders the top bar (points/streak/level chips) and 5-item bottom nav. No router library. |
| `src/store/useLingo.tsx` | App state (`UserProgress`, saved words, chat history, quiz history) as a React Context, persisted to `localStorage` and — in Account mode — mirrored to Firestore. Owns points, streak and SRS scheduling. Replaces the Android app's Room database. |
| `src/services/ai.ts` | Multi-provider AI client. Stores provider/key/model in `localStorage` (same key names as the sibling JobFlowTracker app for a consistent settings UX) and exposes a single `complete(prompt, systemInstruction)` used by every feature. |
| `src/services/content.ts` | Builds the exact prompts ported from the original Kotlin app (`LingoRepository.kt`), one generator per pillar, and falls back to bundled offline content when no AI key is configured or a call fails. |
| `src/services/firebase.ts` | Optional Google sign-in + Firestore per-user sync. Loaded lazily via dynamic `import()`, so the (heavy) SDK never enters the main bundle for Local-mode users. |
| `src/services/prefs.ts` | Theme (light/dark) and speech-speed preferences, persisted separately from learning progress. |
| `src/services/tts.ts` / `asr.ts` | Web Speech API wrappers: text-to-speech (pronunciation playback) and speech recognition (speaking practice), both feature-detected. |
| `src/services/pwa.ts` | Install prompt (`beforeinstallprompt`) + native share helpers. |
| `src/data/offline.ts` + `extras.ts` | Loaders for bundled per-CEFR-level content, code-split via dynamic `import()` so a learner only downloads their own level. Used whenever AI isn't configured or fails. |
| `src/data/placement.ts` | 6-question placement test → CEFR level mapping, used during onboarding. |
| `src/data/topics.ts` | Rotating daily topics (deterministic per calendar day) and Dialogue Coach scenarios. |
| `src/utils/*` | Pure helpers: `json` (fence-stripping + parse), `srs` (Leitner scheduling), `score` (speaking accuracy). |
| `scripts/generate-content.mjs` | Build-time generator that expands curated content banks into a full year of offline content per level (`src/data/offline/*.json`). |

## Key design decisions

- **Client-only, offline-first.** All configuration happens in-app (Settings
  screen) and is stored client-side. Every AI-backed feature degrades to
  bundled JSON content rather than failing, so the app is fully functional
  without any provider configured. Only the Dialogue Coach requires a live key,
  since a roleplay conversation is inherently live and can't be canned.
- **Optional cloud, not required cloud.** Cloud sync is strictly opt-in and
  gated on Firebase being configured (`isCloudConfigured()`). Users who never
  sign in never download the Firebase SDK; returning signed-in users restore
  their session on startup. The Firebase web config is a public client
  identifier (safe to ship); access is enforced by Firestore security rules
  (`firestore.rules`) scoping each document to its owner's `uid`.
- **No secrets in the client, but the AI key is browser-visible.** Static Vite
  build deploys to Vercel with no server. The AI key entered in Settings is
  visible to the browser — acceptable for personal use, flagged in-app and in
  the README for public deployments.
- **Provider abstraction mirrors JobFlowTracker.** The same `localStorage` key
  names (`aiProvider`, `aiApiKey`, `aiModel`, `ollamaUrl`) so a user who already
  has a key saved in one app doesn't have to learn a different UI in the other.
  Five providers share one `complete()` entry point.
- **Code-split content.** The offline corpus is a full year of daily content per
  level (~1 MB each). Each level (and each Reading/Listening/Speaking pool) is a
  separate dynamic-`import()` chunk, so the initial bundle stays small and a
  learner only ever downloads their own level.
- **Content parity with the Android app.** Prompts, system instructions and
  point values are copied verbatim from `LingoRepository.kt` / `LingoViewModel`
  to preserve content and scoring behaviour.

## Data flow (example: Daily Lesson)

1. `DailyLesson` screen calls `generateDailyLesson(level, topicForToday(...))`.
2. If no provider is configured (`isAIReady()` false) → pull a random lesson
   from `loadOfflineContent(level).lessons` (dynamically imported for that
   level).
3. Otherwise, build the prompt (verbatim from the original app) and call
   `complete()`, which dispatches to the configured provider's REST API.
4. Parse the JSON response (`parseJson`, with fence-stripping); on parse or
   network failure, fall back to offline content rather than showing an error.
5. Render the lesson explanation, then the 3-question quiz via the shared
   `QuizRunner` component.
6. On completion, `useLingo().completeLesson(correct)` awards points (+50
   once/day + 20/correct) and updates `localStorage`.
7. In Account mode, a debounced effect mirrors the updated state up to Firestore.

## Data flow (example: Speaking practice)

1. `Speaking` screen calls `generateSpeaking(level, topic)` (AI or offline
   fallback via `pickExtra`).
2. The learner reads a sentence aloud; `recognizeOnce()` (Web Speech ASR)
   returns a transcript.
3. `scoreSpeaking(target, heard)` computes an order-insensitive word-match
   percentage.
4. `addPoints(round(score/100 * 20))` awards up to +20 per sentence.
5. Browsers without speech recognition still see the sentence + model audio
   (graceful degradation).

## Data flow (Account mode sync)

1. User signs in with Google (`signIn()`), which lazily loads Firebase and
   starts the auth watcher.
2. On first sign-in, if a Firestore document exists for the `uid` it is pulled
   into state; otherwise the current local state seeds the cloud.
3. Thereafter, any state change is debounced (800 ms) and written to
   `users/{uid}`. On sign-out, the app falls back to Local mode.

## Testing strategy

| Layer | Tool | Covers |
|---|---|---|
| Unit | Vitest | Pure logic: placement scoring, offline content shape, JSON cleaning, SRS scheduling, speaking score, AI/prefs config persistence. |
| Integration | Vitest + React Testing Library | Screens wired to the real `LingoProvider`/`ai.ts` (Settings save/clear flow, onboarding → dashboard → navigation). |
| E2E | Playwright | Full browser flow against the built app: onboarding, dashboard navigation, practice quiz. |
| Security gate | `npm audit` (CI) | Fails CI on high/critical vulnerabilities in production dependencies. |

CI (`.github/workflows/ci.yml`) runs audit → lint → typecheck → unit tests →
build, then a separate job builds and runs the Playwright E2E suite on Chromium.

## Build-time content generation

`src/data/offline/*.json` are generated artifacts, not hand-written. Running
`node scripts/generate-content.mjs` expands the curated banks in
`scripts/content/*` into a deterministic (seeded RNG) year of daily
vocabulary / lessons / quizzes plus Reading / Listening / Speaking pools per
CEFR level. Grammar questions are built correct-by-construction from verified
conjugation/article/comparative tables, so every `correctIndex` is correct by
construction. These files must exist for the build and `offline.test.ts` to
pass.

See `docs/LLD.md` for module-level detail.
