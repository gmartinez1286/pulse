import { eq } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";
import { CLIENTS } from "@/lib/mock/kpot-fairfax";

export async function listClients() {
  const db = getDb();
  if (!db) return CLIENTS;

  const rows = await db.select().from(schema.clients);
  if (rows.length === 0) return CLIENTS;
  return rows;
}

export async function getClientBySlug(slug: string) {
  const db = getDb();
  if (!db) {
    return CLIENTS.find((c) => c.slug === slug) ?? null;
  }

  const [row] = await db
    .select()
    .from(schema.clients)
    .where(eq(schema.clients.slug, slug))
    .limit(1);
  return row ?? null;
}

export async function getShareLinkByToken(token: string) {
  const db = getDb();
  if (!db) {
    if (token === "x7Kqf2") {
      return { token, clientSlug: "kpot-fairfax", revoked: false };
    }
    return null;
  }

  const [link] = await db
    .select()
    .from(schema.shareLinks)
    .where(eq(schema.shareLinks.token, token))
    .limit(1);

  if (!link || link.revokedAt) return null;
  return link;
}
