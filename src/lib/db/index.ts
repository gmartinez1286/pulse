import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (!connectionString) return null;
  if (!db) {
    const client = postgres(connectionString, { prepare: false });
    db = drizzle(client, { schema });
  }
  return db;
}

export { schema };
