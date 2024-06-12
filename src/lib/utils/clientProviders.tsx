"use client";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "next-client-cookies/server";
import { Router } from "next/router";
import { ReactNode, useState } from "react";
import makeHex from "./makeHex";

type Props = {
  children?: ReactNode;
};

const ClientProviders = ({ children }: Props) => {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  );
};
export default ClientProviders;
