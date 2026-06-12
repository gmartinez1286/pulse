import { INTERACTIONS } from "@/lib/mock/kpot-fairfax";
import { PlatformChip } from "@/components/shared/platform-chip";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function InteractionTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Interaction</TableHead>
          <TableHead>Post</TableHead>
          <TableHead>Platform</TableHead>
          <TableHead>When</TableHead>
          <TableHead>Status</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {INTERACTIONS.map((item, i) => (
          <TableRow key={i}>
            <TableCell>
              <span className="block font-semibold">{item.text}</span>
              <small className="text-[11.5px] text-muted">{item.author}</small>
            </TableCell>
            <TableCell className="text-muted">{item.post}</TableCell>
            <TableCell>
              <PlatformChip platform={item.platform} />
            </TableCell>
            <TableCell className="text-muted">{item.when}</TableCell>
            <TableCell>
              {item.status === "pending" && <StatusBadge variant="pend" />}
              {item.status === "replied" && (
                <StatusBadge variant="run">
                  Replied{item.responseTime ? ` · ${item.responseTime}` : ""}
                </StatusBadge>
              )}
              {item.status === "escalated" && (
                <StatusBadge variant="escalated" />
              )}
            </TableCell>
            <TableCell className="text-right">
              {item.status === "pending" && (
                <Button size="sm">Reply</Button>
              )}
              {item.status === "escalated" && (
                <Button size="sm">View</Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
