
import Link from "next/link";
import AuthButton from "@/app/components/AuthButton";
import SecretLink from "@/app/components/SecretLink";

export default function Home() {  
  return (
    <main>
      <nav className="flex items-center justify-between">
        <Link href="/">Home</Link>
        <SecretLink />
        <AuthButton />
      </nav>   
    </main>
  );
}
