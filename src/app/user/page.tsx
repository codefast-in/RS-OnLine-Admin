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

import {TargetIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";
import AddExpencForm from "@/components/projectComponents/Forms/addExpencForm";
import AddIncomeForm from "@/components/projectComponents/Forms/addIncomeForm";
import {EmployeeState} from "@/redux configs/Reducers/employeeReducer";
import {useSelector, useDispatch} from "react-redux";
import {asynceCurrentEmployee} from "@/redux configs/Actions/employeeAction";

const cardData = [
  {cardtitle: "Income By You", time: "This Month", value: 52},
  {cardtitle: "Expencsses By You", time: "This Month", value: 30},
];

import {Badge} from "@/components/ui/badge";
import {ScrollArea} from "@/components/ui/scroll-area";
import EditIncomeForm from "@/components/projectComponents/Forms/editIncomeForm";

const indRS = (value: number) => {
  // Format the amount as a rupi amount
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

  return formatted;
};

const tasks = [
  {
    taskId: "t123",
    title: "Task 1",
    description:
      " task description Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, officia?",
    status: "pending",
  },
  {
    taskId: "t124",
    title: "Task 2",
    description:
      " task description Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, officia?",
    status: "pending",
  },
  {
    taskId: "t125",
    title: "Task 3",
    description:
      " task description Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, officia?",
    status: "pending",
  },
  {
    taskId: "t126",
    title: "Task 4",
    description:
      " task description Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, officia?",
    status: "pending",
  },
];

tasks.toReversed();

export default function page() {
  const [first, setfirst] = useState(1);

  const {employee} = useSelector((state: EmployeeState) => state.employee);
  const services = employee && employee.services.toReversed();

  const dispatch = useDispatch();
  let totalIncome = 0;
  employee &&
    employee.services.map((value: any, index: number) => {
      totalIncome = totalIncome + +value.rsprice;
    });
  useEffect(() => {
    // console.log(totalIncome);
    dispatch(asynceCurrentEmployee());
  }, [first]);

  return (
    <div className="py-5 w-screen h-full justify-center items-center flex">
      <div className="flex flex-col justify-start items-start max-w-[90%] h-full w-full gap-5">
        <div className="grid  grid-cols-2  md:grid-cols-4  gap-5  w-full  ">
          {cardData.map((card, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <div className="flex justify-between gap-10 items-center">
                  <CardTitle>{card.cardtitle}</CardTitle>

                  <TargetIcon className="text-2xl" />
                </div>
                <CardDescription>{card.time}</CardDescription>
              </CardHeader>
              <CardContent className="text-2xl text-primary font-bold">
                <p>{indRS(totalIncome)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex flex-row lg:flex-row justify-start items-start gap-5 w-full ">
          <AddIncomeForm first={first} setfirst={setfirst} />
          <AddExpencForm />
          {/* <IncomeTable />
          <ExpenceTable /> */}
        </div>
        <div className="flex flex-col lg:flex-row justify-start items-start gap-3 w-full ">
          <Card className="w-full px-2">
            <CardHeader className="px-2 py-5">
              <CardTitle className="font-bold ">Income Details</CardTitle>
            </CardHeader>
            <ScrollArea className=" h-[300px] rounded-md border mb-2">
              {services
                ? services.map((income: any, index: number) => (
                    <Card
                      key={index}
                      className=" shadow-none rounded-none py-2 px-3  hover:bg-slate-100 flex justify-between items-center">
                      <div>
                        <div className="flex justify-between items-center ">
                          <div className="items-start font-semibold">
                            {income.title}
                          </div>
                          <Badge
                            variant="outline"
                            className={`capitalize ${
                              income.status == "paid"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }  text-white p-1 rounded-full`}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>Amount : {income.rsprice}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="icon" className="mr-2">
                        <EditIncomeForm
                          title={income.title}
                          mrp={income.mrp}
                          rsprice={income.rsprice}
                          status={income.status}
                          id={income._id}
                        />
                      </Button>
                    </Card>
                  ))
                : "No Details available"}
            </ScrollArea>
          </Card>
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-2  md:grid-cols-3   gap-5  w-full ">
          {tasks.map((task, index) => (
            <Card key={index}>
              <CardHeader>{task.title}</CardHeader>
              <CardContent>{task.description}</CardContent>
              <CardFooter className=" gap-2 lg:gap-5">
                <Button size="sm">Task Details</Button>
                <Button size="sm">
                  {task.status == "pending" ? "Mark as Done" : "Task Complited"}{" "}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
