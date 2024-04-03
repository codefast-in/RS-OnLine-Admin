"use client";

import React, {useEffect, useState} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import {EmpListTable} from "@/components/projectComponents/Tables/EmpListTable";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

import app from "@/utils/axios";
import {TaskListTable} from "@/components/projectComponents/Tables/TaskListTable";
import {Calendar} from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {CalendarIcon} from "@radix-ui/react-icons";
import {format} from "date-fns";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import dayjs from "dayjs";
import { IncomeTable } from "@/components/projectComponents/Tables/IncomeTable";

const holyDaysStyle = {
  backgroundColor: "#f57200",
  color: "#fff",
  borderRadius: "50px",
};

export default function page() {
  const [employeesData, setemployeesData] = useState<any>([]);
  const [tasksData, settask] = React.useState<any>([]);
  const [incomeData, setIncomes] = React.useState<any>([]);
  const [date, setDate] = React.useState<Date[]>([]);
  const initialDays: Date[] = [];
  const [days, setDays] = React.useState<Date[] | undefined>(initialDays);
  let daysForBack: String[] = [];

  const Toast = useToast();
  const addHoliday = async (e: any) => {
    e.preventDefault();
    days?.map((date) => daysForBack.push(dayjs(date).format("YYYY-MM-DD")));
    const data = {
      holidays: daysForBack,
    };

    console.log(days);
    try {
      const responce = await app.post(`/api/admin/holidays`, data);
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

  const getData = async () => {
    try {
      const responce1 = await app.get("/api/admin/allemployee");
      setemployeesData(responce1.data);
      const responce2 = await app.get("/api/admin/alltask");
      settask(responce2.data);
      const responce3 = await app.post("/api/admin/incomes");
      setIncomes(responce3.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(incomeData);
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" py-5 w-[85%] h-full ">
      <div className="flex items-center gap-5 justify-between">
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between gap-10 items-center">
              <CardTitle>Total Employees</CardTitle>

              <PeopleOutlineOutlinedIcon className="text-2xl" />
            </div>
            <CardDescription>All Firms</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl text-primary font-bold">
            <p>07</p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between gap-10 items-center">
              <CardTitle>Present Employees</CardTitle>
              <PeopleOutlineOutlinedIcon className="text-2xl" />
            </div>
            <CardDescription>All Firms</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl text-primary font-bold">
            <p>05</p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between gap-10 items-center">
              <CardTitle>Absent Employees</CardTitle>
              <PeopleOutlineOutlinedIcon className="text-2xl" />
            </div>
            <CardDescription>All Firms</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl text-primary font-bold">
            <p>02</p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between gap-10 items-center">
              <CardTitle>New Employees</CardTitle>
              <PeopleOutlineOutlinedIcon className="text-2xl" />
            </div>
            <CardDescription>All Firms</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl text-primary font-bold">
            <p>01</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="employees" className="w-full mt-5">
        <TabsList>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="incomes">Incomes</TabsTrigger>
          <TabsTrigger value="task">Task</TabsTrigger>
          {/* <TabsTrigger value="leave">Leaves</TabsTrigger> */}
          <TabsTrigger value="holidays">Holidays</TabsTrigger>
        </TabsList>
        <TabsContent value="employees">
          <EmpListTable employees={employeesData} />
        </TabsContent>
        <TabsContent value="incomes">
          <IncomeTable tableData={incomeData ? incomeData.allincome : []} />
        </TabsContent>
        <TabsContent value="task">
          <TaskListTable taskData={tasksData} employeesData={employeesData} />
        </TabsContent>
        <TabsContent value="holidays" className="py-1">
          <Dialog>
            <DialogTrigger>
              <Button
                variant="default"
                size={"sm"}
                className={cn(
                  "w-full justify-start text-left font-normal ml-5"
                  // !date && "text-muted-foreground"
                )}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Add Holiday</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-fit">
              <DialogHeader>
                <DialogTitle>Add Holidays</DialogTitle>
                <DialogDescription>
                  <Calendar
                    mode="multiple"
                    min={1}
                    selected={days}
                    onSelect={setDays}
                    initialFocus
                  />
                  <div className="flex items-center justify-between gap-2">
                    <DialogClose asChild>
                      <Button variant={"destructive"} className="w-full">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      variant={"default"}
                      onClick={(e) => addHoliday(e)}
                      className="w-full">
                      Add
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Card className="mt-4 w-fit p-2 ">
            <Calendar
              hideHead={true}
              modifiers={{
                holyDays:
                  employeesData[0] &&
                  employeesData[0].attendance.holidays.map((date: string) =>
                    dayjs(date).toDate()
                  ),
              }}
              modifiersStyles={{holyDays: holyDaysStyle}}
              initialFocus
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
