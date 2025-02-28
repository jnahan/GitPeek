// Fetches repository content

import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getOctokit } from "@/app/utils/octokit";

interface Params {
  id: string;
  owner: string;
  repo: string;
}

/**
 * Fetches content of specified github repository using OctoKit
 *
 * @param req - Incoming Next.js request object
 * @param res - Outcoming Next.js response object
 * @param params - Route parameters containing id (installation id), owner, and repo
 * @returns JSON response with repository content or an error message if something goes wrong
 */
export async function GET(
  req: NextRequest,
  res: NextResponse,
  { params }: { params: Params },
) {
  const { id, owner, repo } = await params;
  const INSTALLATION_ID = parseInt(id, 10);

  try {
    const octokit = await getOctokit(INSTALLATION_ID);
    const response = await octokit.request(
      `GET /repos/${owner}/${repo}/contents/`,
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching repository content", error);
    return NextResponse.json(
      { error: "Error fetching repository content" },
      { status: 500 },
    );
  }
}
