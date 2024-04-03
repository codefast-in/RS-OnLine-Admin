"use client";

import {Calendar} from "@/components/ui/calendar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {Separator} from "@/components/ui/separator";
import {TargetIcon} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import app from "@/utils/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function Page({params}: any) {
  const [employee, setEmployeeData] = useState<any>();

  const getData = async () => {
    try {
      const apiID = params.empProfile;
      const responce = await app.get(`/api/admin/oneemployee/${apiID}`);
      setEmployeeData(responce.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(employee);
  useEffect(() => {
    getData();
  }, []);

  let totalIncome = 0;
  employee &&
    employee.services.map((value: any, index: number) => {
      totalIncome = totalIncome + +value.rsprice;
    });
  const amount = parseFloat(totalIncome.toPrecision());
  // Format the amount as a dollar amount
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);

  const cardData = [
    {cardtitle: "Totale Income", value: formatted},
    {cardtitle: "Complited Tasks", value: employee && employee.tasks.length},
    {cardtitle: "Leaves", value: employee && employee.attendance.leaves.length},
  ];

  const absentDays: Array<Date> = [];
  employee &&
    employee.attendance.leaves.map((date: string) =>
      absentDays.push(dayjs(date).toDate())
    );
  const absentStyle = {
    backgroundColor: "#ff0a0a",
    color: "#fff",
    borderRadius: "50px",
  };
  const halfDays: Array<Date> = [];
  employee &&
    employee.attendance.halfdays.map((date: string) =>
      halfDays.push(dayjs(date).toDate())
    );
  const halfDaysStyle = {
    backgroundColor: "#f4d134",
    color: "#000",
    borderRadius: "50px",
  };
  const holyDays: Array<Date> = [];
  employee &&
    employee.attendance.holidays.map((date: string) =>
      holyDays.push(dayjs(date).toDate())
    );
  const holyDaysStyle = {
    backgroundColor: "#f57200",
    color: "#fff",
    borderRadius: "50px",
  };

  const presentDays: Array<Date> = [];
  employee &&
    employee.attendance.presents.map((date: string) =>
      presentDays.push(dayjs(date).toDate())
    );

  const presentDaysStyle = {
    backgroundColor: "#2eb800",
    color: "#fff",
    borderRadius: "50px",
  };

  return (
    <Card className="my-3 mx-28 w-full">
      <CardHeader>
        <CardTitle>Employee Details</CardTitle>
        <CardDescription>
          View Full Details Of
          <span className="capitalize"> {employee ? employee.name : ""}</span>
        </CardDescription>
      </CardHeader>
      <div>
        <CardContent className="flex items-start  gap-5">
          <Image
            src={employee ? employee.avatar.url : ""}
            alt="employee name"
            width={1000}
            height={1000}
            className="rounded-full w-28 h-28"
          />
          <div>
            <div className="flex justify-start items-center  gap-2">
              <span className="font-semibold text-sm  min-w-[30%]">Name :</span>
              <span className="capitalize">
                {employee ? employee.name : ""}
              </span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-sm  min-w-[30%]">
                Email :
              </span>
              <Link href="mailto:sachinspindofficial@gmail.com">
                {employee ? employee.email : ""}
              </Link>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-sm  min-w-[30%]">
                Mobile :
              </span>
              <Link href="tel:9516905325">
                {employee ? employee.contact : ""}
              </Link>
            </div>

            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-sm  min-w-[30%]">Role :</span>
              <span className="capitalize">
                {employee ? employee.role : ""}
              </span>
            </div>

            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-sm  min-w-[30%]">
                Login @ :
              </span>
              <span>
                {employee
                  ? dayjs(
                      employee.logs[employee.logs.length - 1].logintime
                    ).get("hours") +
                    ":" +
                    dayjs(
                      employee.logs[employee.logs.length - 1].logintime
                    ).get("minutes")
                  : ""}
              </span>
            </div>
          </div>
        </CardContent>
      </div>
      <Separator />
      <CardHeader className="pb-2 flex flex-row justify-between">
        <div>
          <CardTitle>Work Details</CardTitle>
          <CardDescription>All tasks and work details</CardDescription>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <div className="mt-2 p-0">
        <CardContent className="flex items-center gap-5 justify-between   pb-0">
          {cardData.map((card, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <div className="flex justify-between gap-10 items-center">
                  <CardTitle>{card.cardtitle}</CardTitle>

                  <TargetIcon className="text-2xl" />
                </div>
                {/* <CardDescription>This Month</CardDescription> */}
              </CardHeader>
              <CardContent className="text-2xl text-primary font-bold">
                <p>{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
        <CardHeader className="pb-2">
          <CardTitle className="my-3">Attendance</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-start items-start">
          <Card className="w-full">
            <Calendar
              className="w-full px-10"
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
          </Card>
        </CardContent>
      </div>

      {/* <div className="mt-5 p-0">
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
    </div> */}
    </Card>
  );
}

export default Page;
