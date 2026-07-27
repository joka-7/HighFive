import { useMemo, useState } from "react";
import { useLingo } from "../store/useLingo";
import { speak } from "../services/tts";
import type { SavedWord } from "../types";

type Filter = "all" | "due" | "mastered" | "active";
type Sort = "alpha" | "recent" | "review";

function isDue(w: SavedWord, now: number): boolean {
  if (w.isMastered) return false;
  return (w.nextReviewAt ?? 0) <= now;
}

export default function SavedWords() {
  const { savedWords, toggleSaveWord, toggleMastered } = useLingo();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("recent");

  const now = Date.now();
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = savedWords.filter((w) => {
      if (filter === "due" && !isDue(w, now)) return false;
      if (filter === "mastered" && !w.isMastered) return false;
      if (filter === "active" && w.isMastered) return false;
      if (!q) return true;
      return (
        w.word.toLowerCase().includes(q) ||
        w.translation.toLowerCase().includes(q) ||
        w.definition.toLowerCase().includes(q)
      );
    });
    list = [...list].sort((a, b) => {
      if (sort === "alpha") return a.word.localeCompare(b.word);
      if (sort === "review") {
        return (a.nextReviewAt ?? 0) - (b.nextReviewAt ?? 0);
      }
      return b.savedAt - a.savedAt;
    });
    return list;
  }, [savedWords, query, filter, sort, now]);

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
      <h2 className="center">מילים שמורות ({visible.length}/{savedWords.length})</h2>

      <div className="card">
        <label className="field">
          <span>חיפוש</span>
          <input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="מילה או תרגום…"
            aria-label="חיפוש במילים שמורות"
          />
        </label>
        <div className="level-row" style={{ marginBottom: 8 }} role="group" aria-label="סינון">
          {(
            [
              ["all", "הכל"],
              ["due", "לחזרה"],
              ["active", "פעילות"],
              ["mastered", "נלמדו"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              className={`level-pill ${filter === id ? "active" : ""}`}
              onClick={() => setFilter(id)}
              aria-pressed={filter === id}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="level-row" role="group" aria-label="מיון">
          {(
            [
              ["recent", "חדשות"],
              ["alpha", "א״ב"],
              ["review", "תאריך חזרה"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              className={`level-pill ${sort === id ? "active" : ""}`}
              onClick={() => setSort(id)}
              aria-pressed={sort === id}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="card center">
          <p className="muted">אין מילים שתואמות לחיפוש או לסינון.</p>
        </div>
      ) : (
        visible.map((w) => (
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
        ))
      )}
    </div>
  );
}
