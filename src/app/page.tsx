"use client";

import React, {useEffect} from "react";
import SwichMode from "@/components/swichMode";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import AdminLoginForm from "@/components/projectComponents/Forms/AdminLoginForm";
import UserLoginForm from "@/components/projectComponents/Forms/UserLoginForm";

import {useDispatch, useSelector} from "react-redux";
import {EmployeeState} from "@/redux configs/Reducers/employeeReducer";
import {useToast} from "@/components/ui/use-toast";

export default function Page() { 

  return (
    <div className="flex h-screen flex-col items-center justify-center sm:p-12  md:p-24  bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 ">
      <div className="p-1 border-0 w-auto flex items-center justify-center">
        <form action="#">
          <div className="mb-5 flex justify-between items-center">
            <h1 className="font-semibold text-3xl text-white ml-2">Login</h1>
            {/* <SwichMode /> */}
          </div>

          <Tabs defaultValue="Employee" className="w-[300px]  md:w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="Employee">Employee</TabsTrigger>
            </TabsList>
            <TabsContent value="admin">
              <div>
                <AdminLoginForm />
              </div>
            </TabsContent>
            <TabsContent value="Employee">
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
