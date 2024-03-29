import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Card } from "../ui/card";

const Dchart = () => {
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ]);

  return (
    <Card className="app w-full">
      <div className="row ">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="bar" width="450" />
        </div>
      </div>
    </Card>
  );
};

export default Dchart;