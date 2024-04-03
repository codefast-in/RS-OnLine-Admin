import React from "react";
import Link from "next/link";

import {
  AlignRightIcon,
  BellIcon,
  LayersIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";

// shadCN components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Card} from "../ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "../ui/button";
import {Input} from "@/components/ui/input";
// self made components
import SwichMode from "../swichMode";
import Image from "next/image";
import {useTheme} from "next-themes";
// Data
const pagesLinks = [
  {label: "Dashboard", path: "/"},
  {label: "Orders", path: "/orders"},
  {label: "Products", path: "/products"},
  {label: "Retailers", path: "/retailers"},
  {label: "Customers", path: "/customers"},
  {label: "Employees", path: "/employees"},
  {label: "Accounts", path: "/accounts"},
  // {label: "Events", path: "/events"},
  // {label: "Reports", path: "/reports"},
  // {label: "Settings", path: "/settings"},
];

import darkLogo from "@/assets/img/darklogo.png";
import lightLogo from "@/assets/img/lightlogo.png";
import {asyncLogoutAdmin} from "@/redux configs/Actions/adminActions";
import {useDispatch} from "react-redux";
import {usePathname} from "next/navigation";

export default function Navbar({admin}: any) {
  const theme = "dark";
  const pathName = usePathname();
  const dispatch = useDispatch();

  const logOut = (e: any) => {
    e.preventDefault();
    try {
      const responce = dispatch(asyncLogoutAdmin());
      console.log(responce);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Card
      className="flex items-center justify-center py-5 0 sticky top-0 border-x-0 border-t-0 rounded-none z-50"
      style={{backdropFilter: "blur(20px)"}}>
      <div className="flex items-center justify-between  max-w-[85%] w-full bg-opacity-10 bg-transparent ">
        <Image
          height={100}
          width={100}
          src={lightLogo}
          alt="RS Logo"
          className="h-10 w-10"
        />
        <div className="lg:block hidden ">
          {pagesLinks.map((link, index) => {
             const isActive = pathName.endsWith(link.path);
            return (
              <Button key={index} asChild variant={isActive ? "link" : "ghost"} size="sm">
                <Link href={`/admin${link.path}`}>{link.label}</Link>
              </Button>
            );
          })}
        </div>

        <div className="flex justify-between items-center lg:gap-3">
          <Input
            placeholder="Search..."
            enterKeyHint="search"
            className="ml-5 "
          />
          {/* <SwichMode /> */}
          <Sheet>
            <SheetTrigger className="block lg:hidden ">
              <TextAlignRightIcon className="h-8 w-8" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex gap-5">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-start items-start">
                    <span>{admin ? admin.name : ""}</span>
                    <span className="text-xs opacity-50 ">
                      {admin ? admin.email : ""}
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <SheetDescription className="mb-auto flex-col flex gap-3 mt-5 justify-start items-start ">
                {pagesLinks.map((link, index) => {
                  const isActive = pathName.endsWith(link.path);
                  return (
                    <Button
                      key={index}
                      asChild
                      variant={isActive ? "link" : "ghost"}
                      className="w-full items-start justify-start">
                      <Link href={`/admin${link.path}`}>{link.label}</Link>
                    </Button>
                  );
                })}
                <Button onClick={logOut} className="text-start" variant="ghost">
                  Log Out
                </Button>
              </SheetDescription>
            </SheetContent>
          </Sheet>
          <DropdownMenu>
            <DropdownMenuTrigger className="border-none rounded-full lg:block hidden">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="flex flex-col gap-1">
                <span> {admin ? admin.name : ""}</span>
                <span className="text-xs opacity-50 ">
                  {admin ? admin.email : ""}
                </span>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={logOut}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
