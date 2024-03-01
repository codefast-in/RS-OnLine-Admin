'use client'

// import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {ThemeProvider} from "@/components/theme-provider";
import UserNavbar from "@/components/projectComponents/UserNavbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asynceCurrentEmployee } from "@/redux configs/Actions/employeeAction";

const inter = Inter({subsets: ["latin"]});





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
// const dispatch = useDispatch()

// useEffect(() => {
//   dispatch(asynceCurrentEmployee())
// }, [])

  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          <UserNavbar />
          <main className="overflow-hidden">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  ) 
}
