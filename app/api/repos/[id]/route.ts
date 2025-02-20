// fetches private repositories

import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getOctokit } from "@/app/utils/octokit";

export async function GET(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
    const INSTALLATION_ID = parseInt(params.id, 10);

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
}