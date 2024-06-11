"use client";
import { cn } from "@/lib/utils";
import { TView, Upload } from "@/types";
import clsx from "clsx";
import { memo, useState } from "react";
import DataItem from "../dataItem/dataItem";
import { Card } from "../ui/card";
import DataControls from "../dataControls/dataControls";
import useUrlState from "@/hooks/useUrlState";
import { Separator } from "../ui/separator";
type Props = {
  className?: string;
  data: Upload[];
};

const DataView = ({ className, data }: Props) => {
  const [view, setView] = useUrlState<TView>({
    key: "view",
    defaultValue: "list",
  });

  return (
    <Card className={cn("flex flex-col overflow-hidden", className)}>
      <DataControls value={view} onChange={setView} className="py-2 px-4" />
      <Separator />

      <div className="overflow-hidden flex-1">
        <div
          className={clsx(
            "flex-1 overflow-auto h-full",
            view === "list"
              ? "flex flex-col"
              : "p-4 gap-4 grid auto-fill-[200px] auto-rows-min"
          )}
        >
          {data.map((upload) => (
            <DataItem key={upload.id} data={upload} view={view} />
          ))}
        </div>
      </div>
    </Card>
  );
};
export default memo(DataView);
