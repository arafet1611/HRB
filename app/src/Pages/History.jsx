import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/history.css";
export default function History() {
  const storedUser = window.localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  let i = 1;

  useEffect(() => {
    axios
      .get(`/api/employee`, {
        headers: {
          "x-user-id": user._id,
          "x-admin": user.isAdmin,
        },
      })
      .then((response) => {
        setEmployees(response.data);
      });
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      axios
        .get(`/api/att/history?employeeId=${selectedEmployee}`, {
          headers: {
            "x-user-id": user._id,
            "x-admin": user.isAdmin,
          },
        })
        .then((response) => {
          setAttendance(response.data);
        });
    }
  }, [selectedEmployee]);

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  return (
    <div className="container">
      <h1>History attendance Employee</h1>
      <span>Select employee: </span>
      <select onChange={handleEmployeeChange} value={selectedEmployee}>
        <option value="">Select an employee</option>
        {employees.map((employee) => (
          <option key={employee._id} value={employee._id}>
            {employee.name}
          </option>
        ))}
      </select>

      {attendance.length > 0 ? (
        <table className="bordered-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((entry) => (
              <tr key={entry._id}>
                <td>{i++}</td>
                <td>{entry.date}</td>
                <td>{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>employee is not selected yet</p>
      )}
    </div>
  );
}
