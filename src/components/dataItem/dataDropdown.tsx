"use client";
import { memo, useCallback } from "react";
import { toast } from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import MoreIcon from "@/svg/more-horizontal.svg";
import { Upload } from "@/types";
import { Copy, DeleteIcon, Info, Trash } from "lucide-react";
import useClipboard from "@/hooks/useClipboard";

type Props = {
  data: Upload;
};

const DataDropdown = ({ data }: Props) => {
  const copy = useClipboard();
  const handleCopyLink = useCallback(async () => {
    const url = `https://kappa.lol/${data.id}${data.extension}`;
    await copy(url);
    toast.success("Link copied to clipboard");
  }, [copy, data.extension, data.id]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center rounded-full p-0 w-8 h-8 hover:bg-accent-strong transition-colors focus:outline-border-primary focus:outline">
        <MoreIcon className="w-4 h-4 text-primary " />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className=" text-nowrap overflow-hidden text-ellipsis">
          {data.filename + data.extension}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleCopyLink}>
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy link</span>
          </DropdownMenuItem>

          <DropdownMenuItem disabled>
            <Info className="mr-2 h-4 w-4" />
            <span>Info</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <Trash className="mr-2 h-4 w-4 text-destructive" />
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(DataDropdown);
