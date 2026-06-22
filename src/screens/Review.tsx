import { useMemo, useState } from "react";
import { useLingo } from "../store/useLingo";
import { speak } from "../services/tts";

// Spaced-repetition review: walk the words that are due today, reveal the
// Hebrew side, and self-grade "knew it / didn't". Grading reschedules the word
// via the Leitner logic in the store (reviewWord).
export default function Review() {
  const { dueWords, reviewWord } = useLingo();
  // Snapshot the due queue once on mount so grading doesn't reshuffle the list
  // mid-session (reviewed words drop out only on the next visit).
  const queue = useMemo(() => dueWords(), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(0);

  if (queue.length === 0) {
    return (
      <div className="card center">
        <div style={{ fontSize: 48 }}>🌱</div>
        <h2>אין מילים לחזרה כרגע</h2>
        <p className="muted">
          שמור מילים חדשות ממסך אוצר המילים, או חזור מאוחר יותר — נזכיר לך כשמילים
          יהיו מוכנות לחזרה.
        </p>
      </div>
    );
  }

  if (index >= queue.length) {
    return (
      <div className="celebrate">
        <div className="big">🎉</div>
        <h2>סיימת את החזרה!</h2>
        <p className="muted">חזרת על {done} מילים. כל הכבוד!</p>
      </div>
    );
  }

  const word = queue[index];

  function grade(remembered: boolean) {
    reviewWord(word.id, remembered);
    setDone((d) => d + 1);
    setRevealed(false);
    setIndex((i) => i + 1);
  }

  return (
    <div>
      <div className="progress-dots">
        {queue.map((_, i) => (
          <span
            key={i}
            className={`dot ${i < index ? "done" : i === index ? "current" : ""}`}
          />
        ))}
      </div>

      <div className="card center">
        <span className="tag">
          חזרה {index + 1}/{queue.length}
        </span>
        <div className="word-en" style={{ margin: "16px 0 4px" }}>
          {word.word}
        </div>
        <div className="pos">{word.partOfSpeech}</div>
        <button
          className="icon-btn"
          title="השמע"
          style={{ margin: "10px auto" }}
          onClick={() => speak(word.word)}
        >
          🔊
        </button>

        {revealed ? (
          <>
            <p style={{ margin: "8px 0 0" }}>
              <strong>תרגום:</strong> {word.translation}
            </p>
            <p className="muted" style={{ margin: "4px 0" }}>
              {word.definition}
            </p>
            <div className="word-example" onClick={() => speak(word.example)}>
              💬 {word.example}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn secondary" onClick={() => grade(false)}>
                לא זכרתי 🔁
              </button>
              <button className="btn accent" onClick={() => grade(true)}>
                זכרתי! ✓ (+5)
              </button>
            </div>
          </>
        ) : (
          <button className="btn" style={{ marginTop: 12 }} onClick={() => setRevealed(true)}>
            הצג תרגום 👁️
          </button>
        )}
      </div>
    </div>
  );
}
