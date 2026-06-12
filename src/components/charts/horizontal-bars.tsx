"use client";

import { useEffect, useState } from "react";
export interface HorizontalBarItem {
  label: string;
  value: string;
  width: number;
  showBenchmark?: boolean;
}

export function HorizontalBars({
  items,
  benchmarkNote,
  animate = true,
}: {
  items: HorizontalBarItem[];
  benchmarkNote?: string;
  animate?: boolean;
}) {
  const [animated, setAnimated] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(t);
  }, [animate]);

  return (
    <div>
      {items.map((item) => (
        <div key={item.label} className="mb-3 last:mb-0">
          <div className="mb-1 flex justify-between text-xs font-semibold">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
          <div className="relative h-2.5 rounded-md bg-gray-soft">
            <div
              className="h-full rounded-md bg-gradient-to-r from-accent to-[#9D8CFF] transition-[width] duration-1000 ease-out"
              style={{ width: animated ? `${item.width}%` : "0%" }}
            />
            {item.showBenchmark && (
              <div
                className="absolute top-[-5px] bottom-[-5px] w-0.5 bg-gold"
                style={{ left: "41%" }}
              />
            )}
          </div>
        </div>
      ))}
      {benchmarkNote && (
        <p className="mt-2 text-[10.5px] text-muted">
          <span className="mr-1 inline-block h-0.5 w-2.5 align-middle bg-gold" />
          {benchmarkNote}
        </p>
      )}
    </div>
  );
}
