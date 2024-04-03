import OrdersTable from "@/components/projectComponents/Tables/OrdetrTable";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {BoxModelIcon, TargetIcon} from "@radix-ui/react-icons";

const cardData = [
  {cardtitle: "Orders", value: 52},
  {cardtitle: "Delivered", value: 30},
  {cardtitle: "Pending", value: 7},
  {cardtitle: "Cancel", value: 15},
];
export default function page() {
  return (
    <div className=" py-5 w-[85%] h-full  ">
      <div className="flex items-center gap-5 justify-between">
        {cardData.map((card, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <div className="flex justify-between gap-10 items-center">
                <CardTitle>{card.cardtitle}</CardTitle>

                <BoxModelIcon className="text-2xl" />
              </div>
              <CardDescription>This Month</CardDescription>
            </CardHeader>
            <CardContent className="text-2xl text-primary font-bold">
              <p>{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* <OrdersTable /> */}
    </div>
  );
}
