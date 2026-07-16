import { useCallback, useEffect, useState } from "react";
import { useLingo } from "../store/useLingo";
import { generateReading } from "../services/content";
import { topicForTodayByLevel, READING_TOPICS_BY_LEVEL } from "../data/topics";
import type { GemReading } from "../types";
import QuizRunner from "../components/QuizRunner";
import Spinner from "../components/Spinner";
import { speak } from "../services/tts";
import { loadDailyCache, saveDailyCache } from "../utils/dailyCache";

const CACHE_KEY = "high5.reading_today.v3";

export default function Reading() {
  const { progress, isWordSaved, toggleSaveWord, completeQuiz, learnedWords } = useLingo();
  const level = progress?.currentLevel ?? "A1";
  const [reading, setReading] = useState<GemReading | null>(null);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<"read" | "quiz" | "done">("read");
  const [open, setOpen] = useState<string | null>(null);
  const [showHe, setShowHe] = useState(true);

  const load = useCallback(
    (force = false) => {
      setLoading(true);
      setPhase("read");
      setOpen(null);
      setShowHe(true);
      if (!force) {
        const cached = loadDailyCache<GemReading>(CACHE_KEY, level);
        if (cached) {
          setReading(cached);
          setLoading(false);
          return;
        }
      }
      generateReading(
        level,
        topicForTodayByLevel(READING_TOPICS_BY_LEVEL, level),
        Object.keys(learnedWords),
      )
        .then((r) => {
          setReading(r);
          saveDailyCache(CACHE_KEY, level, r);
        })
        .finally(() => setLoading(false));
    },
    [level, learnedWords],
  );

  useEffect(() => {
    load();
  }, [load]);

  if (!reading || loading) return <Spinner label="טוען קטע קריאה..." />;

  if (phase === "done") {
    return (
      <div className="celebrate">
        <div className="big">📖</div>
        <h2>כל הכבוד!</h2>
        <p className="muted">סיימת את קטע הקריאה.</p>
        <button className="btn accent" onClick={() => load(true)} style={{ marginTop: 12 }}>
          קטע חדש 🔄
        </button>
      </div>
    );
  }

  if (phase === "quiz") {
    return (
      <QuizRunner
        questions={reading.questions}
        onFinish={(score) => {
          completeQuiz(level, "Reading", score, reading.questions.length);
          setPhase("done");
        }}
      />
    );
  }

  return (
    <div>
      <div className="card">
        <div className="row-between">
          <h3 style={{ margin: 0 }}>{reading.title}</h3>
          <button className="icon-btn" title="הקראה" onClick={() => speak(reading.text)}>
            🔊
          </button>
        </div>
        <pre className="explanation-text" style={{ direction: "ltr", textAlign: "left", marginTop: 10 }}>
          {reading.text}
        </pre>
        {reading.textHe ? (
          <>
            <button className="btn ghost small" style={{ marginTop: 8 }} onClick={() => setShowHe((s) => !s)}>
              {showHe ? "הסתר תרגום מלא" : "הצג תרגום מלא"}
            </button>
            {showHe && (
              <pre className="explanation-text" style={{ marginTop: 8 }}>
                {reading.textHe}
              </pre>
            )}
          </>
        ) : (
          <p className="muted" style={{ marginTop: 8 }}>תרגום מלא לא זמין לקטע זה.</p>
        )}
      </div>

      <div className="card">
        <span className="tag">מילים חשובות — לחצו לתרגום</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
          {reading.glossary.map((w) => (
            <button
              key={w.word}
              className="level-pill"
              style={{ direction: "ltr" }}
              onClick={() => setOpen(open === w.word ? null : w.word)}
            >
              {w.word}
            </button>
          ))}
        </div>
        {open &&
          (() => {
            const w = reading.glossary.find((g) => g.word === open);
            if (!w) return null;
            return (
              <div className="explanation" style={{ marginTop: 12 }}>
                <div className="row-between">
                  <strong style={{ direction: "ltr" }}>
                    {w.word} <span className="pos">{w.partOfSpeech}</span>
                  </strong>
                  <button className="icon-btn" onClick={() => speak(w.word)}>
                    🔊
                  </button>
                </div>
                <p style={{ margin: "6px 0" }}>
                  <strong>תרגום:</strong> {w.translation} — {w.definition}
                </p>
                <button
                  className="btn small accent"
                  onClick={() =>
                    toggleSaveWord({
                      word: w.word,
                      partOfSpeech: w.partOfSpeech,
                      definition: w.definition,
                      example: w.example,
                      translation: w.translation,
                      level,
                    })
                  }
                >
                  {isWordSaved(w.word) ? "⭐ נשמר — הסר" : "☆ שמור לחזרה (+10)"}
                </button>
              </div>
            );
          })()}
      </div>

      <button className="btn" onClick={() => setPhase("quiz")}>
        לשאלות הבנה ←
      </button>
    </div>
  );
}
