# High-Level Design

## Overview

High5 (`✋ High5`) is a client-only, Hebrew-first single-page PWA
(React 18 + Vite + TypeScript) that teaches English to Hebrew speakers. The UI
is right-to-left Hebrew. A Workbox service worker (via `vite-plugin-pwa`)
precachees the app shell and runtime-caches per-level content chunks.

There is no backend of its own. The app runs in two persistence modes:

- **Local mode (default):** all state lives in the browser (`localStorage`) and
  every AI call goes directly from the browser to the chosen provider's REST
  API. No account, no server, no env vars required. Optional JSON export/import
  covers cross-device backup without Google.
- **Account mode (optional):** if a Firebase project is configured via
  `VITE_FIREBASE_*`, the user can sign in with Google and their progress syncs
  to Firestore under their `uid`. Local mode always remains the offline cache.

The learning surface is organised as feature "pillars" — Daily Lesson,
Vocabulary, Dialogue Coach, Practice Quiz, Spaced-Repetition Review, Reading,
Listening, Speaking, Daily Missions, and Mission Calendar. Lessons / vocab /
quizzes / speaking can use AI when a key is set (else bundled offline JSON).
Reading and Listening always use bundled offline content. Only the Dialogue
Coach *requires* a live key.

Above those pillars sits the **daily contract**: five operations on the language
(see / listen / talk / read / understand), tracked on the "חמש ביום" screen, plus
the day's vocabulary in a box of its own above them — what the learner takes in,
as opposed to the five ways of using the language. Each operation maps to one
pillar *and* to an external path — the learner can do it in another app
(YouTube, Spotify, a news site, an AI assistant) and mark it done with the title
of what they used, which is stored in `DailyMissionsState.externalNotes` and
shown on the calendar.

The word rhythm is a **calendar week** (`utils/cycle.ts`): Sunday through
Thursday are learning days, five new words each (25 for the week); Friday and
Saturday are **review days**, where the whole week's 25 words come back for
recall practice instead of new ones arriving (`screens/Memorize.tsx`).

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
| `src/screens/*` | One React component per `Screen` — onboarding, dashboard, daily lesson, daily missions, vocabulary, dialogue coach, practice quiz, spaced-repetition review, reading, listening, speaking, saved words, progress, calendar, settings. |
| `src/App.tsx` | Shell + hash routing (`#/missions`, etc.): gates on onboarding, switches on the active `Screen`, top bar (points/streak/level), 5-item bottom nav, offline banner, SW update prompt. |
| `src/store/useLingo.tsx` | App state (`UserProgress`, saved words, chat, quizzes, mission log, daily missions checklist) as a React Context, persisted to `localStorage` and — in Account mode — mirrored to Firestore. Owns points, streak, SRS, mission auto-complete, export/import. |
| `src/services/ai.ts` | Multi-provider AI client — a thin wrapper over the shared [`@joka-7/modeldispatcher-browser-agent`](https://github.com/joka-7/ModelDispatcher/tree/main/clients/browser-agent) package (also used by JobFlowTracker/KanDOne/StepByLearn). Stores provider/key/model in `localStorage` and exposes `complete(prompt, systemInstruction)`. |
| `src/services/content.ts` | Generators per pillar with vocabulary-safe offline fallbacks. Reading/Listening always pick bundled content; other pillars try AI then fall back. |
| `src/services/firebase.ts` | Optional Google sign-in + Firestore sync. Env-var config only (no hardcoded project). Lazy `import()`. |
| `src/services/prefs.ts` | Theme, speech speed, and local reminder prefs. |
| `src/services/reminders.ts` | Best-effort local Notification reminders while the app is open. |
| `src/services/errors.ts` | `reportError` — console always; optional Sentry when `VITE_SENTRY_DSN` is set. |
| `src/services/tts.ts` / `asr.ts` | Web Speech API wrappers. |
| `src/services/pwa.ts` | Install prompt + SW update registration (`virtual:pwa-register`). |
| `src/data/offline.ts` + `extras.ts` | Per-CEFR-level offline loaders (lessons/vocab/quizzes + reading/listening/speaking pools). |
| `src/data/videos.ts` | Level-tagged curated YouTube list for the daily video mission. |
| `src/data/placement.ts` / `topics.ts` | Placement test + rotating daily topics / dialogue scenarios. |
| `src/utils/*` | Pure helpers: `json`, `srs`, `score`, `missions`, `cycle` (the Sun–Thu / Fri–Sat week), `levelProgress`, `routing`, `progressCharts`, `backup`, `dailyCache`. |
| `scripts/generate-content.mjs` | Build-time generator for offline JSON banks. |

## Key design decisions

- **Client-only, offline-first.** Settings are in-app. A service worker
  precaches the shell; content chunks cache on first use. AI-backed features
  (lesson/vocab/quiz/speaking) degrade to bundled JSON; Reading/Listening are
  offline-only by design; Dialogue Coach requires a live key.
- **Optional cloud, not required cloud.** Cloud sync is opt-in and gated on
  `VITE_FIREBASE_*` (`isCloudConfigured()`). No hardcoded Firebase project.
- **Optional error monitoring.** `reportError` logs always; Sentry loads only
  when `VITE_SENTRY_DSN` is set.
- **Hash routing.** Screens are bookmarkable (`#/reading`) without a router
  library; browser back/forward follow the hash.
- **Daily Missions + Calendar.** Five operations (video, talk, reading,
  listening, speaking/grammar) as the checklist, with the words box outside it,
  and auto-complete where possible; calendar shows completed mission history.
- **Level progression.** Learned/mastered vocabulary thresholds can auto-promote
  CEFR level (`utils/levelProgress.ts`).
- **Provider abstraction.** Five providers share one `complete()` entry point;
  Gemini key is sent via header (not query string).
- **Code-split content.** Per-level offline packs are dynamic-`import()` chunks
  under `assets/content/`, excluded from the SW precache.

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
4. `addPoints` / `awardSpeakingPoints` awards speaking credit (full for the
   first round of the day, reduced after to prevent farming).
5. Browsers without speech recognition still see the sentence + model audio
   (graceful degradation).

## Daily Missions

`DailyMissions` shows a **five-item** checklist — the operations from
`data/operations.ts` — with the day's vocabulary in a separate box above it, so
"חמש ביום" really is five. Manual: video (embedded curated YouTube by level) and
talk. Auto: reading / listening (via `quizHistory` topics), speaking (via
`missionLog`), grammar (`dailyLessonCompletedText`). The words box is auto too —
5 saves today on a learning day, the memorization round on a review day — and
still awards +30 like the five, it just isn't one of them. `Calendar` aggregates
`missionLog` + quiz history by local `dateKeyFromTs`.

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
| Unit | Vitest | Pure logic + store (`useLingo`) + content offline/AI-fallback paths + coverage floors. |
| Integration | Vitest + RTL | Screens wired to `LingoProvider` (Settings, onboarding → dashboard). |
| E2E | Playwright | Desktop + mobile: onboarding, quiz, lesson, save-word, hash deep-link, dark mode. |
| Security / size | CI | `npm audit --omit=dev`, shell-bundle size gate, Dependabot. |

CI (`.github/workflows/ci.yml`) runs audit → lint → typecheck → coverage tests →
build → bundle gate, then Playwright E2E on Chromium (desktop + Pixel 5).

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
