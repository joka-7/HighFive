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
      <div className="card hero-card">
        <h2>שלום, {progress.userName}! 👋</h2>
        <p className="m-0">
          רמה {progress.currentLevel} · {progress.points} נק' · רצף {progress.streak} ימים 🔥
        </p>
      </div>

      {levelUpNotice && (
        <div className="banner banner-levelup">
          <span>
            🎉 עלית לרמה {levelUpNotice}! +100 נקודות. תוכן חדש מחכה לך.
          </span>
          <button className="btn small btn-on-banner" onClick={clearLevelUpNotice}>
            מעולה!
          </button>
        </div>
      )}

      {todaysWords.length > 0 && (
        <div className="card mb-3">
          <div className="row-between">
            <span className="tag">מילות היום</span>
            <button className="btn ghost small" onClick={() => go("vocabulary")}>
              לכרטיסיות ←
            </button>
          </div>
          <div className="chip-row mt-2_5">
            {todaysWords.map((w) => (
              <span key={w.word} className="level-pill ltr-only">
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
            className="btn ghost small inline-link"
            onClick={() => go("settings")}
          >
            הגדרות
          </button>
          .
        </div>
      )}

      {canInstall && (
        <div className="banner banner-row">
          <span>📲 התקן את High5 במסך הבית לגישה מהירה וגם ללא אינטרנט.</span>
          <button className="btn small" onClick={() => install()}>
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
          >
            {t.screen === "review" && due > 0 && (
              <span className="tile-badge">
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
