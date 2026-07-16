import { useCallback, useEffect, useState } from "react";
import { useLingo } from "../store/useLingo";
import { generateListening } from "../services/content";
import { topicForTodayByLevel, LISTENING_TOPICS_BY_LEVEL } from "../data/topics";
import type { GemListening } from "../types";
import QuizRunner from "../components/QuizRunner";
import Spinner from "../components/Spinner";
import { speak, ttsSupported } from "../services/tts";
import { loadDailyCache, saveDailyCache } from "../utils/dailyCache";

const CACHE_KEY = "high5.listening_today";

export default function Listening() {
  const { progress, completeQuiz, learnedWords } = useLingo();
  const level = progress?.currentLevel ?? "A1";
  const [clip, setClip] = useState<GemListening | null>(null);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState<"listen" | "quiz" | "done">("listen");
  const [showText, setShowText] = useState(false);

  const load = useCallback(
    (force = false) => {
      setLoading(true);
      setPhase("listen");
      setShowText(false);
      if (!force) {
        const cached = loadDailyCache<GemListening>(CACHE_KEY, level);
        if (cached) {
          setClip(cached);
          setLoading(false);
          return;
        }
      }
      generateListening(
        level,
        topicForTodayByLevel(LISTENING_TOPICS_BY_LEVEL, level),
        Object.keys(learnedWords),
      )
        .then((c) => {
          setClip(c);
          saveDailyCache(CACHE_KEY, level, c);
        })
        .finally(() => setLoading(false));
    },
    [level, learnedWords],
  );

  useEffect(() => {
    load();
  }, [load]);

  if (!clip || loading) return <Spinner label="טוען תרגיל האזנה..." />;

  if (phase === "done") {
    return (
      <div className="celebrate">
        <div className="big">🎧</div>
        <h2>כל הכבוד!</h2>
        <div className="card" style={{ marginTop: 12 }}>
          <span className="tag">התמלול המלא</span>
          <pre className="explanation-text" style={{ direction: "ltr", textAlign: "left", marginTop: 8 }}>
            {clip.transcript}
          </pre>
          {clip.transcriptHe && (
            <pre className="explanation-text" style={{ marginTop: 8 }}>
              {clip.transcriptHe}
            </pre>
          )}
        </div>
        <button className="btn accent" onClick={() => load(true)} style={{ marginTop: 12 }}>
          תרגיל חדש 🔄
        </button>
      </div>
    );
  }

  if (phase === "quiz") {
    return (
      <QuizRunner
        questions={clip.questions}
        onFinish={(score) => {
          completeQuiz(level, "Listening", score, clip.questions.length);
          setPhase("done");
        }}
      />
    );
  }

  return (
    <div>
      <div className="card center">
        <div style={{ fontSize: 48 }}>🎧</div>
        <h3>הקשיבו היטב</h3>
        <p className="muted">נגנו את הקטע (אפשר לחזור), ונסו להבין לפני שתענו.</p>
        {!ttsSupported() && (
          <div className="banner">הדפדפן הזה לא תומך בהשמעה קולית.</div>
        )}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button className="btn" onClick={() => speak(clip.transcript)}>
            ▶️ נגן
          </button>
          <button className="btn secondary" onClick={() => speak(clip.transcript, "en-US", 0.6)}>
            🐢 לאט
          </button>
        </div>
        <button
          className="btn ghost small"
          style={{ marginTop: 10 }}
          onClick={() => setShowText((s) => !s)}
        >
          {showText ? "הסתר תמלול" : "הצג תמלול (לא חובה)"}
        </button>
        {showText && (
          <>
            <pre className="explanation-text" style={{ direction: "ltr", textAlign: "left", marginTop: 8 }}>
              {clip.transcript}
            </pre>
            {clip.transcriptHe && (
              <pre className="explanation-text" style={{ marginTop: 8 }}>
                {clip.transcriptHe}
              </pre>
            )}
          </>
        )}
      </div>

      <button className="btn" onClick={() => setPhase("quiz")}>
        לשאלות הבנה ←
      </button>
    </div>
  );
}
