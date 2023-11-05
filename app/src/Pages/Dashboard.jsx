import React, { useState, useEffect } from "react";
import axios from "axios";
import Gauge from "../Components/chartsAndGraphs/Gauge";
import SparkLinesCard from "../Components/SparkLinesCard";
import "../Styles/Dashboard.css";
import VerticalBarChart from "../Components/chartsAndGraphs/VerticalBarChart";
import HorizontalBarChart from "../Components/chartsAndGraphs/HorizontalBarChart";

function Dashboard() {
  const [companyData, setCompanyData] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDaysPresent, setTotalDaysPresent] = useState(0);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [totalDaysAbsent, setTotalDaysAbsent] = useState(0);
  const [firstDate, setFirstDate] = useState(null);
  const [lastDate, setLastDate] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const storedUser = window.localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const getFirstAndLastDates = async () => {
    try {
      const responseFirst = await axios.get("/api/s/attendance/first-date", {
        headers: {
          "x-user-id": user._id,
          "x-admin": user.isAdmin,
        },
      });
      if (responseFirst.data.firstDate) {
        setFirstDate(responseFirst.data.firstDate);
      }

      const responseLast = await axios.get("/api/s/attendance/last-date", {
        headers: {
          "x-user-id": user._id,
          "x-admin": user.isAdmin,
        },
      });
      if (responseLast.data.lastDate) {
        setLastDate(responseLast.data.lastDate);
      }
    } catch (error) {
      console.error("Error getting first and last dates:", error);
      // You can handle the error here if needed
    }
  };

  useEffect(() => {
    getFirstAndLastDates();
  }, []);

  //  Function to fetch total of employees
  const getTotalEmployeesCount = async () => {
    try {
      const response = await axios.get("/api/s/employees/count", {
        headers: {
          "x-user-id": user._id,
          "x-admin": user.isAdmin,
        },
      });
      setTotalEmployees(response.data.totalEmployees);
    } catch (error) {
      console.error("Error getting total employee count:", error);
    }
  };

  useEffect(() => {
    getTotalEmployeesCount();
  }, []);
  //  Function to fetch total of days Present
  const getTotalDaysPresent = async () => {
    try {
      const response = await axios.get("/api/s/attendance/days-present", {
        headers: {
          "x-user-id": user._id,
          "x-admin": user.isAdmin,
        },
      });
      setTotalDaysPresent(response.data.totalDaysPresent);
    } catch (error) {
      console.error("Error getting total days present:", error);
    }
  };
  useEffect(() => {
    getTotalDaysPresent();
  }, []);
  // Function to fetch totalDaysAbsent
  const getTotalDaysAbsent = async () => {
    try {
      const response = await axios.get("/api/s/attendance/days-absent", {
        headers: {
          "x-user-id": user._id,
          "x-admin": user.isAdmin,
        },
      });
      setTotalDaysAbsent(response.data.totalDaysAbsent);
    } catch (error) {
      console.error("Error getting total days absent:", error);
    }
  };
  useEffect(() => {
    getTotalDaysAbsent();
  }, []);
  // Function to fetch attendancePercentage
  const getAttendancePercentage = async () => {
    try {
      const response = await axios.get("/api/s/attendance/percentage", {
        headers: {
          "x-user-id": user._id,
          "x-admin": user.isAdmin,
        },
      });
      setAttendancePercentage(response.data.attendancePercentage);
    } catch (error) {
      console.error("Error getting attendance percentage:", error);
    }
  };
  useEffect(() => {
    getAttendancePercentage();
  }, []);
  console.log(attendanceData);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  // Function to fetch AttendanceByDayData

  const getAttendanceByDayData = async () => {
    try {
      const response = await axios.get("/api/s/attendance/percentage-byday", {
        headers: {
          "x-user-id": user._id,
          "x-admin": user.isAdmin,
        },
      });
      setAttendanceData(response.data.attendanceData);
    } catch (error) {
      console.error("Error getting attendance data:", error);
    }
  };

  useEffect(() => {
    getAttendanceByDayData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/s/attendance/employee-percentage",
          {
            headers: {
              "x-user-id": user._id,
              "x-admin": user.isAdmin,
            },
          }
        );
        setCompanyData(response.data.employeeAttendances);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
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
              <div className={`doughnut-chart doughnut-chart-light mt-2 pl-2`}>
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
    </>
  );
}

export default Dashboard;
