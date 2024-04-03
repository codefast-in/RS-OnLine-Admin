"use client";

import {Inter} from "next/font/google";

import {ThemeProvider} from "@/components/theme-provider";

import Navbar from "@/components/projectComponents/Navbar";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {usePathname, useRouter} from "next/navigation";
import {AdminState} from "@/redux configs/Reducers/adminReducer";
import {asynceCurrentAdmin} from "@/redux configs/Actions/adminActions";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();
  
  const admin = useSelector((state: AdminState) => {
    return state.admin;
  });
  // console.log(admin)
  useEffect(() => {
    dispatch(asynceCurrentAdmin());

    if (!admin.isLogin) {
      router.push("/");
    } else {
      router.push(`${path.toString()}`);
     
    }
  }, [admin.isLogin]);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          <Navbar admin={admin.admin} />
          <main className="overflow-hidden">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
