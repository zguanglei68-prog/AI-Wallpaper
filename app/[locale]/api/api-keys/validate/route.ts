import type { NextRequest } from "next/server";
import { POST as BasePOST } from "@/app/api/api-keys/validate/route";

export async function POST(req: NextRequest) {
  return BasePOST(req as any);
}