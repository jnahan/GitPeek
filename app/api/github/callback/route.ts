// handles github app callback

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const installation_id = req.nextUrl.searchParams.get("installation_id");

  if (!installation_id) {
    return NextResponse.json(
      { error: "Missing installation id" },
      { status: 400 }
    );
  }

  return NextResponse.redirect(
    `http://localhost:3000/import/${installation_id}`
  );
}
