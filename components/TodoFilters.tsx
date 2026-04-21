"use client";

type Filter = "all" | "active" | "completed";
type Sort = "date" | "priority";

type TodoFiltersProps = {
  filter: Filter;
  sort: Sort;
  onFilterChange: (nextFilter: Filter) => void;
  onSortChange: (nextSort: Sort) => void;
};

const filters: Array<{ label: string; value: Filter }> = [
  { label: "ALL", value: "all" },
  { label: "ACTIVE", value: "active" },
  { label: "DONE", value: "completed" },
];

export default function TodoFilters({
  filter,
  sort,
  onFilterChange,
  onSortChange,
}: TodoFiltersProps) {
  return (
    <div className="flex flex-col gap-3 border-4 border-black bg-white p-3">
      <div className="grid grid-cols-3 gap-2">
        {filters.map((tab) => {
          const active = tab.value === filter;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onFilterChange(tab.value)}
              className={`border-2 border-black px-2 py-2 font-mono text-xs uppercase transition-transform hover:translate-x-[2px] hover:translate-y-[2px] ${
                active ? "bg-[#f55033] text-white" : "bg-white text-black"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-mono text-xs uppercase">Sort</span>
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as Sort)}
          className="appearance-none border-2 border-black bg-white px-3 py-2 font-mono text-xs uppercase focus:outline-none"
          aria-label="Sort todos"
        >
          <option value="date">BY DATE</option>
          <option value="priority">BY PRIORITY</option>
        </select>
      </div>
    </div>
  );
}
