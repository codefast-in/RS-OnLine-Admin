"use client";

// import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {ThemeProvider} from "@/components/theme-provider";
import UserNavbar from "@/components/projectComponents/UserNavbar";
import {useEffect, useState} from "react";
import {ReactReduxContext, useDispatch, useSelector} from "react-redux";
import {asynceCurrentEmployee} from "@/redux configs/Actions/employeeAction";
import type {UnknownAction} from "@reduxjs/toolkit";
import {EmployeeState} from "@/redux configs/Reducers/employeeReducer";
import {useRouter} from "next/navigation";
const inter = Inter({subsets: ["latin"]});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();
  const router = useRouter();

  const employee = useSelector((state: EmployeeState) => {
    return state.employee;
  });

  useEffect(() => {
    dispatch(asynceCurrentEmployee());

    if (!employee.isLogin) {
      router.push("/");
    } else {
      router.push("/user");
    }
  }, [employee.isLogin]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          <UserNavbar employee={employee} />
          <main className="overflow-hidden">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
