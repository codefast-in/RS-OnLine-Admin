"use client";

import React, {useState} from "react";
import SwichMode from "@/components/swichMode";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
  ArrowRightIcon,
  EyeClosedIcon,
  EyeNoneIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function page() {
  const [visible, setVisible] = useState(false);

  const changType = () => {
    setVisible(!visible);
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center sm:p-12  md:p-24">
      <div className="p-1 border-0 w-auto flex items-center justify-center">
        <form action="#">
          <div className="mb-5 flex justify-between items-center">
            <h1 className="font-semibold text-3xl  ml-2">Login</h1>
            <SwichMode />
          </div>

          <Tabs defaultValue="account" className="w-[300px]  md:w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Admin</TabsTrigger>
              <TabsTrigger value="password">User</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Wellcome Again...</CardTitle>
                  <CardDescription>
                    Enter Your user id or email then enter your password then
                    login with your profile.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">User id /Email</Label>
                    <Input id="name" placeholder="example@mail.com" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Password</Label>
                    <div className="relative w-full">
                      <Input
                        id="username"
                        type={visible ? "text" : "password"}
                        placeholder="Your PassWord"
                        className="pr-12 pl-4"
                      />
                      {visible ? (
                        <EyeOpenIcon
                          onClick={changType}
                          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500  right-3"
                        />
                      ) : (
                        <EyeClosedIcon
                          onClick={changType}
                          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500  right-3"
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <div>
                      <Link href="/admin">Login</Link>
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </div>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Wellcome To <br />
                    RS Online Services
                  </CardTitle>
                  <CardDescription>
                    Enter Your employee id then enter your password then login
                    with your profile.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Employee Id</Label>
                    <Input id="name" placeholder="example@mail.com" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Password</Label>
                    <div className="relative w-full">
                      <Input
                        id="username"
                        type={visible ? "text" : "password"}
                        placeholder="Your PassWord"
                        className="pr-12 pl-4"
                      />
                      {visible ? (
                        <EyeOpenIcon
                          onClick={changType}
                          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500  right-3"
                        />
                      ) : (
                        <EyeClosedIcon
                          onClick={changType}
                          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500  right-3"
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <div>
                      <Link href="/user">Login</Link>
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </div>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </main>
  );
}

