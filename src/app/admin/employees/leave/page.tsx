import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const data = [
  {
    title: "Leave Title 1",
    description:
      "Leve Disception Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, recusandae.",
  },
  {
    title: "Leave Title 2",
    description:
      "Leve Disception Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, recusandae.",
  },
  {
    title: "Leave Title 3",
    description:
      "Leve Disception Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, recusandae.",
  },
  {
    title: "Leave Title 4",
    description:
      "Leve Disception Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, recusandae.",
  },
  {
    title: "Leave Title 5",
    description:
      "Leve Disception Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, recusandae.",
  },
  {
    title: "Leave Title 6",
    description:
      "Leve Disception Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, recusandae.",
  },
  {
    title: "Leave Title 7",
    description:
      "Leve Disception Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, recusandae.",
  },
];

export default function page() {
  return (

    <div className="py-5 grid grid-cols-4 gap-5 mt-5 w-[80%]">
      {data.map((leave, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{leave.title}</CardTitle>
            <CardDescription>{leave.title}</CardDescription>
          </CardHeader>

          <CardContent>
            {leave.description}
          </CardContent>

          <CardFooter className="flex justify-between items-center gap-5">
            <Button size="sm" variant="success" className="w-full ">
              Confirm
            </Button>
            <Button size="sm" variant="destructive" className="w-full">
              Cancel
            </Button>
            <Button size="sm" className="w-full">View Detals</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
