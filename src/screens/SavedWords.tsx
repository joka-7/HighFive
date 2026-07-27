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
              <button
                className="icon-btn"
                aria-label={`השמע את המילה ${w.word}`}
                onClick={() => speak(w.word)}
              >
                <span aria-hidden="true">🔊</span>
              </button>
              <button
                className="icon-btn"
                title={w.isMastered ? "סמן כלא נלמד" : "סמן כנלמד"}
                aria-label={
                  w.isMastered ? `סמן את ${w.word} כלא נלמד` : `סמן את ${w.word} כנלמד`
                }
                aria-pressed={w.isMastered}
                onClick={() => toggleMastered(w.id)}
              >
                <span aria-hidden="true">{w.isMastered ? "✅" : "⬜"}</span>
              </button>
              <button
                className="icon-btn"
                title="מחק"
                aria-label={`מחק את ${w.word}`}
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
                <span aria-hidden="true">🗑️</span>
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
