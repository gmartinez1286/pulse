"use client";

import { useDashboard } from "@/context/dashboard-context";
import { useCountUp } from "@/hooks/use-count-up";
import { getChartData, getRangeData, clicks30, folAdds } from "@/lib/mock/kpot-fairfax";
import { fmtUsd, fmtUsd2, fmtInt } from "@/lib/utils/format";
import { ScoreCard } from "@/components/cards/score-card";
import { InsightCard } from "@/components/cards/insight-card";
import { KpiCard } from "@/components/cards/kpi-card";
import { TopPostsSection } from "@/components/cards/top-post-card";
import { AreaChart } from "@/components/charts/area-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { ComboChart } from "@/components/charts/combo-chart";
import { Heatmap } from "@/components/charts/heatmap";
import { HorizontalBars } from "@/components/charts/horizontal-bars";
import { Funnel } from "@/components/data/funnel";
import { GoalGauges } from "@/components/data/goal-gauges";
import { ComparisonMatrix } from "@/components/tables/comparison-matrix";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
export function OverviewContent() {
  const { dateRange } = useDashboard();
  const range = getRangeData(dateRange);
  const chart = getChartData(dateRange);

  const spendDisplay = useCountUp(range.spend, fmtUsd);
  const claimsDisplay = useCountUp(range.claims, fmtInt);
  const engDisplay = useCountUp(range.eng, fmtInt);
  const cprDisplay = useCountUp(range.cpr, fmtUsd2);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3">
        <ScoreCard />
      </div>

      <Card
        className="col-span-6 opacity-0 animate-rise"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="mb-2 flex flex-wrap gap-7">
          <div>
            <div className="text-[11px] font-semibold text-muted">Ad spend</div>
            <div className="text-[28px] font-semibold tabular-nums tracking-tight">
              {spendDisplay}
            </div>
            <div className="text-[11px] font-semibold text-positive">↑ 7.8%</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-muted">Coupon claims</div>
            <div className="text-[28px] font-semibold tabular-nums tracking-tight">
              {claimsDisplay}
            </div>
            <div className="text-[11px] font-semibold text-positive">↑ 18.9%</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-muted">Organic engagement</div>
            <div className="text-[28px] font-semibold tabular-nums tracking-tight">
              {engDisplay}
            </div>
            <div className="text-[11px] font-semibold text-positive">↑ 14.2%</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-muted">Cost / redemption</div>
            <div className="text-[28px] font-semibold tabular-nums tracking-tight">
              {cprDisplay}
            </div>
            <div className="text-[11px] font-semibold text-positive">↓ 8.0%</div>
          </div>
        </div>
        <div className="mb-1 flex gap-4 text-[11px] font-semibold text-muted">
          <span>
            <span className="mr-1.5 inline-block h-0.5 w-3.5 rounded-sm bg-accent align-middle" />
            Link clicks — current
          </span>
          <span>
            <span className="mr-1.5 inline-block w-3.5 border-t-2 border-dotted border-muted align-middle" />
            Previous period
          </span>
        </div>
        <AreaChart
          data={chart.current}
          prevPeriodData={chart.previous}
          height={210}
        />
      </Card>

      <div className="col-span-3">
        <InsightCard />
      </div>

      <div className="col-span-12">
        <div className="grid grid-cols-12 gap-3">
          {range.kpis.map((kpi, i) => (
            <KpiCard
              key={kpi.label}
              icon={["👁", "📡", "🔗", "📊", "💰", "✨"][i]}
              label={kpi.label}
              value={kpi.value}
              delta={kpi.delta}
              deltaDirection={kpi.direction}
              sparklineData={clicks30.slice(-range.days)}
              className="col-span-2"
              delay={0.16 + i * 0.025}
            />
          ))}
        </div>
      </div>

      <Card
        className="col-span-7 opacity-0 animate-rise"
        style={{ animationDelay: "0.2s" }}
      >
        <CardHeader>
          <div>
            <CardTitle>The full funnel — ad dollar to table</CardTitle>
            <CardDescription>
              Bottom stage is real in-store data no subscription tool can show
            </CardDescription>
          </div>
          <span className="ml-auto rounded-badge bg-accent-soft px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-accent-text">
            Signature chart
          </span>
        </CardHeader>
        <Funnel />
      </Card>

      <Card
        className="col-span-5 opacity-0 animate-rise"
        style={{ animationDelay: "0.24s" }}
      >
        <CardHeader>
          <div>
            <CardTitle>Monthly goals — pacing</CardTitle>
            <CardDescription>
              Tick = where you should be on day 11 of 30
            </CardDescription>
          </div>
        </CardHeader>
        <GoalGauges />
      </Card>

      <Card className="col-span-3 opacity-0 animate-rise" style={{ animationDelay: "0.28s" }}>
        <CardHeader>
          <div>
            <CardTitle>Reach: paid vs organic</CardTitle>
            <CardDescription>Where eyeballs come from</CardDescription>
          </div>
        </CardHeader>
        <DonutChart
          segments={[
            { label: "Paid", value: 61, color: "#635BFF", pct: "61%" },
            { label: "Organic", value: 39, color: "#00B8AC", pct: "39%" },
          ]}
          centerLabel="105K"
          centerSub="total reach"
        />
      </Card>

      <Card className="col-span-3 opacity-0 animate-rise" style={{ animationDelay: "0.31s" }}>
        <CardHeader>
          <div>
            <CardTitle>Engagement by platform</CardTitle>
            <CardDescription>FB + IG organic, 30d</CardDescription>
          </div>
        </CardHeader>
        <DonutChart
          segments={[
            { label: "Instagram", value: 81, color: "#E84393", pct: "81%" },
            { label: "Facebook", value: 19, color: "#635BFF", pct: "19%" },
          ]}
          centerLabel="3,318"
          centerSub="engagement"
        />
      </Card>

      <Card className="col-span-3 opacity-0 animate-rise" style={{ animationDelay: "0.34s" }}>
        <CardHeader>
          <div>
            <CardTitle>Format battle — ER%</CardTitle>
            <CardDescription>Gold = industry benchmark 4.1%</CardDescription>
          </div>
        </CardHeader>
        <HorizontalBars
          items={[
            { label: "🎬 Reels", value: "8.2%", width: 82, showBenchmark: true },
            { label: "📖 Stories", value: "6.3%", width: 63, showBenchmark: true },
            { label: "🖼 Posts", value: "6.1%", width: 61, showBenchmark: true },
            { label: "🎠 Carousels", value: "3.8%", width: 38, showBenchmark: true },
          ]}
          benchmarkNote="Everything but carousels beats the industry"
        />
      </Card>

      <Card className="col-span-3 opacity-0 animate-rise" style={{ animationDelay: "0.37s" }}>
        <CardHeader>
          <div>
            <CardTitle>Follower growth</CardTitle>
            <CardDescription>Bars = daily adds · line = total</CardDescription>
          </div>
          <span className="ml-auto rounded-badge bg-positive-soft px-2 py-1 text-[10px] font-bold uppercase text-positive">
            +214
          </span>
        </CardHeader>
        <ComboChart dailyAdds={folAdds} height={170} />
      </Card>

      <Card className="col-span-6 opacity-0 animate-rise" style={{ animationDelay: "0.4s" }}>
        <CardHeader>
          <div>
            <CardTitle>Best time to post</CardTitle>
            <CardDescription>
              Engagement per post by publish slot · last 90 days
            </CardDescription>
          </div>
        </CardHeader>
        <Heatmap />
      </Card>

      <Card className="col-span-6 opacity-0 animate-rise" style={{ animationDelay: "0.43s" }}>
        <CardHeader>
          <div>
            <CardTitle>Period comparison matrix</CardTitle>
            <CardDescription>
              This 30d vs previous vs 90-day average
            </CardDescription>
          </div>
        </CardHeader>
        <ComparisonMatrix />
      </Card>

      <TopPostsSection />
    </div>
  );
}
