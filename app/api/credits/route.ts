import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { credits } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getUserIdFromApiKey } from "@/lib/apiAuth";

// GET /api/credits?userId=123
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userIdStr = searchParams.get("userId");
  if (!userIdStr) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  const userId = Number(userIdStr);
  if (Number.isNaN(userId)) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  const rows = await db.select().from(credits).where(eq(credits.userId, userId)).limit(1);
  if (rows.length === 0) {
    return NextResponse.json({ data: null }, { status: 200 });
  }
  return NextResponse.json({ data: rows[0] }, { status: 200 });
}

// POST /api/credits  body: { userId: number, delta?: number, set?: number }
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  let userId: number | null = null;

  if (body && typeof body.userId === "number") {
    userId = body.userId;
  } else {
    userId = await getUserIdFromApiKey(req);
  }

  if (!userId) {
    return NextResponse.json({ error: "Invalid body or missing x-api-key: require userId or valid API key" }, { status: 400 });
  }

  const userIdNum = userId as number;
  const delta = typeof body.delta === "number" ? body.delta : undefined;
  const set = typeof body.set === "number" ? body.set : undefined;

  // 查询是否已有记录
  const existing = await db.select().from(credits).where(eq(credits.userId, userIdNum)).limit(1);
  if (existing.length === 0) {
    // 创建新记录（默认 0），如果提供 set 或 delta，一并应用
    const initial = typeof set === "number" ? set : typeof delta === "number" ? Math.max(0, delta) : 0;
    const inserted = await db.insert(credits).values({
      userId: userIdNum,
      leftCredits: initial,
    }).returning();
    return NextResponse.json({ data: inserted[0] }, { status: 201 });
  }

  const current = existing[0];
  let nextLeft = current.leftCredits;
  if (typeof set === "number") nextLeft = set;
  if (typeof delta === "number") nextLeft = nextLeft + delta;
  if (nextLeft < 0) nextLeft = 0;

  const updated = await db
    .update(credits)
    .set({ leftCredits: nextLeft, updatedAt: new Date() })
    .where(eq(credits.userId, userIdNum))
    .returning();

  return NextResponse.json({ data: updated[0] }, { status: 200 });
}