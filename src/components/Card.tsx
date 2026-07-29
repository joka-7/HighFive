import type { ReactNode } from "react";

// `.card` (index.css) is the app's one content container, but it used to be
// hand-built as `<div className="card">` in every screen, and the mission
// variant lived privately inside DailyMissions. Both live here now, so the
// missions board, the words box and the hub share one implementation.

export function Card({
  children,
  className = "",
  done = false,
}: {
  children: ReactNode;
  className?: string;
  /** Dims/checks the card once its activity is finished for the day. */
  done?: boolean;
}) {
  const extra = `${done ? " mission-card-done" : ""}${className ? ` ${className}` : ""}`;
  return <div className={`card${extra}`}>{children}</div>;
}

export function DoneBadge({ done, points = 30 }: { done: boolean; points?: number }) {
  return done ? <span className="tag ok">✓ הושלם (+{points})</span> : null;
}

export function MissionDoneBar({ note, points = 30 }: { note?: string; points?: number }) {
  return (
    <div className="mission-done" role="status">
      <span className="mission-done-check">✓</span>
      {/* dir="auto" so an English title ("6 Minute English") isn't reordered
          by the surrounding right-to-left layout. */}
      <span dir="auto">{note ? note : "בוצע"}</span>
      <span className="mission-done-points">+{points} נק׳</span>
    </div>
  );
}

/**
 * A card for one thing the learner does today: the five operations and the
 * words box are all built from this. `extra` renders above the call to action
 * (an embedded video, a progress bar) and survives completion; `children` is
 * the call to action itself, replaced by the done bar once finished.
 */
export function MissionCard({
  emoji,
  title,
  sub,
  done,
  note,
  className,
  children,
  extra,
}: {
  emoji: string;
  title: string;
  sub: string;
  done: boolean;
  note?: string;
  className?: string;
  children?: ReactNode;
  extra?: ReactNode;
}) {
  return (
    <Card done={done} className={className}>
      <div className="row-between">
        <span className="emoji-lg">{emoji}</span>
        <DoneBadge done={done} />
      </div>
      <h3 className="mission-title">{title}</h3>
      <p className="muted mt-0">{sub}</p>
      {extra}
      {done ? <MissionDoneBar note={note} /> : children}
    </Card>
  );
}
