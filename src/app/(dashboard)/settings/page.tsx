import { SwitchRow } from "@/components/shared/switch-row";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const SWATCHES = ["#635BFF", "#00B8AC", "#E84393", "#D4A017", "#1877F2"];

export default function SettingsPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Branding</CardTitle>
          <CardDescription>Agency and per-client overrides</CardDescription>
        </CardHeader>
        <div className="space-y-3.5">
          <div>
            <Label>Agency name</Label>
            <Input defaultValue="TopFloor Marketing" />
          </div>
          <div>
            <Label>Logo</Label>
            <Button variant="default">Upload logo</Button>
          </div>
          <div>
            <Label>Accent color</Label>
            <div className="flex gap-2">
              {SWATCHES.map((color, i) => (
                <button
                  key={color}
                  type="button"
                  className={cn(
                    "h-[26px] w-[26px] cursor-pointer rounded-full border-2",
                    i === 0 ? "border-ink" : "border-transparent"
                  )}
                  style={{ background: color }}
                />
              ))}
            </div>
          </div>
          <SwitchRow title="Per-client brand override" description="Use client logo and accent on share links" />
        </div>
      </Card>

      <div className="col-span-6 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Data sources</CardTitle>
            <CardDescription>Meta API connections</CardDescription>
          </CardHeader>
          <div className="space-y-2 text-[12.5px]">
            <div className="flex justify-between border-b border-line py-2">
              <span className="text-muted">Ad account ID</span>
              <span className="font-semibold">act_2938102847</span>
            </div>
            <div className="flex justify-between border-b border-line py-2">
              <span className="text-muted">FB Pages connected</span>
              <span className="font-semibold">1</span>
            </div>
            <div className="flex justify-between border-b border-line py-2">
              <span className="text-muted">IG accounts</span>
              <span className="font-semibold">1</span>
            </div>
            <div className="flex justify-between border-b border-line py-2">
              <span className="text-muted">BM status</span>
              <span className="font-semibold text-warn">Temporary BM</span>
            </div>
            <div className="flex justify-between border-b border-line py-2">
              <span className="text-muted">Attribution window</span>
              <span className="font-semibold">7d click · 1d view</span>
            </div>
            <Button variant="default" className="mt-2">
              Rotate token
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sync configuration</CardTitle>
            <CardDescription>Cron schedules and alerts</CardDescription>
          </CardHeader>
          <div className="mb-3">
            <Label>Paid sync frequency</Label>
            <Input defaultValue="Hourly" />
          </div>
          <div className="mb-3">
            <Label>Organic sync frequency</Label>
            <Input defaultValue="Every 6 hours" />
          </div>
          <SwitchRow title="72h restatement re-pull (paid)" description="Keeps numbers matching Ads Manager" />
          <SwitchRow title="Alert on failed sync" description="Email Gonzo + Luis after 2 consecutive failures" />
        </Card>
      </div>
    </div>
  );
}
