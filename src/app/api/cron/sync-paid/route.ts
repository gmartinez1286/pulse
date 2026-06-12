import { NextResponse } from "next/server";
import { syncPaidMetrics } from "@/lib/meta/sync-paid";

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await syncPaidMetrics();
  return NextResponse.json({ type: "paid", ...result });
}
