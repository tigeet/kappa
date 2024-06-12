"use server";
import prisma from "@/db/db";
import { LocalUpload, UserUpload } from "@prisma/client";

export async function getUploads(id?: string): Promise<UserUpload[]> {
  if (!id) return [];
  const uploads = await prisma.userUpload.findMany({
    where: {
      authorId: id,
    },
  });

  return uploads;
}

export async function getLocalUploads(id?: string): Promise<LocalUpload[]> {
  if (!id) return [];
  const uploads = await prisma.localUpload.findMany({
    where: {
      localId: id,
    },
  });

  return uploads;
}
