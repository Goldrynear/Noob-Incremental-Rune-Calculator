import type { SortDirection, SortKey } from "../../lib/types";

export function SortControls({
  sortKey,
  sortDirection,
  onSortKey,
  onSortDirection,
}: {
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSortKey: (key: SortKey) => void;
  onSortDirection: (direction: SortDirection) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <select
        className="h-9 rounded-md border border-white/10 bg-black/20 px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-300/35"
        value={sortKey}
        onChange={(event) => onSortKey(event.target.value as SortKey)}
      >
        <option value="eta">Sort by ETA</option>
        <option value="name">Sort by Name</option>
        <option value="chance">Sort by Chance</option>
        <option value="type">Sort by Category</option>
      </select>
      <select
        className="h-9 rounded-md border border-white/10 bg-black/20 px-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-300/35"
        value={sortDirection}
        onChange={(event) => onSortDirection(event.target.value as SortDirection)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
