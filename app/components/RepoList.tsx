import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import axios from "axios";
import Link from "next/link";
/**
 * static markup should be rendered on server
 * button rendered on client (for interactivity)
 */
const RepoList = async () => {

  interface Repo {
    name: string;
    clone_url: string;
    full_name: string;
    html_url: string;
    updated_at: string;
    visibility: string;
  }

    const session = await getServerSession(authOptions);
    let repoNames;
    
    if (session) {console.log(session)}
    else {return}
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
      repoNames = repos.map((repo: Repo) => ({
        name: repo.name,
        clone_url: repo.clone_url,
        full_name: repo.full_name,
        html_url: repo.html_url,
        updated_at: repo.updated_at,
        visibility: repo.visibility,
      })); // Extract necessary information

      console.log("Repository Names:", repoNames); // Log repository names
    } catch (error) {
      console.error("Error fetching repositories:", error);
      
    }


  return (
    <div>
      <ul>
        {repoNames && repoNames.map((repo: Repo) => {
          return (
            <ul key={repo.name} className="flex gap-2 items-center">
              <li className="font-bold">{repo.name}</li>
              <li>{repo.visibility}</li>
              <li>{repo.html_url}</li>
              <Link
                className="bg-white text-black px-2 py-1 rounded-sm text-xs"
                href={{
                  pathname: "/deploy",
                  query: {
                    name: repo.name,
                  },
                }}
              >
                Deploy
              </Link>
              <br />
              <br />
            </ul>
          );
        })}
      </ul>
    </div>
  );
};

export default RepoList;
