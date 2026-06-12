import { NextResponse } from "next/server";
import { listCampaigns } from "@/lib/db/queries/campaigns";

export async function GET() {
  const campaigns = await listCampaigns();
  return NextResponse.json(campaigns);
}
