import { LocalUpload, UserUpload } from "@prisma/client";

export type TUpload = LocalUpload | UserUpload;
export type TView = "list" | "grid";
