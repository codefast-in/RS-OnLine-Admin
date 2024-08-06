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


import dayjs from "dayjs";
import {useToast} from "@/components/ui/use-toast";
import app from "@/utils/axios";
import {IncomeTable} from "@/components/projectComponents/Tables/IncomeTable";
import {ExpenceTable} from "@/components/projectComponents/Tables/ExpenceTable";
import AddCustomerForm from "@/components/projectComponents/Forms/addCustomerForm";

import {formatted} from "@/utils/formatted";

export default function page() {
  const [first, setfirst] = useState(1);

  const {employee} = useSelector((state: EmployeeState) => state.employee);
  const services = employee && employee.services;
  const expenses = employee && employee.expenses;
  const tasks = employee && employee.tasks;

  console.log(expenses);

  const dispatch = useDispatch();
  const Toast = useToast();
  let totalIncome = 0;
  let totalExpence = 0;
  employee &&
    employee.services.map((value: any) => {
      totalIncome = totalIncome + +value.totalAmount;
    });
  employee &&
    employee.expenses.map(
      (value: any) => (totalExpence = totalExpence + +value.amount)
    );
  const upDateTask = async (e: any, id: string) => {
    e.preventDefault();
    console.log(id);
    try {
      const responce = await app.post(`/api/employee/updatetasks/${id}`, {
        status: "success",
      });
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
  useEffect(() => {
    // console.log(totalIncome);
    dispatch(asynceCurrentEmployee());
  }, [first]);

  const cardData = [
    {cardtitle: "Income By You", time: "This Month", value: totalIncome},
    {cardtitle: "Expencsses By You", time: "This Month", value: totalExpence},
  ];

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
                <p>{formatted(card.value)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex  flex-wrap lg:flex-row justify-start items-start gap-5 w-full ">
          <AddIncomeForm first={first} setfirst={setfirst} />
          <AddExpencForm />
          <AddCustomerForm />
        </div>
        <div className="flex flex-col lg:flex-row justify-start items-start gap-3 w-full ">
          {/* <Invoice/> */}
          <IncomeTable tableData={services ? services : []}  setfirst={setfirst} first={first} />
          <ExpenceTable  />
          {/* <Card className="w-full px-2">
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
                          customername={income.customername}
                          customercontact={income.customercontact}
                          setfirst={setfirst}
                        />
                      </Button>
                    </Card>
                  ))
                : "No Details available"}
            </ScrollArea>
          </Card>
          <Card className="w-full px-2">
            <CardHeader className="px-2 py-5">
              <CardTitle className="font-bold ">Expence Details</CardTitle>
            </CardHeader>
            <ScrollArea className=" h-[300px] rounded-md border mb-2">
              {expenses
                ? expenses.map((income: any, index: number) => (
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
                          <div>Amount : {income.amount}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="icon" className="mr-2">
                        <EditIncomeForm
                          title={income.title}
                          mrp={income.mrp}
                          rsprice={income.rsprice}
                          status={income.status}
                          id={income._id}
                          customername={income.customername}
                          customercontact={income.customercontact}
                          setfirst={setfirst}
                        />
                      </Button>
                    </Card>
                  ))
                : "No Details available"}
            </ScrollArea>
          </Card> */}
        </div>
        <div className="flex flex-col lg:flex-row justify-start items-start gap-3 w-full "></div>
        <div className="grid grid-cols-1  sm:grid-cols-2  md:grid-cols-3   gap-5  w-full ">
          {tasks &&
            tasks.map((task: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{task.title}</CardTitle>
                  <CardDescription>{task.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <span>Start Date : </span>
                    <span>{dayjs(task.startdate).format("DD,MMMYY")} </span>
                  </div>
                  <div>
                    <span>End Date : </span>
                    <span>{dayjs(task.enddate).format("DD,MMMYY")} </span>
                  </div>
                </CardContent>
                <CardFooter className=" gap-2 lg:gap-5">
                  {/* <Button size="sm">Task Details</Button> */}
                  <Button
                    size="sm"
                    onClick={(e) => upDateTask(e, task._id)}
                    disabled={task.status == "pending" ? false : true}>
                    {task.status == "pending"
                      ? "Mark as Complited"
                      : "Task Complited"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
