"use client";

import { useState } from "react";
import { ENG } from "@/lib/mock/kpot-fairfax";
import { AreaChart } from "@/components/charts/area-chart";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const METRICS = ["likes", "comments", "shares", "saves"] as const;
type Metric = (typeof METRICS)[number];

export function EngagementChartSection({
  title,
  showFormatFilters = false,
  className,
}: {
  title: string;
  showFormatFilters?: boolean;
  className?: string;
}) {
  const [metric, setMetric] = useState<Metric>("likes");
  const [format, setFormat] = useState("all");

  return (
    <Card className={cn("col-span-8", className)}>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            Daily {metric} · FB + IG combined · last 30 days
          </CardDescription>
        </div>
        <div className="ml-auto flex rounded-[9px] bg-gray-soft p-1">
          {METRICS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMetric(m)}
              className={cn(
                "cursor-pointer rounded-[7px] border-0 px-3 py-1.5 text-[12.5px] font-semibold capitalize",
                metric === m
                  ? "bg-surface-card text-ink shadow-card"
                  : "bg-transparent text-muted"
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </CardHeader>
      <AreaChart data={ENG[metric]} height={210} />
      {showFormatFilters && (
        <div className="mt-2.5 flex gap-2">
          {["All formats", "Posts", "Reels", "Stories"].map((f) => (
            <Button
              key={f}
              size="sm"
              variant={format === f ? "primary" : "default"}
              className={cn(
                format === f && "border-transparent bg-accent-soft text-accent-text"
              )}
              onClick={() => setFormat(f)}
            >
              {f}
            </Button>
          ))}
        </div>
      )}
    </Card>
  );
}
