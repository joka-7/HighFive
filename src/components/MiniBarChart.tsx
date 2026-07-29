import type { DayCount } from "../utils/progressCharts";

interface Props {
  title: string;
  series: DayCount[];
  /** When set, bars are scaled against this max (e.g. 100 for percents). */
  maxValue?: number;
  unit?: string;
}

/** Tiny SVG bar chart — no chart library. */
export default function MiniBarChart({ title, series, maxValue, unit }: Props) {
  const peak = Math.max(maxValue ?? 0, ...series.map((s) => s.value), 1);
  const w = 280;
  const h = 96;
  const pad = 8;
  const barGap = 2;
  const barW = (w - pad * 2) / series.length - barGap;

  return (
    <div className="card">
      <h3>{title}</h3>
      {series.every((s) => s.value === 0) ? (
        <p className="muted">עדיין אין נתונים לתקופה הזו.</p>
      ) : (
        <>
          <svg
            viewBox={`0 0 ${w} ${h}`}
            width="100%"
            role="img"
            aria-label={title}
            className="block-center mt-2"
          >
            {series.map((s, i) => {
              const bh = (s.value / peak) * (h - 28);
              const x = pad + i * (barW + barGap);
              const y = h - 18 - bh;
              return (
                <g key={s.dateKey}>
                  <rect
                    x={x}
                    y={y}
                    width={barW}
                    height={Math.max(bh, s.value > 0 ? 2 : 0)}
                    rx={2}
                    fill="var(--primary)"
                    opacity={s.value === 0 ? 0.15 : 0.9}
                  >
                    <title>
                      {s.dateKey}: {s.value}
                      {unit ?? ""}
                    </title>
                  </rect>
                  <text
                    x={x + barW / 2}
                    y={h - 4}
                    textAnchor="middle"
                    fontSize="9"
                    fill="var(--muted, #888)"
                  >
                    {s.label}
                  </text>
                </g>
              );
            })}
          </svg>
          <p className="muted fs-12 mt-1">
            14 הימים האחרונים
            {unit ? ` · ${unit}` : ""}
          </p>
        </>
      )}
    </div>
  );
}
