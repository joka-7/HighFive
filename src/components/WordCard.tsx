import type { GemWord } from "../types";
import { speak } from "../services/tts";

interface Props {
  word: GemWord;
  saved: boolean;
  onToggleSave: () => void;
}

export default function WordCard({ word, saved, onToggleSave }: Props) {
  return (
    <div className="card">
      <div className="word-head">
        <div>
          <div className="word-en">{word.word}</div>
          <div className="pos">{word.partOfSpeech}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="icon-btn"
            title="השמע"
            aria-label={`השמע את המילה ${word.word}`}
            onClick={() => speak(word.word)}
          >
            <span aria-hidden="true">🔊</span>
          </button>
          <button
            className="icon-btn"
            title={saved ? "הסר מהשמורים" : "שמור מילה (+10)"}
            aria-label={saved ? `הסר את ${word.word} מהשמורים` : `שמור את ${word.word}`}
            aria-pressed={saved}
            onClick={onToggleSave}
          >
            <span aria-hidden="true">{saved ? "⭐" : "☆"}</span>
          </button>
        </div>
      </div>

      <p style={{ margin: "8px 0 0" }}>
        <strong>תרגום:</strong> {word.translation}
      </p>
      <p className="muted" style={{ margin: "4px 0" }}>
        {word.definition}
      </p>
      <div className="word-example" onClick={() => speak(word.example)}>
        💬 {word.example}
      </div>
    </div>
  );
}
