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
  {label: "Products", path: "/products"},
  {label: "Retailers", path: "/retailers"},
  {label: "Customers", path: "/customers"},
  {label: "Employees", path: "/employees"},
  {label: "Accounts", path: "/accounts"},
  {label: "Reports", path: "/reports"},
  {label: "Settings", path: "/settings"},
];

import darkLogo from "@/assets/img/darklogo.png";
import lightLogo from "@/assets/img/lightlogo.png";

export default function Navbar() {
  const theme = "dark";
  return (
    <Card
      className="flex items-center justify-center py-5 sticky top-0 border-x-0 border-t-0 rounded-none "
      style={{backdropFilter: "blur(20px)"}}>
      <div className="flex items-center justify-between  max-w-[90%] w-full bg-opacity-10 bg-transparent ">
        <Image
          height={100}
          width={100}
          src={theme == "dark" ? lightLogo : darkLogo}
          alt="RS Logo"
          className="h-10 w-10"
        />
        <div className="lg:block hidden ">
          {pagesLinks.map((link, index) => (
            <Button key={index} asChild variant="ghost" size="sm">
              <Link href={`/admin${link.path}`}>{link.label}</Link>
            </Button>
          ))}
        </div>

        <div className="flex justify-between items-center lg:gap-3">
          <Input
            placeholder="Search..."
            enterKeyHint="search"
            className="ml-5 "
          />
          <SwichMode />
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
                    <span>Sachin Pawar</span>
                    <span className="text-xs opacity-50 ">
                      sachinspind@gmail.com
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <SheetDescription className="mb-auto flex-col flex gap-3 mt-5 justify-start items-center ">
                {pagesLinks.map((link, index) => (
                  <Button key={index} asChild variant="ghost" size="sm">
                    <Link href={`/admin${link.path}`}>{link.label}</Link>
                  </Button>
                ))}
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
                <span>Supyar Meena</span>
                <span className="text-xs opacity-50 ">
                  supyarmeena11@gmail.com
                </span>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/">Log Out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
