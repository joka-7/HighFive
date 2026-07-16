import { useEffect, useState } from "react";
import { useLingo } from "../store/useLingo";
import { generateDailyLesson } from "../services/content";
import { topicForTodayByLevel, LESSON_TOPICS_BY_LEVEL } from "../data/topics";
import type { GemLesson } from "../types";
import QuizRunner from "../components/QuizRunner";
import Spinner from "../components/Spinner";
import { speak } from "../services/tts";
import { dateKeyFromTs } from "../utils/missions";
import { loadDailyCache, saveDailyCache } from "../utils/dailyCache";

const CACHE_KEY = "high5.lesson_today.v2";

type Phase = "reading" | "quiz" | "done";

export default function DailyLesson() {
  const { progress, completeLesson, learnedWords } = useLingo();
  const [lesson, setLesson] = useState<GemLesson | null>(null);
  const [phase, setPhase] = useState<Phase>("reading");
  const [earned, setEarned] = useState(0);

  // Reuses today's lesson on every remount (the screen unmounts on tab
  // switches) so the user doesn't lose their place mid-lesson.
  useEffect(() => {
    let active = true;
    const level = progress?.currentLevel ?? "A1";
    const cached = loadDailyCache<GemLesson>(CACHE_KEY, level);
    if (cached) {
      setLesson(cached);
      return;
    }
    generateDailyLesson(
      level,
      topicForTodayByLevel(LESSON_TOPICS_BY_LEVEL, level),
      Object.keys(learnedWords),
    ).then((l) => {
      if (active) {
        setLesson(l);
        saveDailyCache(CACHE_KEY, level, l);
      }
    });
    return () => {
      active = false;
    };
  }, [progress?.currentLevel, learnedWords]);

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
          const todayKey = dateKeyFromTs(Date.now());
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
