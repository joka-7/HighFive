import type { Screen } from "../types";

// One entry in the hub's tile grid. Extracted from Dashboard so the grid has a
// single implementation and tiles can be described as data (see
// DASHBOARD_SECTIONS) rather than repeated JSX.

export interface TileSpec {
  screen: Screen;
  emoji: string;
  title: string;
  sub: string;
}

export default function Tile({
  tile,
  onClick,
  badge,
}: {
  tile: TileSpec;
  onClick: () => void;
  /** Count shown in the corner (e.g. words due for review); hidden when 0. */
  badge?: number;
}) {
  return (
    <button className={`menu-tile skill-${tile.screen}`} onClick={onClick}>
      {badge !== undefined && badge > 0 && <span className="tile-badge">{badge}</span>}
      <span className="emoji">{tile.emoji}</span>
      <span className="title">{tile.title}</span>
      <span className="sub">{tile.sub}</span>
    </button>
  );
}
