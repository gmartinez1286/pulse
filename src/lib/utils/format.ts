export function fmtInt(v: number): string {
  return Math.round(v).toLocaleString("en-US");
}

export function fmtUsd(v: number): string {
  return "$" + Math.round(v).toLocaleString("en-US");
}

export function fmtUsd2(v: number): string {
  return "$" + v.toFixed(2);
}

export function fmtPct(v: number, decimals = 2): string {
  return v.toFixed(decimals) + "%";
}

export function fmtCompact(v: number): string {
  if (v >= 1000) return (v / 1000).toFixed(1) + "K";
  return fmtInt(v);
}

export function fmtDelta(v: string): string {
  return v;
}
