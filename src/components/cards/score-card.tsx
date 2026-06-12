"use client";

import { useEffect, useState } from "react";
import { PERFORMANCE_SCORE } from "@/lib/mock/kpot-fairfax";

const RADIUS = 60;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScoreCard({ delay = 0.05 }: { delay?: number }) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const duration = 1300;
    const startDelay = 150;
    let frame = 0;

    const animate = () => {
      const t0 = performance.now();

      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - k, 3);
        setScore(PERFORMANCE_SCORE * eased);
        if (k < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    const timeout = setTimeout(animate, startDelay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, []);

  const arcOffset = CIRCUMFERENCE * (1 - score / 100);

  return (
    <div
      className="flex min-h-[340px] flex-col items-center justify-center rounded-card border border-line bg-gradient-to-br from-surface-card to-surface-card2 p-[19px_21px] text-center shadow-card opacity-0 animate-rise"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-[10.5px] font-bold uppercase tracking-[1.4px] text-muted">
        Performance Score
      </div>

      <div className="relative my-[13px] h-[140px] w-[140px] shrink-0">
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          className="-rotate-90"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#635BFF" />
              <stop offset="100%" stopColor="#00B8AC" />
            </linearGradient>
          </defs>
          <circle
            cx="70"
            cy="70"
            r={RADIUS}
            fill="none"
            stroke="#F1F3F5"
            strokeWidth="11"
          />
          <circle
            cx="70"
            cy="70"
            r={RADIUS}
            fill="none"
            stroke="url(#scoreGrad)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={arcOffset}
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <b className="text-[38px] font-[650] leading-none tracking-tight tabular-nums">
            {Math.round(score)}
          </b>
          <span className="mt-0.5 text-[10px] font-bold text-muted">of 100</span>
        </div>
      </div>

      <div className="rounded-[18px] bg-positive-soft px-3 py-1 text-xs font-semibold text-positive">
        Strong month ↑
      </div>
      <p className="mt-2 max-w-[220px] text-[10.5px] leading-relaxed text-muted">
        Cost efficiency vs 90d avg · ER vs benchmark · goal pacing · redemption
        trend
      </p>
    </div>
  );
}
