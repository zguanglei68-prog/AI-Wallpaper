import { NextResponse } from "next/server";
import { requireApiKey } from "@/lib/apiAuth";

// GET /api/protected/check  （必须携带 x-api-key）
export async function GET(req: Request) {
  const userIdOrResponse = await requireApiKey(req);
  if (typeof userIdOrResponse !== "number") return userIdOrResponse;
  return NextResponse.json({ ok: true, userId: userIdOrResponse }, { status: 200 });
}