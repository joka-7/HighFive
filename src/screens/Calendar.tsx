import { useMemo, useState } from "react";
import { useLingo } from "../store/useLingo";
import {
  allMissions,
  buildMonthGrid,
  dateKeyFromTs,
  HEBREW_MONTHS,
  HEBREW_WEEKDAYS,
  MISSION_ICONS,
  missionsByDate,
} from "../utils/missions";

export default function Calendar() {
  const { progress, missionLog, quizHistory } = useLingo();
  const todayKey = dateKeyFromTs(Date.now());
  const [view, setView] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [selected, setSelected] = useState(todayKey);

  const missions = useMemo(
    () => allMissions(missionLog, quizHistory, progress),
    [missionLog, quizHistory, progress],
  );
  const byDate = useMemo(() => missionsByDate(missions), [missions]);
  const grid = useMemo(
    () => buildMonthGrid(view.year, view.month),
    [view.year, view.month],
  );
  const selectedMissions = byDate.get(selected) ?? [];
  const monthDone = grid.filter((c) => c.inMonth && (byDate.get(c.dateKey)?.length ?? 0) > 0)
    .length;

  function shiftMonth(delta: number) {
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  return (
    <div>
      <div className="card calendar-summary">
        <div className="row-between">
          <div>
            <div className="calendar-summary-num">{monthDone}</div>
            <div className="muted">ימים עם משימות החודש</div>
          </div>
          <div className="text-end">
            <div className="calendar-summary-num">{missions.length}</div>
            <div className="muted">סה״כ משימות</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="calendar-header">
          <button type="button" className="btn ghost small" onClick={() => shiftMonth(-1)}>
            →
          </button>
          <h3 className="m-0">
            {HEBREW_MONTHS[view.month]} {view.year}
          </h3>
          <button type="button" className="btn ghost small" onClick={() => shiftMonth(1)}>
            ←
          </button>
        </div>

        <div className="calendar-weekdays">
          {HEBREW_WEEKDAYS.map((d) => (
            <span key={d} className="calendar-weekday">
              {d}
            </span>
          ))}
        </div>

        <div className="calendar-grid">
          {grid.map((cell) => {
            const count = byDate.get(cell.dateKey)?.length ?? 0;
            const isToday = cell.dateKey === todayKey;
            const isSelected = cell.dateKey === selected;
            let cls = "calendar-day";
            if (!cell.inMonth) cls += " outside";
            if (count > 0) cls += " has-missions";
            if (isToday) cls += " today";
            if (isSelected) cls += " selected";

            return (
              <button
                key={cell.dateKey}
                type="button"
                className={cls}
                onClick={() => setSelected(cell.dateKey)}
                aria-label={`${cell.day} ${count ? `${count} משימות` : "ללא משימות"}`}
              >
                <span className="calendar-day-num">{cell.day}</span>
                {count > 0 && <span className="calendar-dot" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="card">
        <h3 className="mt-0">
          {selected === todayKey ? "היום" : selected.split("-").reverse().join(".")}
        </h3>
        {selectedMissions.length === 0 ? (
          <p className="muted">אין משימות שהושלמו ביום הזה.</p>
        ) : (
          <ul className="mission-list">
            {selectedMissions.map((m) => (
              <li key={m.id} className="mission-row">
                <span className="mission-ico">{MISSION_ICONS[m.kind]}</span>
                <span className="mission-label">{m.label}</span>
                {m.score !== undefined && m.total !== undefined && (
                  <span className="mission-score">
                    {m.score}/{m.total}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
