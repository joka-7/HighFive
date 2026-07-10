import { useLingo } from "../store/useLingo";
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

// A YouTube search link (not a specific video ID, which can go stale or be
// region-locked) seeded with today's rotating topic.
function videoSearchUrl(): string {
  const topic = topicForToday(VIDEO_TOPICS);
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(topic)}`;
}

export default function DailyMissions({ go }: { go: (s: Screen) => void }) {
  const { dailyMissions, completeMission } = useLingo();

  const doneCount = MISSIONS.filter((m) => dailyMissions[m.id]).length;
  const allDone = doneCount === MISSIONS.length;

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
          {doneCount}/{MISSIONS.length} הושלמו היום
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
    </div>
  );
}
