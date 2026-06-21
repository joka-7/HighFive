# High-Level Design

## Overview

High5 is a client-only single-page app (React + Vite + TypeScript) that teaches
English to Hebrew speakers. It is a web port of the original High5 Android app
(Kotlin/Jetpack Compose), keeping the same content, prompts, and scoring rules.

There is no backend. All state lives in the browser (`localStorage`), and all
AI calls go directly from the browser to the chosen provider's REST API.

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser (SPA)                       │
│                                                               │
│  ┌────────────┐   ┌─────────────────┐   ┌─────────────────┐ │
│  │   Screens   │──▶│  LingoProvider  │──▶│   localStorage   │ │
│  │ (React UI)  │   │ (React Context) │   │ (progress, words,│ │
│  └─────┬──────┘   └─────────────────┘   │  chat, AI config) │ │
│        │                                 └─────────────────┘ │
│        ▼                                                     │
│  ┌────────────┐   ┌─────────────────┐                        │
│  │  content.ts │──▶│     ai.ts       │                        │
│  │ (prompts)   │   │ (provider call) │                        │
│  └─────┬──────┘   └────────┬────────┘                        │
│        │ on no-key/failure  │ HTTPS                            │
│        ▼                    ▼                                │
│  ┌────────────┐   ┌─────────────────────────────┐             │
│  │ offline.ts  │   │ Gemini / Groq / Anthropic / │             │
│  │ (bundled    │   │ OpenAI / Ollama (local)     │             │
│  │  JSON)      │   └─────────────────────────────┘             │
│  └────────────┘                                               │
└─────────────────────────────────────────────────────────────┘
```

## Major components

| Component | Responsibility |
|---|---|
| `src/screens/*` | One React component per `Screen` (onboarding, dashboard, lesson, vocabulary, dialogue, quiz, saved words, progress, settings). |
| `src/store/useLingo.tsx` | App state (`UserProgress`, saved words, chat history, quiz history) as a React Context, persisted to `localStorage`. Equivalent to the original Room database. |
| `src/services/ai.ts` | Multi-provider AI client. Stores provider/key/model in `localStorage` (same keys as the JobFlowTracker app, for a consistent settings UX) and exposes a single `complete(prompt, systemInstruction)` used by every feature. |
| `src/services/content.ts` | Builds the exact prompts ported from the original Kotlin app (`LingoRepository.kt`) and falls back to bundled offline content when no AI key is configured or a call fails. |
| `src/data/offline/*.json` | Bundled per-CEFR-level vocabulary/lessons/quizzes, used whenever AI isn't configured (so the app is fully usable offline / without a key). |
| `src/data/placement.ts` | 3-question placement test → CEFR level mapping, used during onboarding. |

## Key design decisions

- **No backend, no env vars.** All configuration happens in-app (Settings
  screen) and is stored client-side. Simpler to deploy (static Vite build to
  Vercel), at the cost of the AI key being visible to the browser — acceptable
  for personal use, flagged in-app and in the README for public deployments.
- **Offline-first fallback.** Every AI-backed feature (vocabulary, daily
  lesson, quiz) degrades to bundled JSON content rather than failing, so the
  app is fully functional without any provider configured. Only the Dialogue
  Coach requires a live key, since it's inherently a live conversation.
- **Provider abstraction mirrors JobFlowTracker.** Same `localStorage` key
  names (`aiProvider`, `aiApiKey`, `aiModel`, `ollamaUrl`) so a user who
  already has a key saved in one app doesn't have to learn a different UI in
  the other.

## Data flow (example: Daily Lesson)

1. `DailyLesson` screen calls `generateDailyLesson(level, topic)`.
2. If no provider is configured (`isAIReady()` false) → pull a random lesson
   from `loadOfflineContent(level).lessons`.
3. Otherwise, build the prompt (verbatim from the original app) and call
   `complete()`, which dispatches to the configured provider's REST API.
4. Parse the JSON response (`parseJson`, with fence-stripping); on parse
   failure, fall back to offline content rather than showing an error.
5. Render the lesson + 3-question quiz via the shared `QuizRunner` component.
6. On completion, `useLingo().completeLesson()` updates points/streak in
   `localStorage`.

## Testing strategy

| Layer | Tool | Covers |
|---|---|---|
| Unit | Vitest | Pure logic: placement scoring, offline content shape, JSON cleaning, AI config persistence. |
| Integration | Vitest + React Testing Library | Screens wired to the real `LingoProvider`/`ai.ts` (Settings save/clear flow, onboarding → dashboard → navigation). |
| E2E | Playwright | Full browser flow against the built app: onboarding, dashboard navigation, practice quiz. |
| Security gate | `npm audit` (CI) | Fails CI on high/critical vulnerabilities in production dependencies. |

See `docs/LLD.md` for module-level detail.
