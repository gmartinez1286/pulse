import { INSIGHTS } from "@/lib/mock/kpot-fairfax";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function InsightCard({ delay = 0.14, className }: { delay?: number; className?: string }) {
  return (
    <Card
      className={cn("opacity-0 animate-rise", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      <CardHeader className="mb-1">
        <div>
          <CardTitle>✦ Pulse insights</CardTitle>
          <CardDescription>Auto-generated from this period</CardDescription>
        </div>
      </CardHeader>
      {INSIGHTS.map((insight, i) => (
        <div
          key={i}
          className="flex gap-2 border-b border-line py-2.5 text-xs leading-relaxed last:border-0"
        >
          <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[7px] bg-accent-soft text-[11px] font-bold text-accent-text">
            {insight.icon}
          </span>
          <span>
            <b className="font-semibold text-accent-text">{insight.bold}</b>
            {insight.text.replace(insight.bold, "").trim() &&
              ` ${insight.text.replace(insight.bold, "").trim()}`}
          </span>
        </div>
      ))}
    </Card>
  );
}
