import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // 迁移优先使用 DIRECT_URL（5432 直连），不存在则回退到 DATABASE_URL（6543 pooling）
    url: (process.env.DIRECT_URL ?? process.env.DATABASE_URL) as string,
  },
  strict: true,
});