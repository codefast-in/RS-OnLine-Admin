"use client";
import Image from "next/image";
import {BackpackIcon, BoxModelIcon} from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Dchart from "@/components/Chart/Graph_Chart";

import Line_Chart from "@/components/Chart/Line_Chart";
import Pai_Chart from "@/components/Chart/Pai_Chart";
import {TopSellerTable} from "@/components/projectComponents/Tables/TopSellerTable";
import {RetailerTable} from "@/components/projectComponents/Tables/RetailerTable";
import {NewCustomerTable} from "@/components/projectComponents/Tables/NewCustomerTable";
// import { BestSellerTable } from "@/components/projectComponents/Tables/BestSellerTable";
import {TopEmpTable} from "@/components/projectComponents/Tables/BestSellerTable";
const cardData = [
  {cardtitle: "Retailer", value: 52,valueChange:7},
  {cardtitle: "Customers", value: 30,valueChange:40},
  {cardtitle: "Products", value: 70,valueChange:10},
  {cardtitle: "Employees", value: 15,valueChange:1},
];

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-center mb-4   ">
      <div className="flex flex-row  justify-between items-center  w-[85%] gap-5  mt-4">
        {cardData.map((card, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <div className="flex justify-between gap-10 items-center">
                <CardTitle>{card.cardtitle}</CardTitle>

                <span className="text-secondary text-2xl font-bold">+{card.valueChange}</span>
              </div>
              <CardDescription>This Month</CardDescription>
            </CardHeader>
            <CardContent className="text-2xl text-primary font-bold">
              <p>{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
  

      <div className="flex flex-row justify-between items-start  w-[85%] mt-4 gap-9">
        {/* <Pai_Chart /> */}
        <Dchart />
        <Line_Chart />
      </div>
      <div className="flex flex-row justify-around items-start mt-4  w-[85%] gap-9">
        <TopSellerTable />
        <RetailerTable />
      </div>

      <div className="flex flex-row justify-around items-start mt-4  w-[85%] gap-9">
        <TopEmpTable />
        <NewCustomerTable />
      </div>
    </main>
  );
}
