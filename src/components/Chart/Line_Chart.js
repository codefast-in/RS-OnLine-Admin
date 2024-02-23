import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Card } from "../ui/card";


export default function Line_Chart() {
  const [state, setstate] = useState({
    series: [44, 55, 41, 17, 15],
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
   
  })
  return (
    <Card>
      <Chart
    options={state.options}
    series={state.series}
    type="line"
    width="400"
  /></Card>
  )
}
