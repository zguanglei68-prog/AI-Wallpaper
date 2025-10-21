import { NextResponse } from "next/server";
import { updateApiKey } from "@/services/apiKeys";

// PATCH /api/api-keys/:id { name?:string, revoke?:boolean }
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const idNum = Number(params.id);
  if (!Number.isFinite(idNum) || idNum <= 0) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const body = await req.json().catch(() => null) as { name?: string; revoke?: boolean } | null;
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  const row = await updateApiKey(idNum, body);
  return NextResponse.json({ data: row }, { status: 200 });
}