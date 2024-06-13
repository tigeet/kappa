import { UploadService } from "./service";

type KappaResponse = {
  id: string; // used to access the file
  ext: string;
  name: string;
  type: string;
  checksum: string;
  key: string; // used to delete the file
};

export const KappaService: UploadService = {
  async upload(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const uploadedAt = new Date();
    const response = await fetch("https://kappa.lol/api/upload", {
      method: "POST",
      body: formData,
    });

    const json: KappaResponse = await response.json();

    return {
      filename: json.name,
      extension: json.ext,
      deleteId: json.key,
      id: json.id,
      mimeType: json.type,
      uploadedAt,
      service: "KAPPA",
      src: `https://kappa.lol/${json.id}${json.ext}`,
      displayName: json.name + json.ext,
    };
  },

  async delete(id: string) {
    const response = await fetch(`https://kappa.lol/api/delete?key=${id}`);
    if (!response.ok) throw new Error("Failed to delete file");

    const json = await response.json();
    if (!json.success) throw new Error("Failed to delete file");
  },
};
