import { useCallback } from "react";
import useNavigator from "./useNavigator";

const useClipboard = () => {
  const navigator = useNavigator();

  const handleCopy = useCallback(
    async (text: string) => {
      await navigator?.clipboard.writeText(text);
    },
    [navigator?.clipboard]
  );

  return handleCopy;
};

export default useClipboard;
