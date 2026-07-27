import { useEffect, useRef, useState } from "react";
import { useLingo } from "./store/useLingo";
import { useServiceWorkerUpdate } from "./services/pwa";
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
  missions: "משימות יומיות",
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
  const [screen, setScreen] = useState<Screen>("dashboard");
  const { needRefresh, applyUpdate } = useServiceWorkerUpdate();
  const mainRef = useRef<HTMLElement>(null);

  // Push a history entry on every in-app navigation so the mobile back
  // button/gesture steps back through screens instead of exiting the app —
  // without this, the browser has no in-app history to pop and closes
  // straight out on the first back press.
  useEffect(() => {
    history.replaceState({ screen: "dashboard" }, "");
  }, []);

  useEffect(() => {
    function onPopState(e: PopStateEvent) {
      setScreen((e.state?.screen as Screen | undefined) ?? "dashboard");
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
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
        <Onboarding />
      </div>
    );
  }

  const go = (s: Screen) => {
    if (s === screen) return;
    setScreen(s);
    history.pushState({ screen: s }, "");
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
      default:
        return <Dashboard go={go} />;
    }
  }

  return (
    <div className="app">
      {needRefresh && <UpdateBanner onUpdate={applyUpdate} />}
      <header className="topbar">
        {screen === "dashboard" ? (
          <span className="brand">
            <img
              src="/icon-192.png"
              alt=""
              width={26}
              height={26}
              style={{ borderRadius: 7, verticalAlign: "middle" }}
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

// Shown when a new service-worker version has installed and is waiting —
// the new version never activates on its own (registerType: "prompt" in
// vite.config.ts), so nothing changes under the user until they tap this.
function UpdateBanner({ onUpdate }: { onUpdate: () => void }) {
  return (
    <div className="banner" role="status" style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ flex: 1 }}>🔄 גרסה חדשה של האפליקציה מוכנה.</span>
      <button className="btn small" style={{ width: "auto" }} onClick={onUpdate}>
        רענון
      </button>
    </div>
  );
}
