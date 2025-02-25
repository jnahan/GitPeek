import React from "react";
import RepoList from "../../components/RepoList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RefreshCwIcon } from "lucide-react";
import NavBar from "@/app/components/NavBar";

const ImportPage = ({params} : {
  params: { id: string }
}) => {
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
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3 self-center">
              <Image
                src={"/github-mark.svg"}
                width={24}
                height={24}
                alt="GitHub mark"
              />
              <p>Username</p>
            </div>
            <Button variant="ghost">
              <RefreshCwIcon size={12} />
              Refresh
            </Button>
          </div>
          <Input type="text" placeholder="Search private repository" />
          <RepoList id={params.id} />
        </div>
      </div>
    </div>
  );
};

export default ImportPage;
