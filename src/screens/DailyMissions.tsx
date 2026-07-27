import type { ReactNode } from "react";
import { DAILY_WORD_TARGET, useLingo } from "../store/useLingo";
import { videoForToday, youtubeEmbedUrl } from "../data/videos";
import type { Screen } from "../types";

// Missions the user marks done manually — an external action the app can't
// detect (watching a video, having a conversation somewhere).
interface ManualMission {
  id: "video" | "talk";
  emoji: string;
  title: string;
  sub: string;
}

const MANUAL_MISSIONS: ManualMission[] = [
  {
    id: "video",
    emoji: "🎬",
    title: "צפו בסרטון באנגלית",
    sub: "צפו בסרטון הקצר למטה (מותאם לרמה שלכם), ואז סמנו שהשלמתם.",
  },
  {
    id: "talk",
    emoji: "💬",
    title: "שוחחו עם מאמן ה-AI באנגלית",
    sub: "ניהלתם היום שיחה עם מאמן השיחה באנגלית? סמנו שהשלמתם.",
  },
];

// Missions that auto-complete once their in-app action is done — practiced
// from their own tab, so there's nothing to press here.
interface AutoMission {
  id: "reading" | "listening" | "speaking" | "grammar";
  emoji: string;
  title: string;
  sub: string;
  screen: Screen;
  cta: string;
}

const AUTO_MISSIONS: AutoMission[] = [
  {
    id: "reading",
    emoji: "📖",
    title: "קראו מאמר באנגלית",
    sub: "סיימו קטע וענו על שאלות ההבנה — המשימה מסתיימת אוטומטית.",
    screen: "reading",
    cta: "עברו לקריאה ←",
  },
  {
    id: "listening",
    emoji: "🎧",
    title: "תרגלו האזנה",
    sub: "הקשיבו לקטע וענו על שאלות ההבנה — המשימה מסתיימת אוטומטית.",
    screen: "listening",
    cta: "עברו להאזנה ←",
  },
  {
    id: "speaking",
    emoji: "🎤",
    title: "תרגלו דיבור",
    sub: "סיימו סט משפטי הגייה — המשימה מסתיימת אוטומטית.",
    screen: "speaking",
    cta: "עברו לדיבור ←",
  },
  {
    id: "grammar",
    emoji: "✏️",
    title: "למדו נושא דקדוק אחד",
    sub: "השלימו את השיעור היומי — המשימה מסתיימת אוטומטית.",
    screen: "lesson",
    cta: "עברו לשיעור ←",
  },
];

const TOTAL_MISSIONS = MANUAL_MISSIONS.length + AUTO_MISSIONS.length + 1; // + the "5 words" mission

function DoneBadge({ done }: { done: boolean }) {
  return done ? <span className="tag ok">✓ הושלם (+30)</span> : null;
}

function MissionDoneBar() {
  return (
    <div className="mission-done" role="status">
      <span className="mission-done-check">✓</span>
      <span>בוצע</span>
      <span className="mission-done-points">+30 נק׳</span>
    </div>
  );
}

function MissionAction({ done, actionLabel, onClick, secondary }: {
  done: boolean;
  actionLabel: string;
  onClick: () => void;
  secondary?: ReactNode;
}) {
  if (done) return <MissionDoneBar />;
  return (
    <>
      <button className="btn accent" style={{ marginTop: 10 }} onClick={onClick}>
        {actionLabel}
      </button>
      {secondary}
    </>
  );
}

export default function DailyMissions({ go }: { go: (s: Screen) => void }) {
  const { dailyMissions, todayWordCount, completeMission, progress } = useLingo();
  const level = progress?.currentLevel ?? "A1";
  const todaysVideo = videoForToday(level);

  const doneCount =
    MANUAL_MISSIONS.filter((m) => dailyMissions[m.id]).length +
    AUTO_MISSIONS.filter((m) => dailyMissions[m.id]).length +
    (dailyMissions.words ? 1 : 0);
  const allDone = doneCount === TOTAL_MISSIONS;
  const wordsProgress = Math.min(todayWordCount, DAILY_WORD_TARGET);

  return (
    <div>
      <div className="card center" style={{ background: "linear-gradient(135deg,#6c5ce7,#8e7bff)", color: "#fff" }}>
        <h2 style={{ color: "#fff", margin: 0 }}>🎯 משימות יומיות</h2>
        <p style={{ margin: "6px 0 0", opacity: 0.9 }}>
          {doneCount}/{TOTAL_MISSIONS} הושלמו היום
        </p>
      </div>

      {allDone && (
        <div className="banner success">🎉 כל הכבוד! השלמתם את כל המשימות של היום.</div>
      )}

      {MANUAL_MISSIONS.map((mission) => {
        const done: boolean = dailyMissions[mission.id];
        return (
          <div className={`card${done ? " mission-card-done" : ""}`} key={mission.id}>
            <div className="row-between">
              <span style={{ fontSize: 28 }}>{mission.emoji}</span>
              <DoneBadge done={done} />
            </div>
            <h3 style={{ margin: "8px 0 2px" }}>{mission.title}</h3>
            <p className="muted" style={{ marginTop: 0 }}>
              {mission.sub}
            </p>
            {mission.id === "video" && (
              <div style={{ marginTop: 10 }}>
                <p style={{ margin: "0 0 8px", fontWeight: 600 }}>
                  {todaysVideo.titleHe}
                  <span className="muted" style={{ fontWeight: 400 }}>
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
            )}
            <MissionAction
              done={done}
              actionLabel="סמן כהושלם"
              onClick={() => completeMission(mission.id)}
              secondary={
                mission.id === "talk" ? (
                  <button
                    className="btn ghost"
                    style={{ marginTop: 8 }}
                    onClick={() => go("dialogue")}
                  >
                    עברו למאמן שיחה ←
                  </button>
                ) : undefined
              }
            />
          </div>
        );
      })}

      {AUTO_MISSIONS.map((mission) => {
        const done: boolean = dailyMissions[mission.id];
        return (
          <div className={`card${done ? " mission-card-done" : ""}`} key={mission.id}>
            <div className="row-between">
              <span style={{ fontSize: 28 }}>{mission.emoji}</span>
              <DoneBadge done={done} />
            </div>
            <h3 style={{ margin: "8px 0 2px" }}>{mission.title}</h3>
            <p className="muted" style={{ marginTop: 0 }}>
              {mission.sub}
            </p>
            <MissionAction
              done={done}
              actionLabel={mission.cta}
              onClick={() => go(mission.screen)}
            />
          </div>
        );
      })}

      <div className={`card${dailyMissions.words ? " mission-card-done" : ""}`}>
        <div className="row-between">
          <span style={{ fontSize: 28 }}>📚</span>
          <DoneBadge done={dailyMissions.words} />
        </div>
        <h3 style={{ margin: "8px 0 2px" }}>למדו {DAILY_WORD_TARGET} מילים חדשות</h3>
        <p className="muted" style={{ marginTop: 0 }}>
          שמרו {DAILY_WORD_TARGET} מילים חדשות — המשימה מסתיימת אוטומטית.
        </p>
        <div
          style={{
            height: 8,
            borderRadius: 999,
            background: "var(--surface-2, #eee)",
            overflow: "hidden",
            margin: "10px 0 4px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(wordsProgress / DAILY_WORD_TARGET) * 100}%`,
              background: "var(--primary)",
              borderRadius: 999,
              transition: "width 0.2s ease",
            }}
          />
        </div>
        <span className="muted">
          {wordsProgress}/{DAILY_WORD_TARGET} מילים
        </span>
        <MissionAction
          done={dailyMissions.words}
          actionLabel="עברו לאוצר מילים ←"
          onClick={() => go("vocabulary")}
        />
      </div>
    </div>
  );
}
