// handles github app callback

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(
  req: NextRequest,
) {
  const installation_id = req.nextUrl.searchParams.get("installation_id");
  const token = await getToken({ req, secret });
  console.log("installation id is")
  console.log(installation_id)

  // check if authorized here

  if (!installation_id) {
    return NextResponse.json(
      { error: "Missing installation id" },
      { status: 400 }
    );
  }

  if (token) {
    token.installationId = installation_id;
  }

  console.log("token is:");
  console.log(token);

  return NextResponse.redirect(
    `http://localhost:3000/import/${installation_id}`
  );
}
