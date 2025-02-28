import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavBar from "./components/NavBar";
import {
  ArrowRight,
  LockIcon,
  RefreshCwIcon,
  SettingsIcon,
  SmileIcon,
} from "lucide-react";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col gap-24 justify-center mx-28">
        <section className="text-center w-full flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4 max-w-lg">
            Secure read-only links for your private Git repositories
          </h1>
          <p className="mb-8 text-lg max-w-lg">
            Share your private Git repositories with others without sacrificing
            privacy and security
          </p>
          <Button size={"lg"}>
            <ArrowRight color="white" size={16} />
            <Link href="signup">Get Started</Link>
          </Button>
        </section>
        <section>
          <ul className="flex flex-row gap-6">
            <li className="flex flex-col gap-3 p-6 border-zinc-200 border rounded-sm">
              <SmileIcon />
              <h3 className="text-lg font-semibold">Easy</h3>
              <p>
                Select a repository, click build, and your project will be live
                in seconds
              </p>
            </li>
            <li className="flex flex-col gap-3 p-6 border-zinc-200 border rounded-sm">
              <LockIcon />
              <h3 className="text-lg font-semibold">Secure</h3>
              <p>Your code stays private with read-only permissions</p>
            </li>
            <li className="flex flex-col gap-3 p-6 border-zinc-200 border rounded-sm">
              <RefreshCwIcon />
              <h3 className="text-lg font-semibold">Refreshable</h3>
              <p>Refresh anytime to fetch and display the latest changes</p>
            </li>
            <li className="flex flex-col gap-3 p-6 border-zinc-200 border rounded-sm">
              <SettingsIcon />
              <h3 className="text-lg font-semibold">Configurable</h3>
              <p>Customize access and permissions to fit your needs</p>
            </li>
          </ul>
        </section>
        <section className="flex flex-row gap-12 items-center">
          <div className="h-80 w-1/2 bg-gray-400 rounded-md">.</div>
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">
              Share your projects effortlessly with recruiters, teachers, or
              anyone else
            </h2>
            <p>
              Not sure who you’re sharing with? Need a simple way to showcase
              your work? Easily grant view-only access without worrying about
              unwanted changes.
            </p>
          </div>
        </section>
        <section className="flex flex-row gap-12 items-center">
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">
              Publish your repository in seconds
            </h2>
            <ol className="flex flex-col gap-4">
              <li>Choose private repository</li>
              <li>Configure permissions</li>
              <li>Deploy project</li>
              <li>Share link</li>
            </ol>
          </div>
          <div className="h-80 w-1/2 bg-gray-400 rounded-md">.</div>
        </section>
        <section className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">
            Share your repository in seconds
          </h2>
          <p className="mb-8">
            Get started and publish your repository in few simple steps
          </p>
          <Button>
            <ArrowRight color="white" size={16} />
            <Link href="signup">Get Started</Link>
          </Button>
        </section>
      </div>
      <footer className="flex flex-row justify-between px-28 py-8 mt-28">
        <p>© GitPeek 2025</p>
        <div className="flex flex-row gap-4">
          <Link href={""}>Terms of service</Link>
          <Link href={""}>Privacy policy</Link>
        </div>
      </footer>
    </div>
  );
}
