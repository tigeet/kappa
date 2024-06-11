import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

type Props<T extends string> = {
  key: string;
  defaultValue: T;
};
const useUrlState = <T extends string>({
  key,
  defaultValue,
}: Props<T>): [T, Dispatch<SetStateAction<T>>] => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [state, setUrlState] = useState<T>(
    (searchParams.get(key) as T) ?? defaultValue
  );

  const setState = useCallback(
    (action: T | ((state: T) => T)) => {
      const nextState = action instanceof Function ? action(state) : action;
      const params = new URLSearchParams(searchParams.toString());
      if (nextState === defaultValue) {
        params.delete(key);
      } else {
        params.set(key, nextState);
      }

      router.replace(`${pathname}?${params.toString()}`);
      setUrlState(nextState);
    },
    [defaultValue, key, pathname, router, searchParams, state]
  );

  return [state, setState];
};

export default useUrlState;
