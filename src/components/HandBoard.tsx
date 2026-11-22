import { useLingo } from "../store/useLingo";
import { isOperationDone, OPERATIONS, type Operation } from "../data/operations";
import { isReviewDay, WEEK_WORD_COUNT } from "../utils/cycle";
import { DAILY_WORD_TARGET } from "../utils/missions";
import type { Screen } from "../types";

// The hub's centerpiece: a hand whose five fingers are the five daily
// operations (see / listen / talk / read / understand) and whose palm is the
// day's five words. Fingertips fill in as operations complete, so the whole
// day's progress reads at a glance. Thumb is the first operation, which sits
// on the right in the RTL layout.

const RING_RADIUS = 38;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function Finger({ op, done, onOpen }: { op: Operation; done: boolean; onOpen: () => void }) {
  return (
    <button
      className={`finger finger-${op.id}${done ? " finger-done" : ""}`}
      onClick={onOpen}
      aria-label={`${op.title}${done ? " — הושלם" : ""}`}
    >
      <span className="fingertip" aria-hidden="true">
        {done ? "✓" : op.emoji}
      </span>
      <span className="finger-label">{op.title}</span>
    </button>
  );
}

function Palm({
  reviewDay,
  done,
  wordCount,
  onOpen,
}: {
  reviewDay: boolean;
  done: boolean;
  wordCount: number;
  onOpen: () => void;
}) {
  const target = reviewDay ? 1 : DAILY_WORD_TARGET;
  const shown = done ? target : reviewDay ? 0 : Math.min(wordCount, DAILY_WORD_TARGET);
  const offset = RING_CIRCUMFERENCE * (1 - shown / target);
  const label = reviewDay
    ? `שינון ${WEEK_WORD_COUNT} מילות השבוע${done ? " — הושלם" : ""}`
    : `${shown} מתוך ${DAILY_WORD_TARGET} מילים חדשות`;

  return (
    <button className={`palm${done ? " palm-done" : ""}`} onClick={onOpen} aria-label={label}>
      <svg className="palm-ring" viewBox="0 0 100 100" aria-hidden="true">
        <circle className="palm-ring-track" cx="50" cy="50" r={RING_RADIUS} />
        <circle
          className="palm-ring-fill"
          cx="50"
          cy="50"
          r={RING_RADIUS}
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="palm-center" aria-hidden="true">
        {reviewDay ? (
          <span className="palm-emoji">{done ? "✓" : "🧩"}</span>
        ) : (
          <>
            <span className="palm-count">{shown}/{DAILY_WORD_TARGET}</span>
            <span className="palm-sub">מילים</span>
          </>
        )}
      </span>
    </button>
  );
}

export default function HandBoard({ go }: { go: (s: Screen) => void }) {
  const { dailyMissions, todayWordCount } = useLingo();
  const reviewDay = isReviewDay();

  const states = OPERATIONS.map((op) => ({ op, done: isOperationDone(op, dailyMissions) }));
  const doneCount = states.filter((s) => s.done).length;
  const next = states.find((s) => !s.done);
  const wordsDone = reviewDay ? dailyMissions.memorization : dailyMissions.words;
  const allDone = doneCount === OPERATIONS.length && wordsDone;

  return (
    <section className="hand-board" aria-label="חמש ביום">
      <p className="hand-progress" role="status">
        {allDone ? "🙌 High five! סיימתם את היום" : `${doneCount} מתוך ${OPERATIONS.length} פעולות`}
      </p>
      <div className={`hand${allDone ? " hand-celebrate" : ""}`}>
        <div className="fingers">
          {states.map(({ op, done }) => (
            <Finger key={op.id} op={op} done={done} onOpen={() => go(op.screen)} />
          ))}
        </div>
        <Palm
          reviewDay={reviewDay}
          done={wordsDone}
          wordCount={todayWordCount}
          onOpen={() => go(reviewDay ? "memorize" : "vocabulary")}
        />
      </div>
      <button className="btn accent hand-next" onClick={() => go(next ? next.op.screen : "missions")}>
        {next ? `הבא: ${next.op.title} ←` : "לכל המשימות של היום ←"}
      </button>
    </section>
  );
}
