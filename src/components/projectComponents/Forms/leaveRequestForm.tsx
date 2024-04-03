"use client";

import React from "react";
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
import {DateRange, DayPicker} from "react-day-picker";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import app from "@/utils/axios";
import dayjs from "dayjs";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
export default function LeaveReqForm({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const initialDays: Date[] = [];
  const [days, setDays] = React.useState<Date[] | undefined>(initialDays);

  let formatedDate: string[] = [];
  days?.map((date) => formatedDate.push(dayjs(date).format("YYYY-MM-DD")));

  console.log(formatedDate);
  const [data, setData] = React.useState({
    reason: "",
    date: formatedDate,
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
        <Button variant="ghost" className="w-full p-2">
          Request For Leave
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave Request</DialogTitle>
          <DialogDescription>
            <form onSubmit={sendData} className="mt-5">
              <div className="mb-5 gap-3 flex-col flex">
                <Label>Reason</Label>
                <Input
                  placeholder="Leave Reason"
                  onChange={(e) => setData({...data, reason: e.target.value})}
                  required
                />
              </div>

              <div className="mb-5 gap-3 flex flex-col">
                <Label>Select Date</Label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !days && "text-muted-foreground"
                      )}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {days ? (
                        dayjs(days[0]).format("D,MMM YYYY")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="multiple"
                      min={1}
                      selected={days}
                      onSelect={setDays}
                      fromDate={new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex gap-3">
                <DialogClose asChild>
                  <Button variant="destructive" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>

                <Button variant="default" className="w-full">
                  Send
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
