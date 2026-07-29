import { useLingo } from "../store/useLingo";
import { LEVELS } from "../types";
import {
  countLearnedAtLevel,
  countMastered,
  countMasteredAtLevel,
  LEARNED_TO_ADVANCE,
  MASTERED_TO_ADVANCE,
  nextLevel,
} from "../utils/levelProgress";
import { allMissions } from "../utils/missions";
import { missionsPerDay, quizScorePerDay } from "../utils/progressCharts";
import MiniBarChart from "../components/MiniBarChart";

export default function Progress() {
  const {
    progress,
    savedWords,
    quizHistory,
    missionLog,
    learnedWords,
    updateLevel,
  } = useLingo();
  if (!progress) return null;

  const level = progress.currentLevel;
  // Same definition of "mastered" used everywhere else on this screen (and in
  // levelProgress.ts): manually marked OR reached the top SRS box.
  const mastered = countMastered(savedWords);
  const learnedAtLevel = countLearnedAtLevel(learnedWords, level);
  const masteredAtLevel = countMasteredAtLevel(savedWords, level);
  const learnedGoal = LEARNED_TO_ADVANCE[level];
  const masteredGoal = MASTERED_TO_ADVANCE[level];
  const upcoming = nextLevel(level);

  const merged = allMissions(missionLog, quizHistory, progress);
  const missionSeries = missionsPerDay(merged, 14);
  const quizSeries = quizScorePerDay(quizHistory, 14);

  return (
    <div>
      <div className="stat-grid mb-4">
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

      <MiniBarChart title="משימות ליום" series={missionSeries} />
      <MiniBarChart title="ציון ממוצע בחידונים" series={quizSeries} maxValue={100} unit="%" />

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
          <p className="muted mb-3">
            מילים שנלמדו ברמה {level}: {learnedAtLevel}/{learnedGoal} · מילים שמורות בשליטה:{" "}
            {masteredAtLevel}/{masteredGoal}
          </p>
          <div className="mb-2">
            <div className="muted fs-13 mb-1">
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
            <div className="muted fs-13 mb-1">
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
            <div className="row-between py-row" key={h.id}>
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
