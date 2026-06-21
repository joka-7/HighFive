import { useLingo } from "../store/useLingo";
import { speak } from "../services/tts";

export default function SavedWords() {
  const { savedWords, toggleSaveWord, toggleMastered } = useLingo();

  if (savedWords.length === 0) {
    return (
      <div className="card center">
        <div style={{ fontSize: 48 }}>⭐</div>
        <h2>אין מילים שמורות עדיין</h2>
        <p className="muted">
          שמור מילים ממסך אוצר המילים כדי לחזור עליהן כאן.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="center">מילים שמורות ({savedWords.length})</h2>
      {savedWords.map((w) => (
        <div className="card" key={w.id} style={{ opacity: w.isMastered ? 0.6 : 1 }}>
          <div className="word-head">
            <div>
              <div className="word-en">{w.word}</div>
              <div className="pos">
                {w.partOfSpeech} · {w.level}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="icon-btn" onClick={() => speak(w.word)}>
                🔊
              </button>
              <button
                className="icon-btn"
                title={w.isMastered ? "סמן כלא נלמד" : "סמן כנלמד"}
                onClick={() => toggleMastered(w.id)}
              >
                {w.isMastered ? "✅" : "⬜"}
              </button>
              <button
                className="icon-btn"
                title="מחק"
                onClick={() =>
                  toggleSaveWord({
                    word: w.word,
                    partOfSpeech: w.partOfSpeech,
                    definition: w.definition,
                    example: w.example,
                    translation: w.translation,
                    level: w.level,
                  })
                }
              >
                🗑️
              </button>
            </div>
          </div>
          <p style={{ margin: "8px 0 0" }}>
            <strong>תרגום:</strong> {w.translation}
          </p>
          <div className="word-example">💬 {w.example}</div>
        </div>
      ))}
    </div>
  );
}
