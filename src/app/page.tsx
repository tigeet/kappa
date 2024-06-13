import { Button } from "@/components/ui/button";
import Link from "next/link";
const Page = async () => {
  return (
    <main className="flex flex-1 justify-center items-center">
      <Link href="/dashboard">
        <Button>Browse</Button>
      </Link>
    </main>
  );
};

export default Page;
