export const ATTRIBUTION_WINDOWS = ["7d_click", "1d_view"] as const;

export const SYNC_INTERVALS = {
  paid: "hourly",
  organic: "6h",
  restate: "daily",
} as const;

export const CLIENT_NAME = "KPOT Fairfax";
export const WORKSPACE_NAME = "KPOT Hot Pot — Fairfax";

export type DateRangeKey = "d30" | "d14" | "mtd";

export const PAGE_META: Record<
  string,
  { section: string; title: string; showDateRange: boolean }
> = {
  overview: {
    section: "Analytics",
    title: "Command Center — KPOT Fairfax",
    showDateRange: true,
  },
  content: {
    section: "Content Performance",
    title: "Content Performance — Organic (FB + IG)",
    showDateRange: true,
  },
  audience: {
    section: "Audience Insights",
    title: "Audience Insights — KPOT Fairfax",
    showDateRange: false,
  },
  engagement: {
    section: "Engagement Tracker",
    title: "Engagement Tracker — KPOT Fairfax",
    showDateRange: true,
  },
  campaigns: {
    section: "Campaign Reports",
    title: "Paid Campaigns — KPOT Fairfax",
    showDateRange: false,
  },
  exports: {
    section: "Export Center",
    title: "Export Center — Snapshots & Reports",
    showDateRange: false,
  },
  clients: {
    section: "Business Suite",
    title: "Clients & Mapping — Admin",
    showDateRange: false,
  },
  coupons: {
    section: "Business Suite",
    title: "Coupons & Offline Results",
    showDateRange: false,
  },
  team: {
    section: "Business Suite",
    title: "Team & Co-Workers",
    showDateRange: false,
  },
  billing: {
    section: "Business Suite",
    title: "Plan & Billing — Productization Preview",
    showDateRange: false,
  },
  settings: {
    section: "Business Suite",
    title: "Settings",
    showDateRange: false,
  },
};
