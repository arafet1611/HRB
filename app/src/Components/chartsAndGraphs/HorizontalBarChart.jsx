import React from "react";
import { Bar } from "react-chartjs-2";

const HorizontalBarChart = ({ CompanyData }) => {
  const employeeNames = CompanyData.map((employee) => employee.name);
  const employeePercentages = CompanyData.map(
    (employee) => employee.percentage
  );

  // Data for the horizontal bar chart
  const chartData = {
    labels: employeeNames,
    datasets: [
      {
        label: "Attendance Percentage",
        data: employeePercentages,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    maintainAspectRatio: false,
    indexAxis: "y", // Set the index axis to "y" to create a horizontal bar chart
    plugins: {
      title: {
        display: false,
        text: "Attendance Percentage By Employee",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: (value) => `${value}%`,
        },
        title: {
          display: true,
          text: "Percentage",
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default HorizontalBarChart;
