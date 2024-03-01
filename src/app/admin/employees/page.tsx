"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import {EmpListTable} from "@/components/projectComponents/Tables/EmpListTable";

import app from "@/utils/axios";
import {Button} from "@/components/ui/button";
export default function page() {
  const sendData = async () => {
    try {
      const info = {
        firstname: "Dharmendra",
        lastname: "patel",
        password: "1234567",
        email: "s@gmail.com",
        contact:'1234567890',
        joindate:'ergvre'
      };
      const data = await app.post("/api/employee/signup/", info);
      console.log(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="mr-10 py-5 w-[80%] h-full ">
      <div className="flex items-center gap-5 justify-between">
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between gap-10 items-center">
              <CardTitle>Total Employees</CardTitle>

              <PeopleOutlineOutlinedIcon className="text-2xl" />
            </div>
            <CardDescription>All Firms</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl text-primary font-bold">
            <p>07</p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between gap-10 items-center">
              <CardTitle>Present Employees</CardTitle>
              <PeopleOutlineOutlinedIcon className="text-2xl" />
            </div>
            <CardDescription>All Firms</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl text-primary font-bold">
            <p>05</p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between gap-10 items-center">
              <CardTitle>Absent Employees</CardTitle>
              <PeopleOutlineOutlinedIcon className="text-2xl" />
            </div>
            <CardDescription>All Firms</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl text-primary font-bold">
            <p>02</p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between gap-10 items-center">
              <CardTitle>New Employees</CardTitle>
              <PeopleOutlineOutlinedIcon className="text-2xl" />
            </div>
            <CardDescription>All Firms</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl text-primary font-bold">
            <p>01</p>
          </CardContent>
        </Card>
      </div>
      {/* <Button onClick={sendData}>Clik</Button> */}
      <EmpListTable />
    </div>
  );
}
