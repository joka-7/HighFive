import { useLingo } from "../store/useLingo";
import { hasApiKey } from "../services/apiKey";
import type { Screen } from "../types";

const TILES: { screen: Screen; emoji: string; title: string; sub: string }[] = [
  { screen: "lesson", emoji: "📚", title: "שיעור יומי", sub: "לימוד + תרגול" },
  { screen: "vocabulary", emoji: "🃏", title: "אוצר מילים", sub: "כרטיסיות" },
  { screen: "dialogue", emoji: "💬", title: "מאמן שיחה", sub: "תרגול דיבור" },
  { screen: "quiz", emoji: "🧠", title: "חידון", sub: "בחן את עצמך" },
  { screen: "saved", emoji: "⭐", title: "מילים שמורות", sub: "לחזרה" },
  { screen: "progress", emoji: "📈", title: "ההתקדמות שלי", sub: "נקודות ורצף" },
];

export default function Dashboard({ go }: { go: (s: Screen) => void }) {
  const { progress } = useLingo();
  if (!progress) return null;

  return (
    <div>
      <div className="card" style={{ background: "linear-gradient(135deg,#6c5ce7,#8e7bff)", color: "#fff" }}>
        <h2 style={{ color: "#fff" }}>שלום, {progress.userName}! 👋</h2>
        <p style={{ margin: 0, opacity: 0.9 }}>
          רמה {progress.currentLevel} · {progress.points} נק' · רצף {progress.streak} ימים 🔥
        </p>
      </div>

      {!hasApiKey() && (
        <div className="banner">
          💡 ללא מפתח Gemini האפליקציה עובדת עם תוכן מובנה (לא מקוון). להוספת שיעורים
          ושיחות AI חיים, הוסף מפתח ב{" "}
          <button
            className="btn ghost small"
            style={{ padding: 0, display: "inline" }}
            onClick={() => go("settings")}
          >
            הגדרות
          </button>
          .
        </div>
      )}

      <div className="menu-grid">
        {TILES.map((t) => (
          <button key={t.screen} className="menu-tile" onClick={() => go(t.screen)}>
            <span className="emoji">{t.emoji}</span>
            <span className="title">{t.title}</span>
            <span className="sub">{t.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
