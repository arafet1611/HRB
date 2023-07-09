import React from "react";
import Gauge from "../Components/chartsAndGraphs/Gauge";
import SparkLinesCard from "../Components/SparkLinesCard";
import "../Styles/Dashboard.css";
import VerticalBarChart from "../Components/chartsAndGraphs/VerticalBarChart";
function Dashboard() {
  const themeColor = "dark";
  const attendancePercentage = 0.8;
  return (
    <>
      <div className="row dashboard-main-container">
        <div className="col-md-12 p-3">
          <div className="row">
            <div className="col-md-12 top-grid-wrapper">
              <SparkLinesCard
                cardID="1"
                headingData="200"
                innerTextData="Total employees"
                themeColor={themeColor}
                mainSparkData={[5, 10, 6, 8, 9, 20]}
                limit={5}
              />
              <SparkLinesCard
                cardID="2"
                headingData="180"
                innerTextData="total days present "
                themeColor={themeColor}
                mainSparkData={[8, 4, 3, 7, 9, 10]}
                limit={5}
              />
              <SparkLinesCard
                cardID="3"
                headingData="20"
                innerTextData="total days absent"
                themeColor={themeColor}
                mainSparkData={[3, 10, 6, 8, 9, 20]}
                limit={5}
              />
              <SparkLinesCard
                cardID="4"
                headingData="16/11/2023 - 30/11/2023"
                innerTextData="Date"
                themeColor={themeColor}
                mainSparkData={[7, 10, 6, 8, 9, 20]}
                limit={5}
              />
            </div>
          </div>
          <div div className="row mt-4">
            <div className={`col-md-5 pest-data pest-data-${themeColor}`}>
              <span>Overall attendance Percentage</span>
              <div
                className={`doughnut-chart doughnut-chart-${themeColor} mt-2`}
              >
                <Gauge value={attendancePercentage} />
              </div>
            </div>
            <div className={`col-md-7 pest-data pest-data-${themeColor}`}>
              <span>Attendence percentage By Day </span>
              <div className={`bar-chart bar-chart-${themeColor} mt-2`}>
                <VerticalBarChart CompanyData={[50, 60, 80, 100]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
