// Fetches private repositories

import { NextResponse } from "next/server";

import { getOctokit } from "@/app/utils/octokit";
import { type NextRequest } from "next/server";

/**
 * Fetches private repositories for given installation ID
 *
 * Retrieves installation ID from query parameters, checks if valid
 * If valid, uses Octokit to fetch repositories for installation and filters private ones
 *
 * @param request - Incoming Next.js request object
 * @returns JSON response with private repositories or error message if something goes wrong
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const INSTALLATION_ID = parseInt(id || "", 10);

  if (INSTALLATION_ID) {
    try {
      const octokit = await getOctokit(INSTALLATION_ID);
      const response = await octokit.request("GET /installation/repositories");

      const privateRepos = response.data.repositories.filter(
        (repo: { private?: boolean }) => repo.private === true,
      );

      return NextResponse.json(privateRepos);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      return NextResponse.json(
        { error: "Error fetching repositories" },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json({ error: "error fetching id" });
  }
}
