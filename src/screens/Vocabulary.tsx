import { useEffect, useState } from "react";
import { useLingo } from "../store/useLingo";
import { generateLevelAdaptiveWords } from "../services/content";
import { dayIndex } from "../utils/daily";
import type { GemWord } from "../types";
import WordCard from "../components/WordCard";
import Spinner from "../components/Spinner";

export default function Vocabulary() {
  const { progress, isWordSaved, toggleSaveWord, markWordsLearned } = useLingo();
  const [words, setWords] = useState<GemWord[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // generateLevelAdaptiveWords is day-aligned, so pressing "refresh" used to
  // reload the exact same 5 words for offline users. Offsetting the day index
  // gives the refresh button a genuinely different set instead of appearing
  // broken; resets to 0 (today's real set) whenever the level changes.
  const [dayOffset, setDayOffset] = useState(0);
  const level = progress?.currentLevel ?? "A1";

  useEffect(() => {
    setDayOffset(0);
  }, [level]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    generateLevelAdaptiveWords(level, dayIndex() + dayOffset)
      .then((list) => {
        if (!active) return;
        setWords(list.words);
        markWordsLearned(list.words, level);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [level, dayOffset, markWordsLearned]);

  if (loading) return <Spinner label="טוען מילות היום..." />;

  if (error || !words) {
    return (
      <div className="card center">
        <h2>לא הצלחנו לטעון מילים</h2>
        <button className="btn mt-3" onClick={() => setDayOffset((o) => o + 1)}>
          נסו שוב 🔄
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="row-between mb-3">
        <span className="tag">מילות היום · רמה {level}</span>
        <button className="btn small accent" onClick={() => setDayOffset((o) => o + 1)}>
          🔄 רענן
        </button>
      </div>

      {words.map((w) => (
        <WordCard
          key={w.word}
          word={w}
          saved={isWordSaved(w.word)}
          onToggleSave={() =>
            toggleSaveWord({
              word: w.word,
              partOfSpeech: w.partOfSpeech,
              definition: w.definition,
              example: w.example,
              translation: w.translation,
              level,
            })
          }
        />
      ))}
    </div>
  );
}
