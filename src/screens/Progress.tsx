import { useLingo } from "../store/useLingo";
import { LEVELS } from "../types";

export default function Progress() {
  const { progress, savedWords, quizHistory, updateLevel } = useLingo();
  if (!progress) return null;

  const mastered = savedWords.filter((w) => w.isMastered).length;

  return (
    <div>
      <div className="stat-grid" style={{ marginBottom: 14 }}>
        <div className="stat-box">
          <div className="num">{progress.points}</div>
          <div className="lbl">נקודות ✨</div>
        </div>
        <div className="stat-box">
          <div className="num">{progress.streak}🔥</div>
          <div className="lbl">רצף ימים</div>
        </div>
        <div className="stat-box">
          <div className="num">{savedWords.length}</div>
          <div className="lbl">מילים שמורות</div>
        </div>
        <div className="stat-box">
          <div className="num">{mastered}</div>
          <div className="lbl">מילים שנלמדו</div>
        </div>
      </div>

      <div className="card">
        <h3>הרמה שלי</h3>
        <p className="muted">אפשר לשנות את הרמה בכל זמן.</p>
        <div className="level-row">
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              className={`level-pill ${progress.currentLevel === lvl ? "active" : ""}`}
              onClick={() => updateLevel(lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>היסטוריית חידונים</h3>
        {quizHistory.length === 0 ? (
          <p className="muted">עדיין לא עשית חידונים.</p>
        ) : (
          quizHistory.slice(0, 10).map((h) => (
            <div className="row-between" key={h.id} style={{ padding: "6px 0" }}>
              <span>
                {h.topic} · {h.level}
              </span>
              <strong>
                {h.score}/{h.totalQuestions}
              </strong>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
