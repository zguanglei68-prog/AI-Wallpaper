import type { NextRequest } from "next/server";
import { GET as BaseGET, POST as BasePOST } from "@/app/api/api-keys/route";

export async function GET(req: NextRequest) {
  return BaseGET(req as any);
}

export async function POST(req: NextRequest) {
  return BasePOST(req as any);
}