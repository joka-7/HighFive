import { useEffect, useState } from "react";
import { useLingo } from "../store/useLingo";
import { generatePracticeQuiz } from "../services/content";
import { topicForTodayByLevel, QUIZ_TOPICS_BY_LEVEL } from "../data/topics";
import type { GemQuiz } from "../types";
import QuizRunner from "../components/QuizRunner";
import Spinner from "../components/Spinner";

export default function PracticeQuiz() {
  const { progress, completeQuiz, learnedWords } = useLingo();
  const [quiz, setQuiz] = useState<GemQuiz | null>(null);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [result, setResult] = useState<{ score: number; earned: number } | null>(null);
  const level = progress?.currentLevel ?? "A1";
  const topic = topicForTodayByLevel(QUIZ_TOPICS_BY_LEVEL, level);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    setError(false);
    generatePracticeQuiz(level, topic, Object.keys(learnedWords), undefined, controller.signal)
      .then((q) => {
        if (active) setQuiz(q);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, [level, topic, learnedWords, reloadKey]);

  if (error) {
    return (
      <div className="card center">
        <h2>לא הצלחנו לטעון את החידון</h2>
        <button className="btn" onClick={() => setReloadKey((k) => k + 1)} style={{ marginTop: 12 }}>
          נסו שוב 🔄
        </button>
      </div>
    );
  }

  if (!quiz) return <Spinner label="מכין חידון..." />;

  if (result !== null) {
    const total = quiz.questions.length;
    const perfect = result.score === total;
    return (
      <div className="celebrate">
        <div className="big">{perfect ? "🏆" : "👏"}</div>
        <h2>
          {result.score}/{total} נכון
        </h2>
        <p className="muted">זכית ב-{result.earned} נקודות!</p>
      </div>
    );
  }

  return (
    <>
      <p className="center muted">נושא: {topic}</p>
      <QuizRunner
        questions={quiz.questions}
        onFinish={(score) => {
          const earned = completeQuiz(level, topic, score, quiz.questions.length);
          setResult({ score, earned });
        }}
      />
    </>
  );
}
