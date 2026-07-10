import { DAILY_WORD_TARGET, useLingo } from "../store/useLingo";
import { topicForToday, VIDEO_TOPICS } from "../data/topics";
import type { Screen } from "../types";

// Missions the user marks done manually (an external action we can't detect
// in-app: watching a video, having a conversation).
interface ManualMission {
  id: "video" | "talk";
  emoji: string;
  title: string;
  sub: string;
  cta: string;
}

const MANUAL_MISSIONS: ManualMission[] = [
  {
    id: "video",
    emoji: "🎬",
    title: "צפו בסרטון באנגלית",
    sub: "בחרו סרטון קצר באנגלית וצפו בו היום.",
    cta: "פתיחת סרטון",
  },
  {
    id: "talk",
    emoji: "💬",
    title: "שוחחו עם מאמן ה-AI באנגלית",
    sub: "נהלו שיחה קצרה עם מאמן השיחה באנגלית.",
    cta: "פתיחת מאמן שיחה",
  },
];

// Missions that auto-complete once their in-app action is done (no button).
interface AutoMission {
  id: "reading" | "grammar";
  emoji: string;
  title: string;
  sub: string;
  cta: string;
  target: Screen;
}

const AUTO_MISSIONS: AutoMission[] = [
  {
    id: "reading",
    emoji: "📖",
    title: "קראו מאמר באנגלית",
    sub: "קראו קטע ב-Reading Lab וענו על שאלות ההבנה — המשימה מסתיימת אוטומטית.",
    cta: "לקטע קריאה",
    target: "reading",
  },
  {
    id: "grammar",
    emoji: "✏️",
    title: "למדו נושא דקדוק אחד",
    sub: "השלימו את השיעור היומי — המשימה מסתיימת אוטומטית.",
    cta: "לשיעור היומי",
    target: "lesson",
  },
];

const TOTAL_MISSIONS = MANUAL_MISSIONS.length + AUTO_MISSIONS.length + 1; // + the "5 words" mission

// A YouTube search link (not a specific video ID, which can go stale or be
// region-locked) seeded with today's rotating topic.
function videoSearchUrl(): string {
  const topic = topicForToday(VIDEO_TOPICS);
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(topic)}`;
}

function DoneBadge({ done }: { done: boolean }) {
  return done ? <span className="tag ok">✓ הושלם (+30)</span> : null;
}

export default function DailyMissions({ go }: { go: (s: Screen) => void }) {
  const { dailyMissions, todayWordCount, completeMission } = useLingo();

  const doneCount =
    MANUAL_MISSIONS.filter((m) => dailyMissions[m.id]).length +
    AUTO_MISSIONS.filter((m) => dailyMissions[m.id]).length +
    (dailyMissions.words ? 1 : 0);
  const allDone = doneCount === TOTAL_MISSIONS;
  const wordsProgress = Math.min(todayWordCount, DAILY_WORD_TARGET);

  function act(mission: ManualMission) {
    if (mission.id === "video") {
      window.open(videoSearchUrl(), "_blank", "noopener,noreferrer");
    } else {
      go("dialogue");
    }
  }

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
          <div className="card" key={mission.id}>
            <div className="row-between">
              <span style={{ fontSize: 28 }}>{mission.emoji}</span>
              <DoneBadge done={done} />
            </div>
            <h3 style={{ margin: "8px 0 2px" }}>{mission.title}</h3>
            <p className="muted" style={{ marginTop: 0 }}>
              {mission.sub}
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button className="btn secondary" onClick={() => act(mission)}>
                {mission.cta}
              </button>
              <button
                className="btn accent"
                disabled={done}
                onClick={() => completeMission(mission.id)}
              >
                {done ? "בוצע ✓" : "סמן כהושלם"}
              </button>
            </div>
          </div>
        );
      })}

      {AUTO_MISSIONS.map((mission) => {
        const done: boolean = dailyMissions[mission.id];
        return (
          <div className="card" key={mission.id}>
            <div className="row-between">
              <span style={{ fontSize: 28 }}>{mission.emoji}</span>
              <DoneBadge done={done} />
            </div>
            <h3 style={{ margin: "8px 0 2px" }}>{mission.title}</h3>
            <p className="muted" style={{ marginTop: 0 }}>
              {mission.sub}
            </p>
            <button className="btn secondary" style={{ marginTop: 10 }} onClick={() => go(mission.target)}>
              {mission.cta}
            </button>
          </div>
        );
      })}

      <div className="card">
        <div className="row-between">
          <span style={{ fontSize: 28 }}>📚</span>
          <DoneBadge done={dailyMissions.words} />
        </div>
        <h3 style={{ margin: "8px 0 2px" }}>למדו {DAILY_WORD_TARGET} מילים חדשות</h3>
        <p className="muted" style={{ marginTop: 0 }}>
          שמרו {DAILY_WORD_TARGET} מילים חדשות באוצר המילים היום — המשימה מסתיימת אוטומטית.
        </p>
        <div
          style={{
            height: 8,
            borderRadius: 999,
            background: "var(--surface-2, #eee)",
            overflow: "hidden",
            margin: "10px 0",
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
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
          <span className="muted">
            {wordsProgress}/{DAILY_WORD_TARGET} מילים
          </span>
          <button className="btn secondary" onClick={() => go("vocabulary")}>
            לאוצר מילים
          </button>
        </div>
      </div>
    </div>
  );
}
