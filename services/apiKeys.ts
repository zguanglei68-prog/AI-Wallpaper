import { db } from "@/db/index";
import { apiKeys } from "@/db/schema";
import { eq } from "drizzle-orm";
import crypto from "node:crypto";

export type ApiKeyRow = typeof apiKeys.$inferSelect;
export type ApiKeyInsert = typeof apiKeys.$inferInsert;

export function generateApiKey(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("hex");
}

export async function createApiKey(userId: number, name?: string): Promise<{ id: number; key: string }> {
  const key = generateApiKey();
  const [row] = await db.insert(apiKeys).values({
    userId,
    name: name ?? null,
    key,
    revoked: false,
    createdAt: new Date(),
  }).returning({ id: apiKeys.id });
  return { id: row.id, key };
}

export async function listApiKeys(userId: number): Promise<ApiKeyRow[]> {
  return db.select().from(apiKeys).where(eq(apiKeys.userId, userId));
}

export async function updateApiKey(id: number, data: { name?: string; revoke?: boolean }): Promise<ApiKeyRow | null> {
  const patch: Partial<ApiKeyInsert> = {};
  if (typeof data.name === "string") patch.name = data.name;
  if (typeof data.revoke === "boolean") patch.revoked = data.revoke;
  const [row] = await db.update(apiKeys).set(patch as any).where(eq(apiKeys.id, id)).returning();
  return row ?? null;
}

export async function validateApiKey(key: string): Promise<{ valid: boolean; id?: number; userId?: number }> {
  const rows = await db.select().from(apiKeys).where(eq(apiKeys.key, key)).limit(1);
  const row = rows[0];
  if (!row || row.revoked) return { valid: false };
  // 更新最后使用时间
  await db.update(apiKeys).set({ lastUsedAt: new Date() }).where(eq(apiKeys.id, row.id));
  return { valid: true, id: row.id, userId: row.userId };
}