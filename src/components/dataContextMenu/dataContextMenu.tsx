"use client";
import { ReactNode, memo, useCallback } from "react";
import { toast } from "react-hot-toast";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";
import MoreIcon from "@/svg/more-horizontal.svg";
import { TUpload } from "@/types";
import { Copy, DeleteIcon, Download, Info, Trash } from "lucide-react";
import useClipboard from "@/hooks/useClipboard";
import { cn } from "@/lib/utils";
import { download } from "@/lib/utils/download";

type Props = {
  className?: string;
  data: TUpload;
  children?: ReactNode;
};

const DataContextMenu = ({ data, children }: Props) => {
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
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-56">
        <ContextMenuLabel className=" text-nowrap overflow-hidden text-ellipsis">
          {data.displayName}
        </ContextMenuLabel>
        <ContextMenuSeparator />

        <ContextMenuGroup>
          <ContextMenuItem onClick={handleCopyLink}>
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy link</span>
          </ContextMenuItem>

          <ContextMenuItem onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            <span>Download</span>
          </ContextMenuItem>

          <ContextMenuItem disabled>
            <Info className="mr-2 h-4 w-4" />
            <span>Info</span>
          </ContextMenuItem>
        </ContextMenuGroup>

        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem disabled>
            <Trash className="mr-2 h-4 w-4 text-destructive" />
            <span className="text-destructive">Delete</span>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default memo(DataContextMenu);
