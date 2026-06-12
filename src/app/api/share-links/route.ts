import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

export async function POST(request: Request) {
  const body = await request.json();
  const token = randomBytes(4).toString("hex");
  return NextResponse.json({
    token,
    url: `/r/${token}`,
    clientId: body.clientId,
  });
}
