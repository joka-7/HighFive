# High5 ✋

A playful **English-learning web app for Hebrew speakers** — daily lessons,
vocabulary flashcards, quizzes, and an AI Dialogue Coach. Built with React +
Vite + TypeScript.

It works out of the box with bundled offline content (CEFR levels A1–C2), and
gets AI-generated lessons and live conversation practice when you add a provider
key.

## Features

- **Daily lesson** — a Hebrew explanation plus a 3-question practice quiz.
- **Vocabulary flashcards** — level-adaptive words with Hebrew definitions,
  examples, and text-to-speech pronunciation.
- **Dialogue Coach** — roleplay scenarios where the AI replies in English and
  corrects your mistakes in Hebrew. *(Requires an AI key.)*
- **Practice quiz** — 5 multiple-choice questions with Hebrew explanations.
- **Saved words** — bookmark words, mark them mastered, review later.
- **Progress** — points, daily streaks, and a placement test.
- **Hebrew RTL, mobile-first UI.**

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
```

Then open the local URL Vite prints.

## AI provider (optional)

AI is configured **in-app** — no environment variables. Open **Settings (⚙️)**,
pick a provider, paste a key (or an Ollama URL), and Save. Your choice is stored
in your browser (`localStorage`).

| Provider | Notes | Get a key |
| --- | --- | --- |
| **Groq** | free tier, fast | <https://console.groq.com/keys> |
| **Google Gemini** | free tier | <https://aistudio.google.com/app/apikey> |
| **Anthropic Claude** | paid | <https://console.anthropic.com/settings/keys> |
| **OpenAI** | paid | <https://platform.openai.com/api-keys> |
| **Ollama** | local, no key | <https://ollama.ai> |

Without a key, lessons, vocabulary, and quizzes use the bundled offline content —
only the Dialogue Coach needs a provider.

## Testing

```bash
npm test          # unit + integration tests (Vitest + React Testing Library)
npm run test:e2e  # end-to-end tests (Playwright)
npm run lint
npm run typecheck
```

CI runs lint, type-check, tests, a production-dependency security audit, and the
build on every push and pull request.

## Deploy (Vercel)

1. Import the repo at <https://vercel.com/new> — Vercel auto-detects Vite.
2. **Root Directory** must be the repo root (leave it empty).
3. No environment variables needed — users add their own AI key in-app.
4. `vercel.json` applies hardened HTTP security headers automatically.

## Security

This is a client-side app: a key entered in the browser is stored in
`localStorage` and sent directly to your chosen provider. That's fine for
personal use. For a public deployment, proxy the AI calls through a backend and
keep the key server-side.

## Design docs

- [`docs/HLD.md`](./docs/HLD.md) — architecture and data flow.
- [`docs/LLD.md`](./docs/LLD.md) — module-level design detail.

## License

MIT — see [LICENSE](./LICENSE).
