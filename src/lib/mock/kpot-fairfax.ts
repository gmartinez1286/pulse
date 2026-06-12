import type { DateRangeKey } from "@/lib/constants";

export const clicks30 = [
  98, 112, 91, 84, 118, 142, 156, 95, 108, 88, 82, 124, 149, 162, 92, 103,
  85, 79, 116, 138, 151, 90, 105, 87, 76, 121, 146, 158, 116, 112,
];

export const prev30 = clicks30.map((v, i) =>
  Math.round(v * 0.82 + (i % 5) * 2.2 - 3)
);

export const spend30 = [
  38, 42, 35, 31, 44, 52, 57, 36, 40, 33, 30, 46, 55, 60, 35, 38, 31, 29, 43,
  51, 56, 34, 39, 32, 28, 45, 54, 58, 37, 31,
];

export const folAdds = [
  4, 6, 3, 2, 7, 11, 14, 5, 6, 4, 3, 9, 12, 15, 4, 5, 3, 2, 8, 10, 13, 4, 6,
  3, 2, 9, 12, 14, 8, 10,
];

export const claims11 = [18, 22, 19, 16, 25, 31, 34, 21, 24, 20, 34];

export const ENG = {
  likes: clicks30.map((v) => Math.round(v * 0.92)),
  comments: clicks30.map((v) => Math.round(v * 0.13) + 3),
  shares: clicks30.map((v) => Math.round(v * 0.09) + 2),
  saves: clicks30.map((v) => Math.round(v * 0.075) + 1),
};

export type KpiItem = {
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down";
};

export type RangeData = {
  days: number;
  spend: number;
  claims: number;
  eng: number;
  cpr: number;
  kpis: KpiItem[];
};

export const RANGES: Record<DateRangeKey, RangeData> = {
  d30: {
    days: 30,
    spend: 1240,
    claims: 412,
    eng: 3318,
    cpr: 9.05,
    kpis: [
      { label: "Impressions", value: "187.1K", delta: "+12.4%", direction: "up" },
      { label: "Reach (paid)", value: "64.3K", delta: "+9.1%", direction: "up" },
      { label: "Link clicks", value: "3,384", delta: "+21.6%", direction: "up" },
      { label: "CTR", value: "1.81%", delta: "+8.2%", direction: "up" },
      { label: "CPC", value: "$0.37", delta: "−11.3%", direction: "up" },
      { label: "ER (organic)", value: "4.6%", delta: "+0.4 pts", direction: "up" },
    ],
  },
  d14: {
    days: 14,
    spend: 588,
    claims: 203,
    eng: 1573,
    cpr: 8.92,
    kpis: [
      { label: "Impressions", value: "89.6K", delta: "+9.7%", direction: "up" },
      { label: "Reach (paid)", value: "38.1K", delta: "+6.3%", direction: "up" },
      { label: "Link clicks", value: "1,648", delta: "+14.2%", direction: "up" },
      { label: "CTR", value: "1.84%", delta: "+4.0%", direction: "up" },
      { label: "CPC", value: "$0.36", delta: "−8.8%", direction: "up" },
      { label: "ER (organic)", value: "4.7%", delta: "+0.3 pts", direction: "up" },
    ],
  },
  mtd: {
    days: 11,
    spend: 452,
    claims: 154,
    eng: 1204,
    cpr: 8.92,
    kpis: [
      { label: "Impressions", value: "68.9K", delta: "+8.1%", direction: "up" },
      { label: "Reach (paid)", value: "31.2K", delta: "+5.5%", direction: "up" },
      { label: "Link clicks", value: "1,261", delta: "+12.7%", direction: "up" },
      { label: "CTR", value: "1.83%", delta: "+3.4%", direction: "up" },
      { label: "CPC", value: "$0.36", delta: "−7.2%", direction: "up" },
      { label: "ER (organic)", value: "4.6%", delta: "+0.4 pts", direction: "up" },
    ],
  },
};

export const PERFORMANCE_SCORE = 87;

export const INSIGHTS = [
  { icon: "$", text: "Reels earn claims 2× cheaper than carousel ($1.91 vs $3.77). Shift $50/wk.", bold: "Reels earn claims 2× cheaper" },
  { icon: "⏰", text: "Thu–Fri 6–9 PM is the engagement window — schedule the next 3 posts there.", bold: "Thu–Fri 6–9 PM" },
  { icon: "🎯", text: "Claims pacing 110% of the 500 goal. Redemption rate +5.5 pts since April.", bold: "Claims pacing 110%" },
  { icon: "📈", text: "Organic share of reach hit 39% (was 31% in April) — content is compounding.", bold: "Organic share of reach hit 39%" },
];

export const FUNNEL_STAGES = [
  { label: "Impressions", value: 187110, width: 100, conversion: "34.4%", conversionLabel: "see → reach", color: "linear-gradient(90deg,#635BFF,#7A73FF)" },
  { label: "Reach", value: 64300, width: 62, conversion: "5.3%", conversionLabel: "reach → click", color: "linear-gradient(90deg,#6E66FF,#8F88FF)" },
  { label: "Link clicks", value: 3384, width: 36, conversion: "12.2%", conversionLabel: "click → claim", color: "linear-gradient(90deg,#8F88FF,#00B8AC)" },
  { label: "Coupon claims", value: 412, width: 20, conversion: "33.3%", conversionLabel: "claim → redeem", color: "linear-gradient(90deg,#00B8AC,#0E8745)" },
  { label: "Redeemed in-store", value: 137, width: 11, conversion: "offline", conversionLabel: "client-reported", color: "linear-gradient(90deg,#E8C658,#D4A017)", offline: true },
];

export const GOAL_GAUGES = [
  { label: "Coupon claims", current: 412, target: 500, fill: 82, pace: 37, status: "▲ 110% of pace — beats goal ~Jun 24", statusColor: "positive" as const },
  { label: "New followers", current: 214, target: 250, fill: 86, pace: 37, status: "▲ 133% of pace — raise the goal next month", statusColor: "positive" as const },
  { label: "Cost / redemption (≤ $8.50)", current: 9.05, target: 8.5, fill: 66, pace: 94, status: "● $0.55 above target — closing at −$0.24/period", statusColor: "warn" as const, gold: true },
];

export const HEATMAP_DATA = {
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  cols: ["6-9a", "9-12", "12-3p", "3-6p", "6-9p", "9-12a"],
  data: [
    [12, 18, 25, 30, 42, 28],
    [14, 20, 28, 34, 48, 30],
    [15, 22, 30, 38, 55, 33],
    [18, 26, 36, 52, 92, 58],
    [20, 28, 40, 56, 100, 64],
    [30, 38, 46, 60, 78, 52],
    [26, 34, 42, 50, 62, 40],
  ],
};

export const COMPARISON_MATRIX = [
  { metric: "Spend", current: "$1,240", previous: "$1,150", delta: "+7.8%", direction: "up" as const, avg90: "$1,183" },
  { metric: "CPC", current: "$0.37", previous: "$0.42", delta: "−11.3%", direction: "up" as const, avg90: "$0.41" },
  { metric: "Coupon claims", current: "412", previous: "347", delta: "+18.9%", direction: "up" as const, avg90: "362" },
  { metric: "Cost / claim", current: "$3.01", previous: "$3.32", delta: "−9.4%", direction: "up" as const, avg90: "$3.27" },
  { metric: "Redemption rate", current: "33.3%", previous: "30.7%", delta: "+2.6 pts", direction: "up" as const, avg90: "31.2%" },
  { metric: "Organic engagement", current: "3,318", previous: "2,905", delta: "+14.2%", direction: "up" as const, avg90: "2,840" },
  { metric: "Engagement rate", current: "4.6%", previous: "4.2%", delta: "+0.4 pts", direction: "up" as const, avg90: "4.3%" },
  { metric: "Follower net adds", current: "+214", previous: "+102", delta: "+110%", direction: "up" as const, avg90: "+138" },
];

export const TOP_POSTS = [
  { emoji: "🎬", date: "Jun 8", platform: "IG", format: "REEL", title: '"AYCE Challenge — 60 min, can you finish?"', likes: 1204, comments: 89, shares: 215, saves: 134, er: "8.9%", reach: "18.4K", clicks: 214 },
  { emoji: "👨‍🍳", date: "May 29", platform: "IG", format: "REEL", title: '"Behind the grill with Marco — 200 plates a night"', likes: 742, comments: 64, shares: 98, saves: 64, er: "7.6%", reach: "12.7K", clicks: 122 },
  { emoji: "🔥", date: "Jun 5", platform: "IG", format: "POST", title: '"NEW: Szechuan spicy broth just landed"', likes: 488, comments: 47, shares: 41, saves: 36, er: "6.7%", reach: "9.1K", clicks: 98 },
];

export const POSTS = [
  { emoji: "🎬", title: "AYCE Challenge — 60 min…", sub: "Reel · 0:34", platform: "instagram" as const, format: "Reel", published: "Jun 8", reach: 18420, engagement: 1642, er: "8.9%", clicks: 214 },
  { emoji: "🔥", title: "NEW: Szechuan spicy broth…", sub: "Single image", platform: "instagram" as const, format: "Post", published: "Jun 5", reach: 9140, engagement: 612, er: "6.7%", clicks: 98 },
  { emoji: "🎂", title: "Birthday crew of 14 last night…", sub: "Photo album · 3", platform: "facebook" as const, format: "Post", published: "Jun 3", reach: 4230, engagement: 287, er: "6.8%", clicks: 41 },
  { emoji: "👨‍🍳", title: "Behind the grill with Marco…", sub: "Reel · 0:41", platform: "instagram" as const, format: "Reel", published: "May 29", reach: 12710, engagement: 968, er: "7.6%", clicks: 122 },
  { emoji: "📅", title: "Father's Day — book your table", sub: "Single image + CTA", platform: "facebook" as const, format: "Post", published: "May 26", reach: 6810, engagement: 343, er: "5.0%", clicks: 187 },
  { emoji: "📖", title: "Weekend wait times — poll", sub: "Story · 2 frames", platform: "instagram" as const, format: "Story", published: "May 24", reach: 3120, engagement: 196, er: "6.3%", clicks: 30 },
];

export const CAMPAIGNS = [
  { id: "1", name: "AYCE Coupon | June", sub: "Coupon claim offer", status: "running" as const, dates: "Jun 1 → ongoing", spend: 612, clicks: 1890, ctr: "1.96%", cpc: "$0.32", results: 264 },
  { id: "2", name: "Weekday Lunch Push", sub: "Traffic", status: "running" as const, dates: "May 13 → ongoing", spend: 385, clicks: 1016, ctr: "1.75%", cpc: "$0.38", results: 96 },
  { id: "3", name: "Grand Re-Opening Teaser", sub: "Reach", status: "ended" as const, dates: "May 18 → Jun 4", spend: 243, clicks: 478, ctr: "1.47%", cpc: "$0.51", results: 52 },
  { id: "4", name: "Mother's Day Family Bundle", sub: "Coupon claim offer", status: "ended" as const, dates: "Apr 28 → May 12", spend: 420, clicks: 1310, ctr: "2.04%", cpc: "$0.32", results: 189 },
  { id: "5", name: "Spring Break Karaoke Night", sub: "Event responses", status: "ended" as const, dates: "Apr 6 → Apr 20", spend: 310, clicks: 844, ctr: "1.62%", cpc: "$0.37", results: 71 },
];

export const CAMPAIGN_ADS = [
  { emoji: "🎬", name: "Sizzle Reel 15s", sub: "9:16 video", format: "Reel", spend: 298, clicks: 1044, ctr: "2.31%", claims: 156, costPerClaim: "$1.91" },
  { emoji: "🖼", name: "$5 Off Coupon — Static", sub: "1:1 image", format: "Feed", spend: 201, clicks: 562, ctr: "1.74%", claims: 78, costPerClaim: "$2.58" },
  { emoji: "🎠", name: "Menu Favorites", sub: "carousel · 4 cards", format: "Carousel", spend: 113, clicks: 284, ctr: "1.42%", claims: 30, costPerClaim: "$3.77" },
];

export const INTERACTIONS = [
  { text: '"Do you have vegetarian broth options?"', author: "Comment · @sara.nguyen", post: "Szechuan broth post", platform: "instagram" as const, when: "12 min ago", status: "pending" as const },
  { text: '"Came Friday with the coupon — amazing!! 🔥"', author: "Comment · @dmv.foodie", post: "AYCE Challenge reel", platform: "instagram" as const, when: "1h ago", status: "replied" as const },
  { text: '"What\'s the wait like on Saturdays around 7?"', author: "DM", post: "—", platform: "facebook" as const, when: "2h ago", status: "replied" as const, responseTime: "22 min" },
  { text: '"Coupon code didn\'t scan at the register"', author: "DM", post: "AYCE coupon", platform: "instagram" as const, when: "3h ago", status: "escalated" as const },
  { text: '"Do you take large group reservations?"', author: "Comment · @j.park88", post: "Birthday crew post", platform: "facebook" as const, when: "5h ago", status: "replied" as const },
];

export const CLIENTS = [
  { name: "KPOT Fairfax", slug: "kpot-fairfax", paid: "Live", organic: "FB + IG", shareLink: "/r/x7Kqf2" },
  { name: "KPOT Centreville", slug: "kpot-centreville", paid: "Mapping", organic: "Pending", shareLink: "—" },
  { name: "KPOT Chantilly", slug: "kpot-chantilly", paid: "Live", organic: "IG only", shareLink: "/r/m3Pq8n" },
];

export const TEAM_MEMBERS = [
  { name: "Gonzo", email: "gonzo@topfloormarketing.net", role: "Owner", scope: "All clients", lastActive: "Now" },
  { name: "Luis", email: "luis@topfloormarketing.net", role: "Developer", scope: "All clients", lastActive: "2h ago" },
  { name: "Blanca", email: "blanca@topfloormarketing.net", role: "Editor", scope: "KPOT locations", lastActive: "Yesterday" },
];

export const COUPON_CPR = [10.69, 9.84, 9.16, 8.92];
export const COUPON_CPR_LABELS = ["Apr 13–27", "Apr 28–May 12", "May 13–27", "May 28–Jun 11"];

export function getRangeData(key: DateRangeKey) {
  return RANGES[key];
}

export function getChartData(key: DateRangeKey) {
  const days = RANGES[key].days;
  return {
    current: clicks30.slice(-days),
    previous: prev30.slice(-days),
  };
}
