import { useState } from "react";
import type { GemQuestion } from "../types";
import { speak } from "../services/tts";

interface Props {
  questions: GemQuestion[];
  onFinish: (score: number) => void;
}

// Shared multiple-choice runner used by both the Daily Lesson and the Practice
// Quiz. Reveals correctness + Hebrew explanation after each answer.
export default function QuizRunner({ questions, onFinish }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const q = questions[index];
  const isLast = index === questions.length - 1;

  function choose(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correctIndex) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      onFinish(score);
      return;
    }
    setIndex((n) => n + 1);
    setSelected(null);
  }

  return (
    <div>
      <div className="progress-dots">
        {questions.map((_, i) => (
          <span
            key={i}
            className={`dot ${i < index ? "done" : i === index ? "current" : ""}`}
          />
        ))}
      </div>

      <div className="card">
        <div className="row-between">
          <span className="tag">
            שאלה {index + 1}/{questions.length}
          </span>
          <button
            className="icon-btn"
            title="השמע"
            onClick={() => speak(q.question)}
          >
            🔊
          </button>
        </div>
        <h3 style={{ direction: "ltr", textAlign: "left" }}>{q.question}</h3>
        {q.questionHe && <p className="muted" style={{ margin: "4px 0 12px" }}>{q.questionHe}</p>}

        {q.options.map((opt, i) => {
          let cls = "option";
          if (selected !== null) {
            if (i === q.correctIndex) cls += " correct";
            else if (i === selected) cls += " wrong";
          }
          return (
            <button
              key={i}
              className={cls}
              disabled={selected !== null}
              onClick={() => choose(i)}
              style={{ direction: "ltr", textAlign: "left" }}
            >
              {opt}
              {q.optionsHe?.[i] && (
                <span className="muted" style={{ display: "block", fontSize: "0.85em", marginTop: 2 }}>
                  {q.optionsHe[i]}
                </span>
              )}
            </button>
          );
        })}

        {selected !== null && (
          <>
            <div className="explanation">
              {selected === q.correctIndex ? "✅ נכון! " : "❌ לא מדויק. "}
              {q.explanation}
            </div>
            <button className="btn" onClick={next}>
              {isLast ? "סיום ✓" : "הבא ←"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
