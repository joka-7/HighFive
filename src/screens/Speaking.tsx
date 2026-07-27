import { useCallback, useEffect, useMemo, useState } from "react";
import { useLingo } from "../store/useLingo";
import { generateSpeaking } from "../services/content";
import { topicForTodayByLevel, SPEAKING_TOPICS_BY_LEVEL } from "../data/topics";
import type { GemSpeaking } from "../types";
import Spinner from "../components/Spinner";
import { speak } from "../services/tts";
import { asrSupported, recognizeOnce } from "../services/asr";
import { scoreSpeaking, type SpeakingScore } from "../utils/score";
import { loadDailyCache, saveDailyCache } from "../utils/dailyCache";

const CACHE_KEY = "high5.speaking_today.v5";

// Speaking practice — read a sentence aloud and get scored against speech
// recognition. Directly addresses the article's sharpest point: learners who
// never actually speak. ASR is a graceful enhancement; unsupported browsers
// still see the sentences and can practise with the model audio.
export default function Speaking() {
  const { progress, awardSpeakingPoints, logMission, learnedWords } = useLingo();
  const level = progress?.currentLevel ?? "A1";
  const topic = topicForTodayByLevel(SPEAKING_TOPICS_BY_LEVEL, level);
  const learnedKey = useMemo(
    () => Object.keys(learnedWords).sort().join(","),
    [learnedWords],
  );
  const [speakingSet, setSpeakingSet] = useState<GemSpeaking | null>(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState<(SpeakingScore & { heard: string }) | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSpeaking = useCallback(
    (force = false) => {
      setLoading(true);
      setResult(null);
      setError(null);

      if (!force) {
        const cached = loadDailyCache<GemSpeaking>(CACHE_KEY, level);
        if (cached?.prompts?.length) {
          setSpeakingSet(cached);
          setIndex(0);
          setLoading(false);
          return () => {};
        }
      }

      let active = true;
      generateSpeaking(level, topic, learnedKey ? learnedKey.split(",") : [])
        .then((set) => {
          if (!active) return;
          setSpeakingSet(set);
          setIndex(0);
          saveDailyCache(CACHE_KEY, level, set);
        })
        .catch(() => {
          if (!active) return;
          setSpeakingSet(null);
        })
        .finally(() => {
          if (active) setLoading(false);
        });

      return () => {
        active = false;
      };
    },
    [level, topic, learnedKey],
  );

  useEffect(() => {
    return fetchSpeaking();
  }, [fetchSpeaking]);

  const reload = useCallback(() => {
    if (speakingSet && index === speakingSet.prompts.length - 1) {
      logMission("speaking", "דיבור");
    }
    fetchSpeaking(true);
  }, [fetchSpeaking, index, logMission, speakingSet]);

  if (loading) return <Spinner label="טוען תרגול דיבור..." />;

  if (!speakingSet?.prompts?.length) {
    return (
      <div className="card center">
        <h2>לא הצלחנו לטעון תרגול דיבור</h2>
        <p className="muted">נסו שוב בעוד רגע.</p>
        <button className="btn" onClick={() => fetchSpeaking(true)} style={{ marginTop: 12 }}>
          נסו שוב 🔄
        </button>
      </div>
    );
  }

  const prompt = speakingSet.prompts[index];
  const isLast = index === speakingSet.prompts.length - 1;

  async function listen() {
    setError(null);
    setResult(null);
    setListening(true);
    try {
      const heard = await recognizeOnce();
      const s = scoreSpeaking(prompt.text, heard);
      setResult({ ...s, heard });
      awardSpeakingPoints(s.score);
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
        {speakingSet.prompts.map((_, i) => (
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
          משפט {index + 1}/{speakingSet.prompts.length}
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
        <button className="btn" onClick={reload}>
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
