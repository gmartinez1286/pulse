import { PhaseBanner } from "@/components/shared/phase-banner";
import { KpiCard } from "@/components/cards/kpi-card";
import { BarChart } from "@/components/charts/bar-chart";
import { COUPON_CPR, COUPON_CPR_LABELS } from "@/lib/mock/kpot-fairfax";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const HISTORY = [
  { period: "May 28 – Jun 11", source: "Biweekly email", claims: 154, redeemed: 52, rate: "33.8%", spend: "$452", cpr: "$8.69" },
  { period: "May 13 – May 27", source: "Manager call", claims: 138, redeemed: 41, rate: "29.7%", spend: "$398", cpr: "$9.71" },
  { period: "Apr 28 – May 12", source: "Count sheet", claims: 120, redeemed: 44, rate: "36.7%", spend: "$385", cpr: "$8.75" },
];

export default function CouponsPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <PhaseBanner phase={2} label="Offline coupon redemption tracking — manual entry until POS integration" />

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Log redemption</CardTitle>
          <CardDescription>Enter offline results from client reports</CardDescription>
        </CardHeader>
        <div className="space-y-3.5">
          <div>
            <Label>Location</Label>
            <Input defaultValue="KPOT Fairfax" />
          </div>
          <div>
            <Label>Reporting period</Label>
            <Input defaultValue="May 28 – Jun 11, 2026" />
          </div>
          <div>
            <Label>Coupons redeemed</Label>
            <Input type="number" defaultValue="52" />
          </div>
          <div>
            <Label>Source</Label>
            <Input defaultValue="Biweekly email" />
          </div>
          <Button variant="primary" className="w-full">
            Save entry
          </Button>
        </div>
      </Card>

      <div className="col-span-8 grid grid-cols-3 gap-4">
        <KpiCard icon="🎟" label="Claims" value="412" delta="30d paid" deltaDirection="up" />
        <KpiCard icon="✅" label="Redeemed" value="137" delta="33.3% rate" deltaDirection="up" />
        <KpiCard icon="💰" label="Cost / redemption" value="$9.05" delta="↓ 8.0% vs prev" deltaDirection="up" />
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Cost-per-redemption trend</CardTitle>
            <CardDescription>Biweekly periods</CardDescription>
          </CardHeader>
          <BarChart data={COUPON_CPR} labels={COUPON_CPR_LABELS} height={150} />
        </Card>
      </div>

      <Card className="col-span-12">
        <CardHeader>
          <CardTitle>Redemption history</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="text-right">Claims</TableHead>
              <TableHead className="text-right">Redeemed</TableHead>
              <TableHead className="text-right">Rate</TableHead>
              <TableHead className="text-right">Spend</TableHead>
              <TableHead className="text-right">Cost/redemption</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {HISTORY.map((row) => (
              <TableRow key={row.period}>
                <TableCell className="font-semibold">{row.period}</TableCell>
                <TableCell>{row.source}</TableCell>
                <TableCell className="text-right">{row.claims}</TableCell>
                <TableCell className="text-right">{row.redeemed}</TableCell>
                <TableCell className="text-right">{row.rate}</TableCell>
                <TableCell className="text-right">{row.spend}</TableCell>
                <TableCell className="text-right">{row.cpr}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
