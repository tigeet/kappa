"use server";
import { User } from "@prisma/client";
import { KappaResponse } from "./types";
import prisma from "@/db/db";
import getUser from "@/lib/utils/getUser";

type Props = {
  id: string;
  filename: string;
  extension: string;
  deleteId: string;
  uploadedAt: Date;
  mimeType: string;
};
export const saveUpload = async (id: string, data: Props) => {
  return await prisma.upload.create({
    data: {
      ...data,
      authorId: id,
    },
  });
};

export const saveLocalUpload = async (id: string, data: Props) => {
  return await prisma.localUpload.create({
    data: {
      ...data,
      localId: id,
    },
  });
};
