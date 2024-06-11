import getUser from "@/lib/utils/getUser";
import DataView from "@/components/dataView/dataView";
import { getLocalUploads, getUploads } from "./actions";
import { cookies } from "next/headers";
import UploadField from "./components/uploadField/upload";

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
    <main className="flex flex-1 md:flex-row flex-col-reverse px-4 md:gap-8 gap-4  py-4">
      <DataView className="  h-full flex-1" data={uploads} />

      <div className="flex flex-none md:h-full h-24">
        <UploadField />
      </div>
    </main>
  );
}
