import { Sparkline } from "@/components/charts/sparkline";
import { cn } from "@/lib/utils";

export function KpiCard({
  icon,
  label,
  value,
  delta,
  deltaDirection,
  sparklineData,
  className,
  delay,
}: {
  icon: string;
  label: string;
  value: string;
  delta: string;
  deltaDirection: "up" | "down";
  sparklineData?: number[];
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-surface-card p-4 shadow-card opacity-0 animate-rise",
        className
      )}
      style={delay !== undefined ? { animationDelay: `${delay}s` } : undefined}
    >
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-[9px] bg-accent-soft text-[15px]">
        {icon}
      </div>
      <div className="text-[10.5px] font-semibold text-muted">{label}</div>
      <div className="mt-1 text-xl font-semibold tabular-nums tracking-tight">
        {value}
      </div>
      <div
        className={cn(
          "mt-0.5 text-[11px] font-semibold",
          deltaDirection === "up" ? "text-positive" : "text-negative"
        )}
      >
        {delta}
      </div>
      {sparklineData && (
        <div className="mt-2">
          <Sparkline data={sparklineData} />
        </div>
      )}
    </div>
  );
}
