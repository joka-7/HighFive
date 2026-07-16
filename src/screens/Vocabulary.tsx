import { useCallback, useEffect, useState } from "react";
import { useLingo } from "../store/useLingo";
import { generateLevelAdaptiveWords } from "../services/content";
import type { GemWord } from "../types";
import WordCard from "../components/WordCard";
import Spinner from "../components/Spinner";

export default function Vocabulary() {
  const { progress, isWordSaved, toggleSaveWord, markWordsLearned } = useLingo();
  const [words, setWords] = useState<GemWord[] | null>(null);
  const [loading, setLoading] = useState(false);
  const level = progress?.currentLevel ?? "A1";

  const refresh = useCallback(() => {
    setLoading(true);
    generateLevelAdaptiveWords(level)
      .then((list) => {
        setWords(list.words);
        markWordsLearned(list.words, level);
      })
      .finally(() => setLoading(false));
  }, [level, markWordsLearned]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (!words || loading) return <Spinner label="טוען מילות היום..." />;

  return (
    <div>
      <div className="row-between" style={{ marginBottom: 12 }}>
        <span className="tag">מילות היום · רמה {level}</span>
        <button className="btn small accent" onClick={refresh}>
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
