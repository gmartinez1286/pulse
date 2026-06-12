import { KpiCard } from "@/components/cards/kpi-card";
import { ComboChart } from "@/components/charts/combo-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { HorizontalBars } from "@/components/charts/horizontal-bars";
import { DeltaChip } from "@/components/shared/delta-chip";
import { folAdds } from "@/lib/mock/kpot-fairfax";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LOCATIONS = [
  { city: "Fairfax, VA", share: "41%", delta: "+2 pts", direction: "up" as const },
  { city: "Centreville, VA", share: "12%", delta: "+1 pt", direction: "up" as const },
  { city: "Chantilly, VA", share: "9%", delta: "—", direction: "up" as const },
  { city: "Arlington, VA", share: "7%", delta: "+1 pt", direction: "up" as const },
  { city: "Washington, DC", share: "6%", delta: "−1 pt", direction: "down" as const },
];

export default function AudiencePage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <KpiCard icon="👥" label="Total followers (FB+IG)" value="8,432" delta="+214 this period" deltaDirection="up" className="col-span-3" />
      <KpiCard icon="➕" label="New follows" value="252" delta="+38 unfollows = net +214" deltaDirection="up" className="col-span-3" />
      <KpiCard icon="👁" label="Profile views" value="1,630" delta="+11.4% vs prev" deltaDirection="up" className="col-span-3" />
      <KpiCard icon="📍" label="Local audience" value="69%" delta="within 15 mi of the restaurant" deltaDirection="up" className="col-span-3" />

      <Card className="col-span-6">
        <CardHeader>
          <div>
            <CardTitle>Follower growth</CardTitle>
            <CardDescription>Bars = daily net adds · line = cumulative total</CardDescription>
          </div>
          <span className="ml-auto rounded-badge bg-positive-soft px-2 py-1 text-[10px] font-bold uppercase text-positive">
            +214 · 30d
          </span>
        </CardHeader>
        <ComboChart dailyAdds={folAdds} height={200} />
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <div>
            <CardTitle>Gender</CardTitle>
            <CardDescription>IG audience</CardDescription>
          </div>
        </CardHeader>
        <DonutChart
          segments={[
            { label: "Women", value: 62, color: "#635BFF", pct: "62%" },
            { label: "Men", value: 38, color: "#00B8AC", pct: "38%" },
          ]}
          centerLabel="8,432"
          centerSub="followers"
        />
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <div>
            <CardTitle>Age ranges</CardTitle>
            <CardDescription>IG audience</CardDescription>
          </div>
        </CardHeader>
        <HorizontalBars
          items={[
            { label: "18–24", value: "22%", width: 58 },
            { label: "25–34", value: "38%", width: 100 },
            { label: "35–44", value: "24%", width: 63 },
            { label: "45–54", value: "11%", width: 29 },
            { label: "55+", value: "5%", width: 13 },
          ]}
        />
      </Card>

      <Card className="col-span-6">
        <CardHeader>
          <div>
            <CardTitle>Top locations</CardTitle>
            <CardDescription>Where followers live · drives geo-targeting for the next campaign</CardDescription>
          </div>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Share</TableHead>
              <TableHead className="text-right">vs prev</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LOCATIONS.map((loc) => (
              <TableRow key={loc.city}>
                <TableCell className="font-semibold">{loc.city}</TableCell>
                <TableCell className="text-right">{loc.share}</TableCell>
                <TableCell className="text-right">
                  {loc.delta === "—" ? "—" : (
                    <DeltaChip value={loc.delta} direction={loc.direction} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="col-span-6">
        <CardHeader>
          <div>
            <CardTitle>When followers are online</CardTitle>
            <CardDescription>Feeds the posting schedule together with the best-time heatmap</CardDescription>
          </div>
        </CardHeader>
        <HorizontalBars
          items={[
            { label: "6–9 PM", value: "peak", width: 100 },
            { label: "9 PM–12 AM", value: "", width: 78 },
            { label: "12–3 PM (lunch)", value: "", width: 64 },
            { label: "3–6 PM", value: "", width: 52 },
            { label: "9 AM–12 PM", value: "", width: 31 },
          ]}
          benchmarkNote="62% women, 25–34 core, 69% local, online evenings — the AYCE date-night angle writes itself."
        />
      </Card>
    </div>
  );
}
