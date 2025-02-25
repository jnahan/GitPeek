import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';

function NavBar() {
  let user;
  
  return (
    <header className="px-28 py-8 mb-8">
      <nav className="flex flex-row justify-between">
        <Link
          className="flex flex-row items-center gap-3"
          href="/"
        >
          <Image
            src={"/gitpeek-logo.svg"}
            width={32}
            height={32}
            alt="GitPeek logo"
          />
          <p className='text-xl font-semibold'>GitPeek</p>
        </Link>
        {user ? (
          <div>
            <Button>My Repos</Button>
            <Button>Create Repo</Button>
            <Avatar>
              <AvatarImage src="" />
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

export default NavBar
