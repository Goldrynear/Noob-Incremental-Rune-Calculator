import type { SortDirection, SortKey } from "../../lib/types";
import { Select } from "../ui/Select";

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
      <Select
        value={sortKey}
        onChange={(event) => onSortKey(event.target.value as SortKey)}
      >
        <option value="eta">Sort by ETA</option>
        <option value="name">Sort by Name</option>
        <option value="chance">Sort by Chance</option>
        <option value="type">Sort by Category</option>
      </Select>
      <Select
        value={sortDirection}
        onChange={(event) => onSortDirection(event.target.value as SortDirection)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </Select>
    </div>
  );
}
