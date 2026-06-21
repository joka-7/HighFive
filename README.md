# High5 ✋ — Web App

An interactive, playful **English learning assistant for Hebrew speakers** — a daily
vocabulary tracker, AI-generated lessons, quizzes, and a conversational Dialogue
Coach. This is the **web app port** of the original
[High5](https://github.com/joka-7/High5) Android (Kotlin/Jetpack Compose) app,
rebuilt in React + Vite + TypeScript.

Like the original, it's powered by **Google Gemini** and ships with a full
offline content library (CEFR levels A1–C2) so it works even without an API key.

## Features

- **Daily lesson** — a grammar/vocabulary explanation (in Hebrew) followed by a
  3-question practice quiz.
- **Vocabulary flashcards** — level-adaptive words with Hebrew definitions,
  translations, example sentences, and text-to-speech pronunciation.
- **Dialogue Coach** — roleplay scenarios (cafe, airport, job interview…) where
  the AI replies in English and corrects your mistakes in Hebrew. *(Requires a
  Gemini key.)*
- **Practice quiz** — 5 multiple-choice questions with Hebrew explanations.
- **Saved words** — bookmark words, mark them as mastered, review later.
- **Gamification** — points, daily streaks, and a placement test (A1 / B1 / C1).
- **Right-to-left Hebrew UI**, mobile-first, installable-feeling.

## How it maps to the original

| High5 (Android / Kotlin)         | This web app                                  |
| -------------------------------- | --------------------------------------------- |
| Jetpack Compose UI               | React components + CSS                         |
| `LingoViewModel`                 | `src/store/useLingo.tsx` (React context)      |
| Room database (`LingoDatabase`)  | `localStorage` (same entity shapes)           |
| `GeminiClient` (Retrofit)        | `src/services/ai.ts` (multi-provider `fetch`) |
| `LingoRepository` prompts        | Ported **verbatim** into `content.ts`         |
| `assets/offline/*.json`          | `src/data/offline/*.json` (identical content) |
| Android `TextToSpeech`           | Web Speech API (`src/services/tts.ts`)        |
| `ApiKeyStore` (DataStore)        | `src/services/apiKey.ts`                       |

The original Gemini prompts, system instructions, JSON schemas, and the
points/scoring rules (save word +10, dialogue +15, lesson 50 base + 20/correct,
quiz 25/correct) all match the original.

## AI provider (optional)

Like JobFlowTracker, AI is configured **in-app** — no environment variables. Open
**Settings (⚙️)**, pick a provider, paste a key (or an Ollama URL), and Save. The
choice is stored in `localStorage` (`aiProvider` / `aiApiKey` / `aiModel` /
`ollamaUrl`).

Supported providers:

| Provider | Notes | Get a key |
| --- | --- | --- |
| **Groq** | free tier, fast | <https://console.groq.com/keys> |
| **Google Gemini** | free tier | <https://aistudio.google.com/app/apikey> |
| **Anthropic Claude** | paid | <https://console.anthropic.com/settings/keys> |
| **OpenAI** | paid | <https://platform.openai.com/api-keys> |
| **Ollama** | local, no key | <https://ollama.ai> |

Without any provider configured, the app falls back to the bundled offline
content for lessons, vocabulary, and quizzes — only the Dialogue Coach needs a
provider.

## Deploy (Vercel)

Same setup as JobFlowTracker:

1. Import the repo at <https://vercel.com/new> — Vercel auto-detects Vite
   (build `npm run build`, output `dist`).
2. `vercel.json` ships the same hardened HTTP security headers.
3. No environment variables required — users add their own AI key in-app.

Or from the CLI:

```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

Then open the local URL Vite prints.

## Security

This is a client-side app: a key entered in the browser is **stored in
`localStorage` and sent directly to your chosen provider**. That's fine for
personal / local use. For a public deployment, proxy the AI calls through a
small backend and keep the key server-side.

## Tech stack

React 18 · Vite 6 · TypeScript · Web Speech API · multi-provider AI (Gemini /
Groq / Anthropic / OpenAI / Ollama)

## License

MIT — see [LICENSE](./LICENSE).
