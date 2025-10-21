import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { generations } from "@/db/schema";
import { desc } from "drizzle-orm";
import { getUserIdFromApiKey } from "@/lib/apiAuth";

// GET /api/generations?limit=20
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  let limit = Number(limitParam ?? 20);
  if (!Number.isFinite(limit) || limit <= 0) limit = 20;
  if (limit > 100) limit = 100;

  const rows = await db
    .select()
    .from(generations)
    .orderBy(desc(generations.createdAt))
    .limit(limit);

  return NextResponse.json({ data: rows }, { status: 200 });
}

// POST /api/generations
// body: { userId?: number, prompt?: string, style?: string, width?: number, height?: number, resultUrl?: string, success?: boolean }
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const resolvedUserId = typeof body.userId === "number" ? body.userId : await getUserIdFromApiKey(req);
  const payload = {
    userId: typeof resolvedUserId === "number" ? resolvedUserId : null,
    prompt: typeof body.prompt === "string" ? body.prompt : null,
    style: typeof body.style === "string" ? body.style : null,
    width: typeof body.width === "number" ? body.width : null,
    height: typeof body.height === "number" ? body.height : null,
    resultUrl: typeof body.resultUrl === "string" ? body.resultUrl : null,
    success: typeof body.success === "boolean" ? body.success : true,
    createdAt: new Date(),
  };

  const inserted = await db.insert(generations).values(payload as any).returning();
  return NextResponse.json({ data: inserted[0] }, { status: 201 });
}