import {
  LocalUpload as LocalPrismaUpload,
  Upload as PrismaUpload,
} from "@prisma/client";

export type Upload = LocalUpload | PrismaUpload;
export type TView = "list" | "grid";
