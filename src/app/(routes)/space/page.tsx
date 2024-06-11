import getUser from "@/lib/utils/getUser";
import DataView from "@/components/dataView/dataView";
import { getLocalUploads, getUploads } from "./actions";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import UploadField from "./_components/uploadField/upload";
type Props = {
  searchParams: Record<string, undefined | string | string[]>;
};
export default async function Home({}: Props) {
  const user = await getUser();
  const localId = cookies().get("uid")?.value;
  const uploads = (
    await Promise.all([
      await getUploads(user?.id),
      await getLocalUploads(localId),
    ])
  )

    .flat()
    .sort((a, b) => a.uploadedAt.getTime() - b.uploadedAt.getTime());

  return (
    <main className="flex flex-1 overflow-hidden md:flex-row flex-col p-4 gap-4">
      <div className="flex flex-none md:h-full h-24">
        <UploadField />
      </div>
      <DataView className="flex-1" data={uploads} />
      <Toaster position="top-right" />
    </main>
  );
}
