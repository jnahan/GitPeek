"use client"

import React from "react";
import RepoList from "../../components/RepoList";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RefreshCwIcon } from "lucide-react";
import NavBar from "@/app/components/NavBar";
import { CodeIcon } from "lucide-react";
import SearchBar from "@/app/components/SearchBar";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { use } from "react";

/*
  try fetching preexisting id
  associated with user in db

  if theres no id in db
  github app callback -> save installation id in db
  
  fetch id from db in save it in session
 */

const ImportPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { data: session } = useSession();
  const { id } = use(params);
  const [searchParam, setSearchParam] = useState("");

  // TODO: REFACTOR

  const [refresh, setRefresh] = useState(false);

  // TODO: attempt to fetch installation id instead of hard coidng
  let installation_id = "";
  installation_id = "61674356";

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center">
        <div className="mb-12 text-center">
          <h1 className="text-2xl font-semibold mb-3">
            Import private repository
          </h1>
          <p>We will generate a read-only repository for this project</p>
        </div>
        <div className="flex flex-col gap-4 max-w-lg w-full px-6 py-8 border border-zinc-200 rounded-sm">
          {/* show authorization button if there is no installation id */}
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3 self-center items-center">
              <Image
                src={"/github-mark.svg"}
                width={24}
                height={24}
                alt="GitHub mark"
              />
              <p className="text-sm">{session?.user.name}</p>
            </div>
            <Button variant="ghost" onClick={()=>{setRefresh(true)}}>
              <RefreshCwIcon size={12} />
              Refresh
            </Button>
          </div>
          <SearchBar 
            placeholder="Search private repository"
            value={searchParam}
            setValue={setSearchParam}
          />
          {id == "new" && !installation_id ? (
            <div className="flex flex-col items-center h-64 justify-center w-full">
              <div className="flex flex-col gap-2 mb-4 items-center">
                <CodeIcon size={24} />
                <p className="font-semibold">Import repositories from GitHub</p>
                <p>Install GitHub app to continue</p>
              </div>
              <Button>
                <a
                  href="https://github.com/apps/gitlink-dev/installations/new"
                  target="_blank"
                >
                  Continue with GitHub
                </a>
              </Button>
            </div>
          ) : (
            installation_id && 
            <RepoList 
              id={installation_id || id} 
              searchParam={searchParam}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportPage;
