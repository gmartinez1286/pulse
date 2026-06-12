# Pulse — Cursor-Ready Design Spec

> **Source of truth:** `reporting-platform-mockup-v7.html` (copy this file into the project root as `REFERENCE-MOCKUP.html` — Cursor should read it for pixel-level accuracy on any component)
> **Stack:** Next.js 15 App Router + TypeScript + Supabase (Postgres) + Drizzle ORM + shadcn/ui + Recharts + Vercel (hosting + Cron)
> **Pilot client:** KPOT Hot Pot (5 locations, Fairfax as demo data)
> **Scope:** Organic + Paid, Facebook + Instagram only
> **Budget:** $1,500-2,000 all-in | **Timeline:** mid-July 2026

> **HOW TO USE THIS SPEC WITH CURSOR:**
> 1. Create a new repo (`pulse`) and drop this file in as `DESIGN-SPEC.md` at the project root
> 2. Copy `reporting-platform-mockup-v7.html` into the root as `REFERENCE-MOCKUP.html`
> 3. Tell Cursor: "Read DESIGN-SPEC.md and REFERENCE-MOCKUP.html. Build session 1 from section 12 (Build Order)."
> 4. Work session by session. After each session, tell Cursor: "Read DESIGN-SPEC.md, build session N."
> 5. For any component, tell Cursor: "Match the visual style exactly from REFERENCE-MOCKUP.html"
> 6. All mock data is in section 13. All real API work is deferred to Luis (section 8).

---

## 1. Project Setup

```bash
npx create-next-app@latest pulse --typescript --tailwind --eslint --app --src-dir
```

### shadcn/ui Setup (run after project creation)

```bash
npx shadcn@latest init
npx shadcn@latest add button card input select table tabs toggle badge separator dropdown-menu tooltip avatar dialog sheet label switch
```

### Dependencies

```json
{
  "dependencies": {
    "next": "^15",
    "react": "^19",
    "drizzle-orm": "latest",
    "postgres": "latest",
    "@supabase/supabase-js": "latest",
    "recharts": "^2",
    "@radix-ui/react-*": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "lucide-react": "latest",
    "date-fns": "latest",
    "zod": "latest"
  }
}
```

### Environment Variables

```env
DATABASE_URL=               # Supabase Postgres connection string
NEXT_PUBLIC_SUPABASE_URL=   # Supabase project URL
SUPABASE_SERVICE_ROLE_KEY=  # Server-side only
META_APP_ID=                # Meta developer app ID
META_APP_SECRET=            # Meta developer app secret
META_SYSTEM_USER_TOKEN=     # Never-expiring System User token (ads_read + pages scopes)
META_AD_ACCOUNT_ID=         # act_XXXXXXXXX (shared ad account)
CRON_SECRET=                # Vercel Cron auth token
```

---

## 2. Design Tokens

Extracted directly from the v7 mockup CSS `:root`. Map these to Tailwind `extend.colors` in `tailwind.config.ts`.

### Colors

```css
--accent: #635BFF        /* Primary purple (Stripe-inspired) */
--accent-soft: #EEEDFF   /* Purple tint backgrounds */
--accent-text: #5851E8   /* Purple on-surface text */
--teal: #00B8AC          /* Secondary teal */
--gold: #D4A017          /* Benchmark/highlight gold */
--pink: #E84393          /* Accent pink (IG, engagement) */

--bg: #F4F6FA            /* Page background */
--side: #FFFFFF           /* Sidebar background */
--card: #FFFFFF           /* Card background */
--card2: #F8F9FC          /* Card secondary (gradients) */

--ink: #1A1F36            /* Primary text */
--muted: #697386          /* Secondary/caption text */
--line: #E3E8EE           /* Border */
--line2: #D5DCE6          /* Stronger border */

--green: #0E8745          /* Positive delta */
--green-soft: #E6F6EC     /* Positive background */
--red: #CD3D64            /* Negative delta */
--red-soft: #FBE9EE       /* Negative background */
--warn: #9A6700           /* Warning text */
--warn-soft: #FFF4E0      /* Warning background */
--gray-soft: #F1F3F5      /* Hover/active background */

--fb: #1877F2             /* Facebook brand */
--fb-soft: #E7F0FE        /* Facebook tint */
--ig: #D6336C             /* Instagram brand */
--ig-soft: #FDEBF1        /* Instagram tint */

--shadow: 0 1px 2px rgba(26,31,54,.06), 0 6px 20px rgba(26,31,54,.06)
```

### Typography

- **Font family:** `'Inter', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`
- **Mono (links/codes):** `'JetBrains Mono', Consolas, monospace`
- **Base size:** 14.5px
- **Weight scale:** 500 (body), 600 (labels/values), 650 (page titles), 700 (badges/uppercase)

### Layout Constants

- **Sidebar width:** 248px expanded, 74px collapsed
- **Main content padding:** 24px 30px
- **Grid:** 12-column CSS grid, 16px gap
- **Card border-radius:** 16px, padding 19px 21px
- **Smaller radius:** badges 6px, inputs 8px, buttons 8px, sidebar nav items 10px

### Gradient Bar

3px fixed gradient bar at the very top of viewport:
```css
background: linear-gradient(90deg, #635BFF 0%, #9D8CFF 30%, #11EFE3 65%, #FFD848 100%)
```

### Animations

- **rise:** translateY(14px) + opacity 0 → normal, 0.55s cubic-bezier(.2,.7,.3,1), staggered via delay
- **pulse:** green dot box-shadow pulsing, 2s infinite (live indicator)
- **Count-up:** numeric values animate from 0 to target on page load, ~900ms ease-out

### Ready-to-Paste: `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      fontSize: {
        base: "14.5px",
      },
      colors: {
        accent: {
          DEFAULT: "#635BFF",
          soft: "#EEEDFF",
          text: "#5851E8",
        },
        teal: { DEFAULT: "#00B8AC" },
        gold: { DEFAULT: "#D4A017" },
        pink: { DEFAULT: "#E84393" },
        surface: {
          bg: "#F4F6FA",
          side: "#FFFFFF",
          card: "#FFFFFF",
          card2: "#F8F9FC",
        },
        ink: { DEFAULT: "#1A1F36" },
        muted: { DEFAULT: "#697386" },
        line: { DEFAULT: "#E3E8EE", strong: "#D5DCE6" },
        positive: { DEFAULT: "#0E8745", soft: "#E6F6EC" },
        negative: { DEFAULT: "#CD3D64", soft: "#FBE9EE" },
        warn: { DEFAULT: "#9A6700", soft: "#FFF4E0" },
        "gray-soft": { DEFAULT: "#F1F3F5" },
        fb: { DEFAULT: "#1877F2", soft: "#E7F0FE" },
        ig: { DEFAULT: "#D6336C", soft: "#FDEBF1" },
      },
      borderRadius: {
        card: "16px",
        badge: "6px",
        nav: "10px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,31,54,.06), 0 6px 20px rgba(26,31,54,.06)",
      },
      width: {
        sidebar: "248px",
        "sidebar-collapsed": "74px",
      },
      gridTemplateColumns: {
        "12": "repeat(12, minmax(0, 1fr))",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
        pulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(14,135,69,.3)" },
          "70%": { boxShadow: "0 0 0 7px rgba(14,135,69,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(14,135,69,0)" },
        },
      },
      animation: {
        rise: "rise 0.55s cubic-bezier(.2,.7,.3,1) forwards",
        "pulse-dot": "pulse 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

### Ready-to-Paste: `src/styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

body {
  font-family: 'Inter', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background: #F4F6FA;
  color: #1A1F36;
  font-size: 14.5px;
}

.gradient-bar {
  height: 3px;
  background: linear-gradient(90deg, #635BFF 0%, #9D8CFF 30%, #11EFE3 65%, #FFD848 100%);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}

/* Grid column spans matching the mockup */
.col-span-2 { grid-column: span 2; }
.col-span-3 { grid-column: span 3; }
.col-span-4 { grid-column: span 4; }
.col-span-5 { grid-column: span 5; }
.col-span-6 { grid-column: span 6; }
.col-span-7 { grid-column: span 7; }
.col-span-8 { grid-column: span 8; }
.col-span-12 { grid-column: span 12; }

@media (max-width: 1280px) {
  .col-span-2 { grid-column: span 4; }
  .col-span-3, .col-span-4 { grid-column: span 6; }
  .col-span-5, .col-span-6, .col-span-7, .col-span-8 { grid-column: span 12; }
}

@media (max-width: 760px) {
  .col-span-2, .col-span-3, .col-span-4 { grid-column: span 12; }
}
```

---

## 3. File Structure (Next.js App Router)

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (gradient bar, Inter font import)
│   ├── page.tsx                      # Redirect to /login or /dashboard
│   ├── (auth)/
│   │   └── login/page.tsx            # Admin login (Phase 1: simple, Phase 3: NextAuth)
│   ├── (dashboard)/
│   │   ├── layout.tsx                # Sidebar + main shell
│   │   ├── page.tsx                  # Redirect to /overview
│   │   ├── overview/page.tsx         # Overview (command center)
│   │   ├── content/page.tsx          # Content Performance
│   │   ├── audience/page.tsx         # Audience Insights
│   │   ├── engagement/page.tsx       # Engagement Tracker
│   │   ├── campaigns/page.tsx        # Campaign Reports (paid)
│   │   ├── exports/page.tsx          # Export Center
│   │   ├── clients/page.tsx          # Clients & Mapping (admin)
│   │   ├── coupons/page.tsx          # Coupons & Offline (Phase 2)
│   │   ├── team/page.tsx             # Team & Co-Workers
│   │   ├── billing/page.tsx          # Plan & Billing (Phase 3 preview)
│   │   └── settings/page.tsx         # Settings (branding, data sources, sync)
│   ├── r/[token]/
│   │   ├── layout.tsx                # Client-facing share layout (no sidebar)
│   │   └── page.tsx                  # Client dashboard (read-only, tokenized)
│   └── api/
│       ├── cron/
│       │   ├── sync-paid/route.ts    # Hourly paid metrics sync
│       │   ├── sync-organic/route.ts # Every-6h organic post snapshots
│       │   └── restate/route.ts      # 72h paid restatement re-pull
│       ├── clients/route.ts          # CRUD clients
│       ├── campaigns/
│       │   ├── route.ts              # List/map campaigns
│       │   └── [id]/route.ts         # Campaign detail
│       ├── share-links/route.ts      # Create/revoke share tokens
│       ├── offline/route.ts          # Log coupon redemptions (Phase 2)
│       ├── exports/route.ts          # Generate snapshot PDF
│       └── meta/
│           ├── test/route.ts         # Test Meta API connection
│           └── token/route.ts        # Token health check
├── components/
│   ├── ui/                           # shadcn/ui primitives
│   ├── layout/
│   │   ├── sidebar.tsx               # Collapsible sidebar
│   │   ├── topbar.tsx                # Breadcrumb + live chip + date range
│   │   └── gradient-bar.tsx          # Top gradient strip
│   ├── charts/
│   │   ├── area-chart.tsx            # Smooth area with optional prev-period line
│   │   ├── bar-chart.tsx             # Vertical bars (coupon cost trend)
│   │   ├── donut-chart.tsx           # Ring donut with center label
│   │   ├── sparkline.tsx             # Inline mini trend line
│   │   ├── heatmap.tsx               # 7x6 grid (best time to post)
│   │   ├── combo-chart.tsx           # Bars + line overlay (follower growth)
│   │   └── horizontal-bars.tsx       # Horizontal progress bars (age, format mix)
│   ├── cards/
│   │   ├── kpi-card.tsx              # Icon + label + value + delta + sparkline
│   │   ├── score-card.tsx            # Ring gauge with composite score
│   │   ├── insight-card.tsx          # Numbered insight list
│   │   ├── top-post-card.tsx         # Post thumbnail + stats row
│   │   └── tier-card.tsx             # Pricing tier (Plan & Billing)
│   ├── tables/
│   │   ├── campaign-table.tsx        # Campaigns list with sparklines
│   │   ├── post-table.tsx            # All posts (organic)
│   │   ├── interaction-table.tsx     # Engagement triage queue
│   │   ├── comparison-matrix.tsx     # Period comparison table
│   │   └── client-table.tsx          # Admin client list
│   ├── data/
│   │   ├── funnel.tsx                # Full-funnel visualization
│   │   ├── goal-gauges.tsx           # Pacing gauges with pace markers
│   │   └── sync-health.tsx           # API connection status list
│   └── shared/
│       ├── badge.tsx                 # Status badges (Running/Ended/Pending)
│       ├── platform-chip.tsx         # FB/IG branded chips
│       ├── delta-chip.tsx            # +12.4% / -3.2% colored chips
│       ├── date-range-selector.tsx   # 30d/14d/MTD segment control
│       └── toggle-switch.tsx         # Settings toggle
├── lib/
│   ├── db/
│   │   ├── schema.ts                # Drizzle schema (see Section 4)
│   │   ├── index.ts                 # DB connection
│   │   └── queries/                 # Pre-built query functions
│   │       ├── metrics.ts           # Paid metrics queries
│   │       ├── posts.ts             # Organic post queries
│   │       ├── campaigns.ts         # Campaign queries
│   │       └── clients.ts           # Client queries
│   ├── meta/
│   │   ├── client.ts                # Meta Graph API client wrapper
│   │   ├── sync-paid.ts             # Paid insights sync logic
│   │   ├── sync-organic.ts          # Organic posts + page insights sync
│   │   └── types.ts                 # Meta API response types
│   ├── utils/
│   │   ├── format.ts                # Number/currency/date formatters
│   │   ├── compute.ts               # CTR, CPC, CPM, ER calculations (never store ratios)
│   │   └── dates.ts                 # Date range helpers
│   └── constants.ts                 # Attribution windows, sync intervals, etc.
└── styles/
    └── globals.css                   # Tailwind + CSS custom properties
```

---

## 4. Database Schema (Drizzle + Supabase Postgres)

```typescript
// lib/db/schema.ts
import { pgTable, uuid, text, integer, numeric, date, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core'

export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),                    // "KPOT Fairfax"
  slug: text('slug').notNull().unique(),            // "kpot-fairfax"
  logoUrl: text('logo_url'),
  brandColor: text('brand_color'),                  // hex override
  reportCadence: text('report_cadence').default('monthly'), // monthly | biweekly
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
})

export const adAccounts = pgTable('ad_accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  metaAccountId: text('meta_account_id').notNull(), // "act_2938102..."
  bmLabel: text('bm_label'),                        // "Temporary BM"
  tokenRef: text('token_ref'),                      // config pointer, not the token itself
})

export const pages = pgTable('pages', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').references(() => clients.id).notNull(),
  fbPageId: text('fb_page_id'),                     // nullable (some clients FB only, some IG only)
  igUserId: text('ig_user_id'),                     // nullable
  pageName: text('page_name'),
  platform: text('platform').notNull(),             // "facebook" | "instagram"
  connected: boolean('connected').default(false),
})

export const campaigns = pgTable('campaigns', {
  id: uuid('id').primaryKey().defaultRandom(),
  metaCampaignId: text('meta_campaign_id').notNull().unique(),
  name: text('name').notNull(),                     // "AYCE Coupon | June"
  adAccountId: uuid('ad_account_id').references(() => adAccounts.id),
  clientId: uuid('client_id').references(() => clients.id), // nullable until mapped
  objective: text('objective'),                     // "CONVERSIONS", "REACH", etc.
  status: text('status'),                           // "ACTIVE", "PAUSED", "DELETED"
  startDate: date('start_date'),
  endDate: date('end_date'),
})

export const adSets = pgTable('ad_sets', {
  id: uuid('id').primaryKey().defaultRandom(),
  metaAdSetId: text('meta_ad_set_id').notNull().unique(),
  campaignId: uuid('campaign_id').references(() => campaigns.id),
  name: text('name').notNull(),
})

export const ads = pgTable('ads', {
  id: uuid('id').primaryKey().defaultRandom(),
  metaAdId: text('meta_ad_id').notNull().unique(),
  adSetId: uuid('ad_set_id').references(() => adSets.id),
  campaignId: uuid('campaign_id').references(() => campaigns.id),
  name: text('name').notNull(),
  format: text('format'),                           // "VIDEO", "IMAGE", "CAROUSEL"
  thumbnailUrl: text('thumbnail_url'),
  createdAt: timestamp('created_at'),
})

// PAID: raw daily counts only. Compute CTR/CPC/CPM at read time.
export const metricsDaily = pgTable('metrics_daily', {
  id: uuid('id').primaryKey().defaultRandom(),
  campaignId: uuid('campaign_id').references(() => campaigns.id).notNull(),
  adId: uuid('ad_id').references(() => ads.id),     // nullable for campaign-level
  date: date('date').notNull(),
  spend: numeric('spend', { precision: 10, scale: 2 }),
  impressions: integer('impressions').default(0),
  reach: integer('reach').default(0),
  clicks: integer('clicks').default(0),
  linkClicks: integer('link_clicks').default(0),
  results: integer('results').default(0),
  resultType: text('result_type'),                  // "offsite_conversion.fb_pixel_custom" etc.
  frequency: numeric('frequency', { precision: 5, scale: 2 }),
  actions: jsonb('actions'),                        // full actions array from Meta
})

// ORGANIC: posts synced from FB Pages API + IG Graph API
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  pageId: uuid('page_id').references(() => pages.id).notNull(),
  metaPostId: text('meta_post_id').notNull().unique(),
  platform: text('platform').notNull(),             // "facebook" | "instagram"
  format: text('format').notNull(),                 // "post" | "reel" | "story" | "carousel"
  caption: text('caption'),
  permalink: text('permalink'),
  thumbnailUrl: text('thumbnail_url'),
  publishedAt: timestamp('published_at'),
})

// Post metrics are LIFETIME totals. Sync snapshots, compute deltas at read time.
export const postMetricsSnapshots = pgTable('post_metrics_snapshots', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').references(() => posts.id).notNull(),
  capturedAt: timestamp('captured_at').defaultNow(),
  impressions: integer('impressions').default(0),
  reach: integer('reach').default(0),
  likes: integer('likes').default(0),
  comments: integer('comments').default(0),
  shares: integer('shares').default(0),
  saves: integer('saves').default(0),
  clicks: integer('clicks').default(0),
  plays: integer('plays'),                          // Reels only
})

// Page-level insights (daily audience data)
export const pageInsightsDaily = pgTable('page_insights_daily', {
  id: uuid('id').primaryKey().defaultRandom(),
  pageId: uuid('page_id').references(() => pages.id).notNull(),
  date: date('date').notNull(),
  impressions: integer('impressions').default(0),
  reach: integer('reach').default(0),
  engagedUsers: integer('engaged_users').default(0),
  followers: integer('followers').default(0),
  profileViews: integer('profile_views').default(0),
  audienceGender: jsonb('audience_gender'),          // { "F": 62, "M": 38 }
  audienceAge: jsonb('audience_age'),                // { "18-24": 22, "25-34": 38, ... }
  audienceCity: jsonb('audience_city'),              // { "Fairfax, VA": 41, ... }
  audienceOnlineHours: jsonb('audience_online_hours'), // { "18": 42, "19": 48, ... }
})

// PHASE 2: Offline redemption data (manual entry)
export const offlineResults = pgTable('offline_results', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').references(() => clients.id).notNull(),
  periodStart: date('period_start').notNull(),
  periodEnd: date('period_end').notNull(),
  type: text('type').default('coupon_redemption'),
  value: integer('value').notNull(),                // number redeemed
  source: text('source'),                           // "Biweekly email" | "Manager call" | "Count sheet"
  enteredBy: text('entered_by'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const shareLinks = pgTable('share_links', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').references(() => clients.id).notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
  revokedAt: timestamp('revoked_at'),
})

export const syncRuns = pgTable('sync_runs', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type').notNull(),                     // "paid" | "organic" | "restate"
  startedAt: timestamp('started_at').defaultNow(),
  finishedAt: timestamp('finished_at'),
  status: text('status').default('running'),        // "running" | "success" | "failed"
  rowsUpserted: integer('rows_upserted').default(0),
  error: text('error'),
})

export const teamMembers = pgTable('team_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull(),                     // "owner" | "editor" | "viewer" | "developer"
  lastActiveAt: timestamp('last_active_at'),
})

export const settings = pgTable('settings', {
  key: text('key').primaryKey(),                    // "agency_name", "logo_url", "accent_color", etc.
  value: text('value'),
})
```

---

## 5. Pages & Routes

| Route | Page | Nav Group | Description |
|-------|------|-----------|-------------|
| `/overview` | Overview | Main | Command center: score ring, main chart, KPI cards, funnel, donuts, heatmap, comparison matrix, top posts |
| `/content` | Content Performance | Main | Organic: engagement KPIs, tabbed chart (likes/comments/shares/saves), format mix bars, all-posts table |
| `/audience` | Audience Insights | Main | Follower growth combo chart, gender donut, age bars, top locations table, online hours |
| `/engagement` | Engagement Tracker | Main | Interaction KPIs (reply rate, response time), tabbed chart, interaction mix donut, triage table |
| `/campaigns` | Campaign Reports | Main | Paid campaign table with sparklines, click-to-expand ad-level drill-down, daily claims chart |
| `/exports` | Export Center | Main | Snapshot schedule (toggles + recipients), sent history with open tracking, AI summary preview (Phase 3) |
| `/clients` | Clients & Mapping | Business Suite | Client list with share links, sync health panel, unmapped campaigns queue |
| `/coupons` | Coupons & Offline | Business Suite | Redemption entry form, claims/redeemed/CPR KPIs, cost-per-redemption trend, history table (Phase 2) |
| `/team` | Team & Co-Workers | Business Suite | Team members table, role permission toggles |
| `/billing` | Plan & Billing | Business Suite | Phase 3 preview: infra cost, potential revenue, 3 pricing tiers |
| `/settings` | Settings | Business Suite | Branding (logo, accent, per-client override), Meta data sources, sync frequency, alert toggles |
| `/r/[token]` | Client Dashboard | (public) | Read-only client view, no sidebar, "Powered by TopFloor" footer, same widgets as Overview |

---

## 6. Component Specifications

### 6.1 Layout — Sidebar (`components/layout/sidebar.tsx`)

**Behavior:** Collapsible via toggle button (body gets `collapsed` class). Expanded = 248px, collapsed = 74px with icon-only nav.

**Sections (top to bottom):**
1. **Logo header:** Full Pulse logo (expanded) or purple "P" mark (collapsed) + collapse toggle button
2. **Main nav group:** Overview, Content Performance, Audience Insights, Engagement Tracker, Campaign Reports, Export Center
3. **Platforms group** (section header "Platforms"): FB Page icon + "KPOT Fairfax" (Live badge), IG icon + "kpot_fairfax" (Live badge)
4. **Business Suite group** (section header "Business Suite" with "New" chip): Clients & Mapping, Coupons & Offline (P2 tag), Team & Co-Workers, Plan & Billing (P3 tag), Settings
5. **Spacer** (flex: 1)
6. **Workspace card:** "WORKSPACE" label, client name "KPOT Hot Pot — Fairfax"
7. **Sync line:** green dot + "Synced 12 min ago" + "v7.0"

**Collapsed state hides:** nav labels, tags, chevrons, group headers, workspace card, sync line. Shows only icons centered.

**Nav item structure:**
```
<a class="nav-item [active]">
  <span class="icon">⌂</span>
  <span class="label">Overview</span>
  [optional: <span class="tag">P2</span> or <span class="chevron">›</span>]
</a>
```

### 6.2 Layout — Topbar (`components/layout/topbar.tsx`)

```
[Breadcrumb section] .................... [Date controls right-aligned]
 KPOT Fairfax › Overview                  [30d | 14d | MTD] [Export ↓]
 Command Center — KPOT Fairfax   [LIVE ●]
```

- **Breadcrumb:** section name (gray 12.5px) + page title (black 18px bold)
- **Live chip:** green dot with pulse animation + "LIVE" uppercase
- **Date range segment:** 3 buttons (30d / 14d / MTD), active state = white bg + shadow
- **Export button:** bordered, "Export ↓"

### 6.3 Cards — KPI Card (`components/cards/kpi-card.tsx`)

```tsx
interface KpiCardProps {
  icon: string          // emoji or Lucide icon
  label: string         // "Impressions"
  value: string         // "187.1K"
  delta: string         // "+12.4%"
  deltaDirection: 'up' | 'down'
  sparklineData?: number[]
}
```

Renders: icon (32px square, accent-soft bg) → label (10.5px muted uppercase) → value (20px 600-weight) → delta (11px green/red) → sparkline below.

### 6.4 Cards — Score Card (`components/cards/score-card.tsx`)

Large ring gauge centered, 140x140px SVG. Animated arc stroke-dashoffset from full to target. Center: large number (38px) + "/ 100" label. Below ring: verdict badge ("Strong" green pill) + "why" explanation text.

Score formula (compute from data): weighted average of cost efficiency vs 90d avg (25%), engagement rate vs benchmark (25%), goal pacing (25%), redemption trend (25%).

### 6.5 Charts — Area Chart (`components/charts/area-chart.tsx`)

```tsx
interface AreaChartProps {
  data: { date: string; value: number }[]
  prevPeriodData?: { date: string; value: number }[]  // dotted line
  height?: number
  color?: string          // default: accent
  showTooltip?: boolean   // crosshair + hover card
  fillGradient?: boolean  // area fill
}
```

Uses Recharts `<AreaChart>`. Smooth curves (monotone interpolation). Current period: solid accent line + gradient fill. Previous period: dashed muted line. Tooltip shows date + current value + prev value on hover.

### 6.6 Charts — Donut Chart (`components/charts/donut-chart.tsx`)

```tsx
interface DonutChartProps {
  segments: { label: string; value: number; color: string }[]
  centerLabel: string     // "105K"
  centerSub: string       // "total reach"
  size?: number           // default 130
}
```

SVG ring (stroke-width 15, radius 48). Legend rendered beside it in a flex row.

### 6.7 Charts — Heatmap (`components/charts/heatmap.tsx`)

7 rows (Mon-Sun) x 6 columns (6-9a, 9-12, 12-3p, 3-6p, 6-9p, 9-12a). Cell opacity scales with value (0.12 to 1.0). Peak cells get gold outline. Note below: "Peak: Thu-Fri 6-9 PM".

### 6.8 Data — Funnel (`components/data/funnel.tsx`)

```tsx
interface FunnelStage {
  label: string           // "Impressions"
  value: number           // 187100
  barColor: string
  conversionRate?: string // "34.3% of impressions"
  isOffline?: boolean     // dashed gold border for offline stages
}
```

Each stage: 3-column grid (150px label + flex bar + 105px conversion). Bar width proportional to value. Offline stages (Redeemed) get dashed gold border.

### 6.9 Data — Goal Gauges (`components/data/goal-gauges.tsx`)

```tsx
interface GaugeProps {
  label: string           // "Coupon claims"
  current: number
  target: number
  paceDay: number         // day 11 of 30 = show pace marker at 36.7%
  status: string          // "Ahead of pace" / "On pace" / "Behind"
}
```

Horizontal track with gradient fill (accent → teal). Pace marker = vertical black line at expected position for current day. Status text below.

### 6.10 Tables — Campaign Table (`components/tables/campaign-table.tsx`)

Columns: Campaign (name + subtext), Status (badge), Dates, Spend, Clicks, CTR, CPC, Results, Trend (sparkline).

Rows are clickable (selectable). Selected row gets accent-soft background. Clicking loads ad-level drill-down below.

### 6.11 Tables — Post Table (`components/tables/post-table.tsx`)

Columns: Post (thumbnail + title + format), Platform (FB/IG chip), Format, Published, Reach, Engagement, ER, Link clicks.

Filter buttons above: All | Facebook | Instagram. Format filters: All formats | Posts | Reels | Stories.

### 6.12 Tables — Interaction Table (`components/tables/interaction-table.tsx`)

Columns: Interaction (comment/DM text + author), Post, Platform, When (relative time), Status (Pending/Replied/Escalated badge), Action (Reply button).

Status badges:
- **Pending:** warn-soft bg, warn text
- **Replied:** green-soft bg, green text, "+ response time"
- **Escalated:** red-soft bg, red text

### 6.13 Shared — Badges (`components/shared/badge.tsx`)

Variants: `run` (green), `end` (gray), `p2` (accent), `pend` (warn).

### 6.14 Shared — Platform Chip (`components/shared/platform-chip.tsx`)

Small inline chips: "FB" with fb-soft bg / fb text, "IG" with ig-soft bg / ig text.

### 6.15 Shared — Delta Chip (`components/shared/delta-chip.tsx`)

`+12.4%` on green-soft/green or `-3.2%` on red-soft/red. Inline block, 10.5px font.

---

## 7. Page-by-Page Specification

### Page 1: Overview (Command Center)

**Grid layout (12 columns):**

Row 1:
- **Score card** (span 3): Performance Score ring (0-100 composite)
- **Main chart** (span 6): Area chart — daily link clicks, 30d, with prev-period dotted line. Hover tooltip.
- **Insights card** (span 3): "Pulse insights" — 3-4 AI-generated insight bullets with numbered badges

Row 2:
- **6 KPI cards** (span 2 each): Impressions, Reach (paid), Link clicks, CTR, CPC, ER (organic). Each with sparkline.

Row 3:
- **Funnel** (span 7): 5 stages — Impressions → Reach → Link clicks → Coupon claims → Redeemed in-store. Last stage dashed gold (offline).
- **Goal gauges** (span 5): 3 gauges — Coupon claims (target 500), Redemptions (150), Engagement rate (4.0%). Pace markers for day-of-month.

Row 4 (4 cards, span 3 each):
- Paid vs organic reach donut
- FB vs IG engagement donut
- Format battle: horizontal bars (Post/Reel/Story ER) with 4.1% restaurant benchmark line
- Follower growth combo chart (daily bars + cumulative line)

Row 5:
- **Heatmap** (span 6): Best time to post
- **Comparison matrix** (span 6): 8-row table (Spend, CPC, Claims, Cost/claim, Redemption rate, Organic engagement, ER, Follower net adds) x (Current, Previous, Delta, 90d avg)

Row 6:
- **Top performing content** (span 12): 3 top posts by ER with stats rows

**Interactions:**
- Date range switching (30d/14d/MTD) reloads all data
- Count-up animation on initial load
- Chart tooltip on hover
- Score ring animates on load

**Data query:**
```sql
-- KPIs: aggregate metrics_daily for client + date range
-- Chart: daily link_clicks for 30d + prev 30d
-- Funnel: sum impressions, reach, clicks, results + offline_results
-- Posts: top 3 by computed ER
-- Heatmap: aggregate post engagement by day-of-week + hour bucket
-- Comparison: current period vs previous vs 90d rolling avg
```

### Page 2: Content Performance

Row 1: 4 KPI cards (span 3 each) — Total engagement, Follower growth, Organic impressions, Engagement rate

Row 2:
- **Engagement chart** (span 8): Tabbed — Likes/Comments/Shares/Saves. Area chart, 30d. Below chart: format filter buttons (All/Posts/Reels/Stories)
- **Format mix** (span 4): Horizontal bars — Posts (12), Stories (6), Reels (4). Note: "Reels are 18% of output but 49% of engagement"

Row 3:
- **All posts table** (span 12): Full organic post table with platform and format filters

**Data source:** `posts` + `post_metrics_snapshots` (compute deltas between snapshots for period engagement)

### Page 3: Audience Insights

Row 1: 4 KPI cards — Total followers, New follows (net), Profile views, Local audience %

Row 2:
- **Follower growth combo chart** (span 6): Daily net-add bars + cumulative line
- **Gender donut** (span 3): Women/Men split
- **Age bars** (span 3): Horizontal bars for 18-24, 25-34, 35-44, 45-54, 55+

Row 3:
- **Top locations table** (span 6): City, Share %, vs prev delta
- **When followers are online** (span 6): Horizontal bars by time block + insight note

**Data source:** `page_insights_daily.audience_*` JSONB fields

### Page 4: Engagement Tracker

Row 1: 4 KPI cards — Total interactions, Avg per post, Comment reply rate, Avg response time

Row 2:
- **Interactions chart** (span 8): Same tabbed area chart as Content but labeled "Interactions"
- **Interaction mix donut** (span 4): Likes 74%, Shares 10%, Comments 9%, Saves 7%

Row 3:
- **Recent interactions table** (span 12): Triage queue — comments + DMs sorted by recency, with Pending/Replied/Escalated status and Reply/View buttons

**Note:** The interaction triage table is a future Phase 2/3 feature requiring webhook or polling for real-time comments. For v1, populate from post comment counts in `post_metrics_snapshots`. Build the UI now with mock data; wire to real comment pull later.

### Page 5: Campaign Reports (Paid)

Row 1:
- **Campaign table** (span 12): All paid campaigns with sparklines. Click to select.

Row 2:
- **Campaign detail** (span 12): Shows for selected campaign — daily claims area chart + ad-level breakdown table (Ad name, Format badge, Spend, Clicks, CTR, Claims, Cost/claim)

**Data source:** `campaigns` + `metrics_daily` (campaign-level) + `ads` + `metrics_daily` (ad-level)

### Page 6: Export Center

Row 1:
- **Snapshot schedule** (span 5): Toggle switches (auto-send monthly, include organic, include coupons, notify Blanca). Recipients field. "Generate snapshot now" primary button.
- **Sent snapshots** (span 7): Table — Report name, Sent date, Status (Opened Nx/Not opened), View PDF button

Row 2:
- **AI summary** (span 12): Phase 3 preview — dashed border card with italic Claude-generated narrative. Editable before send.

**For v1:** "Generate snapshot now" creates a print-friendly HTML page at `/r/[token]/print` with `@media print` styles. Phase 2 adds email delivery via Resend/Postmark.

### Page 7: Clients & Mapping (Admin)

Row 1:
- **Client table** (span 7): Name, Paid status (Live/Mapping), Organic status (FB+IG/pending), Share link, Revoke button. "+ Add client" primary button.
- Column span 5:
  - **Sync health card:** 6 status lines — Marketing API, Pages API, IG Graph API, Attribution window, Token root (warn if temp BM), Post snapshots
  - **Unmapped campaigns card:** Table of new campaigns with "Assign" button each

### Page 8: Coupons & Offline (Phase 2)

Row 0: Phase 2 preview banner (dashed accent border)

Row 1:
- **Entry form** (span 4): Location dropdown, Reporting period input, Coupons redeemed input, Source dropdown, Save button
- Right side (span 8): 3 KPI cards (Claims, Redeemed, Cost/redemption) + cost-per-redemption trend bar chart

Row 2:
- **Redemption history table** (span 12): Period, Source, Claims, Redeemed, Rate, Spend, Cost/redemption

### Page 9: Team & Co-Workers

Row 1:
- **Team table** (span 7): Member name/email, Role badge (Owner/Editor/Viewer/Developer), Access scope, Last active. "+ Invite teammate" button.
- **Role permissions** (span 5): 4 toggle switches controlling what editors/viewers can access

### Page 10: Plan & Billing (Phase 3 Preview)

Row 0: Phase 3 preview banner

Row 1: 3 KPI cards — Current plan (Internal/$0), Infra cost ($31), Potential revenue ($1,300/mo)

Row 2: 3 pricing tier cards side by side:
- **Starter $100/mo:** 1 location, paid+organic, monthly PDF, live share link
- **Growth $200/mo** (featured): Up to 3 locations, coupon tracking, weekly snapshots, audience insights
- **Agency $400/mo:** Unlimited locations, white-label, AI summaries, client self-connect

### Page 11: Settings

Row 1:
- **Branding** (span 6): Agency name input, Logo upload button, Accent color swatches (5 options), Per-client brand override toggle
- Right column (span 6):
  - **Data sources card:** Ad account ID, FB Pages connected (count), IG accounts, BM status (warn for temp), Token scopes list, Attribution window, "Rotate token" button
  - **Sync card:** Paid frequency dropdown (hourly/30min/6h), Organic frequency dropdown (6h/hourly/daily), 72h restatement toggle, Failed sync alert toggle

---

## 8. Meta API Integration Points

> **This is what Luis wires up.** The frontend is built with Cursor against mock data. Luis replaces mock data with real API calls.

### 8.1 Paid Metrics — Marketing API

**Endpoint:** `GET /act_{ad_account_id}/insights`

**Parameters:**
```
level=campaign (or adset, ad for drill-down)
time_range={"since":"YYYY-MM-DD","until":"YYYY-MM-DD"}
time_increment=1 (daily breakdown)
fields=campaign_id,campaign_name,spend,impressions,reach,clicks,
       inline_link_clicks,actions,frequency,cpc,cpm,ctr
attribution_windows=["7d_click","1d_view"]   # PINNED — must match Ads Manager
```

**Sync cadence:** Hourly via Vercel Cron
**Backfill:** 13 months on first run
**Restatement:** Re-pull trailing 72h on every sync (Meta restates as attribution settles)

**Required token scopes:** `ads_read`

### 8.2 Campaign & Ad Structure

**Endpoints:**
```
GET /act_{ad_account_id}/campaigns?fields=id,name,objective,status,start_time,stop_time
GET /act_{ad_account_id}/adsets?fields=id,name,campaign_id
GET /act_{ad_account_id}/ads?fields=id,name,adset_id,campaign_id,creative{thumbnail_url}
```

Sync structure on first run + when new unmapped campaigns appear.

### 8.3 Facebook Organic — Pages API

**Page-level insights:**
```
GET /{page-id}/insights?metric=page_impressions,page_engaged_users,page_fans,
    page_views_total&period=day&since=YYYY-MM-DD&until=YYYY-MM-DD
```

**Post list + per-post insights:**
```
GET /{page-id}/posts?fields=id,message,permalink_url,created_time,type,
    full_picture&limit=100
GET /{post-id}/insights?metric=post_impressions,post_reach,
    post_reactions_by_type_total,post_clicks
```

**Sync cadence:** Every 6 hours
**Key rule:** Post metrics are LIFETIME totals. Store snapshots, compute deltas.

**Required token scopes:** `pages_read_engagement`, `pages_read_user_content`

### 8.4 Instagram Organic — IG Graph API

**Account-level insights:**
```
GET /{ig-user-id}/insights?metric=reach,impressions,profile_views,
    follower_count&period=day&since=UNIX_TIMESTAMP&until=UNIX_TIMESTAMP
```

**Audience demographics (available once/day):**
```
GET /{ig-user-id}/insights?metric=audience_gender_age,audience_city,
    audience_country&period=lifetime
```

**Media list + per-media insights:**
```
GET /{ig-user-id}/media?fields=id,caption,media_type,permalink,
    thumbnail_url,timestamp&limit=100
GET /{ig-media-id}/insights?metric=reach,impressions,likes,comments,
    shares,saved,plays (Reels),replies (Stories)
```

**Stories caveat:** Story insights expire 24h after posting. Sync must catch them same-day. Build a more frequent sync (every 2h) or accept data loss for Stories posted late.

**Required token scopes:** `instagram_basic`, `instagram_manage_insights`

### 8.5 Token Architecture

- System User created in the **temporary Business Manager**
- Never-expiring token (vs 60-day user tokens)
- All FB Pages + IG accounts must be accessible from this BM
- Token + account IDs stored as environment variables (config, not architecture)
- On BM recovery: rotate token, run SECURE-FIRST checklist, re-verify all page access

---

## 9. Sync Engine (Vercel Cron)

### `vercel.json` cron config:

```json
{
  "crons": [
    {
      "path": "/api/cron/sync-paid",
      "schedule": "0 * * * *"
    },
    {
      "path": "/api/cron/sync-organic",
      "schedule": "0 */6 * * *"
    },
    {
      "path": "/api/cron/restate",
      "schedule": "30 3 * * *"
    }
  ]
}
```

| Job | Path | Schedule | What it does |
|-----|------|----------|--------------|
| Paid sync | `/api/cron/sync-paid` | Every hour | Pull campaign insights for trailing 3 days, upsert `metrics_daily` |
| Organic sync | `/api/cron/sync-organic` | Every 6h | Pull FB posts + IG media, snapshot metrics into `post_metrics_snapshots`, pull page insights |
| Restatement | `/api/cron/restate` | 3:30 AM daily | Re-pull full 72h window of paid data, overwrite to match Ads Manager |

Each job logs to `sync_runs` table. On 2 consecutive failures, email alert to owner.

---

## 10. Client Share Links

**URL pattern:** `/r/{random_token}` (e.g., `/r/x7Kqf2`)

**Behavior:**
- No authentication required (tokenized access)
- Read-only subset of the Overview page
- "Powered by TopFloor Marketing" footer
- Shows client logo + name
- "Last synced X min ago" indicator
- No sidebar, no admin features
- Revoke = soft-delete (set `revoked_at`), regenerate creates new token

**Phase 3 upgrade:** Token links become login-gated client portals.

---

## 11. Responsive Breakpoints

From the mockup CSS:

```css
@media (max-width: 1280px) {
  .c2 { grid-column: span 4; }   /* KPI cards: 3 per row instead of 6 */
  .c3, .c4 { grid-column: span 6; }
  .c5, .c6, .c7, .c8 { grid-column: span 12; }
}

@media (max-width: 760px) {
  .c2, .c3, .c4 { grid-column: span 12; }  /* Everything full-width */
}
```

Sidebar: auto-collapse on mobile (default to icon-only rail or hidden with hamburger).

---

## 12. Build Order (recommended for Cursor sessions)

**Session 1 — Scaffold + Layout**
- Next.js project setup with all deps
- Tailwind config with design tokens
- Root layout with gradient bar
- Dashboard layout with sidebar + topbar
- Page routing for all 11 pages (empty shells)

**Session 2 — Shared Components**
- KPI card, badges, delta chips, platform chips
- Date range selector
- Toggle switches, form fields

**Session 3 — Charts**
- Area chart with tooltip
- Donut chart
- Horizontal bars
- Sparklines
- Heatmap
- Combo chart (bars + line)
- Funnel visualization
- Goal gauges

**Session 4 — Overview Page**
- Wire all components into the 12-column grid
- Mock data matching the v7 numbers
- Count-up animations
- Score ring

**Session 5 — Content + Audience + Engagement Pages**
- Post table, campaign table
- Tabbed engagement charts
- Interaction triage table
- Audience demographics visualizations

**Session 6 — Campaigns + Exports**
- Campaign table with row selection
- Ad-level drill-down
- Export schedule UI
- Sent snapshots table

**Session 7 — Admin Pages**
- Clients & Mapping (client table + sync health + unmapped queue)
- Team & Co-Workers (team table + permission toggles)
- Settings (branding + data sources + sync config)
- Plan & Billing (tier cards)
- Coupons & Offline (entry form + history)

**Session 8 — Database + API**
- Drizzle schema + migrations
- API routes for all CRUD
- Share link token generation + `/r/[token]` route

**Session 9 — Luis takes over: Meta API wiring**
- System User token setup (Phase 0 gate)
- Paid sync worker
- Organic sync worker
- Replace all mock data with real queries

**Session 10 — Polish + Ship**
- Print stylesheet for snapshots
- Loading states + error boundaries
- Pilot: KPOT Fairfax data live
- Deploy to Vercel

---

## 13. Mock Data

For Cursor sessions 1-8, use hardcoded mock data matching the v7 mockup exactly. All numbers are in the HTML file. Key mock datasets:

- **30-day click series:** `[98,112,91,84,118,142,156,95,108,88,82,124,149,162,92,103,85,79,116,138,151,90,105,87,76,121,146,158,116,112]`
- **Spend series:** `[38,42,35,31,44,52,57,36,40,33,30,46,55,60,35,38,31,29,43,51,56,34,39,32,28,45,54,58,37,31]`
- **Follower daily adds:** `[4,6,3,2,7,11,14,5,6,4,3,9,12,15,4,5,3,2,8,10,13,4,6,3,2,9,12,14,8,10]`
- **Campaign claims (11d):** `[18,22,19,16,25,31,34,21,24,20,34]`
- **Coupon CPR trend:** `[$10.69, $9.84, $9.16, $8.92]`
- **Engagement types:** derive from clicks series (`likes = clicks*0.92`, `comments = clicks*0.13+3`, `shares = clicks*0.09+2`, `saves = clicks*0.075+1`)

All other data points (KPI values, table rows, donut percentages) are in the mockup HTML.

---

## Appendix: What Cursor Builds vs What Luis Wires

| Layer | Cursor (with Gonzo) | Luis (engineer) |
|-------|---------------------|-----------------|
| UI components | All 11 pages, all charts, all tables | — |
| Layout | Sidebar, topbar, grid, responsive | — |
| Database | Schema + migrations + seed | — |
| API routes | CRUD endpoints, share links | Meta sync workers |
| Meta API | Types + mock responses | Real Graph API calls, token setup, System User |
| Sync engine | Cron route stubs | Full sync logic + error handling |
| Auth | Share link token check | Phase 3: NextAuth |
| Deploy | Vercel project setup | Environment variables, Meta app config |
