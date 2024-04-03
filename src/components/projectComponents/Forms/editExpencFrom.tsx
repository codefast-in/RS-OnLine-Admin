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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Pencil1Icon} from "@radix-ui/react-icons";

import {Input} from "@/components/ui/input";
import {Label} from "@radix-ui/react-label";

import {Button} from "@/components/ui/button";

import app from "@/utils/axios";
import {useToast} from "@/components/ui/use-toast";
export default function EditExpenceForm({
  first,
  setfirst,
  title,
  amount,
  status,
  id,
  customername,
  customercontact,
}: any) {
  const Toast = useToast();

  const [data, setData] = React.useState({
    title: title,
    amount: amount,
    status: status,
    id: id,
    customername: customername,
    customercontact: customercontact,
  });

  const sendData = async (e: any) => {
    e.preventDefault();

    try {
      const info = data;
      console.log(info);
      const responce = await app.post(
        `/api/employee/updateincome/${info.id}`,
        info
      );
      console.log(responce);
      Toast.toast({
        variant: "success",
        title: "Income Edited Successfully",
      });
      setfirst(first + 1);
    } catch (error: any) {
      Toast.toast({
        variant: "destructive",
        title: error.message,
      });
      console.log(error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Pencil1Icon className="h-5 w-5" />
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
                  placeholder={title}
                  onChange={(e) => setData({...data, title: e.target.value})}
                  contentEditable={true}
                />
              </div>
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Status</Label>

                <Select
                  defaultValue={status}
                  onValueChange={(e) => setData({...data, status: e})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="return">Return</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>MRP</Label>
                <Input
                  type="number"
                  placeholder={amount}
                  onChange={(e) => setData({...data, amount: e.target.value})}
                />
              </div>

              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Customer Name</Label>
                <Input
                  type="text"
                  placeholder="00.0"
                  onChange={(e) =>
                    setData({...data, customername: e.target.value})
                  }
                  required
                />
              </div>
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Customer Mobile No.</Label>
                <Input
                  type="number"
                  placeholder="00.0"
                  onChange={(e) =>
                    setData({...data, customercontact: e.target.value})
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
                  Save
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
