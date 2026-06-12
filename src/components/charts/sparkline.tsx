"use client";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

function smoothPath(pts: [number, number][]): string {
  if (pts.length < 3) return "M" + pts.map((p) => p.join(" ")).join(" L");
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

export function Sparkline({
  data,
  width = 78,
  height = 26,
  color = "#635BFF",
}: SparklineProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts: [number, number][] = data.map((v, i) => [
    (i / (data.length - 1)) * width,
    height - 2 - ((v - min) / (max - min || 1)) * (height - 6),
  ]);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path
        d={smoothPath(pts)}
        fill="none"
        stroke={color}
        strokeWidth={2}
        opacity={0.85}
      />
    </svg>
  );
}
