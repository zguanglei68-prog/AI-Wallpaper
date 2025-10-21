import { NextResponse } from "next/server";
import { findPostByUuid, updatePost } from "@/services/posts";

// GET /api/posts/:uuid
export async function GET(_req: Request, { params }: { params: { uuid: string } }) {
  const { uuid } = params;
  if (!uuid) return NextResponse.json({ error: "Missing uuid" }, { status: 400 });

  const row = await findPostByUuid(uuid);
  if (!row) return NextResponse.json({ data: null }, { status: 200 });
  return NextResponse.json({ data: row }, { status: 200 });
}

// PATCH /api/posts/:uuid
// body: Partial of insert type, e.g. { status: 'online', slug: '...' }
export async function PATCH(req: Request, { params }: { params: { uuid: string } }) {
  const { uuid } = params;
  if (!uuid) return NextResponse.json({ error: "Missing uuid" }, { status: 400 });

  const data = await req.json().catch(() => null);
  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const updated = await updatePost(uuid, data);
  return NextResponse.json({ data: updated ?? null }, { status: 200 });
}