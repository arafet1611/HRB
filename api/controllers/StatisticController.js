const Attendance = require("../model/attendanceModel");
const Employee = require("../model/employeeModel");

const getAttendancePercentage = async (req, res) => {
  try {
    const totalWorkingDays = await Attendance.countDocuments();
    const presentAttendances = await Attendance.countDocuments({
      status: "Present",
    });
    const attendancePercentage = (presentAttendances / totalWorkingDays) * 100;

    res.status(200).json({ attendancePercentage });
  } catch (error) {
    console.error("Error getting attendance percentage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getEmployeeAttendancePercentage = async (req, res) => {
  try {
    const { employeeId } = req.body;

    const totalWorkingDays = await Attendance.countDocuments({ employeeId });
    const employeePresentAttendances = await Attendance.countDocuments({
      employeeId,
      status: "Present",
    });
    const employeePresentAttendancePercentage =
      (employeePresentAttendances / totalWorkingDays) * 100;
    const employeeAttendances = [
      {
        employeeId,
        percentage: employeePresentAttendancePercentage,
      },
    ];

    res.status(200).json({ employeeAttendances });
  } catch (error) {
    console.error("Error getting employee attendance percentage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTotalEmployeeCount = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();

    res.status(200).json({ totalEmployees });
  } catch (error) {
    console.error("Error getting total employee count:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTotalDaysPresent = async (req, res) => {
  try {
    const totalDaysPresent = await Attendance.countDocuments({
      status: "Present",
    });

    res.status(200).json({ totalDaysPresent });
  } catch (error) {
    console.error("Error getting total days present:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTotalDaysAbsent = async (req, res) => {
  try {
    const totalDaysAbsent = await Attendance.countDocuments({
      status: "Absent",
    });

    res.status(200).json({ totalDaysAbsent });
  } catch (error) {
    console.error("Error getting total days absent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getTotalEmployeeCount,
  getEmployeeAttendancePercentage,
  getAttendancePercentage,
  getTotalDaysPresent,
  getTotalDaysAbsent,
};
