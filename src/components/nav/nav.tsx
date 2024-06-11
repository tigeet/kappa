import getUser from "@/lib/utils/getUser";
import Image from "next/image";
import Link from "next/link";
const Nav = async () => {
  const user = await getUser();

  return (
    <nav className=" flex-none h-12 flex gap-2 items-center px-4 justify-between shadow-md">
      <Image
        className=""
        src="next-light.svg"
        width={128}
        height={128}
        alt="Logo"
      />
      {user ? (
        <div className="flex gap-4 items-center">
          <Image
            className="w-8 h-8 rounded-full"
            width={32}
            src={user.avatar.url}
            height={32}
            alt={`${user.name} profile picture`}
          />
          <span>{user.name}</span>
          <Link href="/api/auth/logout">Logout</Link>
        </div>
      ) : (
        <Link href="/api/auth/login">Login</Link>
      )}
    </nav>
  );
};

export default Nav;
