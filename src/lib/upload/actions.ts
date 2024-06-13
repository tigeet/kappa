"use server";

import prisma from "@/db/db";
import { TBaseUpload, TUpload } from "@/types";
import { cookies } from "next/headers";
import getUser from "../utils/getUser";

export const remove = async (id: string) => {
  await prisma.upload.delete({
    where: {
      deleteId: id,
    },
  });
};

export const save = async (data: TBaseUpload) => {
  const cookieStore = cookies();
  const user = await getUser();
  const localId = cookieStore.get("uid")!.value;
  const payload: TUpload = user
    ? { ...data, type: "AUTH", authorId: user.id }
    : { ...data, type: "BROWSER", localId };

  return await prisma.upload.create({
    data: {
      ...payload,
    },
  });
};
