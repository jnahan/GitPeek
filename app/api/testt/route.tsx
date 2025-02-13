import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "uh hello" }, { status: 200 });
}
