
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import SecretLink from "@/components/SecretLink";

export default function Home() {
  return (
    <main>
      <nav className="flex items-center justify-between">
        <Link href="/">Home</Link>
        <Link href="/">Home</Link>
        <SecretLink />
      </nav>
      <div>
        <AuthButton />
      </div>
      <h1>choose repo</h1>
    </main>
  );
}
