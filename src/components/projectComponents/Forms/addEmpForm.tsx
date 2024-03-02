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
import {ScrollArea} from "@/components/ui/scroll-area";
import app from "@/utils/axios";
import {useDispatch} from "react-redux";
import {asyncAddEmployee} from "@/redux configs/Actions/employeeAction";

export default function AddEmpForm() {
  const [date, setDate] = React.useState<Date>();

  const [data, setData] = React.useState({
    name: "",
    email: "",
    contact: "",
    age: "",
    gender: "",
    password: "",
    document: "",
    joindate: date,
    role: "",
  });

  const dispatch = useDispatch();

  const sendData = async (e: any) => {
    e.preventDefault();
    const info = data;
    try {
      const responce = dispatch(asyncAddEmployee(info));
      console.log(responce);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" className="ml-auto">
          Add Employee <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>{" "}
        </DialogHeader>
        <ScrollArea className="h-[80dvh] w-full rounded-md border px-4">
          <DialogDescription>
            <form
              // encType="multipart/formdata"
              onSubmit={sendData}
              className="mt-5">
              <div className="mb-5">
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Employee's Name"
                  // value={data.name}
                  onChange={(e) => setData({...data, name: e.target.value})}
                  required
                />
              </div>
              <div className="mb-5">
                <Label>Email</Label>
                <Input
                  placeholder="Employee's Email"
                  value={data.email}
                  onChange={(e) => setData({...data, email: e.target.value})}
                  required
                />
              </div>
              <div className="mb-5">
                <Label>Mobile No</Label>
                <Input
                  type="number"
                  minLength={10}
                  placeholder="Employee's Mobile No"
                  value={data.contact}
                  onChange={(e) => setData({...data, contact: e.target.value})}
                  required
                />
              </div>
              <div className="mb-5">
                <Label>Password</Label>
                <Input
                  type="text"
                  minLength={10}
                  placeholder="New Password"
                  value={data.password}
                  onChange={(e) => setData({...data, password: e.target.value})}
                  required
                />
              </div>
              <div className="mb-5">
                <Label>Id Proof</Label>
                <Input
                  type="file"
                  name="document"
                  // onChange={(e) => {
                  //   const img = new FormData();
                  //   img.set("document", e.target.value);
                  //   console.log(e.target.value);
                  //   console.log(img);
                  // }}
                  placeholder="Adhar/PAN"
                  value={data.document}
                  onChange={(e) => setData({...data, document: e.target.value})}
                  required
                />
              </div>
              <div className="mb-5">
                <Label>Age</Label>
                <Input
                  placeholder="Employee's Age"
                  value={data.age}
                  onChange={(e) => setData({...data, age: e.target.value})}
                  required
                />
              </div>
              <div className="mb-5">
                <Label>Gender</Label>
                <RadioGroup
                  defaultValue="none"
                  onChange={(e) => setData({...data, gender: e.target.value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
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
                        "w-full justify-start text-left font-normal",
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
                      onSelect={(e) => {
                        setData({...data, joindate: e});
                        setDate(e);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="mb-5 flex flex-col">
                <Label>Roll</Label>

                <Select onValueChange={(e) => setData({...data, role: e})}>
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
