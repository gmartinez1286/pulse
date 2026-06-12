import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Pulse Admin</CardTitle>
          <CardDescription>
            Phase 1 stub — full auth in Phase 3
          </CardDescription>
        </CardHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@topfloormarketing.net" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button variant="primary" className="w-full" asChild>
            <Link href="/overview">Sign in</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
