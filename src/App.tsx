import { useEffect, useRef, useState } from "react";
import { useLingo } from "./store/useLingo";
import { useServiceWorkerUpdate } from "./services/pwa";
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import { useLocalReminder } from "./hooks/useLocalReminder";
import { navigateHash, screenFromHash } from "./utils/routing";
import type { Screen } from "./types";
import Onboarding from "./screens/Onboarding";
import Dashboard from "./screens/Dashboard";
import DailyLesson from "./screens/DailyLesson";
import DailyMissions from "./screens/DailyMissions";
import Vocabulary from "./screens/Vocabulary";
import DialogueCoach from "./screens/DialogueCoach";
import PracticeQuiz from "./screens/PracticeQuiz";
import SavedWords from "./screens/SavedWords";
import Progress from "./screens/Progress";
import Settings from "./screens/Settings";
import Review from "./screens/Review";
import Reading from "./screens/Reading";
import Listening from "./screens/Listening";
import Speaking from "./screens/Speaking";
import Calendar from "./screens/Calendar";
import Memorize from "./screens/Memorize";

const TITLES: Record<Screen, string> = {
  onboarding: "ברוכים הבאים",
  dashboard: "High5",
  lesson: "שיעור יומי",
  vocabulary: "אוצר מילים",
  dialogue: "מאמן שיחה",
  quiz: "חידון",
  saved: "מילים שמורות",
  progress: "ההתקדמות שלי",
  settings: "הגדרות",
  review: "חזרה יומית",
  reading: "קריאה",
  listening: "האזנה",
  speaking: "דיבור",
  calendar: "לוח שנה",
  missions: "חמש ביום",
  memorize: "שינון",
};

const NAV: { screen: Screen; ico: string; label: string }[] = [
  { screen: "dashboard", ico: "🏠", label: "בית" },
  { screen: "lesson", ico: "📚", label: "שיעור" },
  { screen: "missions", ico: "🎯", label: "משימות" },
  { screen: "vocabulary", ico: "🃏", label: "מילים" },
  { screen: "calendar", ico: "📅", label: "לוח שנה" },
  { screen: "settings", ico: "⚙️", label: "הגדרות" },
];

export default function App() {
  const { progress } = useLingo();
  const [screen, setScreen] = useState<Screen>(() => screenFromHash());
  const { needRefresh, applyUpdate } = useServiceWorkerUpdate();
  const online = useOnlineStatus();
  const mainRef = useRef<HTMLElement>(null);
  useLocalReminder();

  // Hash routing: refresh-safe, shareable deep links; browser back/forward
  // follow hash history instead of exiting the PWA.
  useEffect(() => {
    if (!window.location.hash) navigateHash("dashboard", true);

    function onHashChange() {
      setScreen(screenFromHash());
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Move keyboard/screen-reader focus into the new screen content on navigate.
  useEffect(() => {
    if (!progress) return;
    mainRef.current?.focus();
  }, [screen, progress]);

  if (!progress) {
    return (
      <div className="app">
        {needRefresh && <UpdateBanner onUpdate={applyUpdate} />}
        {!online && (
          <div className="banner" role="status">
            📡 אין חיבור לאינטרנט — אפשר להמשיך עם התוכן Offline.
          </div>
        )}
        <Onboarding />
      </div>
    );
  }

  const go = (s: Screen) => {
    if (s === screen) return;
    navigateHash(s);
    // hashchange will setScreen; set eagerly so UI feels instant
    setScreen(s);
  };

  function renderScreen() {
    switch (screen) {
      case "dashboard":
        return <Dashboard go={go} />;
      case "lesson":
        return <DailyLesson />;
      case "missions":
        return <DailyMissions go={go} />;
      case "vocabulary":
        return <Vocabulary />;
      case "dialogue":
        return <DialogueCoach go={go} />;
      case "quiz":
        return <PracticeQuiz />;
      case "saved":
        return <SavedWords />;
      case "progress":
        return <Progress />;
      case "settings":
        return <Settings />;
      case "review":
        return <Review />;
      case "reading":
        return <Reading />;
      case "listening":
        return <Listening />;
      case "speaking":
        return <Speaking />;
      case "calendar":
        return <Calendar />;
      case "memorize":
        return <Memorize />;
      default:
        return <Dashboard go={go} />;
    }
  }

  return (
    <div className="app">
      {needRefresh && <UpdateBanner onUpdate={applyUpdate} />}
      {!online && (
        <div className="banner" role="status">
          📡 אין חיבור לאינטרנט — תוכן Offline זמין, אבל מאמן השיחה וסנכרון הענן
          לא יעבדו עד שהחיבור יחזור.
        </div>
      )}
      <header className="topbar">
        {screen === "dashboard" ? (
          <span className="brand">
            <img
              src="/icon-192.png"
              alt=""
              width={26}
              height={26}
              className="brand-logo"
            />{" "}
            High5
          </span>
        ) : (
          <button
            className="brand"
            onClick={() => go("dashboard")}
            aria-label={`חזרה לדף הבית — ${TITLES[screen]}`}
          >
            → {TITLES[screen]}
          </button>
        )}
        <div className="stats" aria-label="סטטוס">
          <span className="chip" aria-label={`${progress.points} נקודות`}>
            ✨ {progress.points}
          </span>
          <span className="chip" aria-label={`רצף של ${progress.streak} ימים`}>
            🔥 {progress.streak}
          </span>
          <span className="chip level" aria-label={`רמה ${progress.currentLevel}`}>
            {progress.currentLevel}
          </span>
        </div>
      </header>

      <main
        className="screen"
        ref={mainRef}
        tabIndex={-1}
        aria-label={TITLES[screen]}
      >
        {renderScreen()}
      </main>

      <nav className="bottom-nav" aria-label="ניווט ראשי">
        {NAV.map((n) => {
          const active = screen === n.screen;
          return (
            <button
              key={n.screen}
              className={`nav-item ${active ? "active" : ""}`}
              onClick={() => go(n.screen)}
              aria-current={active ? "page" : undefined}
            >
              <span className="ico" aria-hidden="true">
                {n.ico}
              </span>
              <span>{n.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function UpdateBanner({ onUpdate }: { onUpdate: () => void }) {
  return (
    <div className="banner banner-row" role="status">
      <span>🔄 גרסה חדשה של האפליקציה מוכנה.</span>
      <button className="btn small" onClick={onUpdate}>
        רענון
      </button>
    </div>
  );
}
