"use client"
import { useSearchParams } from "next/navigation";

function Deploy() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <div>
      <p>
        {name}
      </p>
      <input type="text" placeholder="Project name" />
    </div>
  );
}

export default Deploy;
