"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

import { useSession, signOut } from "next-auth/react";


function NavBar() {
  const { data: session } = useSession();
  
  return (
    <header className="px-28 py-8 mb-8">
      <nav className="flex flex-row justify-between">
        <Link className="flex flex-row items-center gap-3" href="/">
          <Image
            src={"/gitpeek-logo.svg"}
            width={32}
            height={32}
            alt="GitPeek logo"
          />
          <p className="text-xl font-semibold">GitPeek</p>
        </Link>
        {session?.user?.email ? (
          <div className="flex flex-row gap-3">
            <Button variant={"secondary"}>My Repos</Button>
            <Button>Add Repo</Button>
            <Avatar className="cursor-pointer" onClick={() => signOut()}>
              <AvatarImage src={session.user.image || ""} />
              <AvatarFallback>GL</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Button>
            <Link href="/signup">Get Started</Link>
          </Button>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
