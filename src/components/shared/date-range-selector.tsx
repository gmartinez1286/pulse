"use client";

import { useDashboard } from "@/context/dashboard-context";
import type { DateRangeKey } from "@/lib/constants";
import { cn } from "@/lib/utils";

const options: { key: DateRangeKey; label: string }[] = [
  { key: "d30", label: "30d" },
  { key: "d14", label: "14d" },
  { key: "mtd", label: "This month" },
];

export function DateRangeSelector() {
  const { dateRange, setDateRange } = useDashboard();

  return (
    <div className="flex rounded-[9px] bg-gray-soft p-1">
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => setDateRange(opt.key)}
          className={cn(
            "cursor-pointer rounded-[7px] border-0 px-3 py-1.5 text-[12.5px] font-semibold transition-all",
            dateRange === opt.key
              ? "bg-surface-card text-ink shadow-card"
              : "bg-transparent text-muted"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
