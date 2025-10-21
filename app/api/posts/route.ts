import { NextResponse } from "next/server";
import { insertPost, getAllPosts, getPostsByLocale, PostStatus } from "@/services/posts";

// GET /api/posts?page=1&limit=50&locale=en&status=online
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 50);
  const locale = searchParams.get("locale") ?? undefined;
  const status = searchParams.get("status") ?? undefined;

  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  let safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 50;
  if (safeLimit > 100) safeLimit = 100;

  if (locale && status === PostStatus.Online) {
    const rows = await getPostsByLocale(locale, safePage, safeLimit);
    return NextResponse.json({ data: rows }, { status: 200 });
  }

  // 普通列表（不带 locale/status 过滤）
  const rows = await getAllPosts(safePage, safeLimit);
  return NextResponse.json({ data: rows }, { status: 200 });
}

// POST /api/posts
// body: { uuid: string, slug: string, locale: string, status: PostStatus }
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { uuid, slug, locale, status } = body as {
    uuid?: string;
    slug?: string;
    locale?: string;
    status?: PostStatus;
  };

  if (!uuid || !slug || !locale || !status) {
    return NextResponse.json({ error: "Missing fields: uuid, slug, locale, status are required" }, { status: 400 });
  }

  // 基础插入
  const created = await insertPost({ uuid, slug, locale, status });
  return NextResponse.json({ data: created }, { status: 201 });
}