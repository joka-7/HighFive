import { useEffect, useState } from "react";
import type { GemQuestion } from "../types";
import { speak } from "../services/tts";
import { isAIReady } from "../services/ai";
import { translateQuestion, type GemQuestionTranslation } from "../services/content";

interface Props {
  questions: GemQuestion[];
  onFinish: (score: number) => void;
}

// Some bundled offline questions have questionHe/optionsHe that are just a
// copy of the English text (a content-generation gap, not a translation) —
// showing that as a "translation" is worse than not offering one at all.
function realTranslation(en: string, he: string | undefined): string | undefined {
  if (!he) return undefined;
  return he.trim().toLowerCase() === en.trim().toLowerCase() ? undefined : he;
}

// Shared multiple-choice runner used by both the Daily Lesson and the Practice
// Quiz. Reveals correctness + Hebrew explanation after each answer.
export default function QuizRunner({ questions, onFinish }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showHe, setShowHe] = useState(false);
  const [aiTranslation, setAiTranslation] = useState<GemQuestionTranslation | null>(null);
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState<string | null>(null);

  const q = questions[index];
  const isLast = index === questions.length - 1;
  const staticQuestionHe = realTranslation(q.question, q.questionHe);
  const staticOptionsHe = q.optionsHe?.map((he, i) => realTranslation(q.options[i], he));
  const hasStaticHe = Boolean(staticQuestionHe) || Boolean(staticOptionsHe?.some(Boolean));

  // Prefer the bundled (instant, offline) translation; only fall back to an
  // on-demand AI call when this specific question doesn't actually have one.
  const questionHe = staticQuestionHe ?? aiTranslation?.question;
  const optionsHe = staticOptionsHe ?? aiTranslation?.options;

  // The question's translation is purely opt-in via the toggle, any time.
  // The answer options' translations are never shown up front (that would
  // give away hints before choosing) — they only appear once the user has
  // committed to an answer, regardless of the toggle.
  const revealQuestionHe = showHe;
  const revealOptionsHe = selected !== null;

  // A new question invalidates any cached AI translation for the previous one.
  useEffect(() => {
    setAiTranslation(null);
    setShowHe(false);
    setTranslateError(null);
  }, [index]);

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

  async function toggleHe() {
    if (showHe) {
      setShowHe(false);
      return;
    }
    if (hasStaticHe || aiTranslation) {
      setShowHe(true);
      return;
    }
    if (!isAIReady()) {
      setTranslateError("התרגום דורש הגדרת ספק AI (⚙️ הגדרות).");
      return;
    }
    setTranslateError(null);
    setTranslating(true);
    try {
      const t = await translateQuestion(q.question, q.options);
      setAiTranslation(t);
      setShowHe(true);
    } catch {
      setTranslateError("לא הצלחנו לתרגם כרגע. נסו שוב.");
    } finally {
      setTranslating(false);
    }
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
          <div style={{ display: "flex", gap: 4 }}>
            <button
              className="btn ghost small"
              disabled={translating}
              onClick={toggleHe}
            >
              {translating ? "…" : showHe ? "הסתר תרגום" : "הצג תרגום"}
            </button>
            <button
              className="icon-btn"
              title="השמע"
              onClick={() => speak(q.question)}
            >
              🔊
            </button>
          </div>
        </div>
        <h3 style={{ direction: "ltr", textAlign: "left" }}>{q.question}</h3>
        {revealQuestionHe && questionHe && (
          <p className="muted" style={{ margin: "4px 0 12px" }}>{questionHe}</p>
        )}
        {translateError && (
          <p className="muted" style={{ margin: "4px 0 12px" }}>{translateError}</p>
        )}

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
              {revealOptionsHe && optionsHe?.[i] && (
                <span className="muted" style={{ display: "block", fontSize: "0.85em", marginTop: 2 }}>
                  {optionsHe[i]}
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
