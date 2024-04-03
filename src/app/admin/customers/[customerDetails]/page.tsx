"use client";

import {IncomeTable} from "@/components/projectComponents/Tables/IncomeTable";
import {OfflineOrdersTable} from "@/components/projectComponents/Tables/OfflineOrdersTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import app from "@/utils/axios";
import dayjs from "dayjs";
import {Calligraffitti} from "next/font/google";
import Link from "next/link";
import React from "react";

export default function page({params}: any) {
  const [customer, setcustomerData] = React.useState<any>();

  const getData = async () => {
    try {
      const apiID = params.customerDetails;
      console.log(apiID);
      const responce = await app.get(`/api/admin/oneofflinecustomer/${apiID}`);
      setcustomerData(responce.data.onecustomer);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  console.log(customer);
  console.log(customer && customer.buyproducts[0]);
  return (
    <Card className="my-3 mx-28 w-full">
      <CardHeader>
        <CardTitle>Customer Details</CardTitle>
        <CardDescription>
          View Full Details Of
          <span className="capitalize"> {customer ? customer.name : ""}</span>
        </CardDescription>
      </CardHeader>
      <div>
        <CardContent className="flex items-start  gap-5">
          <div>
            <div className="flex justify-start items-center  gap-2">
              <span className="font-semibold text-sm  min-w-[30%]">Name :</span>
              <span className="capitalize">
                {customer ? customer.name : ""}
              </span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-sm  min-w-[30%]">
                Email :
              </span>
              <Link href="mailto:sachinspindofficial@gmail.com">
                {customer ? customer.email : ""}
              </Link>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-sm  min-w-[30%]">
                Mobile :
              </span>
              <Link href="tel:9516905325">
                {customer ? customer.contact : ""}
              </Link>
            </div>
          </div>

          <div>
            <div className="flex justify-start items-center  gap-2">
              <span className="font-semibold text-sm  min-w-[30%]">
                Address :
              </span>
              <span className="capitalize">
                {customer ? customer.address : ""}
              </span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-sm  min-w-[30%]">City :</span>
              <span className="capitalize">
                {customer ? customer.city : ""}
              </span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span className="font-semibold text-sm  min-w-[30%]">
                Status :
              </span>
              <span
                className={`capitalize ${
                  customer && customer.islogin
                    ? "text-green-500"
                    : "text-red-500"
                } `}>
                {customer && customer.islogin ? "Active" : "Offline"}
              </span>
            </div>
          </div>
        </CardContent>
      </div>
      <Separator />
      <CardContent className="mt-4">
        <CardTitle>Order Details</CardTitle>

        <OfflineOrdersTable tableData={customer ? customer.buyproducts : []} />
      </CardContent>
    </Card>
  );
}
