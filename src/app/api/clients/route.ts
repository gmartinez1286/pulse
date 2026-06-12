import { NextResponse } from "next/server";
import { listClients } from "@/lib/db/queries/clients";

export async function GET() {
  const clients = await listClients();
  return NextResponse.json(clients);
}

export async function POST(request: Request) {
  const body = await request.json();
  // Stub — full CRUD when DB is wired
  return NextResponse.json({ created: true, ...body }, { status: 201 });
}
