"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {PlusIcon} from "@radix-ui/react-icons";

import {Input} from "@/components/ui/input";
import {Label} from "@radix-ui/react-label";

import {addDays, format} from "date-fns";
import {DateRange} from "react-day-picker";

import {Button} from "@/components/ui/button";

import app from "@/utils/axios";
export default function AddIncomeForm({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [data, setData] = React.useState({
    productname: "",
    mrp: "",
    rsprice: "",
    status: "",
    date: new Date(),
  });

  const sendData = async (e: any) => {
    e.preventDefault();
    const info = data;
    try {
      const responce = await app.post("/api/employee/signup/", info);
      console.log(responce);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" className="ml-auto">
          Add New Income <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Income Details</DialogTitle>
          <DialogDescription>
            <form onSubmit={sendData} className="mt-5">
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Product Name</Label>
                <Input
                  placeholder="Name"
                  onChange={(e) =>
                    setData({...data, productname: e.target.value})
                  }
                  required
                />
              </div>

              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>MRP</Label>
                <Input
                  placeholder="00.0"
                  onChange={(e) => setData({...data, mrp: e.target.value})}
                  required
                />
              </div>
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>RS Price</Label>
                <Input
                  placeholder="00.0"
                  onChange={(e) => setData({...data, rsprice: e.target.value})}
                  required
                />
              </div>
           

              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Status</Label>

                <Select onValueChange={(e) => setData({...data, status: e})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Pending</SelectItem>
                    <SelectItem value="head">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3">
              <DialogClose asChild>
                  <Button variant="destructive" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
                <Button variant="default" className="w-full">
                  Add
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
