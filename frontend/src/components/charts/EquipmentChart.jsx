import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const EquipmentChart = ({ equipment = [] }) => {

  const data = {
    labels:
      equipment.length
        ? equipment.map(item => item.status)
        : ["No Data"],

    datasets: [
      {
        label: "Equipment",
        data:
          equipment.length
            ? equipment.map(item => Number(item.total))
            : [0],

        backgroundColor: "#0d6efd"
      }
    ]
  };

  return (
    <div className="card shadow h-100">

      <div className="card-header">

        <h5 className="mb-0">
          Equipment Status
        </h5>

      </div>

      <div className="card-body">

        <Bar data={data} />

      </div>

    </div>
  );
};

export default EquipmentChart;