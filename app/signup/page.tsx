"use client"
export const dynamic = "force-dynamic";

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
// import { redirect } from 'next/navigation';
import AuthButton from '../components/AuthButton';

function SignUpPage() {
  const { data: session } = useSession();
  
  useEffect(() => {
    console.log("session")
    console.log(session)
      // redirect(`/import/${session.accessToken}`)

  }, [session])

  return (
    <section className="flex flex-row h-screen">
      <Image
        src={"/gradient-dark.jpg"}
        alt="dark gradient"
        width={1000}
        height={1000}
        className="h-screen w-1/3"
      />
      <div className="flex flex-col gap-6 text-center w-2/3 justify-center items-center">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Welcome to GitPeek</h1>
          <p>Sign in to share your private GitHub repos</p>
        </div>
        <Button onClick={() => signIn("github")}>
          <Image
            src="/github-mark-white.svg"
            width={16}
            height={16}
            alt="GitHub Mark"
          />
            Sign in with GitHub
        </Button>
        <AuthButton />
        <p className="max-w-sm">
          By clicking continue, you agree to our terms of service and privacy
          policy
        </p>
      </div>
    </section>
  );
}

export default SignUpPage
