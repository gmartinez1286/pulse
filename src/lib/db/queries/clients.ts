import { eq } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";
import { CLIENTS } from "@/lib/mock/kpot-fairfax";

export async function listClients() {
  const db = getDb();
  if (!db) return CLIENTS;

  try {
    const rows = await db.select().from(schema.clients);
    if (rows.length === 0) return CLIENTS;
    return rows;
  } catch (error) {
    console.error("listClients failed, using mock data:", error);
    return CLIENTS;
  }
}

export async function getClientBySlug(slug: string) {
  const db = getDb();
  if (!db) {
    return CLIENTS.find((c) => c.slug === slug) ?? null;
  }

  try {
    const [row] = await db
      .select()
      .from(schema.clients)
      .where(eq(schema.clients.slug, slug))
      .limit(1);
    return row ?? null;
  } catch (error) {
    console.error("getClientBySlug failed:", error);
    return CLIENTS.find((c) => c.slug === slug) ?? null;
  }
}

export async function getShareLinkByToken(token: string) {
  const db = getDb();
  if (!db) {
    if (token === "x7Kqf2") {
      return { token, clientSlug: "kpot-fairfax", revoked: false };
    }
    return null;
  }

  try {
    const [link] = await db
      .select()
      .from(schema.shareLinks)
      .where(eq(schema.shareLinks.token, token))
      .limit(1);

    if (!link || link.revokedAt) return null;
    return link;
  } catch (error) {
    console.error("getShareLinkByToken failed:", error);
    if (token === "x7Kqf2") {
      return { token, clientSlug: "kpot-fairfax", revoked: false };
    }
    return null;
  }
}
