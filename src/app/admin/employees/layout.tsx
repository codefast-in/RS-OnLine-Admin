
import React, {useEffect} from "react";
import SideBar from "@/components/projectComponents/SideBar";
import {useDispatch} from "react-redux";
import app from "@/utils/axios";

const linksData = [
  {label: "Employees", path: "/admin/employees"},
  {label: "Tasks", path: "/admin/employees/tasks"},
  {label: "Leave Requests", path: "/admin/employees/leave"},
];
export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <div className="flex w-screen items-start justify-center gap-10">
      {/* <SideBar links={linksData} /> */}
      {children}
    </div>
  );
}
