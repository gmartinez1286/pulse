import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ saved: true, ...body }, { status: 201 });
}
