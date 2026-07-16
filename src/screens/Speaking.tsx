import { useCallback, useEffect, useState } from "react";
import { useLingo } from "../store/useLingo";
import { generateSpeaking } from "../services/content";
import { topicForToday, SPEAKING_TOPICS } from "../data/topics";
import type { GemSpeaking } from "../types";
import Spinner from "../components/Spinner";
import { speak } from "../services/tts";
import { asrSupported, recognizeOnce } from "../services/asr";
import { scoreSpeaking, type SpeakingScore } from "../utils/score";

// Speaking practice — read a sentence aloud and get scored against speech
// recognition. Directly addresses the article's sharpest point: learners who
// never actually speak. ASR is a graceful enhancement; unsupported browsers
// still see the sentences and can practise with the model audio.
export default function Speaking() {
  const { progress, addPoints, logMission } = useLingo();
  const level = progress?.currentLevel ?? "A1";
  const [set, setSet] = useState<GemSpeaking | null>(null);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState<(SpeakingScore & { heard: string }) | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setIndex((prev) => {
      if (set && prev === set.prompts.length - 1) {
        logMission("speaking", "דיבור");
      }
      return 0;
    });
    setResult(null);
    setError(null);
    generateSpeaking(level, topicForToday(SPEAKING_TOPICS))
      .then(setSet)
      .finally(() => setLoading(false));
  }, [level, logMission, set]);

  useEffect(() => {
    load();
  }, [load]);

  if (!set || loading) return <Spinner label="טוען תרגול דיבור..." />;

  const prompt = set.prompts[index];
  const isLast = index === set.prompts.length - 1;

  async function listen() {
    setError(null);
    setResult(null);
    setListening(true);
    try {
      const heard = await recognizeOnce();
      const s = scoreSpeaking(prompt.text, heard);
      setResult({ ...s, heard });
      // Award points scaled by accuracy (up to +20 per sentence).
      addPoints(Math.round((s.score / 100) * 20));
    } catch {
      setError("לא הצלחנו לקלוט את הקול. ודאו שהמיקרופון מאופשר ונסו שוב.");
    } finally {
      setListening(false);
    }
  }

  function nextPrompt() {
    setResult(null);
    setError(null);
    setIndex((i) => i + 1);
  }

  return (
    <div>
      <div className="progress-dots">
        {set.prompts.map((_, i) => (
          <span
            key={i}
            className={`dot ${i < index ? "done" : i === index ? "current" : ""}`}
          />
        ))}
      </div>

      {!asrSupported() && (
        <div className="banner">
          הדפדפן הזה לא תומך בזיהוי דיבור. אפשר עדיין להאזין למשפט ולתרגל הגייה
          בקול. לחוויה מלאה השתמשו ב-Chrome.
        </div>
      )}

      <div className="card center">
        <span className="tag">
          משפט {index + 1}/{set.prompts.length}
        </span>
        <h3 style={{ direction: "ltr", margin: "12px 0 4px" }}>{prompt.text}</h3>
        <p className="muted">{prompt.translation}</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 8 }}>
          <button className="btn secondary" onClick={() => speak(prompt.text)}>
            🔊 שמעו אותי
          </button>
          {asrSupported() && (
            <button className="btn accent" disabled={listening} onClick={listen}>
              {listening ? "🎤 מקשיב..." : "🎤 דברו"}
            </button>
          )}
        </div>

        {error && <div className="banner" style={{ marginTop: 12 }}>{error}</div>}

        {result && (
          <div className="explanation" style={{ marginTop: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: "var(--primary)" }}>
              {result.score}%
            </div>
            <p style={{ margin: "4px 0", direction: "ltr" }}>
              <strong>שמענו:</strong> {result.heard || "—"}
            </p>
            {result.missed.length > 0 ? (
              <p className="muted" style={{ direction: "ltr" }}>
                מילים שכדאי לחזק: {result.missed.join(", ")}
              </p>
            ) : (
              <p className="muted">מצוין! נשמע מדויק 🎉</p>
            )}
          </div>
        )}
      </div>

      {isLast ? (
        <button className="btn" onClick={load}>
          סבב חדש 🔄
        </button>
      ) : (
        <button className="btn" onClick={nextPrompt}>
          המשפט הבא ←
        </button>
      )}
    </div>
  );
}
