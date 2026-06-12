import { SyncHealth } from "@/components/data/sync-health";
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
import { CLIENTS } from "@/lib/mock/kpot-fairfax";

const UNMAPPED = [
  { name: "Summer Karaoke Promo", id: "238910234" },
  { name: "Lunch Combo Test", id: "238910891" },
];

export default function ClientsPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className="col-span-7">
        <CardHeader>
          <div>
            <CardTitle>Clients</CardTitle>
            <CardDescription>Manage locations, share links, and mapping</CardDescription>
          </div>
          <Button variant="primary" className="ml-auto">
            + Add client
          </Button>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Organic</TableHead>
              <TableHead>Share link</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {CLIENTS.map((client) => (
              <TableRow key={client.slug}>
                <TableCell className="font-semibold">{client.name}</TableCell>
                <TableCell>{client.paid}</TableCell>
                <TableCell>{client.organic}</TableCell>
                <TableCell className="font-mono text-[11.5px] text-accent-text">
                  {client.shareLink}
                </TableCell>
                <TableCell className="text-right">
                  {client.shareLink !== "—" && (
                    <Button size="sm" variant="danger">
                      Revoke
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="col-span-5 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Sync health</CardTitle>
          </CardHeader>
          <SyncHealth />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unmapped campaigns</CardTitle>
            <CardDescription>New campaigns needing client assignment</CardDescription>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {UNMAPPED.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <span className="block font-semibold">{c.name}</span>
                    <small className="text-muted">{c.id}</small>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm">Assign</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
