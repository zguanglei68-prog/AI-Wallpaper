import type { NextRequest } from "next/server";
import { PATCH as BasePATCH } from "@/app/api/api-keys/[id]/route";

export async function PATCH(req: NextRequest, ctx: { params: { id: string } }) {
  return BasePATCH(req as any, ctx as any);
}