"use client";
import useHover from "@/hooks/useHover";
import Image from "next/image";
import MoreIcon from "@/svg/more-horizontal.svg";
import { Upload } from "@/types";
import { memo } from "react";
import { Card } from "../ui/card";
import { TView } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useNavigator from "@/hooks/useNavigator";
type Props = { data: Upload; view: TView };

const DataItem = ({ data, view = "grid" }: Props) => {
  const [hover, ref] = useHover<HTMLDivElement>();
  const navigator = useNavigator();
  const language = navigator?.language ?? "en";
  const displayDate = data.uploadedAt.toLocaleDateString(language);

  if (view === "list")
    return (
      <div
        ref={ref}
        className="grid w-full gap-4  grid-cols-[32px_1fr_128px_128px_24px] items-center justify-items-center"
      >
        <Image
          className="w-8 h-8 rounded-sm object-cover"
          key={data.id}
          width="32"
          height="32"
          src={"https://kappa.lol/" + data.id}
          alt={data.filename + data.extension}
        />
        <div className=" align-middle overflow-hidden w-full text-ellipsis whitespace-nowrap">
          {data.filename + data.extension}
        </div>
        <p>{data.mimeType}</p>
        <p>{displayDate}</p>
        <button>
          <MoreIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    );

  return (
    <Card
      className="flex flex-col px-4 py-4  gap-2 rounded-md relative"
      ref={ref}
    >
      <Image
        className="w-full flex-1 aspect-square object-cover"
        key={data.id}
        width="400"
        height="400"
        src={"https://kappa.lol/" + data.id}
        alt={data.filename + data.extension}
      />
      <div className="flex-none flex justify-center">
        <p className=" overflow-hidden text-ellipsis whitespace-nowrap">
          {data.filename + data.extension}
        </p>
      </div>
      {hover && (
        <button className="absolute top-1 right-1 rounded-full bg-slate-200 w-5 h-5 flex items-center justify-center">
          <MoreIcon className="w-4 h-4 text-blue-500" />
        </button>
      )}
    </Card>
  );
};

export default memo(DataItem);
