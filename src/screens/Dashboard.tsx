import { useEffect, useState } from "react";
import { useLingo } from "../store/useLingo";
import { isAIReady } from "../services/ai";
import { usePwaInstall } from "../services/pwa";
import { getTodaysWords } from "../data/todays-words";
import type { GemWord, Screen } from "../types";

const TILES: { screen: Screen; emoji: string; title: string; sub: string }[] = [
  { screen: "lesson", emoji: "📚", title: "שיעור יומי", sub: "לימוד + תרגול" },
  { screen: "missions", emoji: "🎯", title: "משימות יומיות", sub: "סרטון + שיחה" },
  { screen: "vocabulary", emoji: "🃏", title: "אוצר מילים", sub: "כרטיסיות" },
  { screen: "dialogue", emoji: "💬", title: "מאמן שיחה", sub: "תרגול דיבור" },
  { screen: "quiz", emoji: "🧠", title: "חידון", sub: "בחן את עצמך" },
  { screen: "review", emoji: "🔁", title: "חזרה יומית", sub: "זיכרון מרווח" },
  { screen: "reading", emoji: "📖", title: "קריאה", sub: "טקסטים אמיתיים" },
  { screen: "listening", emoji: "🎧", title: "האזנה", sub: "הבנת הנשמע" },
  { screen: "speaking", emoji: "🎤", title: "דיבור", sub: "תרגול הגייה" },
  { screen: "saved", emoji: "⭐", title: "מילים שמורות", sub: "לחזרה" },
  { screen: "progress", emoji: "📈", title: "ההתקדמות שלי", sub: "נקודות ורצף" },
  { screen: "calendar", emoji: "📅", title: "לוח שנה", sub: "משימות שהושלמו" },
];

export default function Dashboard({ go }: { go: (s: Screen) => void }) {
  const { progress, dueWords, levelUpNotice, clearLevelUpNotice } = useLingo();
  const { canInstall, install } = usePwaInstall();
  const [todaysWords, setTodaysWords] = useState<GemWord[]>([]);

  useEffect(() => {
    if (!progress) return;
    getTodaysWords(progress.currentLevel).then(setTodaysWords).catch(() => setTodaysWords([]));
  }, [progress?.currentLevel]);

  if (!progress) return null;
  const due = dueWords().length;

  return (
    <div>
      <div className="card" style={{ background: "linear-gradient(135deg,#6c5ce7,#8e7bff)", color: "#fff" }}>
        <h2 style={{ color: "#fff" }}>שלום, {progress.userName}! 👋</h2>
        <p style={{ margin: 0, opacity: 0.9 }}>
          רמה {progress.currentLevel} · {progress.points} נק' · רצף {progress.streak} ימים 🔥
        </p>
      </div>

      {levelUpNotice && (
        <div
          className="banner"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "linear-gradient(135deg,#00b894,#55efc4)",
            color: "#fff",
          }}
        >
          <span style={{ flex: 1 }}>
            🎉 עלית לרמה {levelUpNotice}! +100 נקודות. תוכן חדש מחכה לך.
          </span>
          <button className="btn small" style={{ background: "#fff", color: "#00b894" }} onClick={clearLevelUpNotice}>
            מעולה!
          </button>
        </div>
      )}

      {todaysWords.length > 0 && (
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="row-between">
            <span className="tag">מילות היום</span>
            <button className="btn ghost small" onClick={() => go("vocabulary")}>
              לכרטיסיות ←
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
            {todaysWords.map((w) => (
              <span key={w.word} className="level-pill" style={{ direction: "ltr" }}>
                {w.word} <span className="muted">({w.translation})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {!isAIReady() && (
        <div className="banner">
          💡 בלי מפתח AI, האפליקציה פועלת עם תוכן מובנה (לא מקוון). כדי לקבל
          שיעורים ושיחות AI חיות, הוסיפו מפתח ב
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

      {canInstall && (
        <div className="banner" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ flex: 1 }}>📲 התקן את High5 במסך הבית לגישה מהירה וגם ללא אינטרנט.</span>
          <button className="btn small" style={{ width: "auto" }} onClick={() => install()}>
            התקנה
          </button>
        </div>
      )}

      <div className="menu-grid">
        {TILES.map((t) => (
          <button
            key={t.screen}
            className={`menu-tile skill-${t.screen}`}
            onClick={() => go(t.screen)}
            style={{ position: "relative" }}
          >
            {t.screen === "review" && due > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 8,
                  insetInlineEnd: 8,
                  background: "var(--danger)",
                  color: "#fff",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 800,
                  minWidth: 22,
                  height: 22,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 6px",
                }}
              >
                {due}
              </span>
            )}
            <span className="emoji">{t.emoji}</span>
            <span className="title">{t.title}</span>
            <span className="sub">{t.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
