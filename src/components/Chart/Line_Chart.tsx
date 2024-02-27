import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Card } from "../ui/card";

export default function LineChart() {
  const [data, setData] = useState({
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      },
      {
        name: "series-0",
        data:[44, 55, 41, 17, 15]
      }
    ],
    options: {
      chart: {
        id: "basic-bar" // Changed ID to reflect line chart
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    
  });

  return (
    <Card className="w-full">
      <Chart
        options={data.options}
        series={data.series}
        type="line" // Changed type to "line"
        width="450"
      />
    </Card>
  );
}