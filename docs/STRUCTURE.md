# Repository structure

Every file in this repo and what is inside it. The tree below is **generated** —
run `python .ai/skills/repo_tree/gen_tree.py --project . --output docs/STRUCTURE.md`
to refresh it, and never edit between the markers by hand.

<!-- BEGIN GENERATED TREE (depth=all entries=all) -->
```text
HighFive/
├── .github/
│   ├── workflows/
│   │   ├── android.yml
│   │   ├── ci.yml
│   │   ├── docs.yml
│   │   ├── mission-reminder.yml
│   │   └── security.yml
│   ├── copilot-instructions.md                   # Copilot's copy of AGENTS.md (generated)
│   └── dependabot.yml
├── android/                                      # Capacitor Android project wrapping the web build (see LLD, Android app)
│   ├── app/
│   │   ├── src/
│   │   │   └── main/
│   │   │       ├── java/
│   │   │       │   └── io/
│   │   │       │       └── github/
│   │   │       │           └── joka7/
│   │   │       │               └── highfive/
│   │   │       │                   └── MainActivity.java  # Hands Google's Drive-consent result back to the sign-in plugin
│   │   │       ├── res/
│   │   │       │   ├── drawable/
│   │   │       │   │   └── splash.png
│   │   │       │   ├── drawable-land-hdpi/
│   │   │       │   │   └── splash.png
│   │   │       │   ├── drawable-land-mdpi/
│   │   │       │   │   └── splash.png
│   │   │       │   ├── drawable-land-xhdpi/
│   │   │       │   │   └── splash.png
│   │   │       │   ├── drawable-land-xxhdpi/
│   │   │       │   │   └── splash.png
│   │   │       │   ├── drawable-land-xxxhdpi/
│   │   │       │   │   └── splash.png
│   │   │       │   ├── drawable-port-hdpi/
│   │   │       │   │   └── splash.png
│   │   │       │   ├── drawable-port-mdpi/
│   │   │       │   │   └── splash.png
│   │   │       │   ├── drawable-port-xhdpi/
│   │   │       │   │   └── splash.png
│   │   │       │   ├── drawable-port-xxhdpi/
│   │   │       │   │   └── splash.png
│   │   │       │   ├── drawable-port-xxxhdpi/
│   │   │       │   │   └── splash.png
│   │   │       │   ├── layout/
│   │   │       │   │   └── activity_main.xml
│   │   │       │   ├── mipmap-anydpi-v26/
│   │   │       │   │   ├── ic_launcher.xml
│   │   │       │   │   └── ic_launcher_round.xml
│   │   │       │   ├── mipmap-hdpi/
│   │   │       │   │   ├── ic_launcher.png
│   │   │       │   │   ├── ic_launcher_background.png
│   │   │       │   │   ├── ic_launcher_foreground.png
│   │   │       │   │   └── ic_launcher_round.png
│   │   │       │   ├── mipmap-mdpi/
│   │   │       │   │   ├── ic_launcher.png
│   │   │       │   │   ├── ic_launcher_background.png
│   │   │       │   │   ├── ic_launcher_foreground.png
│   │   │       │   │   └── ic_launcher_round.png
│   │   │       │   ├── mipmap-xhdpi/
│   │   │       │   │   ├── ic_launcher.png
│   │   │       │   │   ├── ic_launcher_background.png
│   │   │       │   │   ├── ic_launcher_foreground.png
│   │   │       │   │   └── ic_launcher_round.png
│   │   │       │   ├── mipmap-xxhdpi/
│   │   │       │   │   ├── ic_launcher.png
│   │   │       │   │   ├── ic_launcher_background.png
│   │   │       │   │   ├── ic_launcher_foreground.png
│   │   │       │   │   └── ic_launcher_round.png
│   │   │       │   ├── mipmap-xxxhdpi/
│   │   │       │   │   ├── ic_launcher.png
│   │   │       │   │   ├── ic_launcher_background.png
│   │   │       │   │   ├── ic_launcher_foreground.png
│   │   │       │   │   └── ic_launcher_round.png
│   │   │       │   ├── values/
│   │   │       │   │   ├── strings.xml
│   │   │       │   │   └── styles.xml
│   │   │       │   └── xml/
│   │   │       │       └── file_paths.xml
│   │   │       └── AndroidManifest.xml
│   │   ├── .gitignore
│   │   ├── build.gradle
│   │   ├── capacitor.build.gradle
│   │   └── proguard-rules.pro
│   ├── gradle/
│   │   └── wrapper/
│   │       ├── gradle-wrapper.jar
│   │       └── gradle-wrapper.properties
│   ├── .gitignore
│   ├── build.gradle
│   ├── capacitor.settings.gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── settings.gradle
│   └── variables.gradle
├── api/                                          # Vercel Serverless Functions — built independently of the Vite app,…
│   ├── _lib/                                     # Helpers shared by the functions; Vercel skips underscore paths, so these are…
│   │   ├── cronAuth.test.ts
│   │   ├── cronAuth.ts
│   │   ├── firebaseAdmin.ts
│   │   ├── http.test.ts
│   │   ├── http.ts
│   │   ├── reminderApi.test.ts
│   │   └── reminderApi.ts
│   ├── mission-reminder.ts                       # Hourly push-reminder sender over reminders/{installId}; who is due is…
│   ├── reminder-register.test.ts
│   ├── reminder-register.ts                      # POST: registers a browser install for push reminders (token + timezone only)
│   ├── reminder.test.ts
│   └── reminder.ts                               # POST: reports seen/done days for an install; DELETE: opts it out
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
│   ├── HLD.md                                    # High-Level Design
│   ├── LLD.md                                    # Low-Level Design
│   └── STRUCTURE.md                              # Repository structure
├── e2e/                                          # Playwright end-to-end specs, run via `npm run test:e2e`
│   ├── onboarding.spec.ts
│   ├── privacy.spec.ts
│   └── screenshots.spec.ts
├── public/                                       # Static assets + PWA manifest/service worker, served as-is by Vite
│   ├── fonts/
│   │   ├── heebo-hebrew.woff2
│   │   ├── heebo-latin.woff2
│   │   └── plus-jakarta-sans-latin.woff2
│   ├── apple-touch-icon.png
│   ├── favicon-32.png
│   ├── firebase-messaging-sw.js
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── manifest.webmanifest
│   └── privacy.html
├── scripts/                                      # Content generation (`npm run content` rebuilds src/data/offline/*.json) and…
│   ├── content/                                  # Source word banks/passages the content generator reads
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
│   ├── gen-android-icons.mjs                     # Renders the Android launcher icons and splash screens from public/icon-512.png
│   └── generate-content.mjs
├── src/                                          # The Vite app: screens, components, state (useLingo), and content/offline…
│   ├── components/                               # Shared UI: cards, quiz runner, error boundary
│   │   ├── Card.tsx
│   │   ├── ErrorBoundary.test.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── GithubIcon.tsx
│   │   ├── MiniBarChart.tsx
│   │   ├── QuizRunner.tsx
│   │   ├── Spinner.tsx
│   │   ├── Tile.tsx
│   │   └── WordCard.tsx
│   ├── data/                                     # Curriculum data (word banks, topics, videos) and the bundled offline content…
│   │   ├── offline/                              # Bundled per-level (A1-C2) quiz/listening/reading/speaking content, used…
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
│   ├── hooks/                                    # Small reusable React hooks (local reminders, online-status)
│   │   ├── useLocalReminder.test.tsx
│   │   ├── useLocalReminder.ts
│   │   ├── useOnlineStatus.ts
│   │   ├── useReminderReports.test.tsx
│   │   └── useReminderReports.ts
│   ├── screens/                                  # One file per app screen/route
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
│   │   ├── Settings.modelPicker.test.tsx
│   │   ├── Settings.tsx
│   │   ├── Speaking.tsx
│   │   └── Vocabulary.tsx
│   ├── services/                                 # External integrations: AI provider, Drive sync, TTS/ASR, push and Android…
│   │   ├── ai.test.ts
│   │   ├── ai.ts
│   │   ├── asr.test.ts
│   │   ├── asr.ts
│   │   ├── cloud.ts
│   │   ├── content.test.ts
│   │   ├── content.ts
│   │   ├── driveSync.test.ts
│   │   ├── driveSync.ts
│   │   ├── errors.test.ts
│   │   ├── errors.ts
│   │   ├── firebase.ts
│   │   ├── nativeGoogleAuth.test.ts
│   │   ├── nativeGoogleAuth.ts
│   │   ├── nativeReminders.test.ts
│   │   ├── nativeReminders.ts
│   │   ├── platform.ts
│   │   ├── prefs.test.ts
│   │   ├── prefs.ts
│   │   ├── push.test.ts
│   │   ├── push.ts
│   │   ├── pwa.test.ts
│   │   ├── pwa.ts
│   │   ├── reminders.test.ts
│   │   ├── reminders.ts
│   │   ├── tts.test.ts
│   │   └── tts.ts
│   ├── store/                                    # UseLingo — the app's central state/context provider
│   │   ├── useCloudSync.test.tsx
│   │   ├── useCloudSync.ts
│   │   ├── useLingo.test.tsx
│   │   └── useLingo.tsx
│   ├── utils/                                    # Pure logic: spaced-repetition (SRS), scoring, cycles, missions, backup/restore
│   │   ├── aiSchemas.test.ts
│   │   ├── aiSchemas.ts
│   │   ├── androidApk.test.ts
│   │   ├── androidApk.ts
│   │   ├── backup.test.ts
│   │   ├── backup.ts
│   │   ├── cloudMerge.test.ts
│   │   ├── cloudMerge.ts
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
│   │   ├── pendingSync.test.ts
│   │   ├── pendingSync.ts
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
│   ├── modeldispatcher.config.ts
│   ├── test-setup.ts
│   └── types.ts
├── .ai                                           # Ogen-ai submodule — the shared source of rules, skills and the ai-sync…
├── .env.example
├── .gitignore
├── .gitleaksignore
├── .gitmodules
├── AGENTS.md                                     # The compiled coding rules every AI assistant reads — generated, do not…
├── CLAUDE.md                                     # Claude Code's copy of AGENTS.md (generated)
├── GEMINI.md                                     # Gemini CLI's copy of AGENTS.md (generated)
├── LICENSE
├── README.md                                     # High5 ✋
├── SECURITY.md                                   # Security Policy
├── ai-config.toml                                # Which rule fragments and target tools ai-sync compiles for this repo
├── capacitor.config.json                         # Capacitor app id, name and web build folder for the Android app
├── eslint.config.js
├── firestore.rules
├── index.html
├── package-lock.json
├── package.json
├── playwright.config.ts
├── stitch-prompt.md                              # Google Stitch Prompt
├── tsconfig.api.json                             # Strict type-check for api/ (Node), run by `npm run typecheck`
├── tsconfig.json
├── vercel.json
├── vite-env.d.ts
└── vite.config.ts
```
<!-- END GENERATED TREE -->
