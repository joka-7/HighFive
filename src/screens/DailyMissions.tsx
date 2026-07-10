import { DAILY_WORD_TARGET, useLingo } from "../store/useLingo";
import { topicForToday, VIDEO_TOPICS } from "../data/topics";
import type { Screen } from "../types";

interface Mission {
  id: "video" | "talk";
  emoji: string;
  title: string;
  sub: string;
  cta: string;
}

const MISSIONS: Mission[] = [
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

const TOTAL_MISSIONS = MISSIONS.length + 1; // + the "5 words" mission

// A YouTube search link (not a specific video ID, which can go stale or be
// region-locked) seeded with today's rotating topic.
function videoSearchUrl(): string {
  const topic = topicForToday(VIDEO_TOPICS);
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(topic)}`;
}

export default function DailyMissions({ go }: { go: (s: Screen) => void }) {
  const { dailyMissions, todayWordCount, completeMission } = useLingo();

  const doneCount =
    MISSIONS.filter((m) => dailyMissions[m.id]).length + (dailyMissions.words ? 1 : 0);
  const allDone = doneCount === TOTAL_MISSIONS;
  const wordsProgress = Math.min(todayWordCount, DAILY_WORD_TARGET);

  function act(mission: Mission) {
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

      {MISSIONS.map((mission) => {
        const done = dailyMissions[mission.id];
        return (
          <div className="card" key={mission.id}>
            <div className="row-between">
              <span style={{ fontSize: 28 }}>{mission.emoji}</span>
              {done && <span className="tag ok">✓ הושלם (+30)</span>}
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

      <div className="card">
        <div className="row-between">
          <span style={{ fontSize: 28 }}>📚</span>
          {dailyMissions.words && <span className="tag ok">✓ הושלם (+30)</span>}
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
