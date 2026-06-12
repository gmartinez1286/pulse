"use client";

import { useEffect, useState } from "react";
import { GOAL_GAUGES } from "@/lib/mock/kpot-fairfax";
import { cn } from "@/lib/utils";

export function GoalGauges() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      {GOAL_GAUGES.map((gauge) => (
        <div key={gauge.label} className="mb-4 last:mb-0">
          <div className="mb-1.5 flex items-baseline justify-between text-xs font-semibold">
            <span>{gauge.label}</span>
            <span>
              {typeof gauge.current === "number" && gauge.current < 100
                ? `$${gauge.current.toFixed(2)}`
                : `${gauge.current} / ${gauge.target}`}{" "}
              <small className="font-medium text-muted">
                · {gauge.fill}%
              </small>
            </span>
          </div>
          <div className="relative h-[13px] overflow-hidden rounded-lg bg-gray-soft">
            <div
              className={cn(
                "h-full rounded-lg transition-[width] duration-[1200ms] ease-out",
                gauge.gold
                  ? "bg-gradient-to-r from-[#E8C658] to-gold"
                  : "bg-gradient-to-r from-accent to-teal"
              )}
              style={{ width: animated ? `${gauge.fill}%` : "0%" }}
            />
            <div
              className="absolute top-[-3px] bottom-[-3px] w-0.5 bg-ink opacity-50"
              style={{ left: `${gauge.pace}%` }}
            />
          </div>
          <div
            className={cn(
              "mt-1 text-[10.5px] font-semibold",
              gauge.statusColor === "positive" && "text-positive",
              gauge.statusColor === "warn" && "text-warn"
            )}
          >
            {gauge.status}
          </div>
        </div>
      ))}
    </div>
  );
}
