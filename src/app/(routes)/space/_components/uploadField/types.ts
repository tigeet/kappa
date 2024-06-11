export type KappaResponse = {
  id: string; // used to access the file
  ext: string;
  name: string;
  type: string;
  checksum: string;
  key: string; // used to delete the file
};
