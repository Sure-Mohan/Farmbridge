import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const CropPieChart = ({ cropStatus = {} }) => {

  const data = {
    labels: ["Growing", "Planted", "Harvested"],
    datasets: [
      {
        label: "Crop Status",
        data: [
          cropStatus?.growing || 0,
          cropStatus?.planted || 0,
          cropStatus?.harvested || 0
        ],
        backgroundColor: [
          "#198754",
          "#ffc107",
          "#0d6efd"
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="card shadow h-100">
      <div className="card-header">
        <h5 className="mb-0">Crop Status</h5>
      </div>

      <div className="card-body">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default CropPieChart;