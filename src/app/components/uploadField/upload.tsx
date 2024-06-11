"use client";
import getUser from "@/lib/utils/getUser";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import UploadIcon from "@/svg/upload.svg";
import { saveLocalUpload, saveUpload } from "./actions";
import { KappaResponse } from "./types";
import useUpload from "@/hooks/useUpload";
import { getLocalId } from "@/lib/utils/localId";
import { Card } from "@/components/ui/card";

export default function UploadField() {
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

  const {
    inputRef,
    handleClick,
    dragActive,
    handleDragEnd,
    handleDragStart,
    handleInput,
    stopEvent,
    handleDrop,
  } = useUpload({ onUpload });
  return (
    <Card
      className="md:w-64 flex-none w-full relative cursor-pointer"
      onClick={handleClick}
    >
      <form
        className="h-full w-full  flex justify-center items-center"
        onSubmit={(e) => e.preventDefault()}
        onDragEnter={handleDragStart}
        onDragOver={stopEvent}
      >
        <div className="flex items-center flex-col gap-2">
          <button className="">
            <UploadIcon className="w-8 h-8" alt="upload icon" />
          </button>
          <p className="text-balance text-center">
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
