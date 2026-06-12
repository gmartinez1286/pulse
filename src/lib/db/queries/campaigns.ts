import { getDb, schema } from "@/lib/db";
import { CAMPAIGNS } from "@/lib/mock/kpot-fairfax";

export async function listCampaigns() {
  const db = getDb();
  if (!db) return CAMPAIGNS;

  const rows = await db.select().from(schema.campaigns);
  if (rows.length === 0) return CAMPAIGNS;
  return rows;
}
