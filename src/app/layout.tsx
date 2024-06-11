import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import getUser from "@/lib/utils/getUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "@/lib/utils/providers";
import clsx from "clsx";
import Nav from "@/components/nav/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: // upload,
Readonly<{
  children: React.ReactNode;
  // upload: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="en">
      <Providers>
        <body
          className={clsx(
            inter.className,
            "flex flex-col h-[100dvh] w-[100dvw] overflow-hidden"
          )}
        >
          <Nav />
          {children}
          {/* {upload} */}
        </body>
      </Providers>
    </html>
  );
}
