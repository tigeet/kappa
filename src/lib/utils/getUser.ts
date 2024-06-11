"use server";
import prisma from "@/db/db";
import { getSession } from "@auth0/nextjs-auth0";
import { User } from "@prisma/client";

export default async function getUser(): Promise<null | User> {
  const session = await getSession();

  const auth0user = session?.user;
  if (!auth0user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { auth0id: auth0user.sub },
  });
  // console.log("@getUser", dbUser);
  return dbUser;
}
