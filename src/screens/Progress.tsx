import { useLingo } from "../store/useLingo";
import { LEVELS } from "../types";
import {
  countLearnedAtLevel,
  countMasteredAtLevel,
  LEARNED_TO_ADVANCE,
  MASTERED_TO_ADVANCE,
  nextLevel,
} from "../utils/levelProgress";

export default function Progress() {
  const { progress, savedWords, quizHistory, learnedWords, updateLevel } = useLingo();
  if (!progress) return null;

  const level = progress.currentLevel;
  const mastered = savedWords.filter((w) => w.isMastered).length;
  const learnedAtLevel = countLearnedAtLevel(learnedWords, level);
  const masteredAtLevel = countMasteredAtLevel(savedWords, level);
  const learnedGoal = LEARNED_TO_ADVANCE[level];
  const masteredGoal = MASTERED_TO_ADVANCE[level];
  const upcoming = nextLevel(level);

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
        <p className="muted">אפשר לשנות את הרמה בכל זמן, או לעלות אוטומטית כשמסיימים את שלב הרמה.</p>
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

      {upcoming && (
        <div className="card">
          <h3>התקדמות לרמה {upcoming}</h3>
          <p className="muted" style={{ marginBottom: 12 }}>
            מילים שנלמדו ברמה {level}: {learnedAtLevel}/{learnedGoal} · מילים שמורות בשליטה:{" "}
            {masteredAtLevel}/{masteredGoal}
          </p>
          <div style={{ marginBottom: 8 }}>
            <div className="muted" style={{ fontSize: 13, marginBottom: 4 }}>
              מילים חדשות ברמה {level}
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(100, (learnedAtLevel / learnedGoal) * 100)}%` }}
              />
            </div>
          </div>
          <div>
            <div className="muted" style={{ fontSize: 13, marginBottom: 4 }}>
              מילים שמורות בשליטה
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(100, (masteredAtLevel / masteredGoal) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

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
