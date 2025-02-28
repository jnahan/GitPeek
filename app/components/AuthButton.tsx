"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const AuthButton = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user?.email ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button
          onClick={() => signIn("github", { callbackUrl: "/confirmation" })}
        >
          Sign in
        </button>
      )}
    </div>
  );
};

export default AuthButton;
