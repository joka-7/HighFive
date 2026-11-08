# Low-Level Design

Module-level detail to accompany `docs/HLD.md`.

## `src/main.tsx`

Application entry point. Applies the saved theme *before* first paint
(`applyTheme(loadPrefs().theme)`), then mounts `<App>` inside `<LingoProvider>`
wrapped by `<ErrorBoundary>` within `<StrictMode>`.

## `src/App.tsx`

Shell + **hash routing** (`utils/routing.ts`):

- Active `Screen` is derived from `location.hash` (`#/missions`, `#/settings`,
  …); `go(screen)` writes the hash so refresh/share/back work.
- **Onboarding gate:** while `progress` is `null`, renders `<Onboarding>`.
- **Top bar:** brand / back-to-home, points / streak / level chips (ARIA-labelled).
- **Bottom nav:** `dashboard`, `missions`, `vocabulary`, `calendar`, `settings`
  with `aria-current="page"` — the app's top-level areas, deliberately not a
  copy of the hub's tiles. `lesson` isn't here: it is one of the five operations
  and has a hub tile, so a third entry point would only be noise.
- Offline banner when `navigator.onLine` is false; SW update banner when a new
  worker is waiting.
- Focus moves into `<main>` on screen change.

## `src/types.ts`

Domain model for CEFR content and persisted learner state:

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

React Context + `localStorage` (+ optional Google Drive sync through
`useCloudSync`), replacing the Room database. Exposes the `useLingo()` hook, which throws if used outside
`<LingoProvider>` (mounted once in `main.tsx`).

- **localStorage keys:** `high5.progress`, `high5.saved_words`,
  `high5.chat_messages`, `high5.quiz_history`, `high5.mission_log`,
  `high5.daily_missions`, `high5.learned_words`. Drive sync adds
  `high5.drive_session_v1`, `high5.drive_device_v1`,
  `high5.pending_sync_v1:<collection>` and `high5.data_owner_v1`.
- Each persisted slice is a `useState` initialised via
  `load<T>(key, fallback)` and written back on every change via a matching
  `useEffect` calling `persist(key, value)` (this is also the offline cache in
  Account mode). `persist` swallows a full quota and reports it once per key,
  so storage pressure never crashes the app; in-memory state stays correct.
- **Bounded history:** chat 200 messages, mission log 400, quiz history 1000.
- **Pure awards:** points are never granted from inside another state
  updater (StrictMode runs updaters twice). `dailyMissions` is read through
  `missionsRef`, which every write updates synchronously, so two missions
  awarded in the same tick both land.
- **Streak logic** runs on mount and whenever the tab becomes visible: same
  calendar day → unchanged; the previous calendar day (`previousDateKey`, which
  steps the calendar rather than subtracting 24h, so DST days are safe) →
  `streak + 1`; any larger gap → reset to `1`.
- **Points:**
  - `+10` — save a new word (`toggleSaveWord`).
  - `+5` — remembered a word in review (`reviewWord` with `remembered = true`).
  - `+50` once/day + `20`/correct — daily lesson (`completeLesson`).
  - `25`/correct first time per topic/day (reduced on repeats) — `completeQuiz`
    (practice quiz, Reading, Listening).
  - `+15` — each user dialogue turn.
  - Speaking: up to `+20` scaled by accuracy for the first round of the day,
    then reduced (`awardSpeakingPoints`).
  - `+30` once/day per daily-mission checklist item (`awardMission`).
  - `+100` on CEFR auto-promotion.
- **Spaced-repetition (Leitner):** `toggleSaveWord` inserts new words at box 0
  with `nextReviewAt = now` (immediately due). `dueWords()` returns non-mastered
  words whose review time has arrived. `reviewWord(id, remembered)` calls
  `scheduleNext` (from `utils/srs`) to advance/reset the box + next-review time,
  increments `reviewCount`, and auto-masters at the top box.
- **Drive sync:** delegated to `useCloudSync` (below). The store hands it the
  synced slices (`SyncedState`), a setter to apply a merged state, and
  `resetAll` for sign-out. `cloudConfigured` / `user` / `authReady` /
  `cloudSyncError` / `retryCloudSync` / `signIn` / `signOut` /
  `deleteCloudData` pass through to the UI.
- `resetAll()` clears all four learning slices; used by the Settings "danger
  zone".
- **Full API** (`LingoContextValue`): `progress`, `savedWords`, `chatMessages`,
  `quizHistory`, `cloudConfigured`, `user`, `authReady`, `signIn`, `signOut`,
  `registerUser`, `updateLevel`, `addPoints`, `isWordSaved`, `toggleSaveWord`,
  `toggleMastered`, `dueWords`, `reviewWord`, `completeLesson`, `completeQuiz`,
  `addChatMessage`, `clearChat`, `resetAll`.

## `src/services/ai.ts`

A thin wrapper over [`@joka-7/modeldispatcher-browser-agent`](https://github.com/joka-7/ModelDispatcher/tree/main/clients/browser-agent),
the shared browser-native AI core extracted from this file (and
JobFlowTracker/KanDOne/StepByLearn, which had each independently built the
same per-provider REST plumbing). This module exists only to keep every
existing call site (`Settings.tsx`, `content.ts`, `QuizRunner.tsx`,
`Dashboard.tsx`, `DialogueCoach.tsx`) and its own name/signature unchanged —
no other file needed to change for the migration. The actual per-provider
request/response handling (Gemini's `:generateContent`, Anthropic's
`anthropic-dangerous-direct-browser-access` header, Ollama's URL validation,
OpenAI/Groq's shared OpenAI-compatible shape) now lives in the shared package,
not here.

- `ProviderId = "gemini" | "groq" | "ollama" | "anthropic" | "openai"` and
  `PROVIDERS: Record<ProviderId, ProviderInfo>` are re-exported from the
  shared package as-is.
- **localStorage keys:** `aiProvider`, `aiApiKey`, `aiModel`, `ollamaUrl` —
  unchanged, via the shared package's default `ConfigKeys`.
- `loadAIConfig()` / `saveAIConfig(partial)` / `clearAIConfig()` — thin
  pass-throughs to the shared package's `loadConfig`/`saveConfig`/`clearConfig`.
- `isAIReady()` — the shared package's `isConfigReady(loadConfig())`.
- `complete(prompt, systemInstruction?, signal?)` — calls the shared package's
  `complete(cfg, prompt, { systemInstruction, jsonMode: true, signal })`.
  `jsonMode: true` is always requested, matching this file's previous
  per-provider behaviour (every screen here needs structured JSON back,
  unlike JobFlowTracker's streaming chat) — the shared package supports both
  streaming and non-streaming, this wrapper only ever calls the latter.
  `signal` optionally cancels the request independent of the shared package's
  own request timeout, which always applies regardless.

## `src/services/content.ts`

Seven generator functions, one per feature. Each (except dialogue) follows the
same offline-fallback shape:

```
if (!isAIReady()) return <random offline pick>;
try {
  return asT(parseJson(await complete(prompt, systemInstruction)));  // utils/aiSchemas
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

1. **Curated** (`loadCuratedReadings | loadCuratedListenings |
   loadCuratedSpeakings` in `data/extras.ts`) — hand-written passages/clips/
   sentence sets, one small file per level (not quartered). `findVocabSafeItem`
   returns one only if its unknown-word count is within
   `CURATED_TOLERANCE[level][skill]`, and `null` otherwise.
2. **Progressive** (`loadReadings | loadListenings | loadSpeakings`) — the
   day-aligned item generated from today's five words, which is always safe.
   These pools are quarter-split (see the `offline.ts`/`extras.ts` section
   below), so the loader resolves `day` to a quarter file plus a
   quarter-local index before `pickVocabSafeItem` walks from there and, in
   the worst case, returns the item with the fewest unknown words.

The tolerance widens with the CEFR level: a curated item is written *for* its
level, and the tracked bank (a few hundred content words) is a fair model of an
A1 learner but a large undercount by C1. Three things decide what counts as
"unknown" — `starterWords` (function words plus the high-frequency English no
bank teaches), `levelVocabulary(level)` (every bank word at or below the
learner's level), and `isKnownToken`'s morphology, which maps `streets` back to
`street`. Prompts and
system instructions are copied verbatim from `LingoRepository.kt` to preserve
content/scoring parity with the Android app.

## `src/store/useCloudSync.ts`

When to pull and push; the rules are in `utils/cloudMerge.ts`.

- Subscribes to `driveSync.onAuthChange`. When a user is reported and this
  session hasn't pulled for that uid, it calls `pull(uid)`:
  - `loadMerged()`;
  - `mergePull` with the pending ids, and `discardLocal` when
    `readDataOwner()` names another account;
  - apply the merged state, `writeDataOwner(uid)`, then record and send
    whatever Drive lacks.
- **Every state change** is diffed against the last snapshot
  (`diffForUpload`). While `driveSync.isLinked()`, the changed ids are recorded
  as pending. They are sent only once this session has pulled for the
  connected user.
- **Failures:** `signed-out` and `offline` failures are expected; the change
  stays pending and the next pull replays it. Anything else is reported and
  sets `cloudSyncError`.
- **`signOut`:** `driveSync.signOut()`, then `clearLocalSyncState`, then
  `resetLocal()`. Unlinking first means clearing the device records no
  deletes.
- **`deleteCloudData`:** `driveSync.deleteAllSyncedData()`, then
  `clearLocalSyncState`. Local progress stays and belongs to no account.
- **Known limit:** tabs on one device share the pending ledger and the device
  file, so a stale tab's pull can win over another tab's unsent edit.

## `src/utils/cloudMerge.ts`

- **Collections** (records by `id`): `savedWords`, `quizHistory`,
  `missionLog`, `chatMessages`, and `learnedWords` (its `id` is the lower-cased
  word).
- **Profile fields:** `progress`, `dailyMissions`.
- `diffForUpload(previous, state)` returns `{ snapshot, upload }`. A removal
  from a capped history (`HISTORY_CAPS`) counts as a cap trim, never a delete,
  when it comes with at least as many additions on a list at its cap.
- `mergePull({ local, cloud, pending, discardLocal, defaults })` is
  KanDOne's `unionById` per collection:
  - Drive wins a shared id unless the id has a pending local edit.
  - Pending local deletes are replayed.
  - Local-only records are pushed, unless Drive holds a newer delete for them.
- After merging, `mergePull` also:
  - dedupes `savedWords` by lower-cased word (the newest copy wins, the others
    are deleted);
  - re-applies the caps, newest first (chat is ordered oldest first);
  - drops records from Drive that fail a shape check.
- **Profile fields:** Drive's copy wins unless the field is pending locally or
  missing in Drive.

## `src/services/driveSync.ts`

A TypeScript port of KanDOne's `driveSync.js`; its comments carry the reasons
for each guard. `createDriveSync(deps)` takes every dependency injected
(fetch, GIS loader, storage, clock, ids, locks, sleep, random, online check,
`nativeAuth`, `onLanded`). It returns:

- **Session:** `isCloudConfigured`, `hasRestorableSession`, `isLinked`,
  `onAuthChange`, `signInWithGoogle`, `signOut`, `deleteAllSyncedData`.
- **Data:** `loadMerged`, `saveProfile`, `upsertItems`, `deleteItems`.

The document format is
`{ version: 1, device, profile: { [field]: { value, at } }, collections: { [name]: { [id]: { item | null, at } } } }`.
`services/cloud.ts` is the composition root: real `fetch`,
`VITE_GOOGLE_CLIENT_ID`, `onLanded` → `clearPendingIds`, and in the Android
app (`isNativeApp()`) `nativeAuth` from `nativeGoogleAuth.ts`.

## `src/services/nativeGoogleAuth.ts`

`createNativeGoogleAuth({ webClientId, fetchImpl, loadPlugin })` wraps
`@capgo/capacitor-social-login` behind a small `SocialLoginPort` (loaded
lazily, initialised once with `{ google: { webClientId, mode: "online" } }`,
retried if init fails). Ported from KanDOne.

| Call | Does |
|---|---|
| `requestToken({ interactive: true })` | `login` with `drive.appdata`, `email`, `profile` |
| `requestToken({ interactive: false })` | `refresh`, then `getAuthorizationCode`; no UI for a grant already given |
| `signOut()` | `logout` |

Both token paths ask Google's `tokeninfo` for the real remaining lifetime (the
plugin reports none, and may hand back a cached token part-way through its
hour). They resolve `{ access_token, expires_in }`, or `null` when there is no
usable token; a failed check (not a 400) rejects instead of reading as denied.

## `src/services/firebase.ts`

Firebase web config for FCM only. `isPushConfigured()` is `true` when the
config FCM needs and `VITE_FIREBASE_VAPID_KEY` are set; it is a public client
identifier, not a secret.

## `src/services/push.ts`

- `enablePushReminders()`:
  - registers `firebase-messaging-sw.js` at `MESSAGING_SW_SCOPE`;
  - gets an FCM token;
  - `POST /api/reminder-register` with `{ pushToken, timezone }`;
  - stores `{ installId, writeKey }` under `high5.reminder_install`.
- `reportReminderDay({ seenDate?, doneDate? })` sends only what changed since
  the last report (plus the timezone when it moved). Reports run one at a
  time, so two at once can't overwrite each other's record of what was sent.
  A 404 forgets the registration.
- `disablePushReminders()`: `DELETE /api/reminder`.
- `hooks/useReminderReports.ts` reports `seenDate` on load and on tab return,
  and `doneDate` once `dayComplete(dailyMissions)`. A failure while offline is
  ignored; the next open reports again.

## `api/` (Vercel functions)

- `_lib/reminderApi.ts` is pure, with an injected `ReminderStore` and FCM
  check:
  - `register` → 201 `{ installId, writeKey }` (only the key's SHA-256 is
    stored);
  - `update` → 204, after checking the hashed key in constant time;
  - `unregister` → 204.
  - Bad input → 400; wrong key → 403; unknown install → 404.
- `_lib/http.ts`: method routing, `application/json` required (415
  otherwise), and a bare 500 that never logs the body.
- `reminder-register.ts` / `reminder.ts` build their deps inside that guard,
  so a missing `FIREBASE_SERVICE_ACCOUNT` answers the same 500.
- `mission-reminder.ts`: `CRON_SECRET` bearer, pages of 500 by document id,
  `shouldSendReminder` (18:00 local, and neither `doneDate` nor `seenDate` is
  today), `sendEach`, and dead tokens remove their install.

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

## `src/services/reminders.ts` / `src/services/nativeReminders.ts`

- **Browser:** `maybeNotifyIncompleteMissions` shows a `Notification` while the
  tab is open, past `prefs.reminderHour`, once a day, if missions are left.
- **Android:** the WebView has no `Notification`, so `notificationsSupported()`
  is true and `requestReminderPermission()` asks the OS. `syncNativeReminders(
  dailyMissions)` passes `{ enabled, hour, todayDone, now }` to
  `nativeReminders.reschedule`. `hooks/useLocalReminder.ts` calls it on open,
  on tab return and when missions change; Settings calls it when the reminder
  setting changes.
- `reschedule` cancels ids 5100–5106, then (when enabled and permitted)
  schedules `reminderTimes(plan)`: the next seven days at `hour`, built from
  calendar fields so DST keeps the local hour, skipping today once it is done
  or past. Calls are serialised. Notifications are inexact
  (`isExactNotification: false`), and the manifest removes
  `SCHEDULE_EXACT_ALARM`.

## `src/services/tts.ts` / `src/services/asr.ts`

Web Speech API wrappers, both feature-detected and safe to no-op where
unsupported. In the Android app, whose WebView has neither API, they use
`@capacitor-community/text-to-speech` and `@capacitor-community/speech-recognition`
behind the same functions (a native TTS failure goes to `reportError`; ASR
rejects when no recognizer is installed or the microphone is refused):

- `tts.speak(text, lang="en-US", rate?)` — cancels any in-flight utterance and
  speaks; uses the saved speech-speed preference when no explicit `rate` given.
  `ttsSupported()` gates UI.
- `asr.recognizeOnce(lang="en-US")` — resolves once with the recognised
  transcript (rejects on error / when unsupported). `asrSupported()` gates the
  "speak" button so browsers without recognition still show the sentence + model
  audio.

## `src/services/pwa.ts`

- `useServiceWorkerUpdate()` registers the Workbox worker, except in the
  Android app, whose files ship inside the APK.
- `usePwaInstall()` — React hook that stashes the `beforeinstallprompt` event and
  exposes `{ canInstall, installed, install() }` to trigger the native install
  flow on demand.
- `canShare()` / `shareApp()` — Web Share API helpers (used from Settings /
  Dashboard), degrading gracefully where unsupported (e.g. iOS install is via
  the Share menu).

## `src/utils/json.ts`

- `cleanJson(raw)` — strips ```` ```json ```` / ```` ``` ```` fences that some
  providers wrap responses in, then trims. Mirrors `LingoRepository.cleanJson`.
- `parseJson(raw)` — `JSON.parse(cleanJson(raw))`, returned as `unknown`.

## `src/utils/aiSchemas.ts`

Runtime shape guards for AI responses — `asWordList`, `asLesson`, `asQuiz`,
`asDialogueReply`, `asSpeaking`, `asQuestionTranslation(v, optionCount)`.
Each throws `AiResponseShapeError` on a missing or mistyped field, an
out-of-range `correctIndex`, or (for translations) a changed option count.
A malformed *optional* field (`questionHe`, `optionsHe`) is dropped, not
fatal. The lesson, quiz, vocabulary and speaking generators fall back to
offline content on a throw; dialogue replies and question translations have
no offline copy, so their screens show an error.

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

## `src/utils/cycle.ts`

The weekly word rhythm, pure and clock-injectable (`now = Date.now()`) so tests
can pin a weekday:

- `WORDS_PER_DAY = 5`, `LEARNING_DAYS = 5` (Sun–Thu), `WEEK_WORD_COUNT = 25`.
- `weekday(now)` — local `0..6`, Sunday-first. `isReviewDay(now)` — Friday or
  Saturday. `learningDayNumber(now)` — `1..5`, or `null` on a review day.
- `weekStart(now)` / `weekLearningDays(now)` — the week's Sunday as a **day
  index**, and the five learning-day indices, so they feed straight into
  `getTodaysWords(level, day)` / `pickByDay`.
- `weekday` is local while `dayIndex` counts UTC epoch days; `weekStart`
  subtracts one from the other, the same local/UTC mix `dateKeyFromTs` already
  lives with. A week boundary can land an hour off far from UTC, which nothing
  here depends on.

## `src/utils/score.ts`

- `normalizeWords(text)` — lowercases, strips punctuation (keeps letters/
  digits/apostrophes) and splits into words.
- `scoreSpeaking(target, spoken)` — order-insensitive percentage of target words
  detected (a duplicate-consuming `Map` so repeated words must be matched in
  kind), plus the list of `missed` words.

## `src/data/offline.ts` + `src/data/extras.ts` + `src/data/offline/*.json`

Bundled content is a full year (365 days) per level, but a learner only ever
needs the ~90 days around today — so the progressive pools are **quarter-split**
(`resolveQuarter(day)` in `utils/daily.ts` maps a day index to a quarter 1-4
plus a quarter-local index) and only the current quarter is downloaded.

- `offline.ts` — `LOADERS: Record<Level, (quarter) => Promise<OfflineLevelContent>>`
  using dynamic `import("./offline/a1.q${quarter}.json")` etc., so each ~600 KB
  quarter chunk is code-split and downloaded on demand; results are memoised
  per `(level, quarter)` in a `Map`. `loadOfflineContent(level, day)` returns
  `{ content, localDay }` — the quarter's bundle plus the day's index within it.
- `extras.ts` — the same quarter-loader pattern for the three "real-use"
  pillars (`loadReadings` / `loadListenings` / `loadSpeakings`, each returning
  `{ items, localDay }`), plus a **second, unquartered** set of loaders for the
  curated pools (`loadCuratedReadings` / `loadCuratedListenings` /
  `loadCuratedSpeakings`) — curated banks are tens of items, not hundreds, so
  quartering them would just add round trips for no payload benefit. See
  `services/content.ts`'s curated-then-progressive selection above.
- `offline/*.json` — generated by `scripts/generate-content.mjs` (`npm run
  content`): `a1.q1.json … c2.q4.json` (`{vocabulary, lessons, quizzes}`, one
  quarter each) plus `*.reading.q{1-4}.json` / `*.listening.q{1-4}.json` /
  `*.speaking.q{1-4}.json` per level (progressive, 365 items/level split across
  4 files) and `*.reading.curated.json` / `*.listening.curated.json` /
  `*.speaking.curated.json` (hand-written, small, one file each). A curated
  reading/listening item is only emitted if it is fully bilingual
  (`textHe`/`transcriptHe` + `questionHe` on every question). There's also a
  single `vocab-index.json` — every bank word at or below each level, used by
  `data/level-vocabulary.ts` to widen the curated-content vocabulary gate.
  These are build
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
  `Card` (`Card` / `MissionCard` / `DoneBadge` / `MissionDoneBar` — the `.card`
  container and the "one thing to do today" composition, shared by the missions
  board and the words box), `Tile` (one hub tile, described by a `TileSpec`),
  `Spinner`.
- **`Onboarding`** — multi-step flow: enter name, then take the 6-question
  placement test or pick a level manually; calls `registerUser`.
- **`Dashboard`** — the hub. Tiles are declared as `DASHBOARD_SECTIONS` and
  rendered in four labelled groups (היום / תרגול / המילים שלי / מעקב) via the
  shared `Tile`. Greeting card with one line pointing at today (→ `missions`);
  "no AI key" banner (→ Settings); PWA install banner; a due-count badge on the
  Review tile from `dueWords()`. It deliberately does *not* repeat
  points/streak/level (the top bar owns those) or the day's words (the words box
  on חמש ביום owns those), and שינון has no tile — it is reached from that box.
- **`DailyMissions`** ("חמש ביום") — the five operations from
  `data/operations.ts`, and *only* those five in the `x/5` count. Above them sits
  the words box: five new words on a learning day, the week's 25-word review on
  Friday/Saturday (`utils/cycle.ts`), tracked by the `words` / `memorization`
  flags respectively. Each operation card offers its in-app path *and* an
  external one: quick links to other apps, a "what did you do?" field, and a
  mark-as-done button that calls `completeMission(flag, note)`.
- **`Memorize`** ("שינון") — loads the words of the current week's learning
  days (`utils/cycle.ts`), shows them as a tap-to-reveal self-test list, then
  runs `buildMemorizationQuiz` (`utils/memorize.ts`) through `QuizRunner` and
  scores it as the `Memorization` quiz topic, which completes the mission.
- **`DailyLesson`** — phases `reading → quiz → done`; fetches today's lesson,
  shows the Hebrew explanation, runs the 3-question quiz, then `completeLesson`.
- **`Vocabulary`** — 5 level-adaptive flashcards with a "new words" refresh;
  save/unsave via `toggleSaveWord`.
- **`DialogueCoach`** — AI roleplay chat over 16 scenarios; requires a key
  (shows a CTA to Settings otherwise); filters chat by scenario+level; shows
  Hebrew corrections; TTS on assistant replies. On a failed reply, offers the
  shared package's `EXTERNAL_CHAT_PROVIDERS` (ChatGPT/Claude/Gemini/Groq) as
  direct links pre-filled with the failed message — a free escape hatch that
  needs no API key.
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
  key), theme toggle, speech speed, a link out to the level switcher on
  ההתקדמות שלי (which owns it, next to the thresholds that explain it),
  PWA install/share, Google Drive connect/disconnect and "delete my data",
  the web-push reminder opt-in/out, and a "reset all" danger zone (`resetAll`
  behind a `confirm()`).

## Android app

`android/` was generated by `npx cap add android` from `capacitor.config.json`
(`io.github.joka7.highfive`, `High5`, `webDir: dist`); the copied web build
under `app/src/main/assets/public` is git-ignored. Changes from the template,
all from KanDOne:

- `MainActivity.java` forwards Google's authorization result to
  `SocialLoginPlugin.handleGoogleLoginIntent`; without it the plugin refuses
  any scope beyond sign-in.
- `app/build.gradle` reads `-PversionCode` / `-PversionName` (CI passes the run
  number), so each APK installs over the last.
- `AndroidManifest.xml`: `allowBackup="false"`, and `SCHEDULE_EXACT_ALARM`
  removed.
- Launcher icons and splash screens come from `public/icon-512.png`
  (`node scripts/gen-android-icons.mjs`).

**Setup (once).** Google only issues tokens to an APK signed with the key whose
SHA-1 is registered on an **Android** OAuth client (package
`io.github.joka7.highfive`) in the same Cloud project as the Web client.

1. Create the key, outside the repo:
   `keytool -genkeypair -v -keystore high5.jks -alias high5 -keyalg RSA -keysize 2048 -validity 10000`.
   Keep the file and password safe: an APK signed with another key can't
   update an installed one.
2. Read its SHA-1 (`keytool -list -v -keystore high5.jks -alias high5`) and
   create the Android OAuth client with it.
3. Repo **Settings → Secrets and variables → Actions**:
   - secrets `ANDROID_KEYSTORE_B64` (`base64 -w0 high5.jks`; split the text
     across `ANDROID_KEYSTORE_B64_2` if a clipboard cuts it at 2000 characters)
     and `ANDROID_KEY_PASSWORD`;
   - variables `VITE_GOOGLE_CLIENT_ID` (the Web client ID; without it the APK
     has Drive sync off) and, optionally, `VITE_SENTRY_DSN`.
4. Optionally protect the secrets further: move them into a GitHub
   environment with required reviewers and add `environment:` to the
   `release` job.

`build` never sees the secrets: it uploads the unsigned APK. Only `release`,
on pushes to `main`, signs it, and it fails without the secrets. Pull requests
therefore get no installable APK; Google sign-in would reject a test key
anyway unless its SHA-1 is registered too.

**Not verified in CI:** native sign-in, reminders, speech and YouTube embeds
need a phone. Android's hardware back button closes the app rather than
stepping back through screens.

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
- **Content audit:** `scripts/content-audit.test.mjs` covers the audit's
  rules with small fixtures; `node scripts/audit-content.mjs --check` (CI's
  "Content audit is current") runs them on the shipped content.
- **E2E** (`e2e/*.spec.ts`) run against a production build via `vite preview`,
  driven by Playwright; CI installs Chromium with `--with-deps` since GitHub's
  runners need the system libraries Playwright doesn't bundle.
