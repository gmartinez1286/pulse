import { NextResponse } from "next/server";

export async function GET() {
  const configured = Boolean(process.env.META_SYSTEM_USER_TOKEN);
  return NextResponse.json({
    configured,
    scopes: ["ads_read", "pages_read_engagement", "instagram_manage_insights"],
    status: configured ? "ok" : "missing",
  });
}
