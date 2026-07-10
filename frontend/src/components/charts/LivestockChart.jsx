import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const LivestockChart = ({ livestock = [] }) => {

  const data = {
    labels:
      livestock.length
        ? livestock.map(item => item.animal_type)
        : ["No Data"],

    datasets: [
      {
        data:
          livestock.length
            ? livestock.map(item => Number(item.total))
            : [1],

        backgroundColor: [
          "#198754",
          "#0d6efd",
          "#ffc107",
          "#dc3545",
          "#6610f2"
        ]
      }
    ]
  };

  return (
    <div className="card shadow h-100">
      <div className="card-header">
        <h5 className="mb-0">Livestock</h5>
      </div>

      <div className="card-body">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default LivestockChart;