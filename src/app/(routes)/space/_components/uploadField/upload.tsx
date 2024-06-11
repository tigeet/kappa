"use client";
import getUser from "@/lib/utils/getUser";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import UploadIcon from "@/svg/upload.svg";
import { saveLocalUpload, saveUpload } from "./actions";
import { KappaResponse } from "./types";
import { getLocalId } from "@/lib/utils/localId";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function UploadField() {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
  });

  const onUpload = useCallback(
    async (files: FileList) => {
      const file = files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);
      const uploadedAt = new Date();
      const response = await fetch("https://kappa.lol/api/upload", {
        method: "POST",
        body: formData,
      });

      const jsonResponse: KappaResponse = await response.json();
      console.log("@upload to kappa", jsonResponse);
      const uploadData = {
        filename: jsonResponse.name,
        extension: jsonResponse.ext,
        deleteId: jsonResponse.key,
        id: jsonResponse.id,
        mimeType: jsonResponse.type,
        uploadedAt,
      };
      if (user) await saveUpload(user.id, uploadData);
      else await saveLocalUpload(getLocalId(), uploadData);
    },
    [user]
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
        "md:w-48 flex-none w-full relative cursor-pointer transition-colors",
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
        <div className="flex items-center flex-col gap-2">
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
        </div>
        <input
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
