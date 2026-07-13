import { useCallback, useEffect, useState } from "react";
import { useLingo } from "../store/useLingo";
import { generateLevelAdaptiveWords } from "../services/content";
import type { GemWord } from "../types";
import WordCard from "../components/WordCard";
import Spinner from "../components/Spinner";
import { loadDailyCache, saveDailyCache } from "../utils/dailyCache";

const CACHE_KEY = "high5.vocabulary_today";

export default function Vocabulary() {
  const { progress, isWordSaved, toggleSaveWord } = useLingo();
  const [words, setWords] = useState<GemWord[] | null>(null);
  const [loading, setLoading] = useState(false);
  const level = progress?.currentLevel ?? "A1";

  // Reuses today's word set on every remount (the screen unmounts on tab
  // switches) so a saved-word count doesn't jump between different sets.
  // The "מילים חדשות" button explicitly asks for a fresh set.
  const refresh = useCallback(
    (force = false) => {
      setLoading(true);
      if (!force) {
        const cached = loadDailyCache<GemWord[]>(CACHE_KEY, level);
        if (cached) {
          setWords(cached);
          setLoading(false);
          return;
        }
      }
      generateLevelAdaptiveWords(level)
        .then((list) => {
          setWords(list.words);
          saveDailyCache(CACHE_KEY, level, list.words);
        })
        .finally(() => setLoading(false));
    },
    [level],
  );

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  if (!words || loading) return <Spinner label="טוען מילים..." />;

  return (
    <div>
      <div className="row-between" style={{ marginBottom: 12 }}>
        <span className="tag">רמה {level}</span>
        <button className="btn small accent" onClick={() => refresh(true)}>
          🔄 מילים חדשות
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
