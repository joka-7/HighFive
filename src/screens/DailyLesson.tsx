import { useEffect, useState } from "react";
import { useLingo } from "../store/useLingo";
import { generateDailyLesson } from "../services/content";
import { topicForToday, LESSON_TOPICS } from "../data/topics";
import type { GemLesson } from "../types";
import QuizRunner from "../components/QuizRunner";
import Spinner from "../components/Spinner";
import { speak } from "../services/tts";

type Phase = "reading" | "quiz" | "done";

export default function DailyLesson() {
  const { progress, completeLesson } = useLingo();
  const [lesson, setLesson] = useState<GemLesson | null>(null);
  const [phase, setPhase] = useState<Phase>("reading");
  const [earned, setEarned] = useState(0);

  useEffect(() => {
    let active = true;
    const level = progress?.currentLevel ?? "A1";
    generateDailyLesson(level, topicForToday(LESSON_TOPICS)).then((l) => {
      if (active) setLesson(l);
    });
    return () => {
      active = false;
    };
  }, [progress?.currentLevel]);

  if (!lesson) return <Spinner label="מכין שיעור..." />;

  if (phase === "done") {
    return (
      <div className="celebrate">
        <div className="big">🎉</div>
        <h2>כל הכבוד!</h2>
        <p className="muted">סיימת את השיעור היומי וזכית ב-{earned} נקודות.</p>
      </div>
    );
  }

  if (phase === "quiz") {
    return (
      <QuizRunner
        questions={lesson.questions}
        onFinish={(score) => {
          completeLesson(score);
          const today = progress?.dailyLessonCompletedText;
          const todayKey = new Date().toISOString().slice(0, 10);
          const base = today === todayKey ? 0 : 50;
          setEarned(base + score * 20);
          setPhase("done");
        }}
      />
    );
  }

  return (
    <div>
      <div className="card">
        <div className="row-between">
          <h2 style={{ margin: 0 }}>{lesson.title}</h2>
          <button className="icon-btn" onClick={() => speak(lesson.title)}>
            🔊
          </button>
        </div>
      </div>
      <div className="card">
        <pre className="explanation-text">{lesson.explanation}</pre>
      </div>
      <button className="btn" onClick={() => setPhase("quiz")}>
        בוא נתרגל 📝 ({lesson.questions.length} שאלות)
      </button>
    </div>
  );
}
