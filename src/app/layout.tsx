import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import Wraper from "../components/wraper";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "RS Online Admin",
  description: "Human Resourse Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={inter.className} >
        <main className="overflow-hidden">
          <Wraper>{children}</Wraper>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
