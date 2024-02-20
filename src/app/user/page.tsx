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
import { ExpenceTable } from "@/components/projectComponents/Tables/ExpenceTable";
const cardData = [
  {cardtitle: "Total Income", time: "This Month", value: 52},
  {cardtitle: "Total Income", time: "Today", value: 7},
  {cardtitle: "Total Expencese", time: "This Month", value: 30},
  {cardtitle: "Total Expencese", time: "Today", value: 15},
];

const indRS = (value: number) => {
  // Format the amount as a dollar amount
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

  return formatted;
};

export default function page() {
  return (
    <div className="py-5 w-screen h-full justify-center items-center flex">
      <div className="flex flex-col justify-start items-start max-w-[90%] h-full w-full gap-5">
        <div className="grid grid-flow-col grid-cols-2  md:grid-cols-4 grid-rows-2 md:grid-rows-1 gap-5  w-full  ">
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
        <div className="flex justify-between items-center gap-10 w-full">
          <IncomeTable />
          <ExpenceTable/>
        </div>
      </div>
    </div>
  );
}
