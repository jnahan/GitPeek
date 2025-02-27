"use client"

import Link from "next/link";
import { Repo } from "../types/repo";
import { Button } from "@/components/ui/button";
import { CodeIcon, RefreshCwIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface IRepoList {
  id: string;
  searchParam: string;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
}

const RepoList = ({id, searchParam, refresh, setRefresh} : IRepoList) => {
  const [repos, setRepos] = useState<Repo []>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repo []>([]);

  async function fetchRepos(id: string) {
    try {
      const res = await fetch(`http://localhost:3000/api/repos?id=${id}`);
      const json = await res.json();
      if (!json.error && Array.isArray(json)){
        setRepos(json);
      }
    }
    catch (error) {
      console.error("Error fetching repos:", error);
    }
  }

  useEffect(()=>{
    if (id) {
      fetchRepos(id);
      setRefresh(false);
      console.log("refreshing")
    }
  }, [id, refresh, setRefresh])

  useEffect(()=>{
    if (searchParam == ""){
      setFilteredRepos(repos)
    }
    if (searchParam != ""){
      setFilteredRepos(repos.filter((repo) => repo.name.includes(searchParam.toLowerCase())))
    }
  }, [repos, searchParam])

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
          {filteredRepos.map((repo) => (
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
                    pathname: `/configure/${id}`,
                    query: { repo: repo.name, owner: repo.owner.login },
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
