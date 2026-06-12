import { SwitchRow } from "@/components/shared/switch-row";
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

const SNAPSHOTS = [
  { name: "May 2026 — KPOT Fairfax", date: "Jun 1, 2026", status: "Opened 2×" },
  { name: "April 2026 — KPOT Fairfax", date: "May 1, 2026", status: "Not opened" },
  { name: "March 2026 — KPOT Fairfax", date: "Apr 1, 2026", status: "Opened 1×" },
];

export default function ExportsPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className="col-span-5">
        <CardHeader>
          <div>
            <CardTitle>Snapshot schedule</CardTitle>
            <CardDescription>Auto-generate and send the live dashboard as a PDF</CardDescription>
          </div>
        </CardHeader>
        <SwitchRow title="Auto-send monthly" description="1st of each month · 9:00 AM ET" />
        <SwitchRow title="Include organic section" description="Posts, reels, follower growth" />
        <SwitchRow title="Include coupon section" description="Phase 2 · offline results" defaultChecked={false} />
        <SwitchRow title="Notify Blanca on send" description="Internal copy + open tracking" />
        <div className="mt-3.5">
          <Label>Recipients</Label>
          <Input defaultValue="manager@kpotfairfax.com, blanca@topfloormarketing.net" />
        </div>
        <Button variant="primary" className="mt-4 w-full">
          Generate snapshot now
        </Button>
      </Card>

      <Card className="col-span-7">
        <CardHeader>
          <div>
            <CardTitle>Sent snapshots</CardTitle>
            <CardDescription>History with open tracking</CardDescription>
          </div>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report name</TableHead>
              <TableHead>Sent date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {SNAPSHOTS.map((s) => (
              <TableRow key={s.name}>
                <TableCell className="font-semibold">{s.name}</TableCell>
                <TableCell className="text-muted">{s.date}</TableCell>
                <TableCell>{s.status}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm">View PDF</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="col-span-12 border-dashed">
        <CardHeader>
          <div>
            <CardTitle>AI summary preview</CardTitle>
            <CardDescription>Phase 3 — editable narrative before send</CardDescription>
          </div>
        </CardHeader>
        <p className="text-sm italic leading-relaxed text-muted">
          KPOT Fairfax had a strong May: coupon claims ran 110% ahead of pace at 412,
          driven by the AYCE Reel ad ($1.91/claim vs $3.77 on carousel). Organic reach
          grew to 39% of total — up from 31% in April. Recommend shifting $50/wk from
          carousel to Reel format and scheduling posts Thu–Fri 6–9 PM.
        </p>
      </Card>
    </div>
  );
}
