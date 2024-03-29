"use client";

import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";

import {DayClickEventHandler, DayPicker} from "react-day-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {TargetIcon} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import app from "@/utils/axios";

const empPr = require("@/assets/img/profilepic1.jpg");
const cardData = [
  {cardtitle: "Totale Income", value: 52},
  {cardtitle: "Complited Tasks", value: 30},
  {cardtitle: "Leaves", value: 7},
];

const absentDays = [dayjs("2024-03-15").toDate(), dayjs("2024-03-10").toDate()];
const absentStyle = {backgroundColor: "#ff0a0a", color: "#fff"};
const halfDays = [dayjs("2024-03-05").toDate(), dayjs("2024-03-01").toDate()];
const halfDaysStyle = {backgroundColor: "#f4d134", color: "#000"};
const holyDays = [dayjs("2024-03-12").toDate(), dayjs("2024-03-14").toDate()];
const holyDaysStyle = {backgroundColor: "#f57200", color: "#fff"};
const presentDays = [dayjs("2024-3-25").toDate(), dayjs("2024-3-20").toDate()];
const presentDaysStyle = {backgroundColor: "#2eb800", color: "#fff"};

function Page({params}: any) {
  
  const [employeeData, setEmployeeData] = useState(null);
  
  const initialDays: Date[] = [
    dayjs("2024-03-25").toDate(),
    dayjs("2024-03-20").toDate(),
  ];
  const [days, setDays] = React.useState<Date[] | undefined>(initialDays);
  // console.log(days);
  
  const getData = async () => {
    try {
     const apiID = params.empProfile
      const responce = await app.get(`/api/admin/oneemployee/${apiID}`);
      setEmployeeData(responce.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(employeeData);
  useEffect(() => {
    getData();
  }, []);

  return (
    <Card className="mt-5 w-[80%]">
      <CardHeader>
        <CardTitle>Employee Details</CardTitle>
        <CardDescription>View Full Details Of Employee Name</CardDescription>
      </CardHeader>
      <div>
        <CardContent className="flex items-center gap-20">
          <Image
            src={empPr}
            alt="employee name"
            width={1000}
            height={1000}
            className="rounded-full w-28 h-28"
          />
          <div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-lg  min-w-[30%]">Name :</span>
              <span> Sachin Pawar</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-lg  min-w-[30%]">
                Email :
              </span>
              <Link href="mailto:sachinspindofficial@gmail.com">
                sachinspindofficial@gmail.com
              </Link>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-lg  min-w-[30%]">
                Mobile :
              </span>
              <Link href="tel:9516905325">9516905325</Link>
            </div>
          </div>
          <div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-lg  min-w-[30%]">Roll :</span>
              <span>Team Lead</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-lg  min-w-[30%]">
                Status :
              </span>
              <span className="text-green-500">Active</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-lg  min-w-[30%]">
                Login @ :
              </span>
              <span>10:24 AM</span>
            </div>
          </div>
        </CardContent>
      </div>
      <Separator />
      <CardHeader>
        <CardTitle>Work Details</CardTitle>
        <CardDescription>All tasks and work details</CardDescription>
      </CardHeader>
      <div className="mt-5 p-0">
        <CardContent className="flex items-center gap-5 justify-between">
          {cardData.map((card, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <div className="flex justify-between gap-10 items-center">
                  <CardTitle>{card.cardtitle}</CardTitle>

                  <TargetIcon className="text-2xl" />
                </div>
                <CardDescription>This Month</CardDescription>
              </CardHeader>
              <CardContent className="text-2xl text-primary font-bold">
                <p>{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
        <CardContent className="flex flex-col justify-start items-start">
          <CardTitle className="my-3">Absent Days</CardTitle>

          <Calendar
            mode="multiple"
            min={1}
            fromYear={2015}
            toYear={dayjs("2024-03-25").year()}
            modifiers={{
              absent: absentDays,
              halfDays: halfDays,
              holyDays: holyDays,
              presentDays: presentDays,
            }}
            modifiersStyles={{
              absent: absentStyle,
              halfDays: halfDaysStyle,
              holyDays: holyDaysStyle,
              presentDays: presentDaysStyle,
            }}
          />
        </CardContent>
      </div>

      <div className="mt-5 p-0">
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Send Notification</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Notification Details</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col justify-start items-start  gap-4">
                  <Label htmlFor="name" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="name"
                    placeholder="Notification Title"
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col justify-start items-start  gap-4">
                  <Label htmlFor="name" className="text-right">
                    Descreption
                  </Label>
                  <Input
                    id="name"
                    placeholder="Notification Descreption"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Send</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </div>
    </Card>
  );
}

export default Page;
