"use client";

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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {Card} from "../ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "../ui/button";
import {Input} from "@/components/ui/input";

// self made components
import SwichMode from "../swichMode";
import Image from "next/image";
import {
  AlignRightIcon,
  BellIcon,
  LayersIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";

import {useDispatch} from "react-redux";

import {asyncLogoutEmployee} from "@/redux configs/Actions/employeeAction";
// import LeaveReqForm from "./Forms/leaveRequestForm";

// Data
const pagesLinks = [
  {label: "Dashboard", path: "user/"},
  {label: "Tasks", path: "user/tasks"},
  {label: "Notifications", path: "user/notifications"},
  {label: "Employees", path: "user/employees"},
  {label: "Accounts", path: "user/accounts"},
  {label: "Reports", path: "user/reports"},
  {label: "Settings", path: "user/settings"},
];

const darkLogo = require("../../assets/img/darklogo.png");
const lightLogo = require("../../assets/img/lightlogo.png");

export default function UserNavbar(parms: any) {
  const theme = "dark";
  const dispatch = useDispatch();
  let user = parms.employee.employee;
  // console.log(user.avatar)

  const logOut = (e: any) => {
    e.preventDefault();
    try {
      const responce = dispatch(asyncLogoutEmployee());
      console.log(responce);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Card
      className="flex items-center justify-center py-3 md:py-5 sticky top-0 border-x-0 border-t-0 rounded-none z-10 bg-transparent bg-clip-padding"
      style={{backdropFilter: "blur(20px)"}}>
      <div className=" flex items-center justify-between gap-32 max-w-[90%] w-full bg-opacity-10 bg-transparent ">
        <Link href="/user">
          <Image
            height={100}
            width={100}
            src={theme === "dark" ? lightLogo : darkLogo}
            alt="RS Logo"
            className="h-10 w-10"
          />
        </Link>

        {/* <div>
          {pagesLinks.map((link, index) => (
            <Button key={index} asChild variant="ghost">
              <Link href={link.path}>{link.label}</Link>
            </Button>
          ))}
        </div> */}
        <div className="flex justify-end items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="border-none rounded-full block md:hidden ">
              <Button variant="ghost">
                <BellIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="flex flex-col gap-1">
                <span>Notifications</span>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem>Notifications 1</DropdownMenuItem>

              <DropdownMenuItem>Notifications 2 </DropdownMenuItem>
              <DropdownMenuItem>Notifications 3 </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>Mark as readed </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet>
            <SheetTrigger className="block md:hidden ">
              <TextAlignRightIcon className="h-8 w-8" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex gap-5">
                  <Avatar>
                    <AvatarImage src={user ? user.avatar.url : ""} />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-start items-start">
                    <span className="text-black">{user ? user.name : ""}</span>
                    <span className="text-xs opacity-50 ">
                      {user ? user.email : ""}
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <SheetDescription className="mb-auto flex-col flex gap-3 mt-5 ">
                <Button variant="ghost" asChild>
                  <Link href="/user/profile">Profile</Link>
                </Button>
                {/* <LeaveReqForm /> */}
                {/* <Link href="/user/editprofile">Edit Profile</Link> */}
                {/* <Link href="/user/setting">Setting</Link> */}
                <Button onClick={logOut} variant="ghost">
                  Log Out
                </Button>
              </SheetDescription>
            </SheetContent>
          </Sheet>
        </div>
        <div className="md:flex justify-between items-center gap-3 ml-auto hidden ">
          <Input placeholder="Search..." enterKeyHint="search" />
          <SwichMode />
          <DropdownMenu>
            <DropdownMenuTrigger className="border-none rounded-full">
              <Button variant="ghost">
                <BellIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="flex flex-col gap-1">
                <span>Notifications</span>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem>Notifications 1</DropdownMenuItem>

              <DropdownMenuItem>Notifications 2 </DropdownMenuItem>
              <DropdownMenuItem>Notifications 3 </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>Mark as readed </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="border-none rounded-full">
              <Avatar>
                <AvatarImage src={user ? user.avatar.url : ""} />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="flex flex-col gap-1">
                <span>{user ? user.name : ""}</span>
                <span className="text-xs opacity-50 ">
                  {user ? user.email : ""}
                </span>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/user/profile">Profile</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>Edit Profile</DropdownMenuItem> */}
                {/* <LeaveReqForm />  */}
            
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={logOut}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
