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
import { TUpload } from "@/types";
import { Copy, DeleteIcon, Download, Info, Trash } from "lucide-react";
import useClipboard from "@/hooks/useClipboard";
import { cn } from "@/lib/utils";
import { download } from "@/lib/utils/download";

type Props = {
  className?: string;
  data: TUpload;
};

const DataDropdown = ({ data, className }: Props) => {
  const copy = useClipboard();

  const handleCopyLink = useCallback(async () => {
    await copy(data.src);
    toast.success("Link copied to clipboard");
  }, [copy, data.src]);

  const handleDownload = useCallback(
    () => download(data.src, data.displayName),
    [data.displayName, data.src]
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          className,
          "flex items-center justify-center rounded-full p-0 w-8 h-8 hover:bg-accent-strong transition-colors focus:outline-border-primary focus:outline"
        )}
      >
        <MoreIcon className="w-4 h-4 text-primary " />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className=" text-nowrap overflow-hidden text-ellipsis">
          {data.displayName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleCopyLink}>
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy link</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            <span>Download</span>
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
