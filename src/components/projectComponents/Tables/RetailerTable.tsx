"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function RetailerTable() {
  return (
    <Card className="w-full">
      <Accordion type="single" collapsible className="w-full px-4 ">
        <div className="flex items-center justify-between border-b-2  ">
          <h1 className="p-4">Retailer</h1>
          <Button className="h-8" variant="default">
            View All
          </Button>
        </div>

        <AccordionItem value="item-1">
          <AccordionTrigger className="flex flex-row justify-between items-center ">
            <div className="flex flex-row justify-between items-center gap-5 ">
              <Image
                className="rounded-full"
                height={30}
                width={30}
                src="https://github.com/shadcn.png"
                alt="no"
              />

              <p>Sachin Pawar</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>Email id-sjsu123@gmail.com</AccordionContent>
          <AccordionContent>Contact no-123456789</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="flex flex-row justify-between items-center ">
            <div className="flex flex-row justify-between items-center gap-5 ">
              <Image
                className="rounded-full"
                height={30}
                width={30}
                src="https://github.com/shadcn.png"
                alt="no"
              />
              {/* <span>Sachin</span> */}
              <p>Sachin Pawar</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>Email id-sjsu123@gmail.com</AccordionContent>
          <AccordionContent>Contact no-123456789</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="flex flex-row justify-between items-center ">
            <div className="flex flex-row justify-between items-center gap-5 ">
              <Image
                className="rounded-full"
                height={30}
                width={30}
                src="https://github.com/shadcn.png"
                alt="no"
              />

              <p>Sachin Pawar</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>Email id-sjsu123@gmail.com</AccordionContent>
          <AccordionContent>Contact no-123456789</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="flex flex-row justify-between items-center ">
            <div className="flex flex-row justify-between items-center gap-5 ">
              <Image
                className="rounded-full"
                height={30}
                width={30}
                src="https://github.com/shadcn.png"
                alt="no"
              />
              {/* <span>Sachin</span> */}
              <p>Sachin Pawar</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>Email id-sjsu123@gmail.com</AccordionContent>
          <AccordionContent>Contact no-123456789</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="flex flex-row justify-between items-center ">
            <div className="flex flex-row justify-between items-center gap-5 ">
              <Image
                className="rounded-full"
                height={30}
                width={30}
                src="https://github.com/shadcn.png"
                alt="no"
              />
              {/* <span>Sachin</span> */}
              <p>Sachin Pawar</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>Email id-sjsu123@gmail.com</AccordionContent>
          <AccordionContent>Contact no-123456789</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
