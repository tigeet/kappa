"use client";
import Image from "next/image";
import MoreIcon from "@/svg/more-horizontal.svg";
import { TUpload } from "@/types";
import { memo } from "react";
import { Card } from "../ui/card";
import { TView } from "@/types";
import useNavigator from "@/hooks/useNavigator";
import DataDropdown from "./dataDropdown";
import { cn } from "@/lib/utils";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import DataContextMenu from "../dataContextMenu/dataContextMenu";
type Props = { data: TUpload; view: TView };

const DataItem = ({ data, view = "grid" }: Props) => {
  const navigator = useNavigator();
  const language = navigator?.language ?? "en";
  const displayDate = data.uploadedAt.toLocaleDateString(language);

  if (view === "list")
    return (
      <DataContextMenu data={data}>
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
          <DataDropdown
            data={data}
            trigger={
              <DropdownMenuTrigger
                aria-label="about"
                className={cn(
                  "flex items-center justify-center flex-none rounded-full p-0 w-8 h-8 hover:bg-accent-strong transition-colors focus:outline-border-primary focus:outline"
                )}
              >
                <MoreIcon className="w-4 h-4 text-primary " />
              </DropdownMenuTrigger>
            }
          />
        </div>
      </DataContextMenu>
    );

  return (
    <DataContextMenu data={data}>
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

          <DataDropdown
            data={data}
            trigger={
              <DropdownMenuTrigger
                aria-label="about"
                className={cn(
                  "flex items-center justify-center flex-none rounded-full p-0 w-8 h-8 hover:bg-accent-strong transition-colors focus:outline-border-primary focus:outline"
                )}
              >
                <MoreIcon className="w-4 h-4 text-primary " />
              </DropdownMenuTrigger>
            }
          />
        </div>
      </Card>
    </DataContextMenu>
  );
};

export default memo(DataItem);
