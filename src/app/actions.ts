"use server";
import prisma from "@/db/db";

export async function getUploads(id?: string) {
  if (!id) return [];
  const uploads = await prisma.upload.findMany({
    where: {
      authorId: id,
    },
  });

  return uploads;
}

export async function getLocalUploads(id?: string) {
  if (!id) return [];
  const uploads = await prisma.localUpload.findMany({
    where: {
      localId: id,
    },
  });
  return uploads;
}
