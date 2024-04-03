"use client";

import React, {useState} from "react";
import {
  Dialog,
  DialogClose,
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
import {useToast} from "@/components/ui/use-toast";
import dayjs from "dayjs";
export default function AddTaskForm({employessData, className}: any) {
  const [startDate, setstartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();

  const Toast = useToast();
  console.log();
  const [data, setData] = React.useState({
    title: "",
    description: "",
    employee: "",
    startdate: "",
    enddate: "",
  });

  
  const sendData = async (e: any) => {
    e.preventDefault();
    data.enddate = dayjs(endDate).format("YYYY-MM-DD");
    data.startdate = dayjs(startDate).format("YYYY-MM-DD");
    console.log(data);
    
    

    const info = data;
    try {
      const responce = await app.post(`/api/admin/task/${info.employee}`, info);
      console.log(responce.data.message);
      Toast.toast({
        variant: "success",
        title: responce.data.message,
      });
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
                <Input
                  placeholder="Task Title"
                  onChange={(e) => setData({...data, title: e.target.value})}
                  required
                />
              </div>

              <div className="mb-5 gap-3 flex flex-col">
                <Label>Discreption</Label>
                <Input
                  placeholder="Task Discreption"
                  onChange={(e) =>
                    setData({...data, description: e.target.value})
                  }
                  required
                />
              </div>

              <div className="mb-5 gap-3 flex flex-col">
                <Label>Start Date</Label>
                <div className={cn("grid gap-2", className)}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? (
                          format(startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setstartDate}
                        fromDate={new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="mb-5 gap-3 flex flex-col">
                <Label>End Date</Label>
                <div className={cn("grid gap-2", className)}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? (
                          format(endDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="mb-5 gap-3 flex flex-col">
                <Label>Select Employee</Label>

                <Select onValueChange={(e) => setData({...data, employee: e})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employessData.map((emp: any, index: number) => (
                      <SelectItem
                        value={emp._id}
                        key={index}
                        className="capitalize">
                        {emp.name}
                      </SelectItem>
                    ))}
                    {/* <SelectItem value="head">Manish</SelectItem>
                    <SelectItem value="manager">Sandip</SelectItem>
                    <SelectItem value="new">Aman</SelectItem> */}
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
