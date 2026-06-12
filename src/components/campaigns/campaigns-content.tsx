"use client";

import { useState } from "react";
import { CAMPAIGN_ADS, claims11 } from "@/lib/mock/kpot-fairfax";
import { AreaChart } from "@/components/charts/area-chart";
import { CampaignTable } from "@/components/tables/campaign-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function CampaignsContent() {
  const [selectedId, setSelectedId] = useState("1");

  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className="col-span-12">
        <CardHeader>
          <div>
            <CardTitle>All paid campaigns</CardTitle>
            <CardDescription>
              Synced from the shared ad account · click a campaign for ad-level detail
            </CardDescription>
          </div>
          <div className="ml-auto flex gap-2">
            {["All", "Running", "Ended"].map((f, i) => (
              <Button
                key={f}
                size="sm"
                className={cn(i === 0 && "border-transparent bg-accent-soft text-accent-text")}
              >
                {f}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CampaignTable selectedId={selectedId} onSelect={setSelectedId} />
      </Card>

      <Card className="col-span-12">
        <CardHeader>
          <div>
            <CardTitle>AYCE Coupon | June — detail</CardTitle>
            <CardDescription>Daily claims · ad-level breakdown below</CardDescription>
          </div>
          <StatusBadge variant="run" className="ml-auto">
            Running · $20.40/day avg
          </StatusBadge>
        </CardHeader>
        <AreaChart data={claims11} height={180} />
        <Table className="mt-3.5">
          <TableHeader>
            <TableRow>
              <TableHead>Ad</TableHead>
              <TableHead>Format</TableHead>
              <TableHead className="text-right">Spend</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
              <TableHead className="text-right">CTR</TableHead>
              <TableHead className="text-right">Claims</TableHead>
              <TableHead className="text-right">Cost/claim</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CAMPAIGN_ADS.map((ad) => (
              <TableRow key={ad.name}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent-soft to-gray-soft text-[17px]">
                      {ad.emoji}
                    </span>
                    <span>
                      <span className="block font-semibold">{ad.name}</span>
                      <small className="text-[11.5px] text-muted">{ad.sub}</small>
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge variant="p2">{ad.format}</StatusBadge>
                </TableCell>
                <TableCell className="text-right">${ad.spend}</TableCell>
                <TableCell className="text-right">{ad.clicks.toLocaleString()}</TableCell>
                <TableCell className="text-right">{ad.ctr}</TableCell>
                <TableCell className="text-right">{ad.claims}</TableCell>
                <TableCell className="text-right">{ad.costPerClaim}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
