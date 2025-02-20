
import Link from "next/link";

export default function Home() {  
  return (
    <header>
      <nav className="flex items-center justify-between">
        <Link href="/">Home</Link>
        <a
          href="https://github.com/apps/gitlink-dev/installations/new"
          target="_blank"
        >
          Fetch Repos
        </a>
      </nav>
    </header>
  );
}
