import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/EmployeesList.css";
import { BiSolidEdit } from "react-icons/bi";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  useEffect(() => {
    axios
      .get("/api/employee")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleDelete = (employeeId) => {
    axios
      .delete(`/api/employee/${employeeId}`)
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== employeeId)
        );
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const handleAttendanceStatusChange = (employeeId, status) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [employeeId]: status,
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return dateString; // Return the original string if it's not a valid date
  };

  // State to control the confirmation modal for attendance submission
  const [
    showSubmitAttendanceConfirmation,
    setShowSubmitAttendanceConfirmation,
  ] = useState(false);
  const [employeeIdToSubmitAttendance, setEmployeeIdToSubmitAttendance] =
    useState("");

  const handleAttendanceConfirmation = (employeeId) => {
    // Show the confirmation modal
    setEmployeeIdToSubmitAttendance(employeeId);
    setShowSubmitAttendanceConfirmation(true);
  };

  const confirmSubmitAttendance = () => {
    // Close the modal
    setShowSubmitAttendanceConfirmation(false);

    // Handle attendance submission
    const status = attendanceStatus[employeeIdToSubmitAttendance];
    const date = selectedDate;

    // Send the data to the backend here, e.g., using axios.post
    console.log(
      "employee: " +
        employeeIdToSubmitAttendance +
        " status: " +
        status +
        " date: " +
        date
    );
    axios
      .post("/api/att", {
        employee_id: employeeIdToSubmitAttendance,
        status: status,
        date: date,
      })
      .then((response) => {
        // Handle the response if needed
        console.log("Attendance submitted:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting attendance:", error);
      });
  };

  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name &&
      employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      {/* Blue Bar with Shapes and "All Employees" Heading */}
      <div className="header-container text-center">
        <h1 className="all-employees-heading">All Employees</h1>
      </div>
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="selectDate">Select Date:</label>
              <input
                type="date"
                id="selectDate"
                className="form-control"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
          </div>
          <div className="col-md-6 text-md-right">
            {/* <Link to="/addEmployee" className="btn btn-success">
              Add Employee
            </Link> */}
          </div>
        </div>

        {/* Employee Table */}
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Image</th>
              <th>Name</th>
              <th scope="col">Email</th>
              <th scope="col">Department</th>
              <th scope="col">Job Title</th>
              <th scope="col">Start Date</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Attendance</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id} className="bg-white border-bottom">
                <td>
                  <img
                    className="w-10 h-10 rounded-full"
                    src={"./src/assets/Mon Photo.jpeg"}
                    alt="Jese image"
                  />
                </td>
                <td className="flex items-center">{employee.name}</td>
                <td>
                  <div className="pl-3">
                    <div className="font-normal">{employee.email}</div>
                  </div>
                </td>
                <td>{employee.department}</td>
                <td>{employee.jobTitle}</td>
                <td>{formatDate(employee.experience)}</td>
                <td>{employee.phoneNumber}</td>
                <td>
                  <select
                    className="form-control"
                    value={attendanceStatus[employee._id] || "Choose"}
                    onChange={(e) =>
                      handleAttendanceStatusChange(employee._id, e.target.value)
                    }
                  >
                    <option value="Choose" disabled>
                      -- Choose --
                    </option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                  <div>
                    <button
                      onClick={() => handleAttendanceConfirmation(employee._id)}
                    >
                      <div className="icon-container">
                        <IoCheckmarkDoneCircleSharp className="bigger-icon" />
                      </div>
                    </button>
                  </div>
                </td>
                <td>
                  <Link to={`/editEmployee/${employee._id}`}>
                    <div className="icon-container justify-content-center">
                      <BiSolidEdit className="bigger-icon" />
                    </div>
                  </Link>

                  <button onClick={() => handleDelete(employee._id)}>
                    <div className="icon-container">
                      <AiFillDelete className="bigger-icon" />
                    </div>{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal for Attendance Submission */}
      <Modal
        show={showSubmitAttendanceConfirmation}
        onHide={() => setShowSubmitAttendanceConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Attendance Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to submit attendance for this employee?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSubmitAttendanceConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmSubmitAttendance}>
            Submit Attendance
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmployeesList;
