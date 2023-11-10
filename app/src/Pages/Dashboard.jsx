import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "react-loading";
import Gauge from "../Components/chartsAndGraphs/Gauge";
import SparkLinesCard from "../Components/SparkLinesCard";
import "../Styles/Dashboard.css";
import VerticalBarChart from "../Components/chartsAndGraphs/VerticalBarChart";
import HorizontalBarChart from "../Components/chartsAndGraphs/HorizontalBarChart";

function Dashboard() {
  const storedUser = window.localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [companyData, setCompanyData] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDaysPresent, setTotalDaysPresent] = useState(0);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [totalDaysAbsent, setTotalDaysAbsent] = useState(0);
  const [firstDate, setFirstDate] = useState(null);
  const [lastDate, setLastDate] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const fetchData = async (endpoint, stateUpdater) => {
    try {
      const response = await axios.get(endpoint, {
        headers: {
          "x-user-id": user._id,
          "x-admin": user.isAdmin,
        },
      });
      stateUpdater(response.data);
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
    }
  };

  const getFirstAndLastDates = async () => {
    await fetchData("/api/s/attendance/first-date", (data) =>
      setFirstDate(data.firstDate)
    );
    await fetchData("/api/s/attendance/last-date", (data) =>
      setLastDate(data.lastDate)
    );
  };

  const getTotalEmployeesCount = () => {
    fetchData("/api/s/employees/count", (data) =>
      setTotalEmployees(data.totalEmployees)
    );
  };

  const getTotalDaysPresent = () => {
    fetchData("/api/s/attendance/days-present", (data) =>
      setTotalDaysPresent(data.totalDaysPresent)
    );
  };

  const getTotalDaysAbsent = () => {
    fetchData("/api/s/attendance/days-absent", (data) =>
      setTotalDaysAbsent(data.totalDaysAbsent)
    );
  };

  const getAttendancePercentage = () => {
    fetchData("/api/s/attendance/percentage", (data) =>
      setAttendancePercentage(data.attendancePercentage)
    );
  };

  const getAttendanceByDayData = () => {
    fetchData("/api/s/attendance/percentage-byday", (data) =>
      setAttendanceData(data.attendanceData)
    );
  };

  useEffect(() => {
    getFirstAndLastDates();
    getTotalEmployeesCount();
    getTotalDaysPresent();
    getTotalDaysAbsent();
    getAttendancePercentage();
    getAttendanceByDayData();
    fetchData("/api/s/attendance/employee-percentage", (data) =>
      setCompanyData(data.employeeAttendances)
    );
  }, []);
  return (
    <>
      {user && user.isAdmin ? (
        <div className="row dashboard-main-container">
          <div className="col-md-12 p-3">
            <div className="row">
              <div className="col-md-12 top-grid-wrapper">
                <SparkLinesCard
                  cardID="1"
                  headingData={totalEmployees}
                  innerTextData="Total employees"
                  themeColor="light"
                  mainSparkData={[5, 10, 6, 8, 9, 20]}
                  limit={5}
                />
                <SparkLinesCard
                  cardID="2"
                  headingData={totalDaysPresent}
                  innerTextData="total days present "
                  themeColor="light"
                  mainSparkData={[8, 4, 3, 7, 9, 10]}
                  limit={5}
                />
                <SparkLinesCard
                  cardID="3"
                  headingData={totalDaysAbsent}
                  innerTextData="total days absent"
                  themeColor="light"
                  mainSparkData={[3, 10, 6, 8, 9, 20]}
                  limit={5}
                />
                <SparkLinesCard
                  cardID="4"
                  headingData={
                    firstDate && lastDate
                      ? `${formatDate(firstDate)} - ${formatDate(lastDate)}`
                      : "No dates available"
                  }
                  innerTextData="Date"
                  themeColor="light"
                  mainSparkData={[7, 10, 6, 8, 9, 20]}
                  limit={5}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className={`col-md-5 pest-data pest-data-light`}>
                <span>Overall attendance Percentage</span>
                <div
                  className={`doughnut-chart doughnut-chart-light mt-2 pl-2`}
                >
                  <Gauge className={"bg-white"} value={attendancePercentage} />
                </div>
              </div>
              <div className="col-md-1"> </div>
              <div className={`col-md-6  pest-data pest-data-light`}>
                <span>Attendence percentage By Day </span>
                <div className={`bar-chart bar-chart-light mt-2`}>
                  <VerticalBarChart CompanyData={attendanceData} />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-3"> </div>
                <div className={`col-md-6  pest-data pest-data-light`}>
                  <span>Attendence percentage By Employee </span>
                  <div className={`bar-chart bar-chart-light mt-2`}>
                    <HorizontalBarChart CompanyData={companyData} />
                  </div>
                </div>
                <div className="col-md-3"> </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div> "You are not authorized as an admin!"</div>
      )}
    </>
  );
}

export default Dashboard;
