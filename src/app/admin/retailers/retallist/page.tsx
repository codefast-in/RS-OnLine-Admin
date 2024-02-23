"use client";
import axios from "axios";
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
const empPr = require("@/assets/img/profilepic1.jpg");
import {ScrollArea} from "@/components/ui/scroll-area";
import AddRetailerForm from "@/components/projectComponents/Forms/addRetailerForm";

const data = [
  {
    name: "Retailr",
    frimName: "RS Online",
    email: "sachinspindofficial@gmail.com",
    mobileNo: "9516905325",
  },
];

function page() {
  const [data, setProducts] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const response = await axios.get("https://dummyjson.com/users");
      setProducts(response.data.users);
    })();
  }, []);

  return (
    <div className="mr-10  w-[80%] h-full ">
      <div className="flex justify-between items-center my-3">
        <CardTitle className="text-xl">Rretailers</CardTitle>
        <AddRetailerForm/>
      </div>

      <div className="h-[80dvh] w-full grid grid-cols-3 overflow-y-auto border p-2 rounded-md gap-5">
        {data.map((retaler: any, index: number) => (
          <Card key={index} >
            <CardContent className="flex items-center justify-around gap-10 p-6 min-w-fit">
              <Image
                src={retaler.image}
                alt="employee name"
                width={1000}
                height={1000}
                className="rounded-full w-28 h-28"
              />
              <div className=" min-w-fit overflow-clip">
                <div className="flex justify-start items-center gap-2 ">
                  <span className="font-semibold text-lg  min-w-[30%]">
                    Name :
                  </span>
                  <span>{retaler.firstName.concat(retaler.lastname)}</span>
                </div>
                <div className="flex justify-start items-center gap-2 ">
                  <span className="font-semibold text-lg  min-w-[30%]">
                    Firm Name :
                  </span>
                  <span> {retaler.domain}</span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <span className="font-semibold text-lg  min-w-[30%]">
                    Email :
                  </span>
                  <Link href={`mailto:${retaler.email}`}>{retaler.email}</Link>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <span className="font-semibold text-lg  min-w-[30%]">
                    Mobile :
                  </span>
                  <Link href={`tel:${retaler.phone}`}>{retaler.phone}</Link>
                </div>
              </div>
            </CardContent>
            <CardContent className="flex justify-between gap-5">
              <Notification />
              <Button variant="default" className="w-full">
                <Link href={`/admin/retailers/retallist/${retaler.id}`}>
                  View Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default page;

const Notification = () => (
  <Dialog>
    <DialogTrigger asChild className="w-full">
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
);
