import getUser from "@/lib/utils/getUser";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Nav = async () => {
  const user = await getUser();

  return (
    <nav className=" flex-none h-12 flex gap-2 items-center px-4 justify-between shadow-md">
      <Link href="/">
        <Image
          src="next-dark.svg"
          className="h-8"
          width={128}
          height={32}
          alt="Logo"
        />
      </Link>
      {user ? (
        <div className="flex gap-4 items-center">
          <Image
            className="w-8 h-8 rounded-full"
            width={32}
            height={32}
            src={user.avatar.url}
            alt={`${user.name} profile picture`}
          />
          <span>{user.name}</span>
          <a href="/api/auth/logout">
            <Button aria-label="logout button" className="h-8 w-16">
              Logout
            </Button>
          </a>
        </div>
      ) : (
        <a href="/api/auth/login">
          <Button aria-label="login button" className="h-8 w-16">
            Login
          </Button>
        </a>
      )}
    </nav>
  );
};

export default Nav;
