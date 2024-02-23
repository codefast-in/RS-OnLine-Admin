import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import CustomerTable from "@/components/projectComponents/Tables/CustomerTable";

export default function page() {
  return (
    <div className="mr-10 py-5 w-[80%] h-full  ">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerTable />
        </CardContent>
      </Card>
    </div>
  );
}
