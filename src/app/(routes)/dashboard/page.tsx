"use client";
import getUser from "@/lib/utils/getUser";
import DataView from "@/components/dataView/dataView";
import { getUploads } from "./actions";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import UploadField from "./_components/uploadField/upload";
import { useCallback, useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
type Props = {
  searchParams: Record<string, undefined | string | string[]>;
};
export default function Home({}: Props) {
  // const [page, setPage] = useState(0);
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: async ({ pageParam }) => await getUploads(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    maxPages: 2,
  });

  const handleEnd = useCallback(async () => {
    console.log("@onEnd");
    if (isFetching) return;
    await fetchNextPage();
    // setPage((page) => page + 1);
  }, [fetchNextPage, isFetching]);
  return (
    <main className="flex flex-1 overflow-hidden md:flex-row flex-col p-4 gap-4">
      <div className="flex flex-none md:h-full h-24">
        <UploadField />
      </div>
      <DataView
        className="flex-1"
        data={data?.pages.map((page) => page.data).flat() ?? []}
        hasNext={hasNextPage}
        onEnd={handleEnd}
      />
      <Toaster position="top-right" />
    </main>
  );
}
