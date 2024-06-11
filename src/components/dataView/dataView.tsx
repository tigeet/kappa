"use client";
import { cn } from "@/lib/utils";
import { TView, Upload } from "@/types";
import clsx from "clsx";
import { memo, useState } from "react";
import DataItem from "../dataItem/dataItem";
import { Card } from "../ui/card";
import DataControls from "../dataControls/dataControls";
type Props = {
  className?: string;
  data: Upload[];
};

const DataView = ({ className, data }: Props) => {
  const [view, setView] = useState<TView>("list");
  return (
    <Card
      className={cn("flex flex-col px-4 py-4 gap-4  overflow-auto", className)}
    >
      <DataControls value={view} onChange={setView} />

      <div
        className={clsx(
          "flex-1",
          view === "list"
            ? "flex flex-col gap-2 "
            : "gap-4 grid auto-fill-[200px] auto-rows-min"
        )}
      >
        {data.map((upload) => (
          <DataItem key={upload.id} data={upload} view={view} />
        ))}
      </div>
    </Card>
  );
};
export default memo(DataView);
