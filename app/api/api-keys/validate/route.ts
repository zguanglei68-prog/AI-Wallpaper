import { NextResponse } from "next/server";
import { validateApiKey } from "@/services/apiKeys";

// POST /api/api-keys/validate { key:string }
export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { key?: string } | null;
  if (!body?.key) return NextResponse.json({ valid: false, error: "Missing key" }, { status: 400 });
  const res = await validateApiKey(body.key);
  return NextResponse.json(res, { status: 200 });
}