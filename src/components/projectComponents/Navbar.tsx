import React from "react";
import Link from "next/link";

// shadCN components
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
import { useTheme } from "next-themes";
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
const logo = require("../../assets/img/logo-icon.png");
const darkLogo = require("../../assets/img/darklogo.png");
const lightLogo = require("../../assets/img/lightlogo.png");
export default function Navbar() {
  const theme = "dark"
  return (
    <Card className="flex items-center justify-center py-5 sticky top-0 border-x-0 border-t-0 rounded-none ">
      <div className=" flex items-center justify-around gap-32 max-w-[90%]">
        <Image
          height={100}
          width={100}
          src={theme == "dark" ? darkLogo : lightLogo}
          alt="RS Logo"
          className="h-10 w-10"
        />
        <div>
          {pagesLinks.map((link, index) => (
            <Button key={index} asChild variant="ghost" size="sm">
              <Link href={`/admin${link.path}`}>{link.label}</Link>
            </Button>
          ))}
        </div>

        <div className="flex justify-between items-center gap-3">
          <Input placeholder="Search..." enterKeyHint="search" />
          <SwichMode />
          <DropdownMenu>
            <DropdownMenuTrigger className="border-none rounded-full">
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

              <DropdownMenuItem>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
