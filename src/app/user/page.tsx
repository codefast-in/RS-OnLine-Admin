import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import {TargetIcon} from "@radix-ui/react-icons";
import {IncomeTable} from "@/components/projectComponents/Tables/IncomeTable";
import {ExpenceTable} from "@/components/projectComponents/Tables/ExpenceTable";
import {Button} from "@/components/ui/button";
import AddExpencForm from "@/components/projectComponents/Forms/addExpencForm";
import AddIncomeForm from "@/components/projectComponents/Forms/addIncomeForm";
const cardData = [
  {cardtitle: "Income By You", time: "This Month", value: 52},
  {cardtitle: "Total Income", time: "Today", value: 7},
  {cardtitle: "Expencsses By You", time: "This Month", value: 30},
  {cardtitle: "Total  Expencsses", time: "Today", value: 15},
];

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
  {
    taskId: "t127",
    title: "Task 5",
    description:
      " task description Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, officia?",
    status: "done",
  },
  {
    taskId: "t128",
    title: "Task 6",
    description:
      " task description Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, officia?",
    status: "pending",
  },
  {
    taskId: "t129",
    title: "Task 7",
    description:
      " task description Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, officia?",
    status: "done",
  },
  {
    taskId: "t110",
    title: "Task 8",
    description:
      " task description Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, officia?",
    status: "pending",
  },
];

export default function page() {
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
                {}
                <p>{indRS(card.value)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex  justify-start items-start gap-5 w-full ">

          <AddIncomeForm/>
          <AddExpencForm/>
          {/* <IncomeTable />
          <ExpenceTable /> */}
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-2  md:grid-cols-3   gap-5  w-full ">
          {tasks.map((task, index) => (
            <Card key={index}>
              <CardHeader>{task.title}</CardHeader>
              <CardContent>{task.description}</CardContent>
              <CardFooter className=" gap-2 md:gap-5">
                <Button size="sm" >Task Details</Button>
                <Button size="sm" >
                  
                  {task.status == "pending"
                    ? "Mark as Done"
                    : "Task Complited"}{" "}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
