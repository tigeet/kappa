"use server";
import prisma from "@/db/db";
import { getSession } from "@auth0/nextjs-auth0";
import { User } from "@prisma/client";

export default async function createUserIfDoesNotExist(): Promise<null | User> {
  const session = await getSession();
  const auth0user = session?.user;
  if (!auth0user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { auth0id: auth0user.sub },
  });

  if (dbUser) return dbUser;

  return await prisma.user.create({
    data: {
      auth0id: auth0user.sub,
      name: auth0user.name,
      avatar: {
        set: {
          url: auth0user.picture,
        },
      },
    },
  });
}
