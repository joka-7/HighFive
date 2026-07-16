import { useState } from "react";
import { useLingo } from "./store/useLingo";
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

  if (!progress) {
    return (
      <div className="app">
        <Onboarding />
      </div>
    );
  }

  const go = (s: Screen) => setScreen(s);

  function renderScreen() {
    switch (screen) {
      case "dashboard":
        return <Dashboard go={go} />;
      case "lesson":
        return <DailyLesson />;
      case "missions":
        return <DailyMissions />;
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
          <button className="brand" onClick={() => go("dashboard")}>
            → {TITLES[screen]}
          </button>
        )}
        <div className="stats">
          <span className="chip">✨ {progress.points}</span>
          <span className="chip">🔥 {progress.streak}</span>
          <span className="chip level">{progress.currentLevel}</span>
        </div>
      </header>

      <main className="screen">{renderScreen()}</main>

      <nav className="bottom-nav">
        {NAV.map((n) => (
          <button
            key={n.screen}
            className={`nav-item ${screen === n.screen ? "active" : ""}`}
            onClick={() => go(n.screen)}
          >
            <span className="ico">{n.ico}</span>
            <span>{n.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
