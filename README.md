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
| `GeminiClient` (Retrofit)        | `src/services/gemini.ts` (`fetch`)            |
| `LingoRepository` prompts        | Ported **verbatim** into `gemini.ts`          |
| `assets/offline/*.json`          | `src/data/offline/*.json` (identical content) |
| Android `TextToSpeech`           | Web Speech API (`src/services/tts.ts`)        |
| `ApiKeyStore` (DataStore)        | `src/services/apiKey.ts`                       |

The Gemini model (`gemini-2.0-flash`), endpoint, system instructions, prompts,
JSON schemas, and the points/scoring rules (save word +10, dialogue +15, lesson
50 base + 20/correct, quiz 25/correct) all match the original.

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

Then open the local URL Vite prints.

## Gemini API key (optional)

Without a key, the app uses the bundled offline content for lessons, vocabulary,
and quizzes — only the Dialogue Coach needs a key.

To enable live AI content, either:

1. Enter a key in-app under **Settings → Gemini API key**, or
2. Create a `.env` file from `.env.example`:

   ```
   VITE_GEMINI_API_KEY=your_key_here
   ```

Get a free key at <https://aistudio.google.com/app/apikey>.

## Security

This is a client-side app: a key entered in the browser (or baked in via
`VITE_GEMINI_API_KEY`) is **exposed to the client**. That's fine for personal
/ local use. For a public deployment, proxy Gemini calls through a small backend
and keep the key server-side.

## Tech stack

React 18 · Vite 6 · TypeScript · Web Speech API · Gemini 2.0 Flash

## License

MIT — see [LICENSE](./LICENSE).
