import { useState, type ReactNode } from "react";
import { DAILY_WORD_TARGET, useLingo } from "../store/useLingo";
import { videoForToday, youtubeEmbedUrl } from "../data/videos";
import { isOperationDone, OPERATIONS, type Operation } from "../data/operations";
import { dayIndex } from "../utils/daily";
import { cycleDay, CYCLE_DAYS, CYCLE_WORD_COUNT, isMemorizationDay } from "../utils/cycle";
import type { DailyMissionFlag, Screen } from "../types";

// The daily board: five operations (see / listen / talk / read / understand)
// plus the day's words — or, on the fifth day of the cycle, memorization
// instead of new words. Every operation can be finished inside High5 or in
// another app; the external path asks what the learner watched/listened to/
// read so the day's log keeps a real title.

function DoneBadge({ done }: { done: boolean }) {
  return done ? <span className="tag ok">✓ הושלם (+30)</span> : null;
}

function MissionDoneBar({ note }: { note?: string }) {
  return (
    <div className="mission-done" role="status">
      <span className="mission-done-check">✓</span>
      {/* dir="auto" so an English title ("6 Minute English") isn't reordered
          by the surrounding right-to-left layout. */}
      <span dir="auto">{note ? note : "בוצע"}</span>
      <span className="mission-done-points">+30 נק׳</span>
    </div>
  );
}

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

function MissionCard({
  emoji,
  title,
  sub,
  done,
  note,
  children,
  extra,
}: {
  emoji: string;
  title: string;
  sub: string;
  done: boolean;
  note?: string;
  children?: ReactNode;
  extra?: ReactNode;
}) {
  return (
    <div className={`card${done ? " mission-card-done" : ""}`}>
      <div className="row-between">
        <span className="emoji-lg">{emoji}</span>
        <DoneBadge done={done} />
      </div>
      <h3 className="mission-title">{title}</h3>
      <p className="muted mt-0">
        {sub}
      </p>
      {extra}
      {done ? <MissionDoneBar note={note} /> : children}
    </div>
  );
}

function OperationCard({
  op,
  done,
  note,
  go,
  onComplete,
  extra,
}: {
  op: Operation;
  done: boolean;
  note?: string;
  go: (s: Screen) => void;
  onComplete: (note: string) => void;
  extra?: ReactNode;
}) {
  const altScreen = op.altScreen;
  return (
    <MissionCard emoji={op.emoji} title={op.title} sub={op.sub} done={done} note={note} extra={extra}>
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

export default function DailyMissions({ go }: { go: (s: Screen) => void }) {
  const { dailyMissions, todayWordCount, completeMission, progress } = useLingo();
  const level = progress?.currentLevel ?? "A1";
  const today = dayIndex();
  const memorizationDay = isMemorizationDay(today);
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

  const lastDone = memorizationDay ? flags.memorization : flags.words;
  const doneCount =
    OPERATIONS.filter((op) => isOperationDone(op, flags)).length + (lastDone ? 1 : 0);
  const total = OPERATIONS.length + 1;
  const allDone = doneCount === total;
  const wordsProgress = Math.min(todayWordCount, DAILY_WORD_TARGET);

  return (
    <div>
      <div className="card center hero-card">
        <h2 className="m-0">🎯 חמש ביום</h2>
        <p className="mt-tight">
          {doneCount}/{total} הושלמו · יום {cycleDay(today)} מתוך {CYCLE_DAYS} במחזור
        </p>
      </div>

      {memorizationDay && (
        <div className="banner">
          🧩 היום יום שינון — אין מילים חדשות, רק חוזרים על {CYCLE_WORD_COUNT} מילות המחזור.
        </div>
      )}

      {allDone && (
        <div className="banner success">🎉 כל הכבוד! השלמתם את כל המשימות של היום.</div>
      )}

      {OPERATIONS.map((op) => (
        <OperationCard
          key={op.id}
          op={op}
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

      {memorizationDay ? (
        <MissionCard
          emoji="🧩"
          title="שננו את מילות המחזור"
          sub={`חזרו על ${CYCLE_WORD_COUNT} המילים של ארבעת הימים האחרונים וענו על מבחן השינון.`}
          done={flags.memorization}
          note={notes.memorization}
        >
          <button className="btn accent mt-2_5" onClick={() => go("memorize")}>
            לשינון ←
          </button>
        </MissionCard>
      ) : (
        <MissionCard
          emoji="🃏"
          title={`למדו ${DAILY_WORD_TARGET} מילים חדשות`}
          sub={`שמרו ${DAILY_WORD_TARGET} מילים חדשות — המשימה מסתיימת אוטומטית.`}
          done={flags.words}
          note={notes.words}
          extra={
            <>
              <div className="mission-progress">
                <div
                  className="progress-fill"
                  style={{ width: `${(wordsProgress / DAILY_WORD_TARGET) * 100}%` }}
                />
              </div>
              <span className="muted">
                {wordsProgress}/{DAILY_WORD_TARGET} מילים
              </span>
            </>
          }
        >
          <button className="btn accent mt-2_5" onClick={() => go("vocabulary")}>
            עברו לאוצר מילים ←
          </button>
        </MissionCard>
      )}
    </div>
  );
}
