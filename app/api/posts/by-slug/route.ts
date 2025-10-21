import { NextResponse } from "next/server";
import { findPostBySlug } from "@/services/posts";

// GET /api/posts/by-slug?slug=...&locale=...
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const locale = searchParams.get("locale");

  if (!slug || !locale) {
    return NextResponse.json({ error: "Missing slug or locale" }, { status: 400 });
  }

  const row = await findPostBySlug(slug, locale);
  return NextResponse.json({ data: row ?? null }, { status: 200 });
}