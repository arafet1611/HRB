const Attendance = require("../model/attendanceModel");
const Employee = require("../model/employeeModel");
const saveAttendanceStatus = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    const employee = await Employee.findOne({ employeeId: employee });
    if (!employee) {
      return res.status(404).json({ message: "Couldn't find employee" });
    }
    const attendance = Attendance({ employeeId, date, status });
    await attendance.save();
    res.status(200).json({ message: "Attendance saved successfully" });
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  saveAttendanceStatus,
};
