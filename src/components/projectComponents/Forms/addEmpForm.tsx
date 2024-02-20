"use client";

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

export default function AddEmpForm() {
  const [date, setDate] = React.useState<Date>();
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" className="ml-auto">
          Add Employee <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>
            <form action="#" className="mt-5">
              <div className="mb-5">
                <Label>Name</Label>
                <Input placeholder="Employee's Name" required />
              </div>
              <div className="mb-5">
                <Label>Email</Label>
                <Input placeholder="Employee's Email" required />
              </div>
              <div className="mb-5">
                <Label>Mobile No</Label>
                <Input placeholder="Employee's Mobile No" required />
              </div>
              <div className="mb-5">
                <Label>Age</Label>
                <Input placeholder="Employee's Age" required />
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
              <div className="mb-5 flex flex-col">
                <Label>Joining Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
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

              <div className="mb-5 flex flex-col">
                <Label>Roll</Label>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="head">Head</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="new">New Intern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-5">
                <Button variant="destructive" className="w-full" >Cancel</Button>
                <Button variant="default" className="w-full"  >Add</Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
