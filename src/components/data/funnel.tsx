"use client";

import { useEffect, useState } from "react";
import { FUNNEL_STAGES } from "@/lib/mock/kpot-fairfax";
import { fmtInt } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

export function Funnel() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-[7px]">
      {FUNNEL_STAGES.map((stage) => (
        <div
          key={stage.label}
          className="grid grid-cols-[150px_1fr_105px] items-center gap-3.5"
        >
          <div className="text-[11.5px] font-semibold text-muted">
            {stage.label}
            <b className="mt-0 block text-[15px] font-semibold tabular-nums text-ink">
              {fmtInt(stage.value)}
            </b>
          </div>
          <div
            className={cn(
              "relative h-8 overflow-hidden rounded-[9px] bg-gray-soft",
              stage.offline && "rounded-[9px] border border-dashed border-warn"
            )}
          >
            <div
              className="flex h-full items-center whitespace-nowrap rounded-[9px] pl-3 text-[11px] font-semibold text-white transition-[width] duration-[1100ms] ease-out"
              style={{
                width: animated ? `${stage.width}%` : "0%",
                background: stage.color,
                color: stage.offline ? "#1A1F36" : "#fff",
              }}
            >
              {stage.offline ? `${stage.value} · $9.05` : stage.width === 100 ? "100%" : fmtInt(stage.value)}
            </div>
          </div>
          <div
            className={cn(
              "text-right text-[11.5px] font-semibold",
              stage.offline ? "text-gold" : "text-accent-text"
            )}
          >
            {stage.conversion}
            <small className="block font-medium text-muted">
              {stage.conversionLabel}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}
