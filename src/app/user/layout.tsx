import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {ThemeProvider} from "@/components/theme-provider";
import UserNavbar from "@/components/projectComponents/UserNavbar";

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
