import { NextResponse } from "next/server";
import { validateApiKey } from "@/services/apiKeys";

export async function getUserIdFromApiKey(req: Request): Promise<number | null> {
  const key = req.headers.get("x-api-key");
  if (!key) return null;
  const res = await validateApiKey(key);
  return res.valid && res.userId ? res.userId : null;
}

export async function requireApiKey(req: Request): Promise<number | NextResponse> {
  const userId = await getUserIdFromApiKey(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized: missing or invalid x-api-key" }, { status: 401 });
  }
  return userId;
}