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

import {addDays, format} from "date-fns";
import {DateRange} from "react-day-picker";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import app from "@/utils/axios";
export default function AddTaskForm({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const [data, setData] = React.useState({
    title: "",
    discreption: "",
    team: "",
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
          Asign Task <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asign New Task</DialogTitle>
          <DialogDescription>
            <form onSubmit={sendData} className="mt-5">
              <div className="mb-5 gap-3 flex-col flex">
                <Label>Title</Label>
                <Input placeholder="Task Title" onChange={(e) => setData({...data, title: e.target.value})} required />
              </div>

              <div className="mb-5 gap-3 flex flex-col">
                <Label>Discreption</Label>
                <Input placeholder="Task Discreption" onChange={(e) => setData({...data, discreption: e.target.value})} required />
              </div>

              <div className="mb-5 gap-3 flex flex-col">
                <Label>Select Date</Label>
                <div className={cn("grid gap-2", className)}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(e) => {
                          setData({...data, date: e});
                          setDate(e);
                        }}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="mb-5 gap-3 flex flex-col">
                <Label>Select Employee</Label>

                <Select onValueChange={(e)=> setData({...data, team:e})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Sachin</SelectItem>
                    <SelectItem value="head">Manish</SelectItem>
                    <SelectItem value="manager">Sandip</SelectItem>
                    <SelectItem value="new">Aman</SelectItem>
                  </SelectContent>
                </Select>
                {/* <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Team Member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Sachin</SelectItem>
                    <SelectItem value="head">Manish</SelectItem>
                    <SelectItem value="manager">Sandip</SelectItem>
                    <SelectItem value="new">Aman</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>
              <div className="flex gap-3">
                <Button variant="destructive" className="w-full">
                  Cancel
                </Button>
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
