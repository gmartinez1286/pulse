"use client";

import { HEATMAP_DATA } from "@/lib/mock/kpot-fairfax";
import { cn } from "@/lib/utils";

export function Heatmap() {
  const { days, cols, data } = HEATMAP_DATA;

  return (
    <div>
      <div
        className="grid gap-[5px] text-[10.5px]"
        style={{ gridTemplateColumns: "44px repeat(6, 1fr)" }}
      >
        <div />
        {cols.map((c) => (
          <div key={c} className="pb-0.5 text-center font-semibold text-muted">
            {c}
          </div>
        ))}
        {data.map((row, d) => (
          <div key={`row-${d}`} className="contents">
            <div className="flex items-center font-semibold text-muted">
              {days[d]}
            </div>
            {row.map((v, c) => {
              const best = (d === 3 && c === 4) || (d === 4 && c === 4);
              return (
                <div
                  key={`${d}-${c}`}
                  className={cn(
                    "flex h-[25px] items-center justify-center rounded-md bg-accent font-semibold",
                    best ? "outline-2 outline-gold text-ink" : "text-transparent hover:text-white hover:outline hover:outline-[1.5px] hover:outline-accent-text"
                  )}
                  style={{ opacity: 0.12 + 0.88 * (v / 100) }}
                  title={`${days[d]} ${cols[c]}: ${v}`}
                >
                  {v}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <p className="mt-2.5 text-[11px] text-muted">
        Peak: <b className="font-semibold text-gold">Thu–Fri 6–9 PM</b> · worst:
        weekday mornings · auto-feeds the content calendar
      </p>
    </div>
  );
}
