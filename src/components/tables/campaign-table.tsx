"use client";

import { CAMPAIGNS } from "@/lib/mock/kpot-fairfax";
import { Sparkline } from "@/components/charts/sparkline";
import { StatusBadge } from "@/components/shared/status-badge";
import { clicks30 } from "@/lib/mock/kpot-fairfax";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function CampaignTable({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Campaign</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Dates</TableHead>
          <TableHead className="text-right">Spend</TableHead>
          <TableHead className="text-right">Clicks</TableHead>
          <TableHead className="text-right">CTR</TableHead>
          <TableHead className="text-right">CPC</TableHead>
          <TableHead className="text-right">Results</TableHead>
          <TableHead>Trend</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {CAMPAIGNS.map((camp) => (
          <TableRow
            key={camp.id}
            className={cn(
              "cursor-pointer",
              selectedId === camp.id && "bg-accent-soft"
            )}
            onClick={() => onSelect(camp.id)}
          >
            <TableCell>
              <span className="block font-semibold">{camp.name}</span>
              <small className="text-[11.5px] text-muted">{camp.sub}</small>
            </TableCell>
            <TableCell>
              <StatusBadge variant={camp.status === "running" ? "run" : "end"} />
            </TableCell>
            <TableCell className="text-muted">{camp.dates}</TableCell>
            <TableCell className="text-right">${camp.spend}</TableCell>
            <TableCell className="text-right">
              {camp.clicks.toLocaleString()}
            </TableCell>
            <TableCell className="text-right">{camp.ctr}</TableCell>
            <TableCell className="text-right">{camp.cpc}</TableCell>
            <TableCell className="text-right">{camp.results}</TableCell>
            <TableCell>
              <Sparkline data={clicks30.slice(-14)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
