import React from "react";
import { Button } from "@/components/ui/button";
import NavBar from "../components/NavBar";
import { ArrowRight, LoaderCircle } from "lucide-react";

function page() {
  const doneLoading = false;

  return (
    <div className="h-screen">
      <NavBar />
      {!doneLoading ? (
        <div className="flex flex-col justify-center items-center text-center">
          <LoaderCircle className="animate-spin" size={32} />
          <h1 className="text-2xl font-semibold mb-2">Deploying repository</h1>
          <p>This may take a few seconds, please do not refresh this page</p>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-semibold">
            Repo deployed successfully!
          </h1>
          <p>Anyone with this link can view this repository</p>
          <Button>
            <ArrowRight size={16} />
            Continue to dashboard
          </Button>
          <div>
            <a href="">gitpeek.com/</a>
            <Button>Copy Link</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
