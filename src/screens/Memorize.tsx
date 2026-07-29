import { useEffect, useMemo, useState } from "react";
import { useLingo } from "../store/useLingo";
import { getTodaysWords } from "../data/todays-words";
import { dayIndex } from "../utils/daily";
import { cycleDay, CYCLE_DAYS, cycleLearningDays, isMemorizationDay } from "../utils/cycle";
import { MEMORIZATION_TOPIC } from "../utils/missions";
import { buildMemorizationQuiz } from "../utils/memorize";
import type { GemWord } from "../types";
import QuizRunner from "../components/QuizRunner";
import Spinner from "../components/Spinner";
import { speak } from "../services/tts";

// Memorization (שינון) — the fifth day of the cycle. No new words: the 20
// words met on days 1–4 come back, first as a self-test card list and then as
// a mixed recall quiz (English→Hebrew and Hebrew→English).

export default function Memorize() {
  const { progress, completeQuiz, markWordsLearned } = useLingo();
  const level = progress?.currentLevel ?? "A1";
  const today = dayIndex();

  const [words, setWords] = useState<GemWord[] | null>(null);
  const [phase, setPhase] = useState<"cards" | "quiz" | "done">("cards");
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [result, setResult] = useState({ score: 0, total: 0 });

  // Only days that have already happened — on a Memorization day that is the
  // full cycle, earlier in the cycle it is what the learner has met so far.
  const days = useMemo(
    () => cycleLearningDays(today).filter((d) => d <= today),
    [today],
  );

  useEffect(() => {
    let active = true;
    Promise.all(days.map((d) => getTodaysWords(level, d)))
      .then((sets) => {
        if (!active) return;
        const seen = new Set<string>();
        const flat: GemWord[] = [];
        for (const w of sets.flat()) {
          const key = w.word.toLowerCase();
          if (seen.has(key)) continue;
          seen.add(key);
          flat.push(w);
        }
        setWords(flat);
        markWordsLearned(flat, level);
      })
      .catch(() => active && setWords([]));
    return () => {
      active = false;
    };
  }, [level, days, markWordsLearned]);

  const questions = useMemo(
    () => (words ? buildMemorizationQuiz(words, today) : []),
    [words, today],
  );

  if (!words) return <Spinner label="טוען את מילות המחזור..." />;

  if (words.length === 0) {
    return (
      <div className="card center">
        <h2>לא הצלחנו לטעון את מילות המחזור</h2>
        <p className="muted">נסו שוב מאוחר יותר.</p>
      </div>
    );
  }

  if (phase === "quiz" && questions.length > 0) {
    return (
      <QuizRunner
        questions={questions}
        onFinish={(score) => {
          completeQuiz(level, MEMORIZATION_TOPIC, score, questions.length);
          setResult({ score, total: questions.length });
          setPhase("done");
        }}
      />
    );
  }

  if (phase === "done") {
    return (
      <div className="celebrate">
        <div className="big">🧩</div>
        <h2>סיימתם את השינון!</h2>
        <p className="muted">
          {result.score}/{result.total} תשובות נכונות מתוך {words.length} מילות המחזור.
        </p>
        <button
          className="btn accent"
          style={{ marginTop: 12 }}
          onClick={() => {
            setRevealed(new Set());
            setPhase("cards");
          }}
        >
          חזרה על הכרטיסיות 🔁
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        className="card center"
        style={{ background: "linear-gradient(135deg,#e17055,#fab1a0)", color: "#fff" }}
      >
        <h2 style={{ color: "#fff", margin: 0 }}>🧩 שינון</h2>
        <p style={{ margin: "6px 0 0", opacity: 0.92 }}>
          {isMemorizationDay(today)
            ? `יום ${CYCLE_DAYS} במחזור — היום לא מוסיפים מילים חדשות, אלא מוודאים שהן נשארו.`
            : `יום ${cycleDay(today)} במחזור — אפשר לשנן כבר עכשיו את המילים שנלמדו.`}
        </p>
      </div>

      <div className="card">
        <div className="row-between">
          <span className="tag">{words.length} מילים במחזור</span>
          <button className="btn ghost small" onClick={() => setRevealed(new Set())}>
            הסתר הכל
          </button>
        </div>
        <p className="muted" style={{ marginTop: 8 }}>
          נסו להיזכר בתרגום לפני שאתם לוחצים על המילה.
        </p>
        <ul className="memorize-list">
          {words.map((w) => {
            const open = revealed.has(w.word);
            return (
              <li key={w.word} className="memorize-row">
                <button
                  className="memorize-word"
                  onClick={() =>
                    setRevealed((prev) => {
                      const next = new Set(prev);
                      if (next.has(w.word)) next.delete(w.word);
                      else next.add(w.word);
                      return next;
                    })
                  }
                  aria-expanded={open}
                >
                  <span style={{ direction: "ltr" }}>{w.word}</span>
                  <span className="muted">{open ? w.translation : "🤔 ?"}</span>
                </button>
                <button
                  className="icon-btn"
                  aria-label={`השמע את המילה ${w.word}`}
                  onClick={() => speak(w.word)}
                >
                  <span aria-hidden="true">🔊</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {questions.length > 0 ? (
        <button className="btn accent" onClick={() => setPhase("quiz")}>
          למבחן השינון ←
        </button>
      ) : (
        <p className="muted center">צריך לפחות 4 מילים כדי לפתוח מבחן שינון.</p>
      )}
    </div>
  );
}
