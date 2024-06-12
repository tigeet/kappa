"use client";
import Image from "next/image";

import { TUpload } from "@/types";
import { memo } from "react";
import { Card } from "../ui/card";
import { TView } from "@/types";
import useNavigator from "@/hooks/useNavigator";
import DataDropdown from "./dataDropdown";
type Props = { data: TUpload; view: TView };

const DataItem = ({ data, view = "grid" }: Props) => {
  const navigator = useNavigator();
  const language = navigator?.language ?? "en";
  const displayDate = data.uploadedAt.toLocaleDateString(language);

  if (view === "list")
    return (
      <div className="grid w-full gap-4 px-4 py-2 grid-cols-[32px_1fr_128px_128px_24px] items-center justify-items-center bg-background hover:bg-accent transition-colors">
        <Image
          className="w-8 h-8 rounded-sm object-cover"
          key={data.id}
          width="32"
          height="32"
          src={data.src}
          alt={data.displayName}
        />
        <div className=" align-middle overflow-hidden w-full text-ellipsis whitespace-nowrap">
          {data.displayName}
        </div>
        <p>{data.mimeType}</p>
        <p>{displayDate}</p>
        <DataDropdown data={data} />
      </div>
    );

  return (
    <Card className="flex flex-col px-4 py-2  gap-2 rounded-md relative border-none bg-background-accent ">
      <Image
        className="w-full flex-1 aspect-square object-cover"
        key={data.id}
        width="400"
        height="400"
        src={data.src}
        alt={data.displayName}
      />
      <div className="flex flex-none items-center gap-2 w-full">
        <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {data.displayName}
        </p>
        {<DataDropdown data={data} className="flex-none" />}
      </div>
    </Card>
  );
};

export default memo(DataItem);
