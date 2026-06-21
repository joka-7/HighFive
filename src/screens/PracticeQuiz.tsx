import { useEffect, useState } from "react";
import { useLingo } from "../store/useLingo";
import { generatePracticeQuiz } from "../services/content";
import { topicForToday, QUIZ_TOPICS } from "../data/topics";
import type { GemQuiz } from "../types";
import QuizRunner from "../components/QuizRunner";
import Spinner from "../components/Spinner";

export default function PracticeQuiz() {
  const { progress, completeQuiz } = useLingo();
  const [quiz, setQuiz] = useState<GemQuiz | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const level = progress?.currentLevel ?? "A1";
  const topic = topicForToday(QUIZ_TOPICS);

  useEffect(() => {
    let active = true;
    generatePracticeQuiz(level, topic).then((q) => {
      if (active) setQuiz(q);
    });
    return () => {
      active = false;
    };
  }, [level, topic]);

  if (!quiz) return <Spinner label="מכין חידון..." />;

  if (result !== null) {
    const total = quiz.questions.length;
    const perfect = result === total;
    return (
      <div className="celebrate">
        <div className="big">{perfect ? "🏆" : "👏"}</div>
        <h2>
          {result}/{total} נכון
        </h2>
        <p className="muted">זכית ב-{result * 25} נקודות!</p>
      </div>
    );
  }

  return (
    <>
      <p className="center muted">נושא: {topic}</p>
      <QuizRunner
        questions={quiz.questions}
        onFinish={(score) => {
          completeQuiz(level, topic, score, quiz.questions.length);
          setResult(score);
        }}
      />
    </>
  );
}
