"use client";
import getUser from "@/lib/utils/getUser";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import UploadIcon from "@/svg/upload.svg";
import { saveLocalUpload, saveUpload } from "./actions";
import { Card } from "@/components/ui/card";
import { useCookies } from "next-client-cookies";
import { cn } from "@/lib/utils";
import makeHex from "@/lib/utils/makeHex";
import { service } from "@/lib/upload/service";
import { useRouter } from "next/navigation";

export default function UploadField() {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cookieStore = useCookies();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
  });
  const router = useRouter();
  const onUpload = useCallback(
    async (files: FileList) => {
      const file = files[0];
      if (!file) return;

      const response = await service.upload(file);

      if (!cookieStore.get("uid")) {
        cookieStore.set("uid", makeHex(16));
      }

      const localId = cookieStore.get("uid")!;
      if (user) await saveUpload(user.id, response);
      else await saveLocalUpload(localId, response);
      router.refresh();
    },
    [cookieStore, router, user]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
    console.log("@click");
  }, []);

  const handleDragStart = () => setDragActive(true);
  const handleDragEnd = () => setDragActive(false);
  const handleUpload = useCallback(
    (files: FileList) => {
      if (files.length === 0) return;

      onUpload(files);
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      handleDragEnd();
      const files = event.dataTransfer.files;

      handleUpload(files);
    },
    [handleUpload]
  );

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      files && handleUpload(files);
    },
    [handleUpload]
  );

  const stopEvent = (event: React.DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <Card
      className={cn(
        "md:w-48 flex-none w-full relative cursor-pointer transition-colors hover:bg-accent",
        dragActive ? "bg-accent border-border-primary" : "bg-background"
      )}
      onClick={handleClick}
    >
      <form
        className="h-full w-full  flex justify-center items-center"
        onSubmit={(e) => e.preventDefault()}
        onDragEnter={handleDragStart}
        onDragOver={stopEvent}
      >
        <label
          className="flex items-center flex-col gap-2"
          htmlFor="upload field"
        >
          <button aria-label="Upload Icon">
            <UploadIcon
              className={cn(
                "w-6 h-6",
                dragActive ? "text-border-primary" : "text-primary"
              )}
              alt="upload icon"
            />
          </button>
          <p
            className={cn(
              "text-balance text-center",
              dragActive ? "text-border-primary" : "text-primary"
            )}
          >
            Drag an image here or upload a file
          </p>
        </label>
        <input
          aria-label="upload field"
          name="upload field"
          type="file"
          className="opacity-0 absolute w-0 h-0"
          ref={inputRef}
          onChange={handleInput}
        />
        {dragActive && (
          <div
            className="w-full h-full absolute"
            onDrop={handleDrop}
            onDragLeave={handleDragEnd}
            onDragEnd={handleDragEnd}
          ></div>
        )}
      </form>
    </Card>
  );
}
