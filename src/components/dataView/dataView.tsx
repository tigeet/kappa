"use client";
import { cn } from "@/lib/utils";
import { TView, TUpload } from "@/types";
import clsx from "clsx";
import { memo, useEffect, useRef, useState } from "react";
import DataItem from "../dataItem/dataItem";
import { Card } from "../ui/card";
import DataControls from "../dataControls/dataControls";
import useUrlState from "@/hooks/useUrlState";
import { Separator } from "../ui/separator";
type Props = {
  className?: string;
  data: TUpload[];
  onEnd?: () => void;
  hasNext: boolean;
};

const DataView = ({ className, data, onEnd, hasNext }: Props) => {
  const [view, setView] = useUrlState<TView>({
    key: "view",
    defaultValue: "list",
  });

  const ref = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries, observer) => {
        console.log("@observer");
        if (entries.some((entry) => entry.isIntersecting)) {
          onEnd?.();
        }
      },
      { threshold: 1.0, root: containerRef.current, rootMargin: "100px" }
    );
    console.log("@observer.observe");
    observer.observe(target);

    return () => target && observer.disconnect();
  }, [onEnd]);
  return (
    <Card className={cn("flex flex-col overflow-hidden", className)}>
      <DataControls value={view} onChange={setView} className="py-2 px-4" />
      <Separator />

      <div className="overflow-hidden flex-1" ref={containerRef}>
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
          {hasNext && <span key="scroll" ref={ref} />}
        </div>
      </div>
    </Card>
  );
};
export default memo(DataView);
