"use server";
import prisma from "@/db/db";
import getUser from "@/lib/utils/getUser";
import { TUpload } from "@/types";
import { cookies } from "next/headers";

const PAGE_SIZE = 5;
export async function getUploads(page = 0) {
  const cookieStore = cookies();
  const user = await getUser();
  const localId = cookieStore.get("uid")!.value;
  const authorId = user?.id;

  const uploads = await prisma.upload.findMany({
    where: {
      OR: [{ localId }, { authorId }],
    },
    take: PAGE_SIZE,
    skip: page * PAGE_SIZE,
  });
  const hasNext = uploads.length > 0;
  const hasPrev = page > 0;
  const nextPage = hasNext ? page + 1 : undefined;
  const prevPage = hasPrev ? page - 1 : undefined;
  return { data: uploads as TUpload[], nextPage, prevPage };
}
