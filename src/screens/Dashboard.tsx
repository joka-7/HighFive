import { useLingo } from "../store/useLingo";
import { isAIReady } from "../services/ai";
import { usePwaInstall } from "../services/pwa";
import { isReviewDay, WEEK_WORD_COUNT, WORDS_PER_DAY } from "../utils/cycle";
import HandBoard from "../components/HandBoard";
import Tile, { type TileSpec } from "../components/Tile";
import type { Screen } from "../types";

// The hub. The hand board up top is the day: its five fingers are the five
// operations (which own the reading / listening / speaking / lesson screens)
// and its palm is the day's words. The tiles below are only what the hand
// doesn't reach. Points/streak/level live in the top bar, and שינון is reached
// from the palm on review days.

const DASHBOARD_SECTIONS: { title: string; tiles: TileSpec[] }[] = [
  {
    title: "עוד תרגול",
    tiles: [
      { screen: "dialogue", emoji: "💬", title: "מאמן שיחה", sub: "תרגול דיבור" },
      { screen: "quiz", emoji: "🧠", title: "חידון", sub: "בחן את עצמך" },
    ],
  },
  {
    title: "המילים שלי",
    tiles: [
      { screen: "vocabulary", emoji: "🃏", title: "אוצר מילים", sub: "מילות היום" },
      { screen: "saved", emoji: "⭐", title: "מילים שמורות", sub: "הרשימה שלי" },
      { screen: "review", emoji: "🔁", title: "חזרה יומית", sub: "זיכרון מרווח" },
    ],
  },
  {
    title: "מעקב",
    tiles: [
      { screen: "progress", emoji: "📈", title: "ההתקדמות שלי", sub: "נקודות ורצף" },
      { screen: "calendar", emoji: "📅", title: "לוח שנה", sub: "משימות שהושלמו" },
    ],
  },
];

export default function Dashboard({ go }: { go: (s: Screen) => void }) {
  const { progress, dueWords, levelUpNotice, clearLevelUpNotice } = useLingo();
  const { canInstall, install } = usePwaInstall();

  if (!progress) return null;
  const due = dueWords().length;

  return (
    <div>
      <div className="card hero-card">
        <h2>שלום, {progress.userName}! 👋</h2>
        <button className="hero-today" onClick={() => go("missions")}>
          {isReviewDay()
            ? `סוף שבוע — חוזרים על ${WEEK_WORD_COUNT} מילות השבוע`
            : `היום: ${WORDS_PER_DAY} מילים חדשות + 5 פעולות`}{" "}
          ←
        </button>
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

      <HandBoard go={go} />

      {DASHBOARD_SECTIONS.map((section) => (
        <section key={section.title}>
          <h3 className="section-title">{section.title}</h3>
          <div className="menu-grid">
            {section.tiles.map((t) => (
              <Tile
                key={t.screen}
                tile={t}
                onClick={() => go(t.screen)}
                badge={t.screen === "review" ? due : undefined}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
