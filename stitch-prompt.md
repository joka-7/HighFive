# Google Stitch Prompt — High5 App Redesign

Copy the block below into Google Stitch.

---

Design a modern, polished mobile app UI for **"High5"** — a Hebrew-language (RTL),
mobile-first English-learning app for Israeli users, similar in spirit to
Duolingo but focused on *real* language use (reading, listening, speaking, and
spaced-repetition vocabulary review), not just tap-the-answer drills.

**Platform & layout:** Single-column mobile app, max content width ~520px,
right-to-left (RTL) Hebrew UI text with embedded English learning content.
Bottom tab bar with 5 items (Home, Daily Lesson, Vocabulary, Progress,
Settings), each with an emoji icon above a Hebrew label. A sticky top bar
shows the app brand/back button on the right, and on the left a row of small
pill-shaped stat chips: points (✨), streak in days (🔥), and current CEFR
level (e.g. B1).

**Current visual style (to evolve, not discard):** Soft purple (#6c5ce7) as
primary brand color, mint/teal (#00b894) as accent, warm yellow (#fdcb6e) as
secondary accent, off-white/lavender page background (#f4f3ff) with a subtle
diagonal gradient toward mint. Cards are white, fully rounded (~18px radius),
with soft purple-tinted shadows. Friendly, slightly playful tone — generous
use of emoji as iconography instead of a custom icon set. Typography is
system-default sans-serif with Hebrew web fonts (Heebo/Assistant) for
Hebrew text.

**Screens to design:**

1. **Dashboard / Home** — A welcoming gradient header card greeting the user
   by name with their level, points, and streak. Below it, a responsive grid
   of ~10 tappable menu tiles (2 columns), each with an emoji, a Hebrew title,
   and a short Hebrew subtitle, for: Daily Lesson, Vocabulary Flashcards,
   AI Dialogue Coach, Practice Quiz, Spaced-Repetition Review (with a small
   red badge showing due-count), Reading Lab, Listening Practice, Speaking
   Practice, Saved Words, and Progress stats.

2. **Daily Lesson** — A guided lesson screen mixing new vocabulary cards with
   a short quiz at the end; should feel like a single linear "today's lesson"
   flow with a progress indicator at the top.

3. **Vocabulary Flashcards** — Flip-card UI: front shows the English word +
   part of speech, back reveals the Hebrew translation, definition, and an
   example sentence; a speaker icon to hear the word pronounced aloud, and a
   star icon to save the word for spaced-repetition review.

4. **Spaced-Repetition Review** — A clean, low-distraction flip-card review
   queue (Leitner-style) showing one due word at a time, with two large
   buttons at the bottom: "ידעתי" (knew it) and "לא ידעתי" (didn't know it),
   and an empty-state illustration/message for when nothing is due ("חזרו
   מחר!").

5. **Reading Lab** — A real short English passage (with a Hebrew subtitle)
   rendered as readable body text, a "🔊 הקראה" (read aloud) button above it,
   tappable glossary word-chips below the passage that pop a small
   translation tooltip and a save-to-review star, followed by a multiple-
   choice comprehension quiz reusing the app's quiz component.

6. **Listening Practice** — An audio-first screen: large Play/Replay buttons,
   a "האטה" (slow speed) toggle, the transcript hidden behind a "הצג טקסט"
   reveal button (only available after answering comprehension questions),
   then the same MCQ quiz pattern as Reading.

7. **Speaking Practice** — Shows a target English sentence plus its Hebrew
   translation, a "🔊 השמע" button to hear it, and a prominent microphone
   button to record the user's attempt; after recording, shows a score and
   highlights any missed/mismatched words, with graceful "not supported in
   this browser" messaging for Safari/iOS.

8. **Progress** — Stats dashboard: points/streak history, words mastered via
   spaced repetition, quizzes completed, and sessions per skill (reading,
   listening, speaking), shown as a mix of stat cards and simple bar/line
   charts in the app's purple/mint palette.

9. **Settings** — Simple form-style screen: CEFR level selector, AI provider
   API key input (with a note that the app fully works offline without a
   key), and a daily reminder/notification toggle.

**Design goals for the refresh:** Keep the friendly, encouraging, gamified
feel (streaks, points, badges) but elevate the visual polish: more refined
spacing and elevation/shadow system, a slightly richer color system (keep
purple as primary but consider a deeper accent palette for variety across
the 4 new "real use" skill tiles — reading, listening, speaking, review — so
they feel like a distinct family within the dashboard grid), smooth
micro-interactions (card flips, button presses, progress fills), and clear
visual hierarchy so Hebrew RTL text and embedded English content never
compete for attention. Optimize for one-handed mobile use, large tap targets,
and accessibility (sufficient contrast, legible Hebrew typography at small
sizes).

---

### How to use this in Stitch
1. Paste the whole prompt above as your first message.
2. Generate screens **one at a time** (Dashboard first) — Stitch quality is
   much better focused on a single screen than all 9 at once.
3. Once you like a screen's visual language (colors, card style, type), tell
   Stitch to "match this style" for the next screen so they stay consistent.
4. Export the CSS variables / Tailwind tokens Stitch gives you and compare
   them against `src/index.css` (`:root` variables) — that's the fastest way
   to bring the new look into the real app without a full rewrite.
