import { KpiCard } from "@/components/cards/kpi-card";
import { HorizontalBars } from "@/components/charts/horizontal-bars";
import { EngagementChartSection } from "@/components/shared/engagement-chart-section";
import { PostTable } from "@/components/tables/post-table";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContentPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <KpiCard icon="🔥" label="Total engagement" value="3,318" delta="+14.2% vs prev" deltaDirection="up" className="col-span-3" />
      <KpiCard icon="👥" label="Follower growth" value="+214" delta="8,432 total · +2.6%" deltaDirection="up" className="col-span-3" />
      <KpiCard icon="👁" label="Organic impressions" value="58.7K" delta="+9.3% vs prev" deltaDirection="up" className="col-span-3" />
      <KpiCard icon="✨" label="Engagement rate" value="4.6%" delta="+0.4 pts vs prev" deltaDirection="up" className="col-span-3" />

      <EngagementChartSection title="Engagement performance" showFormatFilters />

      <Card className="col-span-4">
        <CardHeader>
          <div>
            <CardTitle>Format mix — published</CardTitle>
            <CardDescription>22 pieces this period</CardDescription>
          </div>
        </CardHeader>
        <HorizontalBars
          items={[
            { label: "🖼 Posts", value: "12", width: 100 },
            { label: "📖 Stories", value: "6", width: 50 },
            { label: "🎬 Reels", value: "4", width: 33 },
          ]}
          benchmarkNote="Reels are 18% of output but 49% of engagement — the calendar should flip toward them."
        />
      </Card>

      <Card className="col-span-12">
        <CardHeader>
          <div>
            <CardTitle>All posts</CardTitle>
            <CardDescription>
              Every organic post, story and reel · synced from Pages API + IG Graph API
            </CardDescription>
          </div>
        </CardHeader>
        <PostTable />
      </Card>
    </div>
  );
}
