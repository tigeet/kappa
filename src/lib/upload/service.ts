import { TBaseUpload } from "@/types";
import { KappaService } from "./kappa";
import { remove, save } from "./actions";

export type ServiceUploadResponse = TBaseUpload;

export type ServiceDeleteResponse = void;
export type UploadService = {
  upload: (file: File) => Promise<ServiceUploadResponse>;
  delete: (id: string) => Promise<ServiceDeleteResponse>;
};

const uploadService = KappaService;

export const service = {
  async upload(file: File) {
    const response = await uploadService.upload(file);
    await save(response);
  },
  async delete(id: string) {
    await uploadService.delete(id);
    await remove(id);
  },
};
