// fetches repository content

import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getOctokit } from "@/app/utils/octokit";

export async function GET(
  req: NextRequest, { params }: { params: { id: string, owner: string, repo: string } }
) {
  const INSTALLATION_ID = parseInt(params.id, 10);
  const owner = params.owner;
  const repo = params.repo;

  try {
    const octokit = await getOctokit(INSTALLATION_ID);
    const response = await octokit.request(`GET /repos/${owner}/${repo}/contents/`)

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching repository content", error);
    return NextResponse.json(
      {error: "Error fetching repository content"},
      {status: 500}
    )
  }
}