"use client";

import React, {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
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
import {useToast} from "@/components/ui/use-toast";
export default function AddIncomeForm({first, setfirst}: any) {
  const Toast = useToast();
  const [data, setData] = React.useState({
    title: "",
    mrp: "",
    rsprice: "",
    status: "",
   
    contact: "",
  });

  const sendData = async (e: any) => {
    e.preventDefault();
    const info = data;

    try {
      console.log(info)
      const responce = await app.post("/api/employee/addincome/", info);
      console.log(responce.data);
      Toast.toast({
        variant: "success",
        title: "Income Added Successfully",
      });
      setfirst(first + 1);
    } catch (error: any) {
      console.log(error.message);
      Toast.toast({
        variant: "destructive",
        title: error.message,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" className="ml-auto">
          Add Income <PlusIcon className="ml-2 h-4 w-4" />
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
                  onChange={(e) => setData({...data, title: e.target.value})}
                  required
                />
              </div>
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Status</Label>

                <Select
                  onValueChange={(e) => setData({...data, status: e})}
                  required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    {/* <SelectItem value="return">Return</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>MRP</Label>
                <Input
                  type="number"
                  placeholder="00.0"
                  onChange={(e) => setData({...data, mrp: e.target.value})}
                  required
                />
              </div>
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>RS Price</Label>
                <Input
                  type="number"
                  placeholder="00.0"
                  onChange={(e) => setData({...data, rsprice: e.target.value})}
                  required
                />
              </div>
             
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Customer Mobile No.</Label>
                <Input
                  type="number"
                  placeholder="Mobile No."
                  onChange={(e) =>
                    setData({...data, contact: e.target.value})
                  }
                  required
                />
              </div>

              <div className="flex gap-3">
                <DialogClose asChild>
                  <Button variant="destructive" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
                <Button variant="default" type="submit" className="w-full">
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
