import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Card } from "../ui/card";

const Paichart = () => {
  const [options, setOptions] = useState({ });
  
  labels: ['A', 'B', 'C', 'D', 'E']
  const [series, setSeries] = useState([44, 55, 41, 17, 15]);

  return (
    <Card className="app w-full">
      <div className="row ">
        <div className="mixed-chart">
          <Chart  options={options} series={series} type="donut" width="430" />
        </div>
      </div>
    </Card>
  );
};

export default Paichart;
