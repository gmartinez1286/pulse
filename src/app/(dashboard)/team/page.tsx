import { SwitchRow } from "@/components/shared/switch-row";
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
import { StatusBadge } from "@/components/shared/status-badge";
import { TEAM_MEMBERS } from "@/lib/mock/kpot-fairfax";

export default function TeamPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className="col-span-7">
        <CardHeader>
          <div>
            <CardTitle>Team members</CardTitle>
            <CardDescription>Who has access to Pulse</CardDescription>
          </div>
          <Button variant="primary" className="ml-auto">
            + Invite teammate
          </Button>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Access scope</TableHead>
              <TableHead>Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TEAM_MEMBERS.map((member) => (
              <TableRow key={member.email}>
                <TableCell>
                  <span className="block font-semibold">{member.name}</span>
                  <small className="text-muted">{member.email}</small>
                </TableCell>
                <TableCell>
                  <StatusBadge variant="p2">{member.role}</StatusBadge>
                </TableCell>
                <TableCell>{member.scope}</TableCell>
                <TableCell className="text-muted">{member.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="col-span-5">
        <CardHeader>
          <CardTitle>Role permissions</CardTitle>
          <CardDescription>What editors and viewers can access</CardDescription>
        </CardHeader>
        <SwitchRow title="Editors can export snapshots" />
        <SwitchRow title="Editors can edit coupon entries" />
        <SwitchRow title="Viewers can see paid data" defaultChecked={false} />
        <SwitchRow title="Viewers can see organic data" />
      </Card>
    </div>
  );
}
