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
import { TargetIcon } from "@radix-ui/react-icons";
import {TaskListTable} from "@/components/projectComponents/Tables/TaskListTable";

const cardData = [
  {cardtitle: "Totale Tasks", value: 52},
  {cardtitle: "Complited Tasks", value: 30},
  {cardtitle: "Pending Tasks", value: 7},
  {cardtitle: "Ongoing Tasks", value: 15},
];

export default function page() {
  return (
    <div className="mr-10 py-5 w-[80%] h-full  ">
      <div className="flex items-center gap-5 justify-between">
        {cardData.map((card, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <div className="flex justify-between gap-10 items-center">
                <CardTitle>{card.cardtitle}</CardTitle>

                <TargetIcon className="text-2xl" />
              </div>
              <CardDescription>All Firms</CardDescription>
            </CardHeader>
            <CardContent className="text-2xl text-primary font-bold">
              <p>{card.value}</p>
            </CardContent>
          </Card>
        ))}
       
      </div>
      <TaskListTable />
    </div>
  );
}
