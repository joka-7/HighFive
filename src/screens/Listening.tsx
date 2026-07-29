import { useCallback, useEffect, useMemo, useState } from "react";
import { useLingo } from "../store/useLingo";
import { generateListening } from "../services/content";
import type { GemListening } from "../types";
import QuizRunner from "../components/QuizRunner";
import Spinner from "../components/Spinner";
import { speak, ttsSupported } from "../services/tts";
import { loadDailyCache, saveDailyCache } from "../utils/dailyCache";

const CACHE_KEY = "high5.listening_today.v5";

export default function Listening() {
  const { progress, completeQuiz, learnedWords } = useLingo();
  const level = progress?.currentLevel ?? "A1";
  const learnedKey = useMemo(
    () => Object.keys(learnedWords).sort().join(","),
    [learnedWords],
  );
  const [clip, setClip] = useState<GemListening | null>(null);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<"listen" | "quiz" | "done">("listen");
  const [showText, setShowText] = useState(false);

  const load = useCallback(
    (force = false) => {
      setLoading(true);
      setPhase("listen");
      setShowText(false);

      if (!force) {
        const cached = loadDailyCache<GemListening>(CACHE_KEY, level);
        if (cached?.transcript) {
          setClip(cached);
          setLoading(false);
          return () => {};
        }
      }

      let active = true;
      generateListening(
        level,
        learnedKey ? learnedKey.split(",") : [],
      )
        .then((c) => {
          if (!active) return;
          setClip(c);
          saveDailyCache(CACHE_KEY, level, c);
        })
        .catch(() => {
          if (!active) return;
          setClip(null);
        })
        .finally(() => {
          if (active) setLoading(false);
        });

      return () => {
        active = false;
      };
    },
    [level, learnedKey],
  );

  useEffect(() => {
    return load();
  }, [load]);

  if (loading) return <Spinner label="טוען תרגיל האזנה..." />;

  if (!clip?.transcript) {
    return (
      <div className="card center">
        <h2>לא הצלחנו לטעון תרגיל האזנה</h2>
        <button className="btn mt-3" onClick={() => load(true)}>
          נסו שוב 🔄
        </button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="celebrate">
        <div className="big">🎧</div>
        <h2>כל הכבוד!</h2>
        <div className="card mt-3">
          <span className="tag">התמלול המלא</span>
          <pre className="explanation-text ltr mt-2">
            {clip.transcript}
          </pre>
          {clip.transcriptHe && (
            <pre className="explanation-text mt-2">
              {clip.transcriptHe}
            </pre>
          )}
        </div>
        <button className="btn accent mt-3" onClick={() => load(true)}>
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
        <div className="emoji-xl">🎧</div>
        <h3>הקשיבו היטב</h3>
        <p className="muted">נגנו את הקטע (אפשר לחזור), ונסו להבין לפני שתענו.</p>
        {!ttsSupported() && (
          <div className="banner">הדפדפן הזה לא תומך בהשמעה קולית.</div>
        )}
        <div className="icon-row mt-2">
          <button className="btn" onClick={() => speak(clip.transcript)}>
            ▶️ נגן
          </button>
          <button className="btn secondary" onClick={() => speak(clip.transcript, "en-US", 0.6)}>
            🐢 לאט
          </button>
        </div>
        <button
          className="btn ghost small mt-2_5"
          onClick={() => setShowText((s) => !s)}
        >
          {showText ? "הסתר תמלול" : "הצג תמלול (לא חובה)"}
        </button>
        {showText && (
          <>
            <pre className="explanation-text ltr mt-2">
              {clip.transcript}
            </pre>
            {clip.transcriptHe && (
              <pre className="explanation-text mt-2">
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
