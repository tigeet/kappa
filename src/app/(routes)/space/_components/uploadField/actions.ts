"use server";
import prisma from "@/db/db";

import { ServiceUploadResponse } from "@/lib/upload/service";
export const saveUpload = async (id: string, data: ServiceUploadResponse) => {
  return await prisma.userUpload.create({
    data: {
      ...data,
      authorId: id,
    },
  });
};

export const saveLocalUpload = async (
  id: string,
  data: ServiceUploadResponse
) => {
  return await prisma.localUpload.create({
    data: {
      ...data,
      localId: id,
    },
  });
};
