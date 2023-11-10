const attendance = require("../model/attendanceModel");
const employee = require("../model/employeeModel");
const getAttendancebyEmployeeId = async (req, res) => {
  try {
    const employee_id = req.query.employeeId;
    const employeeAttendance = await attendance.find({
      employeeId: employee_id,
    });
    if (employeeAttendance === 0) {
      return res.status(404).json({ message: "Couldn't find employee" });
    }
    res.status(200).json(employeeAttendance);
  } catch (err) {
    console.error(" error getting attendance:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getAllEmployees = async (req, res) => {
  try {
    const employeeList = await employee.find();
    if (employeeList.length === 0) {
      return res.status(404).json({ message: " employee list is empty" });
    }
    res.status(200).json(employeeList);
  } catch (err) {
    console.error(" error getting employees:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { getAllEmployees, getAttendancebyEmployeeId };
