"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Repo } from "../types/repo";

const RepoList = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    async function fetchRepos(id: string) {
      const res = await fetch(`http://localhost:3000/api/repos/${id}`);
      const repos: Repo[] = await res.json();
      setRepos(repos)
    }  

    if (id) {
      fetchRepos(id);
    }
  }, [id]);

  const [repos, setRepos] = useState<Repo[] | null>(null);
  console.log(repos)

  // error handling
  return (
    <div>
      {repos?.map((repo) => (
        <div key={repo.name}>
          <p>{repo.name}</p>
          <li>{repo.clone_url}</li>
          <li>{repo.full_name}</li>
          <li>{repo.html_url}</li>
          <li>{repo.updated_at}</li>
          <Link
            className="underline"
            href={{
              pathname: "/content",
              query: { id: id, repo: repo.name, owner: repo.owner.login },
            }}
          >
            content
          </Link>{" "}
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};

export default RepoList;
