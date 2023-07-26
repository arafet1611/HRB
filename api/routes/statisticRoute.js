const express = require("express");
const router = express.Router();
const StatisticController = require("../controllers/StatisticController");

router.get(
  "/attendance/percentage",
  StatisticController.getAttendancePercentage
);

router.get(
  "/attendance/employee-percentage",
  StatisticController.getEmployeeAttendancePercentage
);

router.get("/employees/count", StatisticController.getTotalEmployeeCount);

router.get("/attendance/days-present", StatisticController.getTotalDaysPresent);

router.get("/attendance/days-absent", StatisticController.getTotalDaysAbsent);

router.get("/attendance/first-date", StatisticController.getFirstDate);

router.get("/attendance/last-date", StatisticController.getLastDate);
router.get(
  "/attendance/percentage-byday",
  StatisticController.getAttendancePercentageByDay
);
module.exports = router;
