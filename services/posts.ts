import { db } from "@/db/index";
import { posts } from "@/db/schema";
import { and, desc, eq, count } from "drizzle-orm";

export enum PostStatus {
  Created = "created",
  Deleted = "deleted",
  Online = "online",
  Offline = "offline",
}

// 插入一条 post
export async function insertPost(
  data: typeof posts.$inferInsert
): Promise<typeof posts.$inferSelect | undefined> {
  const [row] = await db.insert(posts).values(data).returning();
  return row;
}

// 根据 uuid 更新
export async function updatePost(
  uuid: string,
  data: Partial<typeof posts.$inferInsert>
): Promise<typeof posts.$inferSelect | undefined> {
  const [row] = await db
    .update(posts)
    .set(data as any)
    .where(eq(posts.uuid, uuid))
    .returning();
  return row;
}

// 根据 uuid 查询单条
export async function findPostByUuid(
  uuid: string
): Promise<typeof posts.$inferSelect | undefined> {
  const [row] = await db
    .select()
    .from(posts)
    .where(eq(posts.uuid, uuid))
    .limit(1);
  return row;
}

// 根据 slug + locale 查询单条
export async function findPostBySlug(
  slug: string,
  locale: string
): Promise<typeof posts.$inferSelect | undefined> {
  const [row] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.locale, locale)))
    .limit(1);
  return row;
}

// 全量分页
export async function getAllPosts(
  page: number = 1,
  limit: number = 50
): Promise<(typeof posts.$inferSelect)[]> {
  const offset = (page - 1) * limit;
  const rows = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .limit(limit)
    .offset(offset);
  return rows;
}

// 指定语言分页（仅 Online）
export async function getPostsByLocale(
  locale: string,
  page: number = 1,
  limit: number = 50
): Promise<(typeof posts.$inferSelect)[]> {
  const offset = (page - 1) * limit;
  const rows = await db
    .select()
    .from(posts)
    .where(and(eq(posts.locale, locale), eq(posts.status, PostStatus.Online)))
    .orderBy(desc(posts.createdAt))
    .limit(limit)
    .offset(offset);
  return rows;
}

// 总数
export async function getPostsTotal(): Promise<number> {
  const [res] = await db.select({ value: count() }).from(posts);
  return Number(res?.value ?? 0);
}