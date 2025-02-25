import React from "react";
import RepoList from "../../components/RepoList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RefreshCwIcon } from "lucide-react";
import NavBar from "@/app/components/NavBar";
// import { useSession } from "next-auth/react";

const ImportPage = async ({ params }: { params: { id: string } }) => {
  // const { data: session } = useSession();

  const { id } = await params;
  console.log(id);

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
          <a
            href="https://github.com/apps/gitlink-dev/installations/new"
            target="_blank"
          >
            Authorize
          </a>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3 self-center">
              <Image
                src={"/github-mark.svg"}
                width={24}
                height={24}
                alt="GitHub mark"
              />
              {/* <p>{session?.user.name}</p> */}
            </div>
            <Button variant="ghost">
              <RefreshCwIcon size={12} />
              Refresh
            </Button>
          </div>
          <Input type="text" placeholder="Search private repository" />
          {id != "new" && <RepoList id={id} />}
        </div>
      </div>
    </div>
  );
};

export default ImportPage;
