import { eq } from "drizzle-orm";
import { getDb, schema } from "./index";

async function seed() {
  const db = getDb();
  if (!db) {
    console.error("DATABASE_URL not set — skipping seed");
    process.exit(1);
  }

  let clientId: string | undefined;
  const existing = await db
    .select()
    .from(schema.clients)
    .where(eq(schema.clients.slug, "kpot-fairfax"))
    .limit(1);

  if (existing[0]) {
    clientId = existing[0].id;
  } else {
    const [client] = await db
      .insert(schema.clients)
      .values({
        name: "KPOT Fairfax",
        slug: "kpot-fairfax",
        brandColor: "#635BFF",
      })
      .returning();
    clientId = client?.id;
  }

  if (clientId) {
    const links = await db
      .select()
      .from(schema.shareLinks)
      .where(eq(schema.shareLinks.token, "x7Kqf2"))
      .limit(1);
    if (links.length === 0) {
      await db.insert(schema.shareLinks).values({
        clientId,
        token: "x7Kqf2",
      });
    }
  }

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
