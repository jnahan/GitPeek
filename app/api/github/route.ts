import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import axios from "axios";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

try {
  // Fetch private repositories using the GitHub API
  const response = await axios.get("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    params: {
      // visibility: "private", // Retrieve private repositories
      affiliation: "owner", // Optional: Get repos that the user owns or collaborates on
    },
  });

  const repos = response.data; // Type the response data as Repo[]
  console.log("repos", repos);

  const repoNames = repos.map((repo: { name: string }) => repo.name); // Extract repository names
  console.log("Repository Names:", repoNames); // Log repository names

  return NextResponse.json(repoNames); // Return repository names in the response
} catch (error) {
  console.error("Error fetching repositories:", error);
  return NextResponse.json(
    { error: "Error fetching repositories" },
    { status: 500 }
  );
}
}
