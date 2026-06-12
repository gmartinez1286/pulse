"use client";

import { useState } from "react";
import { POSTS } from "@/lib/mock/kpot-fairfax";
import { PlatformChip } from "@/components/shared/platform-chip";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function PostTable() {
  const [platform, setPlatform] = useState<"all" | "facebook" | "instagram">("all");

  const filtered =
    platform === "all"
      ? POSTS
      : POSTS.filter((p) => p.platform === platform);

  return (
    <div>
      <div className="mb-3 flex justify-end gap-2">
        {(["all", "facebook", "instagram"] as const).map((p) => (
          <Button
            key={p}
            size="sm"
            variant={platform === p ? "primary" : "default"}
            className={cn(platform === p && "border-transparent bg-accent-soft text-accent-text")}
            onClick={() => setPlatform(p)}
          >
            {p === "all" ? "All" : p === "facebook" ? "Facebook" : "Instagram"}
          </Button>
        ))}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Post</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Format</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Reach</TableHead>
            <TableHead className="text-right">Engagement</TableHead>
            <TableHead className="text-right">ER</TableHead>
            <TableHead className="text-right">Link clicks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((post) => (
            <TableRow key={post.title}>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-br from-accent-soft to-gray-soft text-lg">
                    {post.emoji}
                  </span>
                  <span>
                    <span className="block font-semibold">{post.title}</span>
                    <small className="text-[11.5px] text-muted">{post.sub}</small>
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <PlatformChip platform={post.platform} />
              </TableCell>
              <TableCell>{post.format}</TableCell>
              <TableCell className="text-muted">{post.published}</TableCell>
              <TableCell className="text-right">
                {post.reach.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {post.engagement.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">{post.er}</TableCell>
              <TableCell className="text-right">{post.clicks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
