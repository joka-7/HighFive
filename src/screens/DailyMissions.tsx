import { useState, type ReactNode } from "react";
import { DAILY_WORD_TARGET, useLingo } from "../store/useLingo";
import { videoForToday, youtubeEmbedUrl } from "../data/videos";
import { isOperationDone, OPERATIONS, type Operation } from "../data/operations";
import {
  isReviewDay,
  LEARNING_DAYS,
  learningDayNumber,
  WEEK_WORD_COUNT,
} from "../utils/cycle";
import { MissionCard } from "../components/Card";
import type { DailyMissionFlag, Screen } from "../types";

// The daily board: the five operations (see / listen / talk / read /
// understand), each of which can be finished inside High5 or in another app —
// the external path asks what the learner watched/listened to/read so the day's
// log keeps a real title.
//
// The day's vocabulary sits in its own box *above* the five, because it is a
// different kind of thing: what the learner takes in, not one of the five ways
// to use the language. Sunday–Thursday it is five new words; Friday–Saturday it
// turns into recall practice over the week's 25 (see utils/cycle.ts).

/** The "I did it in another app" path: quick links + what-did-you-do + mark. */
function ExternalPanel({
  op,
  onComplete,
}: {
  op: Operation;
  onComplete: (note: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const inputId = `external-${op.id}`;

  if (!open) {
    return (
      <button className="btn ghost small mt-2" onClick={() => setOpen(true)}>
        עשיתי את זה באפליקציה אחרת ↗
      </button>
    );
  }

  return (
    <div className="external-panel">
      {op.links.length > 0 && (
        <div className="external-links">
          {op.links.map((l) => (
            <a
              key={l.url}
              className="external-link"
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
      <label className="external-label" htmlFor={inputId}>
        {op.externalLabel}
      </label>
      <input
        id={inputId}
        className="input"
        value={note}
        placeholder={op.externalPlaceholder}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onComplete(note);
        }}
      />
      <p className="muted mt-tight fs-13">
        אפשר גם לסמן בלי לכתוב — השם רק עוזר לזכור מה עשיתם.
      </p>
      <div className="flex-row mt-2">
        <button className="btn accent" onClick={() => onComplete(note)}>
          סמנו כהושלם ✓
        </button>
        <button className="btn ghost" onClick={() => setOpen(false)}>
          ביטול
        </button>
      </div>
    </div>
  );
}

function OperationCard({
  op,
  number,
  done,
  note,
  go,
  onComplete,
  extra,
}: {
  op: Operation;
  number: number;
  done: boolean;
  note?: string;
  go: (s: Screen) => void;
  onComplete: (note: string) => void;
  extra?: ReactNode;
}) {
  const altScreen = op.altScreen;
  return (
    <MissionCard
      emoji={op.emoji}
      title={op.title}
      number={number}
      sub={op.sub}
      done={done}
      note={note}
      extra={extra}
    >
      <button
        className="btn accent mt-2_5"
        onClick={() => (op.screen === "missions" ? onComplete("") : go(op.screen))}
      >
        {op.cta}
      </button>
      {altScreen && op.altCta && (
        <button className="btn ghost mt-2" onClick={() => go(altScreen)}>
          {op.altCta}
        </button>
      )}
      <ExternalPanel op={op} onComplete={onComplete} />
    </MissionCard>
  );
}

/**
 * The day's vocabulary — its own box, outside the five missions. It still earns
 * points like a mission (the store awards them automatically), it just isn't
 * one of the five operations.
 */
function WordsBox({
  reviewDay,
  wordsDone,
  reviewDone,
  note,
  todayWordCount,
  go,
}: {
  reviewDay: boolean;
  wordsDone: boolean;
  reviewDone: boolean;
  note?: string;
  todayWordCount: number;
  go: (s: Screen) => void;
}) {
  if (reviewDay) {
    return (
      <MissionCard
        emoji="🧩"
        title={`חזרו על ${WEEK_WORD_COUNT} מילות השבוע`}
        sub={`סוף שבוע — בלי מילים חדשות. חזרו על ${WEEK_WORD_COUNT} המילים של ימי הלמידה וענו על מבחן השינון.`}
        done={reviewDone}
        note={note}
        className="words-box"
      >
        <button className="btn accent mt-2_5" onClick={() => go("memorize")}>
          לשינון ←
        </button>
      </MissionCard>
    );
  }

  const progress = Math.min(todayWordCount, DAILY_WORD_TARGET);
  return (
    <MissionCard
      emoji="🃏"
      title={`למדו ${DAILY_WORD_TARGET} מילים חדשות`}
      sub={`שמרו ${DAILY_WORD_TARGET} מילים חדשות — המשימה מסתיימת אוטומטית.`}
      done={wordsDone}
      note={note}
      className="words-box"
      extra={
        <>
          <div className="mission-progress">
            <div
              className="progress-fill"
              style={{ width: `${(progress / DAILY_WORD_TARGET) * 100}%` }}
            />
          </div>
          <span className="muted">
            {progress}/{DAILY_WORD_TARGET} מילים
          </span>
        </>
      }
    >
      <button className="btn accent mt-2_5" onClick={() => go("vocabulary")}>
        עברו לאוצר מילים ←
      </button>
    </MissionCard>
  );
}

export default function DailyMissions({ go }: { go: (s: Screen) => void }) {
  const { dailyMissions, todayWordCount, completeMission, progress } = useLingo();
  const level = progress?.currentLevel ?? "A1";
  const reviewDay = isReviewDay();
  const learningDay = learningDayNumber();
  const todaysVideo = videoForToday(level);

  const flags: Record<DailyMissionFlag, boolean> = {
    video: dailyMissions.video,
    talk: dailyMissions.talk,
    words: dailyMissions.words,
    reading: dailyMissions.reading,
    listening: dailyMissions.listening,
    speaking: dailyMissions.speaking,
    grammar: dailyMissions.grammar,
    memorization: dailyMissions.memorization,
  };
  const notes = dailyMissions.externalNotes ?? {};

  // The five operations are the checklist; the words box tracks itself.
  const doneCount = OPERATIONS.filter((op) => isOperationDone(op, flags)).length;
  const total = OPERATIONS.length;
  const wordsDone = reviewDay ? flags.memorization : flags.words;
  const allDone = doneCount === total && wordsDone;

  return (
    <div>
      <div className="card center hero-card">
        <h2 className="m-0">🎯 חמש ביום</h2>
        <p className="mt-tight">
          {doneCount}/{total} הושלמו ·{" "}
          {reviewDay
            ? `סוף שבוע — חוזרים על ${WEEK_WORD_COUNT} מילות השבוע`
            : `יום ${learningDay} מתוך ${LEARNING_DAYS} · ${DAILY_WORD_TARGET} מילים חדשות`}
        </p>
      </div>

      {allDone && (
        <div className="banner success">🎉 כל הכבוד! השלמתם את כל המשימות של היום.</div>
      )}

      <WordsBox
        reviewDay={reviewDay}
        wordsDone={flags.words}
        reviewDone={flags.memorization}
        note={reviewDay ? notes.memorization : notes.words}
        todayWordCount={todayWordCount}
        go={go}
      />

      <h3 className="section-title">חמש הפעולות</h3>

      {OPERATIONS.map((op, i) => (
        <OperationCard
          key={op.id}
          op={op}
          number={i + 1}
          done={isOperationDone(op, flags)}
          note={notes[op.flag]}
          go={go}
          onComplete={(note) => completeMission(op.flag, note)}
          extra={
            op.id === "see" ? (
              <div className="video-block">
                <p className="video-title">
                  {todaysVideo.titleHe}
                  <span className="muted fw-400">
                    {" "}
                    · {todaysVideo.title}
                  </span>
                </p>
                <div className="video-embed">
                  <iframe
                    title={todaysVideo.title}
                    src={youtubeEmbedUrl(todaysVideo.youtubeId)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            ) : undefined
          }
        />
      ))}
    </div>
  );
}
