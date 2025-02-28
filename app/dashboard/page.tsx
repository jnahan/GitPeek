"use client";

import React from "react";
import SearchBar from "../components/SearchBar";
import { Repo } from "../types/repo";
import { useEffect, useState } from "react";
import getRepos from "../actions/getRepos";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NavBar from "../components/NavBar";

function DashboardPage() {
  const [searchParam, setSearchParam] = useState("");
  const [repos, setRepos] = useState<Repo[] | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    async function fetchRepos() {
      if (session?.user.id) {
        console.log("attempting to fetch repos for", session.user.id);
        const fetchedRepos = await getRepos(session.user.id);
        setRepos(fetchedRepos);
      }
    }
    fetchRepos();
  }, [session?.user.id]);

  return (
    <div>
      <NavBar />
      <h1 className="text-2xl font-semibold">Published repositories</h1>
      <p>These repositories can be shared with links</p>
      <Button>
        <Link href={"/import/new"}>Add Repo</Link>
      </Button>
      <SearchBar
        placeholder="Search repositories"
        value={searchParam}
        setValue={setSearchParam}
      />
      {repos &&
        repos.map((repo) => (
          <div key={repo.id}>
            {repo.name}
            {repo.username}
            {repo.cloneUrl}
            {repo.cloneable}
            {repo.gitHubUrl}
            {repo.gitPeekUrl}
          </div>
        ))}
    </div>
  );
}

export default DashboardPage;
