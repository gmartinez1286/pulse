"use client";

interface DonutSegment {
  label: string;
  value: number;
  color: string;
  pct?: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  centerLabel: string;
  centerSub: string;
  size?: number;
}

export function DonutChart({
  segments,
  centerLabel,
  centerSub,
  size = 118,
}: DonutChartProps) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let offset = 0;

  return (
    <div className="flex items-center gap-[18px]">
      <svg width={size} height={size} viewBox="0 0 130 130">
        <circle
          cx="65"
          cy="65"
          r={radius}
          fill="none"
          stroke="#F1F3F5"
          strokeWidth={15}
        />
        {segments.map((seg, i) => {
          const len = (seg.value / total) * circumference;
          const el = (
            <circle
              key={i}
              cx="65"
              cy="65"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={15}
              strokeDasharray={`${len} ${circumference - len}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 65 65)"
            />
          );
          offset += len;
          return el;
        })}
        <text
          x="65"
          y="61"
          textAnchor="middle"
          fontSize="16"
          fontWeight="600"
          fill="#1A1F36"
        >
          {centerLabel}
        </text>
        <text x="65" y="77" textAnchor="middle" fontSize="9.5" fill="#697386">
          {centerSub}
        </text>
      </svg>
      <div className="min-w-0 flex-1">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className="flex items-center gap-2 border-b border-line py-1.5 text-xs last:border-0"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
              style={{ background: seg.color }}
            />
            <span>{seg.label}</span>
            <b className="ml-auto whitespace-nowrap font-semibold tabular-nums">
              {seg.pct ?? `${Math.round((seg.value / total) * 100)}%`}
            </b>
          </div>
        ))}
      </div>
    </div>
  );
}
