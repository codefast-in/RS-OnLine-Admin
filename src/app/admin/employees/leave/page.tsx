'use client'

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
import { BarChart, } from '@mui/x-charts/BarChart';

// LineChart
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




import { LineChart } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

export default function page() {

  
  return (

    <div className="py-5 grid grid-cols-4 gap-5 mt-5 w-[80%]">
      {/* {data.map((leave, index) => (
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
      ))} */}

{/* <BarChart
  xAxis={[
    {
      id: 'barCategories',
      data: ['bar A', 'bar B', 'bar C'],
      scaleType: 'band',
    },
  ]}
  series={[
    {
      data: [2, 5, 3],
    },
  ]}
  width={500}
  height={300}
/> */}

<LineChart
  width={500}
  height={300}
  series={[
    { data: pData, label: 'pv' },
    { data: uData, label: 'uv' },
  ]}
  xAxis={[{ scaleType: 'point', data: xLabels }]}
/>
    </div>
  );
}
