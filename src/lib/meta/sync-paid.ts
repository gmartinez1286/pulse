import { metaClient } from "./client";

/**
 * Paid metrics sync — Luis implements full logic.
 * Called by /api/cron/sync-paid
 */
export async function syncPaidMetrics(): Promise<{
  rowsUpserted: number;
  error?: string;
}> {
  const accountId = process.env.META_AD_ACCOUNT_ID?.replace("act_", "");
  if (!accountId) {
    return { rowsUpserted: 0, error: "META_AD_ACCOUNT_ID not set" };
  }

  await metaClient.fetchCampaignInsights(
    accountId,
    new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10),
    new Date().toISOString().slice(0, 10)
  );

  return { rowsUpserted: 0 };
}
