import makeHex from "@/lib/utils/makeHex";
import { useEffect, useState } from "react";

const useLocalId = () => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("uid");
    if (!id) localStorage.setItem("uid", makeHex(16));
    setValue(localStorage.getItem("uid")!);
  }, []);

  return value;
};

export default useLocalId;
