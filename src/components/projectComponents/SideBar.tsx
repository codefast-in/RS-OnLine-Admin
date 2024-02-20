"use client";
import React from "react";
import {Card} from "../ui/card";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";

import {StackIcon} from "@radix-ui/react-icons";

export default function SideBar(props: any) {
  return (
    <Card
      className={`border-y-0 border-l-0  rounded-none   flex flex-col items-center justify-start py-5 h-[89vh] w-[15%]`}>
      {props.links.map((links: any, index: number) => (
        <div key={index} className="w-full  ">
          <div className="w-full p-3 text-start flex justify-start gap-5 items-center  hover:text-primary active:text-primary ">
            <StackIcon />
            <Link href={links.path}>{links.label}</Link>
          </div>
          <Separator />
        </div>
      ))}
    </Card>
  );
}
