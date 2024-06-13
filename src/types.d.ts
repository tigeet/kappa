import { Upload } from "@prisma/client";

export type TBaseUpload = Omit<Upload, "type" | "localId" | "authorId">;

export type TLocalUpload = TBaseUpload & { type: "BROWSER"; localId: string };
export type TAuthUpload = TBaseUpload & { type: "AUTH"; authorId: string };
export type TUpload = TLocalUpload | TAuthUpload;

export type TView = "list" | "grid";
