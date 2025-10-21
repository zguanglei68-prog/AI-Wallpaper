import "server-only";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

// 使用 Supabase Pooled 连接串，建议 .env 配置：
// DATABASE_URL=postgresql://USER:PASSWORD@HOST:6543/postgres?sslmode=require
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Please configure Supabase pooled connection string.");
}

// postgres-js 客户端（适配 serverless / 常规 Node 环境）
const client = postgres(DATABASE_URL, {
  ssl: "require", // 与 ?sslmode=require 配合，确保加密
  max: 1,         // serverless 环境建议较小连接数；Node 运行时可适当增大
});

export const db = drizzle(client);