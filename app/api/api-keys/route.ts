import { NextResponse } from "next/server";
import { createApiKey, listApiKeys } from "@/services/apiKeys";

// GET /api/api-keys?userId=1
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userIdStr = searchParams.get("userId");
  if (!userIdStr) return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  const userId = Number(userIdStr);
  if (!Number.isFinite(userId) || userId <= 0) return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  const rows = await listApiKeys(userId);
  return NextResponse.json({ data: rows }, { status: 200 });
}

// POST /api/api-keys { userId:number, name?:string }
export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { userId?: number; name?: string } | null;
  if (!body || typeof body.userId !== "number") return NextResponse.json({ error: "Invalid body: require userId" }, { status: 400 });
  const { id, key } = await createApiKey(body.userId, body.name);
  // 注意：只在创建时返回明文 key
  return NextResponse.json({ data: { id, key } }, { status: 201 });
}