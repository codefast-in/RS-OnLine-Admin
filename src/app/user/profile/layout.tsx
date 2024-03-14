import React from "react";
import SideBar from "@/components/projectComponents/SideBar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-screen items-center justify-center gap-10">{children}</div>
  );
}
