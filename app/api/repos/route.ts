// fetches private repositories

import { NextResponse } from "next/server";

import { getOctokit } from "@/app/utils/octokit";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const INSTALLATION_ID = parseInt(id || "", 10);

  if (INSTALLATION_ID) {
    try {
      const octokit = await getOctokit(INSTALLATION_ID);
      const response = await octokit.request("GET /installation/repositories");

      const privateRepos = response.data.repositories.filter(
        (repo: { private?: boolean }) => repo.private === true
      );

      return NextResponse.json(privateRepos);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      return NextResponse.json(
        { error: "Error fetching repositories" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "error fetching id" });
  }
}