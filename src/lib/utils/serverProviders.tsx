import { CookiesProvider } from "next-client-cookies/server";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const ServerProviders = ({ children }: Props) => {
  return <CookiesProvider>{children}</CookiesProvider>;
};
export default ServerProviders;
