"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(
  target: number,
  formatter: (v: number) => string,
  duration = 900,
  enabled = true
): string {
  const formatterRef = useRef(formatter);
  formatterRef.current = formatter;

  const [display, setDisplay] = useState(() =>
    enabled ? formatter(0) : formatter(target)
  );

  useEffect(() => {
    if (!enabled) {
      setDisplay(formatterRef.current(target));
      return;
    }

    const t0 = performance.now();
    let frame = 0;

    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setDisplay(formatterRef.current(target * eased));
      if (k < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, enabled]);

  return display;
}
