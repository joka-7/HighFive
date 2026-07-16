import { DAILY_WORD_TARGET, useLingo } from "../store/useLingo";

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
    sub: "צפיתם היום בסרטון קצר באנגלית? סמנו שהשלמתם.",
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
  id: "reading" | "grammar";
  emoji: string;
  title: string;
  sub: string;
}

const AUTO_MISSIONS: AutoMission[] = [
  {
    id: "reading",
    emoji: "📖",
    title: "קראו מאמר באנגלית",
    sub: "סיימו קטע וענו על שאלות ההבנה בטאב הקריאה — המשימה מסתיימת אוטומטית.",
  },
  {
    id: "grammar",
    emoji: "✏️",
    title: "למדו נושא דקדוק אחד",
    sub: "השלימו את השיעור היומי בטאב השיעור — המשימה מסתיימת אוטומטית.",
  },
];

const TOTAL_MISSIONS = MANUAL_MISSIONS.length + AUTO_MISSIONS.length + 1; // + the "5 words" mission

function DoneBadge({ done }: { done: boolean }) {
  return done ? <span className="tag ok">✓ הושלם (+30)</span> : null;
}

export default function DailyMissions() {
  const { dailyMissions, todayWordCount, completeMission } = useLingo();

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
          <div className="card" key={mission.id}>
            <div className="row-between">
              <span style={{ fontSize: 28 }}>{mission.emoji}</span>
              <DoneBadge done={done} />
            </div>
            <h3 style={{ margin: "8px 0 2px" }}>{mission.title}</h3>
            <p className="muted" style={{ marginTop: 0 }}>
              {mission.sub}
            </p>
            <button
              className="btn accent"
              style={{ marginTop: 10 }}
              disabled={done}
              onClick={() => completeMission(mission.id)}
            >
              {done ? "בוצע ✓" : "סמן כהושלם"}
            </button>
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
          שמרו {DAILY_WORD_TARGET} מילים חדשות בטאב אוצר המילים — המשימה מסתיימת אוטומטית.
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
      </div>
    </div>
  );
}
