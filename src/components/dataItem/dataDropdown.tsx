"use client";
import { ReactNode, memo, useCallback } from "react";
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
import { service } from "@/lib/upload/service";

type Props = {
  className?: string;
  data: TUpload;
  trigger?: ReactNode;
};

const DataDropdown = ({ data, trigger }: Props) => {
  const copy = useClipboard();

  const handleCopyLink = useCallback(async () => {
    await copy(data.src);
    toast.success("Link copied to clipboard");
  }, [copy, data.src]);

  const handleDownload = useCallback(
    () => download(data.src, data.displayName),
    [data.displayName, data.src]
  );

  const handleDelete = useCallback(
    async () => await service.delete(data.deleteId),
    [data.deleteId]
  );

  return (
    <DropdownMenu>
      {trigger}

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
          <DropdownMenuItem onClick={handleDelete}>
            <Trash className="mr-2 h-4 w-4 text-destructive" />
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(DataDropdown);
