"use client";
import { useCallback, useRef, useState } from "react";
import UploadIcon from "@/svg/upload.svg";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { service } from "@/lib/upload/service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UploadField() {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const onUpload = useCallback(
    async (files: FileList) => {
      // const file = files[0];
      // if (!file) return;

      // await service.upload(file);
      // router.refresh();
      const len = files.length;
      const tasks: Promise<void>[] = [];
      for (let i = 0; i < len; ++i) tasks.push(service.upload(files[i]));
      await Promise.all(tasks);
      toast.success(len === 1 ? `Uploaded one file` : `Uploaded ${len} files`);
      router.refresh();
    },
    [router]
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
