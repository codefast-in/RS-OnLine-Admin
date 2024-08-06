"use client";

import React from "react";
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
import {PlusIcon} from "@radix-ui/react-icons";

import {Input} from "@/components/ui/input";
import {Label} from "@radix-ui/react-label";

import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";

import app from "@/utils/axios";
export default function AddExpencForm({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [data, setData] = React.useState({
    title: "",
    description: "",
    amount: "",
    status: "",
  });
  const Toast = useToast();
  const sendData = async (e: any) => {
    e.preventDefault();
    const info = data;
    try {
      const responce = await app.post("/api/employee/addexpense/", info);
      console.log(responce);
      Toast.toast({
        variant: "success",
        title: "Expence Added Successfully",
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
    <Dialog >
      <DialogTrigger>
        <Button variant="default" className="ml-auto">
          Add Expencese <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] ">
        <DialogHeader>
          <DialogTitle>Expencese Details</DialogTitle>
          <DialogDescription>
            <form onSubmit={sendData} className="mt-5">
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Title</Label>
                <Input
                  placeholder="Expencese Type"
                  onChange={(e) => setData({...data, title: e.target.value})}
                  required
                />
              </div>

              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Discreption</Label>
                <Input
                  placeholder="Expencese Discreption"
                  onChange={(e) =>
                    setData({...data, description: e.target.value})
                  }
                  required
                />
              </div>
              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Amount</Label>
                <Input
                  type="number"
                  placeholder="00.0"
                  onChange={(e) => setData({...data, amount: e.target.value})}
                  required
                />
              </div>

              {/* <div className="mb-5 gap-3 flex flex-col items-start">
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
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div> */}

              <div className="mb-5 gap-3 flex flex-col items-start">
                <Label>Status</Label>

                <Select onValueChange={(e) => setData({...data, status: e})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
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
