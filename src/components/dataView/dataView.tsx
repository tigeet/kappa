"use client";
import { cn } from "@/lib/utils";
import { TView, TUpload } from "@/types";
import clsx from "clsx";
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import DataItem from "../dataItem/dataItem";
import { Card } from "../ui/card";
import DataControls from "../dataControls/dataControls";
import useUrlState from "@/hooks/useUrlState";
import { Separator } from "../ui/separator";
type Props = {
  className?: string;
  data: TUpload[];
  onFetchNext?: () => void;
  onFetchPrev?: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  isFetching: boolean;
};

const PIVOT = 0;
const DataView = ({
  className,
  data,
  onFetchNext,
  hasPrev,
  onFetchPrev,
  hasNext,
  isFetching,
}: Props) => {
  const [view, setView] = useUrlState<TView>({
    key: "view",
    defaultValue: "list",
  });

  const bottomRef = useRef<HTMLSpanElement | null>(null);
  const topRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ПЕРЕПИСАТЬ
  useEffect(() => {
    const target = bottomRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          onFetchNext?.();
        }
      },
      { threshold: 1.0, root: containerRef.current, rootMargin: "100px" }
    );
    observer.observe(target);

    return () => target && observer.disconnect();
  }, [onFetchNext]);

  // ПЕРЕПИСАТЬ
  useEffect(() => {
    const target = topRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          onFetchPrev?.();
        }
      },
      { threshold: 1.0, root: containerRef.current, rootMargin: "100px" }
    );
    observer.observe(target);

    return () => target && observer.disconnect();
  }, [onFetchPrev]);

  const uploads = data.flat();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = containerRef.current?.scrollTop ?? 0;
    if (scrollTop === 0) {
      containerRef.current?.scrollTo({ top: 1, behavior: "instant" });
    }
  };
  return (
    <Card className={cn("flex flex-col overflow-hidden", className)}>
      <DataControls value={view} onChange={setView} className="py-2 px-4" />
      <Separator />

      <div
        className="overflow-auto flex-1 "
        ref={containerRef}
        onScroll={handleScroll}
      >
        <div
          className={clsx(
            "flex-1 h-full",
            view === "list"
              ? "flex flex-col"
              : "p-4 gap-4 grid auto-fill-[200px] auto-rows-min",
            isFetching && "touch-none"
          )}
        >
          {uploads?.slice(0, PIVOT).map((upload) => (
            <DataItem key={upload.id} data={upload} view={view} />
          ))}

          {hasPrev && (
            <span
              key="scroll-prev"
              className="h-4 bg-red-500 w-full block"
              ref={topRef}
            />
          )}
          {uploads?.slice(PIVOT).map((upload) => (
            <DataItem key={upload.id} data={upload} view={view} />
          ))}
          {hasNext && (
            <span
              key="scroll-next"
              className="h-4 bg-red-500 w-full block"
              ref={bottomRef}
            />
          )}
        </div>
      </div>
    </Card>
  );
};
export default memo(DataView);
