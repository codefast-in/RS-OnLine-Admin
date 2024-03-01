import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

import CustomerTable from "@/components/projectComponents/Tables/CustomerTable";

const cardData = [
  {cardtitle: "Total Customers", value: 30, valueChange: 40},
  {cardtitle: "New Customers", value: 52, valueChange: 7},
  {cardtitle: "Online Customers", value: 70, valueChange: 10},
  {cardtitle: "Offline Customers", value: 15, valueChange: 1},
];

export default function page() {
  return (
    <div className="mr-10 py-5 w-[80%] h-full  ">
      <div className="flex flex-row  justify-between items-center   gap-5  mb-5">
        {cardData.map((card, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <div className="flex justify-between gap-10 items-center">
                <CardTitle>{card.cardtitle}</CardTitle>

                <span className="text-secondary text-2xl font-bold">
                  +{card.valueChange}
                </span>
              </div>
              <CardDescription>This Month</CardDescription>
            </CardHeader>
            <CardContent className="text-2xl text-primary font-bold">
              <p>{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Tabs defaultValue="Online" className="w-full">
        <TabsList>
          <TabsTrigger value="Online">Online Customer</TabsTrigger>
          <TabsTrigger value="Offline">Offline Custome</TabsTrigger>
        </TabsList>
        <TabsContent value="Online">
          <CustomerTable />
        </TabsContent>

        <TabsContent value="Offline">
          <CustomerTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
