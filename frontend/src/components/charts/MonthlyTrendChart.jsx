import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const MonthlyTrendChart = ({ monthlyTrend = [] }) => {

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const values = new Array(12).fill(0);

  monthlyTrend.forEach(item => {

    if (item.month >= 1 && item.month <= 12) {

      values[item.month - 1] = Number(item.total);

    }

  });

  const data = {

    labels: months,

    datasets: [

      {

        label: "Crops",

        data: values,

        borderColor: "#198754",

        fill: false,

        tension: 0.3

      }

    ]

  };

  return (

    <div className="card shadow h-100">

      <div className="card-header">

        <h5 className="mb-0">

          Monthly Crop Trend

        </h5>

      </div>

      <div className="card-body">

        <Line data={data} />

      </div>

    </div>

  );

};

export default MonthlyTrendChart;