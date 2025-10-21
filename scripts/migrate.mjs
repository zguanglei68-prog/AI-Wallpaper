import dotenv from "dotenv";
import fs from "node:fs";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

// 优先加载 .env.local，再次回退到 .env
if (fs.existsSync(".env.local")) dotenv.config({ path: ".env.local" });
else dotenv.config();

const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!url) {
  console.error("DIRECT_URL / DATABASE_URL is not set");
  process.exit(1);
}

const client = postgres(url, { ssl: "require", max: 1 });
const db = drizzle(client);

(async () => {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migrations applied successfully.");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  } finally {
    await client.end({ timeout: 5 });
  }
})();