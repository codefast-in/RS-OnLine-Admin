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
export default function EditIncomeForm({
  first,
  setfirst,
  title,
  mrp,
  rsprice,
  status,
  id,
}: any) {
  const Toast = useToast();

  const [data, setData] = React.useState({
    title: title,
    mrp: mrp,
    rsprice: rsprice,
    status: status,
    id: id,
  });

  const sendData = async (e: any) => {
    e.preventDefault();
    const info = data;

    try {
      const responce = await app.post("/api/employee/addincom/", info);
      console.log(responce.data);
      Toast.toast({
        variant: "success",
        title: "Income Edited Successfully",
      });
      setfirst(first + 1);
    } catch (error: any) {
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
                  required
                />
              </div>
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Status</Label>

                <Select
                  defaultValue={status}
                  onValueChange={(e) => setData({...data, status: e})}
                  required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>MRP</Label>
                <Input
                  type="number"
                  placeholder={mrp}
                  onChange={(e) => setData({...data, mrp: e.target.value})}
                  required
                />
              </div>
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>RS Price</Label>
                <Input
                  type="number"
                  placeholder={rsprice}
                  onChange={(e) => setData({...data, rsprice: e.target.value})}
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
