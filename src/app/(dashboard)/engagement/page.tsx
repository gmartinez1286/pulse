import { KpiCard } from "@/components/cards/kpi-card";
import { DonutChart } from "@/components/charts/donut-chart";
import { EngagementChartSection } from "@/components/shared/engagement-chart-section";
import { InteractionTable } from "@/components/tables/interaction-table";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function EngagementPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <KpiCard icon="💬" label="Total interactions" value="3,318" delta="+14.2% vs prev" deltaDirection="up" className="col-span-3" />
      <KpiCard icon="📊" label="Avg per post" value="277" delta="+9.1% vs prev" deltaDirection="up" className="col-span-3" />
      <KpiCard icon="↩" label="Comment reply rate" value="92%" delta="target ≥ 90%" deltaDirection="up" className="col-span-3" />
      <KpiCard icon="⏱" label="Avg response time" value="1.4h" delta="−0.6h vs prev" deltaDirection="up" className="col-span-3" />

      <EngagementChartSection title="Interactions over time" />

      <Card className="col-span-4">
        <CardHeader>
          <div>
            <CardTitle>Interaction mix</CardTitle>
            <CardDescription>30 days</CardDescription>
          </div>
        </CardHeader>
        <DonutChart
          segments={[
            { label: "Likes", value: 74, color: "#635BFF", pct: "74%" },
            { label: "Shares", value: 10, color: "#00B8AC", pct: "10%" },
            { label: "Comments", value: 9, color: "#E84393", pct: "9%" },
            { label: "Saves", value: 7, color: "#D4A017", pct: "7%" },
          ]}
          centerLabel="3,318"
          centerSub="30 days"
        />
        <p className="mt-2.5 text-[10.5px] text-muted">
          Saves at 7% is strong — content is reference-worthy, not just scroll-worthy.
        </p>
      </Card>

      <Card className="col-span-12">
        <CardHeader>
          <div>
            <CardTitle>Recent interactions — needs attention first</CardTitle>
            <CardDescription>
              Comments + DMs from both platforms · same triage engine as the JJ&apos;s QC system
            </CardDescription>
          </div>
          <span className="ml-auto rounded-badge bg-accent-soft px-2 py-1 text-[10px] font-bold uppercase text-accent-text">
            CX layer
          </span>
        </CardHeader>
        <InteractionTable />
      </Card>
    </div>
  );
}
