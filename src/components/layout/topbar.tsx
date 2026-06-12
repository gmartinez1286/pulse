"use client";

import { usePathname } from "next/navigation";
import { PAGE_META } from "@/lib/constants";
import { DateRangeSelector } from "@/components/shared/date-range-selector";
import { Button } from "@/components/ui/button";

function getPageKey(pathname: string): string {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment || "overview";
}

export function Topbar() {
  const pathname = usePathname();
  const pageKey = getPageKey(pathname);
  const meta = PAGE_META[pageKey] ?? PAGE_META.overview;

  return (
    <div className="no-print rv mb-5 flex flex-wrap items-center gap-3.5 opacity-0 animate-rise">
      <div>
        <div className="text-[12.5px] font-medium text-muted">
          Analytics › {meta.section}
        </div>
        <div className="mt-0.5 text-lg font-[650] tracking-tight text-ink">
          {meta.title}
        </div>
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-[20px] bg-positive-soft px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-positive">
        <span className="h-[7px] w-[7px] animate-pulse-dot rounded-full bg-positive" />
        LIVE
      </span>
      <div className="ml-auto flex items-center gap-2.5">
        {meta.showDateRange && <DateRangeSelector />}
        <Button variant="default" onClick={() => window.print()}>
          ⤓ Snapshot
        </Button>
      </div>
    </div>
  );
}
