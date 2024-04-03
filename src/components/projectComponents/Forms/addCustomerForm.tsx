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
import {useToast} from "@/components/ui/use-toast";

export default function AddCustomerForm() {
  const [date, setDate] = React.useState<Date>();

  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",           
    contact: "",
    address: "",
    city:""
  });
  const Toast = useToast();
 

  const sendData = async (e: any) => {
    e.preventDefault();
    const info = data;
    try {
        console.log(data)
      const responce = await app.post("/api/offlinecustomer/registration",info);
      console.log(responce);
      Toast.toast({
        variant: "success",
        title: responce.data.message,
      });
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
          Add Customer <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
        </DialogHeader>
        {/* <ScrollArea className="h-[80dvh] w-full rounded-md border px-4"> */}
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
                  placeholder="Customer's Name"
                  // value={data.name}
                  onChange={(e) => setData({...data, name: e.target.value})}
                  required
                />
              </div>
              <div className="mb-5">
                <Label>Email</Label>
                <Input
                  placeholder="Customer's Email"
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
                  placeholder="Customer's Mobile No"
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
                <Label>Address</Label>
                <Input
                  placeholder="Customer's Address"
                  value={data.address}
                  onChange={(e) => setData({...data, address: e.target.value})}
                  required
                />
              </div>
              <div className="mb-5">
                <Label>City</Label>
                <Input
                  placeholder="City"
                  value={data.city}
                  onChange={(e) => setData({...data, city: e.target.value})}
                  required
                />
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
        {/* </ScrollArea> */}
      </DialogContent>
    </Dialog>
  );
}
