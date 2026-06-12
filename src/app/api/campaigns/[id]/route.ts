import { NextResponse } from "next/server";
import { CAMPAIGN_ADS } from "@/lib/mock/kpot-fairfax";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({
    id,
    ads: CAMPAIGN_ADS,
  });
}
