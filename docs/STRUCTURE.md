# Repository structure

Every file in this repo and what is inside it. The tree below is **generated** —
run `python .ai/skills/repo_tree/gen_tree.py --project . --output docs/STRUCTURE.md`
to refresh it, and never edit between the markers by hand.

<!-- BEGIN GENERATED TREE (depth=all entries=all) -->
```text
HighFive/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── mission-reminder.yml
│   │   └── security.yml
│   ├── copilot-instructions.md  # Copilot's copy of AGENTS.md (generated)
│   └── dependabot.yml
├── api/                         # Vercel Serverless Functions — built independently of the Vite app (see…
│   └── mission-reminder.ts      # Hourly push-reminder endpoint; actual per-user scheduling logic lives in…
├── docs/
│   ├── screenshots/
│   │   ├── daily-lesson.png
│   │   ├── daily-missions.png
│   │   ├── dashboard.png
│   │   ├── listening.png
│   │   ├── onboarding-level.png
│   │   ├── practice-quiz.png
│   │   ├── progress.png
│   │   ├── reading.png
│   │   ├── settings.png
│   │   └── vocabulary.png
│   ├── .structure-notes.toml
│   ├── HLD.md                   # High-Level Design
│   ├── LLD.md                   # Low-Level Design
│   └── STRUCTURE.md             # Repository structure
├── e2e/                         # Playwright end-to-end specs, run via `npm run test:e2e`
│   ├── onboarding.spec.ts
│   └── screenshots.spec.ts
├── public/                      # Static assets + PWA manifest/service worker, served as-is by Vite
│   ├── fonts/
│   │   ├── heebo-hebrew.woff2
│   │   ├── heebo-latin.woff2
│   │   └── plus-jakarta-sans-latin.woff2
│   ├── apple-touch-icon.png
│   ├── favicon-32.png
│   ├── firebase-messaging-sw.js
│   ├── icon-192.png
│   ├── icon-512.png
│   └── manifest.webmanifest
├── scripts/                     # Content generation — `npm run content` rebuilds src/data/offline/*.json from…
│   ├── content/                 # Source word banks/passages the content generator reads
│   │   ├── banks.mjs
│   │   ├── example-he.mjs
│   │   ├── passages-extra.mjs
│   │   ├── passages-extra2.mjs
│   │   ├── passages-extra3.mjs
│   │   ├── passages-extra4.mjs
│   │   ├── passages-extra5.mjs
│   │   ├── passages-extra6.mjs
│   │   ├── passages-extra7.mjs
│   │   ├── passages-extra8.mjs
│   │   ├── passages-extra9.mjs
│   │   ├── passages.mjs
│   │   ├── wordbank-extra.mjs
│   │   ├── wordbank-extra10.mjs
│   │   ├── wordbank-extra2.mjs
│   │   ├── wordbank-extra3.mjs
│   │   ├── wordbank-extra4.mjs
│   │   ├── wordbank-extra5.mjs
│   │   ├── wordbank-extra6.mjs
│   │   ├── wordbank-extra7.mjs
│   │   ├── wordbank-extra8.mjs
│   │   └── wordbank-extra9.mjs
│   └── generate-content.mjs
├── src/                         # The Vite app: screens, components, state (useLingo), and content/offline…
│   ├── components/              # Shared UI: cards, quiz runner, error boundary
│   │   ├── Card.tsx
│   │   ├── ErrorBoundary.test.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── MiniBarChart.tsx
│   │   ├── QuizRunner.tsx
│   │   ├── Spinner.tsx
│   │   ├── Tile.tsx
│   │   └── WordCard.tsx
│   ├── data/                    # Curriculum data (word banks, topics, videos) and the bundled offline content…
│   │   ├── offline/             # Bundled per-level (A1-C2) quiz/listening/reading/speaking content, used…
│   │   │   ├── a1.listening.curated.json
│   │   │   ├── a1.listening.q1.json
│   │   │   ├── a1.listening.q2.json
│   │   │   ├── a1.listening.q3.json
│   │   │   ├── a1.listening.q4.json
│   │   │   ├── a1.q1.json
│   │   │   ├── a1.q2.json
│   │   │   ├── a1.q3.json
│   │   │   ├── a1.q4.json
│   │   │   ├── a1.reading.curated.json
│   │   │   ├── a1.reading.q1.json
│   │   │   ├── a1.reading.q2.json
│   │   │   ├── a1.reading.q3.json
│   │   │   ├── a1.reading.q4.json
│   │   │   ├── a1.speaking.curated.json
│   │   │   ├── a1.speaking.q1.json
│   │   │   ├── a1.speaking.q2.json
│   │   │   ├── a1.speaking.q3.json
│   │   │   ├── a1.speaking.q4.json
│   │   │   ├── a2.listening.curated.json
│   │   │   ├── a2.listening.q1.json
│   │   │   ├── a2.listening.q2.json
│   │   │   ├── a2.listening.q3.json
│   │   │   ├── a2.listening.q4.json
│   │   │   ├── a2.q1.json
│   │   │   ├── a2.q2.json
│   │   │   ├── a2.q3.json
│   │   │   ├── a2.q4.json
│   │   │   ├── a2.reading.curated.json
│   │   │   ├── a2.reading.q1.json
│   │   │   ├── a2.reading.q2.json
│   │   │   ├── a2.reading.q3.json
│   │   │   ├── a2.reading.q4.json
│   │   │   ├── a2.speaking.curated.json
│   │   │   ├── a2.speaking.q1.json
│   │   │   ├── a2.speaking.q2.json
│   │   │   ├── a2.speaking.q3.json
│   │   │   ├── a2.speaking.q4.json
│   │   │   ├── b1.listening.curated.json
│   │   │   ├── b1.listening.q1.json
│   │   │   ├── b1.listening.q2.json
│   │   │   ├── b1.listening.q3.json
│   │   │   ├── b1.listening.q4.json
│   │   │   ├── b1.q1.json
│   │   │   ├── b1.q2.json
│   │   │   ├── b1.q3.json
│   │   │   ├── b1.q4.json
│   │   │   ├── b1.reading.curated.json
│   │   │   ├── b1.reading.q1.json
│   │   │   ├── b1.reading.q2.json
│   │   │   ├── b1.reading.q3.json
│   │   │   ├── b1.reading.q4.json
│   │   │   ├── b1.speaking.curated.json
│   │   │   ├── b1.speaking.q1.json
│   │   │   ├── b1.speaking.q2.json
│   │   │   ├── b1.speaking.q3.json
│   │   │   ├── b1.speaking.q4.json
│   │   │   ├── b2.listening.curated.json
│   │   │   ├── b2.listening.q1.json
│   │   │   ├── b2.listening.q2.json
│   │   │   ├── b2.listening.q3.json
│   │   │   ├── b2.listening.q4.json
│   │   │   ├── b2.q1.json
│   │   │   ├── b2.q2.json
│   │   │   ├── b2.q3.json
│   │   │   ├── b2.q4.json
│   │   │   ├── b2.reading.curated.json
│   │   │   ├── b2.reading.q1.json
│   │   │   ├── b2.reading.q2.json
│   │   │   ├── b2.reading.q3.json
│   │   │   ├── b2.reading.q4.json
│   │   │   ├── b2.speaking.curated.json
│   │   │   ├── b2.speaking.q1.json
│   │   │   ├── b2.speaking.q2.json
│   │   │   ├── b2.speaking.q3.json
│   │   │   ├── b2.speaking.q4.json
│   │   │   ├── c1.listening.curated.json
│   │   │   ├── c1.listening.q1.json
│   │   │   ├── c1.listening.q2.json
│   │   │   ├── c1.listening.q3.json
│   │   │   ├── c1.listening.q4.json
│   │   │   ├── c1.q1.json
│   │   │   ├── c1.q2.json
│   │   │   ├── c1.q3.json
│   │   │   ├── c1.q4.json
│   │   │   ├── c1.reading.curated.json
│   │   │   ├── c1.reading.q1.json
│   │   │   ├── c1.reading.q2.json
│   │   │   ├── c1.reading.q3.json
│   │   │   ├── c1.reading.q4.json
│   │   │   ├── c1.speaking.curated.json
│   │   │   ├── c1.speaking.q1.json
│   │   │   ├── c1.speaking.q2.json
│   │   │   ├── c1.speaking.q3.json
│   │   │   ├── c1.speaking.q4.json
│   │   │   ├── c2.listening.curated.json
│   │   │   ├── c2.listening.q1.json
│   │   │   ├── c2.listening.q2.json
│   │   │   ├── c2.listening.q3.json
│   │   │   ├── c2.listening.q4.json
│   │   │   ├── c2.q1.json
│   │   │   ├── c2.q2.json
│   │   │   ├── c2.q3.json
│   │   │   ├── c2.q4.json
│   │   │   ├── c2.reading.curated.json
│   │   │   ├── c2.reading.q1.json
│   │   │   ├── c2.reading.q2.json
│   │   │   ├── c2.reading.q3.json
│   │   │   ├── c2.reading.q4.json
│   │   │   ├── c2.speaking.curated.json
│   │   │   ├── c2.speaking.q1.json
│   │   │   ├── c2.speaking.q2.json
│   │   │   ├── c2.speaking.q3.json
│   │   │   ├── c2.speaking.q4.json
│   │   │   └── vocab-index.json
│   │   ├── extras.ts
│   │   ├── level-vocabulary.ts
│   │   ├── offline.test.ts
│   │   ├── offline.ts
│   │   ├── operations.ts
│   │   ├── placement.test.ts
│   │   ├── placement.ts
│   │   ├── starter-words.ts
│   │   ├── todays-words.ts
│   │   ├── topics.ts
│   │   └── videos.ts
│   ├── hooks/                   # Small reusable React hooks (local reminders, online-status)
│   │   ├── useLocalReminder.ts
│   │   └── useOnlineStatus.ts
│   ├── screens/                 # One file per app screen/route
│   │   ├── Calendar.tsx
│   │   ├── DailyLesson.tsx
│   │   ├── DailyMissions.test.tsx
│   │   ├── DailyMissions.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DialogueCoach.test.tsx
│   │   ├── DialogueCoach.tsx
│   │   ├── Listening.tsx
│   │   ├── Memorize.tsx
│   │   ├── Onboarding.tsx
│   │   ├── PracticeQuiz.tsx
│   │   ├── Progress.tsx
│   │   ├── Reading.tsx
│   │   ├── Review.tsx
│   │   ├── SavedWords.tsx
│   │   ├── Settings.integration.test.tsx
│   │   ├── Settings.tsx
│   │   ├── Speaking.tsx
│   │   └── Vocabulary.tsx
│   ├── services/                # External integrations: AI provider, Firebase, TTS/ASR, push, prefs, PWA
│   │   ├── ai.test.ts
│   │   ├── ai.ts
│   │   ├── asr.ts
│   │   ├── content.test.ts
│   │   ├── content.ts
│   │   ├── errors.test.ts
│   │   ├── errors.ts
│   │   ├── firebase.ts
│   │   ├── prefs.test.ts
│   │   ├── prefs.ts
│   │   ├── push.ts
│   │   ├── pwa.ts
│   │   ├── reminders.test.ts
│   │   ├── reminders.ts
│   │   └── tts.ts
│   ├── store/                   # UseLingo — the app's central state/context provider
│   │   ├── useLingo.test.tsx
│   │   └── useLingo.tsx
│   ├── utils/                   # Pure logic: spaced-repetition (SRS), scoring, cycles, missions, backup/restore
│   │   ├── backup.test.ts
│   │   ├── backup.ts
│   │   ├── cycle.test.ts
│   │   ├── cycle.ts
│   │   ├── daily.test.ts
│   │   ├── daily.ts
│   │   ├── dailyCache.test.ts
│   │   ├── dailyCache.ts
│   │   ├── json.test.ts
│   │   ├── json.ts
│   │   ├── levelProgress.test.ts
│   │   ├── levelProgress.ts
│   │   ├── memorize.test.ts
│   │   ├── memorize.ts
│   │   ├── missions.test.ts
│   │   ├── missions.ts
│   │   ├── progressCharts.test.ts
│   │   ├── progressCharts.ts
│   │   ├── reminderLogic.test.ts
│   │   ├── reminderLogic.ts
│   │   ├── routing.test.ts
│   │   ├── routing.ts
│   │   ├── score.test.ts
│   │   ├── score.ts
│   │   ├── srs.test.ts
│   │   ├── srs.ts
│   │   ├── vocabulary.test.ts
│   │   └── vocabulary.ts
│   ├── App.integration.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── test-setup.ts
│   └── types.ts
├── .ai                          # Ogen-ai submodule — the shared source of rules, skills and the ai-sync…
├── .env.example
├── .gitignore
├── .gitmodules
├── .npmrc
├── AGENTS.md                    # The compiled coding rules every AI assistant reads — generated, do not…
├── CLAUDE.md                    # Claude Code's copy of AGENTS.md (generated)
├── GEMINI.md                    # Gemini CLI's copy of AGENTS.md (generated)
├── LICENSE
├── README.md                    # High5 ✋
├── ai-config.toml               # Which rule fragments and target tools ai-sync compiles for this repo
├── eslint.config.js
├── firestore.rules
├── index.html
├── package-lock.json
├── package.json
├── playwright.config.ts
├── stitch-prompt.md             # Google Stitch Prompt
├── tsconfig.json
├── vercel.json
├── vite-env.d.ts
└── vite.config.ts
```
<!-- END GENERATED TREE -->
