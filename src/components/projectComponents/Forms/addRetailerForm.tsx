"use client";
import dayjs from "dayjs";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {CalendarIcon, PlusIcon} from "@radix-ui/react-icons";

import {Input} from "@/components/ui/input";
import {Label} from "@radix-ui/react-label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {format} from "date-fns";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Separator} from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AddRetailerForm() {
  const [date, setDate] = React.useState<Date>();
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" className="ml-auto">
          Add Retailer <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[250%]">
        <DialogHeader>
          <DialogTitle>Add New Retaile</DialogTitle>{" "}
        </DialogHeader>
        <ScrollArea className="h-[80dvh] w-full rounded-md border px-4">
        <DialogDescription>
          <form action="#" className="mt-5">
            <div className="mb-5">
              <Label>Name</Label>
              <Input placeholder="Retaile's Name" required />
            </div>
            <div className="mb-5">
              <Label>Profile</Label>
              <Input type="file" placeholder="Retaile's Profile " required />
            </div>
            <div className="mb-5">
              <Label>Email</Label>
              <Input placeholder="Retaile's Email" required />
            </div>
            <div className="mb-5">
              <Label>Mobile No</Label>
              <Input placeholder="Retaile's Mobile No" required />
            </div>
            <div className="mb-5 flex flex-col">
              <Label>Date Of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      dayjs(date).format("DD MMM,YYYY")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="mb-5">
              <Label>Age</Label>
              <Input placeholder="Retaile's Age" required />
            </div>
            <div className="mb-5">
              <Label>Gender</Label>
              <RadioGroup defaultValue="none">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">Female</Label>
                </div>
              </RadioGroup>
            </div>
            {/* <Separator/> */}
            <h3 className="font-bold text-lg my-15"> Retailer Address</h3>
            <div className="mb-5">
              <Label>Address</Label>
              <Input placeholder="Retaile's Address" required />
            </div>
            <div className="mb-5">
              <Label>City</Label>
              <Input placeholder="Retaile's City" required />
            </div>
            <div className="mb-5">
              <Label>District</Label>
              <Input placeholder="Retaile's District" required />
            </div>
            <div className="mb-5">
              <Label>State</Label>
              <Input placeholder="Retaile's State" required />
            </div>
            <div className="mb-5">
              <Label>Pin Code</Label>
              <Input placeholder="Retaile's Pin Code" required />
            </div>
            <h3 className="font-bold text-lg my-15">Firm Address</h3>
            <div className="mb-5">
              <Label>Address</Label>
              <Input placeholder="Firm Address" required />
            </div>
            <div className="mb-5">
              <Label>City</Label>
              <Input placeholder="Firm City" required />
            </div>
            <div className="mb-5">
              <Label>District</Label>
              <Input placeholder="Firm District" required />
            </div>
            <div className="mb-5">
              <Label>State</Label>
              <Input placeholder="Firm State" required />
            </div>
            <div className="mb-5">
              <Label>Pin Code</Label>
              <Input placeholder="Firm Pin Code" required />
            </div>

            <div className="flex gap-5">
              <Button variant="destructive" className="w-full">
                Cancel
              </Button>
              <Button variant="default" className="w-full">
                Add
              </Button>
            </div>
          </form>
        </DialogDescription></ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
