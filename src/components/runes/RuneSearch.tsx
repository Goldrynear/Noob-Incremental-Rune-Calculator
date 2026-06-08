import { Search } from "lucide-react";
import { Input } from "../ui/Input";

export function RuneSearch({ search, onSearch }: { search: string; onSearch: (search: string) => void }) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
      <Input className="pl-9" placeholder="Search name, category, class, or chance..." value={search} onChange={(event) => onSearch(event.target.value)} />
    </div>
  );
}
