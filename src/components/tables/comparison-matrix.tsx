import { COMPARISON_MATRIX } from "@/lib/mock/kpot-fairfax";
import { DeltaChip } from "@/components/shared/delta-chip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ComparisonMatrix() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Metric</TableHead>
          <TableHead className="text-right">Current</TableHead>
          <TableHead className="text-right">Previous</TableHead>
          <TableHead className="text-right">Δ</TableHead>
          <TableHead className="text-right">90d avg</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {COMPARISON_MATRIX.map((row) => (
          <TableRow key={row.metric}>
            <TableCell className="font-semibold">{row.metric}</TableCell>
            <TableCell className="text-right">{row.current}</TableCell>
            <TableCell className="text-right">{row.previous}</TableCell>
            <TableCell className="text-right">
              <DeltaChip value={row.delta} direction={row.direction} />
            </TableCell>
            <TableCell className="text-right">{row.avg90}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
