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
  const {
    data,
    isFetching,

    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: async ({ pageParam }) => await getUploads(pageParam),
    initialPageParam: 0,
    getPreviousPageParam: (lastPage) => lastPage.prevPage,
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    maxPages: 3,
  });

  const handleFetchNext = useCallback(async () => {
    if (isFetching) return;
    await fetchNextPage();
  }, [fetchNextPage, isFetching]);

  const handleFetchPrev = useCallback(async () => {
    if (isFetching) return;
    await fetchPreviousPage();
  }, [fetchPreviousPage, isFetching]);
  console.log(!isFetching && hasPreviousPage);

  return (
    <main className="flex flex-1 overflow-hidden md:flex-row flex-col p-4 gap-4">
      <div className="flex flex-none md:h-full h-24">
        <UploadField />
      </div>
      <DataView
        className="flex-1"
        data={data?.pages.map((page) => page.data).flat() ?? []}
        hasNext={!isFetching && hasNextPage}
        onFetchNext={handleFetchNext}
        onFetchPrev={handleFetchPrev}
        hasPrev={!isFetching && hasPreviousPage}
      />
      <Toaster position="top-right" />
    </main>
  );
}
