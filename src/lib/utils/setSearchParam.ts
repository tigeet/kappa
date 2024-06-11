import { ReadonlyURLSearchParams } from "next/navigation";

type Props = {
  searchParams: ReadonlyURLSearchParams;
  key: string;
  value: string;
  pathname: string;
};
export const setSearchParam = ({
  searchParams,
  key,
  value,
  pathname,
}: Props) => {
  const params = new URLSearchParams(searchParams);

  params.set(key, value);

  return `${pathname}?${params.toString()}`;
};
