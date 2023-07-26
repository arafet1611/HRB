const Attendance = require("../model/attendanceModel");
const Employee = require("../model/employeeModel");

const getAttendancePercentage = async (req, res) => {
  try {
    const totalWorkingDays = await Attendance.countDocuments();
    const presentAttendances = await Attendance.countDocuments({
      status: "Present",
    });
    const attendancePercentage = presentAttendances / totalWorkingDays;

    res.status(200).json({ attendancePercentage });
  } catch (error) {
    console.error("Error getting attendance percentage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getFirstDate = async (req, res) => {
  try {
    const firstAttendance = await Attendance.findOne({}, "date").sort({
      date: 1,
    });

    if (firstAttendance && firstAttendance.date) {
      const firstDate = new Date(firstAttendance.date)
        .toISOString()
        .substring(0, 10);
      res.status(200).json({ firstDate });
    } else {
      res.status(404).json({ message: "No first date found" });
    }
  } catch (error) {
    console.error("Error getting first date:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getLastDate = async (req, res) => {
  try {
    const lastAttendance = await Attendance.findOne({}, "date").sort({
      date: -1,
    });

    if (lastAttendance && lastAttendance.date) {
      const lastDate = new Date(lastAttendance.date)
        .toISOString()
        .substring(0, 10);
      res.status(200).json({ lastDate });
    } else {
      res.status(404).json({ message: "No last date found" });
    }
  } catch (error) {
    console.error("Error getting last date:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getEmployeeAttendancePercentage = async (req, res) => {
  try {
    const employees = await Employee.find();

    const employeeAttendances = [];

    for (const employee of employees) {
      const { _id: employeeId, name } = employee;
      const totalWorkingDays = await Attendance.countDocuments({ employeeId });
      const employeePresentAttendances = await Attendance.countDocuments({
        employeeId,
        status: "Present",
      });
      const employeePresentAttendancePercentage =
        (employeePresentAttendances / totalWorkingDays) * 100;

      employeeAttendances.push({
        name,
        percentage: employeePresentAttendancePercentage,
      });
    }

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

const getAttendancePercentageByDay = async (req, res) => {
  try {
    const attendanceData = await Attendance.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          percentage: {
            $avg: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] },
          },
        },
      },
    ]);

    console.log("Attendance Data:", attendanceData); // Add this logging statement

    res.status(200).json({ attendanceData });
  } catch (error) {
    console.error("Error getting attendance percentage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getTotalEmployeeCount,
  getEmployeeAttendancePercentage,
  getAttendancePercentage,
  getTotalDaysPresent,
  getTotalDaysAbsent,
  getFirstDate,
  getLastDate,
  getAttendancePercentageByDay,
};
