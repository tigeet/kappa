import { TUpload } from "@/types";
import { KappaService } from "./kappa";
export type ServiceUploadResponse = Omit<TUpload, "authorId">;
export type ServiceDeleteResponse = {};
export type UploadService = {
  upload: (file: File) => Promise<ServiceUploadResponse>;
  delete: (id: string) => Promise<ServiceDeleteResponse>;
};

export const service = KappaService;
