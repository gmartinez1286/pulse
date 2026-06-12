import { NextResponse } from "next/server";
import { metaClient } from "@/lib/meta/client";

export async function GET() {
  const result = await metaClient.testConnection();
  return NextResponse.json(result);
}
