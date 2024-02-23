"use client";
import Image from "next/image";
import { BackpackIcon } from "@radix-ui/react-icons";
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
import { TopSellerTable } from "@/components/projectComponents/Tables/TopSellerTable";
import { RetailerTable } from "@/components/projectComponents/Tables/RetailerTable";
import { NewCustomerTable } from "@/components/projectComponents/Tables/NewCustomerTable";
// import { BestSellerTable } from "@/components/projectComponents/Tables/BestSellerTable";
import{ TopEmpTable} from "@/components/projectComponents/Tables/BestSellerTable"


export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-center mb-4   ">
      <div className="flex flex-row  justify-between items-center  w-[85%] gap-5  mt-4">
        <Card className="w-full">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Retailer</CardTitle>
            <BackpackIcon />
          </CardHeader>
          <CardContent>
            <p>98</p>
          </CardContent>
        </Card>

        <Card className="w-full">

          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Customers</CardTitle>
            <BackpackIcon />
          </CardHeader>
          <CardContent>
            <p>1072</p>
          </CardContent>
        </Card>

        <Card className="w-full">

          <CardHeader className="flex flex-row justify-between items-center  ">
            <CardTitle>Products</CardTitle>
            <BackpackIcon />
          </CardHeader>
          <CardContent>
            <p>72</p>
          </CardContent>
        </Card>

        <Card className="w-full">

          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Employee</CardTitle>
            <BackpackIcon />
          </CardHeader>
          <CardContent>
            <p>18</p>
          </CardContent>
        </Card>
      </div>
      {/* <span>thhthththh</span> */}

      <div className="flex flex-row justify-around items-start  w-[85%] mt-4 gap-9">
        <Pai_Chart />
        <Dchart />
        <Line_Chart />
      </div>
      <div className="flex flex-row justify-around items-start mt-4  w-[85%] gap-9">
        <TopSellerTable />
        <RetailerTable />
      </div>
      
      <div className="flex flex-row justify-around items-start mt-4  w-[85%] gap-9">
        <TopEmpTable/>
        <NewCustomerTable/>
      </div>
    </main>
  );
}
