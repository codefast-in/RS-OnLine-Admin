"use client";

import React from "react";
import SwichMode from "@/components/swichMode";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import AdminLoginForm from "@/components/projectComponents/Forms/AdminLoginForm";
import UserLoginForm from "@/components/projectComponents/Forms/UserLoginForm";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center sm:p-12  md:p-24 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] animate-shimmer">
      <div className="p-1 border-0 w-auto flex items-center justify-center">
        <form action="#">
          <div className="mb-5 flex justify-between items-center">
            <h1 className="font-semibold text-3xl  ml-2">Login</h1>
            <SwichMode />
          </div>

          <Tabs defaultValue="admin" className="w-[300px]  md:w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="user">User</TabsTrigger>
            </TabsList>
            <TabsContent value="admin">
              <div>
                <AdminLoginForm />
              </div>
            </TabsContent>
            <TabsContent value="user">
              <div>
                <UserLoginForm />
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </div>
  );
}
