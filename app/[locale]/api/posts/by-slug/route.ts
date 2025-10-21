import type { NextRequest } from "next/server";
import { GET as BaseGET } from "@/app/api/posts/by-slug/route";

export async function GET(req: NextRequest) {
  return BaseGET(req as any);
}