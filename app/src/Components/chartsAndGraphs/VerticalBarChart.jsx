import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VerticalBarChart = ({ CompanyData }) => {
  // Sort CompanyData by date before processing
  const sortedData = CompanyData.slice().sort((a, b) => {
    const dateA = new Date(a._id);
    const dateB = new Date(b._id);
    return dateA - dateB;
  });

  const mainData = {
    labels: [],
    datasets: [
      {
        label: "Percentage of Present Employees",
        data: [],
        backgroundColor: "#A0E4CB",
      },
    ],
  };

  sortedData.forEach((data) => {
    const date = new Date(data._id);

    if (!isNaN(date.getTime())) {
      const formattedDate = date.toISOString().substring(0, 10);
      mainData.labels.push(formattedDate);
      mainData.datasets[0].data.push(data.percentage.toFixed(2));
    }
  });

  const options = {
    indexAxis: "x",
    plugins: {
      title: {
        display: false,
        text: "Attendance Percentage By Day",
      },
      tooltip: {
        callbacks: {
          label: (context) => context.parsed.y + "%",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Percentage",
        },
        ticks: {
          callback: (value) => value * 100 + "%",
        },
      },
    },
  };

  return <Bar data={mainData} options={options} />;
};

export default VerticalBarChart;
