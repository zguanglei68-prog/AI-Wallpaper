import type { NextRequest } from "next/server";
import { GET as BaseGET, PATCH as BasePATCH } from "@/app/api/posts/[uuid]/route";

export async function GET(req: NextRequest, ctx: { params: { uuid: string } }) {
  return BaseGET(req as any, ctx as any);
}

export async function PATCH(req: NextRequest, ctx: { params: { uuid: string } }) {
  return BasePATCH(req as any, ctx as any);
}