import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

// 注意：不在 Drizzle schema 中声明现有的 users 表，避免对其做破坏性变更。
// 如需在应用代码中引用 users，可通过原生 SQL 或单独的只读定义处理。

export const credits = pgTable("credits", {
  id: serial("id").primaryKey(),
  // 为避免对现有 users 表产生迁移影响，这里不添加外键约束，仅保留 user_id 字段
  userId: integer("user_id").notNull(),
  leftCredits: integer("left_credits").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const generations = pgTable("generations", {
  id: serial("id").primaryKey(),
  // 同上：不声明 FK 以避免 Drizzle 对 users 表发起对齐操作
  userId: integer("user_id"),
  prompt: text("prompt"),
  style: text("style"),
  width: integer("width"),
  height: integer("height"),
  resultUrl: text("result_url"),
  success: boolean("success").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// api_keys 表（为避免影响现有 users，不添加 FK，仅保留 user_id 字段）
export const apiKeys = pgTable("api_keys", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name"),
  key: text("key").notNull(),
  revoked: boolean("revoked").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  lastUsedAt: timestamp("last_used_at"),
});

// posts 表（基础字段，按你的用法提供 uuid/slug/locale/status/created_at）
// 如需更多字段（title/content/cover 等），可后续补充
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  uuid: text("uuid").notNull().unique(),
  slug: text("slug").notNull(),
  locale: text("locale").notNull(),
  status: text("status").notNull(), // 由 TS 枚举约束：created/deleted/online/offline
  createdAt: timestamp("created_at").defaultNow(),
});