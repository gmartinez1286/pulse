import { DashboardProvider } from "@/context/dashboard-context";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="min-w-0 flex-1 px-[30px] pb-2.5 pt-6">
          <Topbar />
          {children}
        </main>
      </div>
    </DashboardProvider>
  );
}
