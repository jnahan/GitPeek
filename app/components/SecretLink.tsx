"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const SecretLink = () => {
  const { data: session } = useSession();

  console.log("session")
  console.log(session)

  return <div className="flex items-center gap-4">
      {session?.user && <Link href="/repos">{`Generate link for ${session.user.name}`}</Link>}
      {session?.user?.image && <Image width={24} height={24} alt="prof" src={session.user.image} />}
    </div>;
};

export default SecretLink;
