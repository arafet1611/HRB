const Attendance = require("../model/attendanceModel");
const Employee = require("../model/employeeModel");
const saveAttendanceStatus = async (req, res) => {
  try {
    const { employee_id, date, status } = req.body;

    const employee = await Employee.findOne({ _id: employee_id });
    if (!employee) {
      return res.status(404).json({ message: "Couldn't find employee" });
    }

    const attendance = new Attendance({
      employeeId: employee._id,
      date: new Date(date),
      status: status,
    });

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
