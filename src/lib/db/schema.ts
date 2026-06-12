import {
  pgTable,
  uuid,
  text,
  integer,
  numeric,
  date,
  timestamp,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logoUrl: text("logo_url"),
  brandColor: text("brand_color"),
  reportCadence: text("report_cadence").default("monthly"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const adAccounts = pgTable("ad_accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  metaAccountId: text("meta_account_id").notNull(),
  bmLabel: text("bm_label"),
  tokenRef: text("token_ref"),
});

export const pages = pgTable("pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id")
    .references(() => clients.id)
    .notNull(),
  fbPageId: text("fb_page_id"),
  igUserId: text("ig_user_id"),
  pageName: text("page_name"),
  platform: text("platform").notNull(),
  connected: boolean("connected").default(false),
});

export const campaigns = pgTable("campaigns", {
  id: uuid("id").primaryKey().defaultRandom(),
  metaCampaignId: text("meta_campaign_id").notNull().unique(),
  name: text("name").notNull(),
  adAccountId: uuid("ad_account_id").references(() => adAccounts.id),
  clientId: uuid("client_id").references(() => clients.id),
  objective: text("objective"),
  status: text("status"),
  startDate: date("start_date"),
  endDate: date("end_date"),
});

export const adSets = pgTable("ad_sets", {
  id: uuid("id").primaryKey().defaultRandom(),
  metaAdSetId: text("meta_ad_set_id").notNull().unique(),
  campaignId: uuid("campaign_id").references(() => campaigns.id),
  name: text("name").notNull(),
});

export const ads = pgTable("ads", {
  id: uuid("id").primaryKey().defaultRandom(),
  metaAdId: text("meta_ad_id").notNull().unique(),
  adSetId: uuid("ad_set_id").references(() => adSets.id),
  campaignId: uuid("campaign_id").references(() => campaigns.id),
  name: text("name").notNull(),
  format: text("format"),
  thumbnailUrl: text("thumbnail_url"),
  createdAt: timestamp("created_at"),
});

export const metricsDaily = pgTable("metrics_daily", {
  id: uuid("id").primaryKey().defaultRandom(),
  campaignId: uuid("campaign_id")
    .references(() => campaigns.id)
    .notNull(),
  adId: uuid("ad_id").references(() => ads.id),
  date: date("date").notNull(),
  spend: numeric("spend", { precision: 10, scale: 2 }),
  impressions: integer("impressions").default(0),
  reach: integer("reach").default(0),
  clicks: integer("clicks").default(0),
  linkClicks: integer("link_clicks").default(0),
  results: integer("results").default(0),
  resultType: text("result_type"),
  frequency: numeric("frequency", { precision: 5, scale: 2 }),
  actions: jsonb("actions"),
});

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  pageId: uuid("page_id")
    .references(() => pages.id)
    .notNull(),
  metaPostId: text("meta_post_id").notNull().unique(),
  platform: text("platform").notNull(),
  format: text("format").notNull(),
  caption: text("caption"),
  permalink: text("permalink"),
  thumbnailUrl: text("thumbnail_url"),
  publishedAt: timestamp("published_at"),
});

export const postMetricsSnapshots = pgTable("post_metrics_snapshots", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("post_id")
    .references(() => posts.id)
    .notNull(),
  capturedAt: timestamp("captured_at").defaultNow(),
  impressions: integer("impressions").default(0),
  reach: integer("reach").default(0),
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  shares: integer("shares").default(0),
  saves: integer("saves").default(0),
  clicks: integer("clicks").default(0),
  plays: integer("plays"),
});

export const pageInsightsDaily = pgTable("page_insights_daily", {
  id: uuid("id").primaryKey().defaultRandom(),
  pageId: uuid("page_id")
    .references(() => pages.id)
    .notNull(),
  date: date("date").notNull(),
  impressions: integer("impressions").default(0),
  reach: integer("reach").default(0),
  engagedUsers: integer("engaged_users").default(0),
  followers: integer("followers").default(0),
  profileViews: integer("profile_views").default(0),
  audienceGender: jsonb("audience_gender"),
  audienceAge: jsonb("audience_age"),
  audienceCity: jsonb("audience_city"),
  audienceOnlineHours: jsonb("audience_online_hours"),
});

export const offlineResults = pgTable("offline_results", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id")
    .references(() => clients.id)
    .notNull(),
  periodStart: date("period_start").notNull(),
  periodEnd: date("period_end").notNull(),
  type: text("type").default("coupon_redemption"),
  value: integer("value").notNull(),
  source: text("source"),
  enteredBy: text("entered_by"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const shareLinks = pgTable("share_links", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id")
    .references(() => clients.id)
    .notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  revokedAt: timestamp("revoked_at"),
});

export const syncRuns = pgTable("sync_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: text("type").notNull(),
  startedAt: timestamp("started_at").defaultNow(),
  finishedAt: timestamp("finished_at"),
  status: text("status").default("running"),
  rowsUpserted: integer("rows_upserted").default(0),
  error: text("error"),
});

export const teamMembers = pgTable("team_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull(),
  lastActiveAt: timestamp("last_active_at"),
});

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value"),
});
