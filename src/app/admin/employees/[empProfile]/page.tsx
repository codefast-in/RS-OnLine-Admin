"use client";

import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {DayPicker} from "react-day-picker";
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
import React from "react";
import dayjs from "dayjs";

const empPr = require("@/assets/img/profilepic1.jpg");
const cardData = [
  {cardtitle: "Totale Income", value: 52},
  {cardtitle: "Complited Tasks", value: 30},
  {cardtitle: "Leaves", value: 7},
  //   {cardtitle: "Ongoing Tasks", value: 15},
];

function page({props}: any) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedDay, setSelectedDay] = React.useState<Date>();
  const handleDayClick = (day: Date) => setSelectedDay(day);
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
          <CardTitle className="my-3">
            Absent Days
          </CardTitle>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
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

export default page;
