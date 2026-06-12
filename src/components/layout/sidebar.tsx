"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/context/dashboard-context";
import { WORKSPACE_NAME } from "@/lib/constants";

const mainNav = [
  { href: "/overview", icon: "⌂", label: "Overview" },
  { href: "/content", icon: "📈", label: "Content Performance" },
  { href: "/audience", icon: "👥", label: "Audience Insights" },
  { href: "/engagement", icon: "◎", label: "Engagement Tracker" },
  { href: "/campaigns", icon: "▤", label: "Campaign Reports" },
  { href: "/exports", icon: "⇪", label: "Export Center" },
];

const businessNav = [
  { href: "/clients", icon: "♟", label: "Clients & Mapping" },
  { href: "/coupons", icon: "⛁", label: "Coupons & Offline", tag: "P2" },
  { href: "/team", icon: "👤", label: "Team & Co-Workers" },
  { href: "/billing", icon: "▦", label: "Plan & Billing", tag: "P3" },
  { href: "/settings", icon: "⚙", label: "Settings" },
];

function NavItem({
  href,
  icon,
  label,
  tag,
  collapsed,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  tag?: string;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-nav px-3 py-2.5 text-[13.5px] font-medium text-ink no-underline transition-colors hover:bg-gray-soft",
        active && "bg-gray-soft font-semibold",
        collapsed && "justify-center px-0"
      )}
    >
      <span className="w-5 shrink-0 text-center text-[15px] opacity-80">
        {icon}
      </span>
      {!collapsed && (
        <>
          <span className="lbl whitespace-nowrap">{label}</span>
          {tag && (
            <span className="ml-auto rounded-[10px] bg-accent-soft px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-accent-text">
              {tag}
            </span>
          )}
        </>
      )}
    </Link>
  );
}

export function Sidebar() {
  const { collapsed, setCollapsed } = useDashboard();

  return (
    <aside
      className={cn(
        "no-print sticky top-0 flex h-screen shrink-0 flex-col overflow-y-auto border-r border-line bg-surface-side px-3.5 pb-[18px] pt-5 transition-[width] duration-250",
        collapsed ? "w-sidebar-collapsed px-[11px]" : "w-sidebar"
      )}
    >
      <div
        className={cn(
          "relative flex min-h-[47px] w-full items-center px-2.5 pb-5",
          collapsed && "min-h-[40px] justify-center pb-4"
        )}
      >
        {!collapsed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/pulse-logo.png"
            alt="Pulse"
            width={198}
            height={47}
            className="h-[47px] w-auto max-w-[calc(100%-2rem)] object-contain object-left"
            decoding="async"
          />
        )}
        {collapsed && (
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pulse-logo.png"
              alt="Pulse"
              width={198}
              height={47}
              className="absolute left-0 top-1/2 h-[47px] w-auto max-w-none -translate-y-1/2"
              decoding="async"
            />
          </div>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "shrink-0 rounded-md border-0 bg-transparent p-1 text-base text-muted hover:bg-gray-soft hover:text-ink",
            collapsed
              ? "absolute left-1/2 top-[65px] ml-0 -translate-x-1/2"
              : "ml-auto"
          )}
          title="Collapse sidebar"
        >
          ◫
        </button>
      </div>

      <nav className="flex flex-col gap-0.5">
        {mainNav.map((item) => (
          <NavItem key={item.href} {...item} collapsed={collapsed} />
        ))}
      </nav>

      {!collapsed && (
        <div className="flex items-center px-3 pb-2 pt-[18px] text-[10px] font-bold uppercase tracking-[1.3px] text-muted">
          <span className="mr-1.5 text-[8px]">▼</span>
          Platforms
          <span className="ml-auto cursor-pointer text-[13px]">+</span>
        </div>
      )}
      <nav className="flex flex-col gap-0.5">
        <div
          className={cn(
            "flex items-center gap-3 rounded-nav px-3 py-2.5 text-[13.5px] font-medium",
            collapsed && "justify-center px-0"
          )}
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-fb text-xs font-bold text-white">
            f
          </span>
          {!collapsed && (
            <>
              <span className="lbl">KPOT Fairfax</span>
              <span className="ml-auto rounded-[10px] bg-positive-soft px-2 py-0.5 text-[9px] font-bold uppercase text-positive">
                Live
              </span>
            </>
          )}
        </div>
        <div
          className={cn(
            "flex items-center gap-3 rounded-nav px-3 py-2.5 text-[13.5px] font-medium",
            collapsed && "justify-center px-0"
          )}
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-xs font-bold text-white">
            ◉
          </span>
          {!collapsed && (
            <>
              <span className="lbl">kpot_fairfax</span>
              <span className="ml-auto rounded-[10px] bg-positive-soft px-2 py-0.5 text-[9px] font-bold uppercase text-positive">
                Live
              </span>
            </>
          )}
        </div>
      </nav>

      {!collapsed && (
        <div className="flex items-center px-3 pb-2 pt-[18px] text-[10px] font-bold uppercase tracking-[1.3px] text-muted">
          <span className="mr-1.5 text-[8px]">▼</span>
          Business Suite
          <span className="ml-auto rounded-[9px] bg-accent-soft px-2 py-0.5 text-[9px] font-bold tracking-wide text-accent-text">
            New
          </span>
        </div>
      )}
      <nav className="flex flex-col gap-0.5">
        {businessNav.map((item) => (
          <NavItem key={item.href} {...item} collapsed={collapsed} />
        ))}
      </nav>

      <div className="min-h-[18px] flex-1" />

      {!collapsed && (
        <>
          <div className="overflow-hidden whitespace-nowrap rounded-[11px] border border-line p-[11px_13px]">
            <div className="text-[10px] font-bold uppercase tracking-wide text-muted">
              Workspace
            </div>
            <div className="mt-0.5 text-[13px] font-semibold">{WORKSPACE_NAME}</div>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap px-3 pt-3 text-[11px] text-muted">
            <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-positive" />
            Synced 8 min ago · hourly
          </div>
        </>
      )}
    </aside>
  );
}
