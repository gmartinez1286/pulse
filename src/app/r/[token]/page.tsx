import { notFound } from "next/navigation";
import { getShareLinkByToken } from "@/lib/db/queries/clients";
import { OverviewContent } from "@/components/overview/overview-content";
import { DashboardProvider } from "@/context/dashboard-context";

export default async function SharePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const link = await getShareLinkByToken(token);
  if (!link) notFound();

  return (
    <DashboardProvider>
      <div className="px-[30px] py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-[12.5px] font-medium text-muted">
              KPOT Fairfax · Client Report
            </div>
            <h1 className="text-lg font-[650] tracking-tight text-ink">
              Command Center — KPOT Fairfax
            </h1>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted">
            <span className="h-[7px] w-[7px] rounded-full bg-positive" />
            Last synced 8 min ago
          </div>
        </div>
        <OverviewContent />
        <footer className="py-6 text-center text-[11.5px] text-muted">
          Powered by <b className="font-semibold text-accent-text">TopFloor Marketing</b>
        </footer>
      </div>
    </DashboardProvider>
  );
}
