import type { GemWord, SkillType } from "../types";
import { speak } from "../services/tts";

const SKILL_LABEL: Record<SkillType, string> = {
  receptive: "להבנה (קריאה ושמיעה)",
  productive: "לשימוש פעיל (דיבור וכתיבה)",
};

/** "Band II · לשימוש פעיל", from whichever curriculum tags the word has. */
function curriculumLabel(word: GemWord): string {
  return [word.band && `Band ${word.band}`, word.skillType && SKILL_LABEL[word.skillType]].filter(Boolean).join(" · ");
}

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
          <div className="word-en" lang="en">{word.word}</div>
          <div className="pos">{word.partOfSpeech}</div>
          {curriculumLabel(word) && <div className="pos">{curriculumLabel(word)}</div>}
        </div>
        <div className="icon-row">
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

      <p className="mt-word">
        <strong>תרגום:</strong> {word.translation}
      </p>
      <p className="muted my-tight">
        {word.definition}
      </p>
      {word.wordFamily && (
        <p className="muted fs-13 my-tight">
          <strong>משפחת מילים:</strong> <span lang="en">{word.wordFamily}</span>
        </p>
      )}
      {word.contextNote && <p className="muted fs-13 my-tight">💡 {word.contextNote}</p>}
      <div className="word-example" onClick={() => speak(word.example)}>
        💬 {word.example}
      </div>
    </div>
  );
}
