"use client";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "next/router";
import { ReactNode, useState } from "react";

type Props = {
  children?: ReactNode;
};

const Providers = ({ children }: Props) => {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  );
};
export default Providers;
