import Link from "next/link";
import { Repo, ErrorRepo } from "../types/repo";
import { Button } from "@/components/ui/button";
import { CodeIcon, RefreshCwIcon } from "lucide-react";

interface IRepoList {
  id: string;
}

const RepoList = async ({id} : IRepoList) => {
  let repos: Repo[] | ErrorRepo = [];

  async function fetchRepos(id: string) {
    try {
      const res = await fetch(`http://localhost:3000/api/repos/${id}`);
      const json = await res.json();
      if (!json.error){
        repos = json;
      }
    }
    catch (error) {
      console.error("Error fetching repos:", error);
    }
  }
  await fetchRepos(id);

  // error handling
  return (
    <div>
      {!id || repos.length === 0 ? (
        <div className="flex flex-col items-center h-64 justify-center w-full">
          <div className="flex flex-col gap-2 mb-4 items-center">
            <CodeIcon size={24} />
            <p className="font-semibold">No private repositories found</p>
            <p>Change your repository visibility and refresh</p>
          </div>
          <Button>
            <RefreshCwIcon size={16} />
            Refresh
          </Button>
        </div>
      ) : (
        <ul className="max-h-64 overflow-y-scroll">
          {repos.map((repo) => (
            <li
              className="flex flex-row gap-3 px-3 py-2 items-center justify-between"
              key={repo.name}
            >
              <div className="flex flex-row gap-2">
                <p className="font-semibold">{repo.name}</p>
                <p>•</p>
                <p>{repo.updated_at}</p>
              </div>
              <Button variant="secondary">
                <Link
                  href={{
                    pathname: "/content",
                    // pathname: `/configure/${id}`,
                    query: { id: id, repo: repo.name, owner: repo.owner.login },
                  }}
                >
                  Import
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RepoList;
