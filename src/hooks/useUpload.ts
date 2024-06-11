import { useCallback, useRef, useState } from "react";

type Props = {
  onUpload: (files: FileList) => void;
};

const useUpload = ({ onUpload }: Props) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  return {
    dragActive,
    stopEvent,
    handleInput,
    handleDrop,
    handleDragEnd,
    handleDragStart,
    handleClick,
    inputRef,
  };
};

export default useUpload;
