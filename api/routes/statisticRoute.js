const express = require("express");
const router = express.Router();
const StatisticController = require("../controllers/StatisticController");
const isLoggedIn = require("../middleWares/AuthMiddleWare");
const isAdmin = require("../middleWares/adminMiddleWare");
router.get(
  "/attendance/percentage",
  isLoggedIn,
  isAdmin,
  StatisticController.getAttendancePercentage
);

router.get(
  "/attendance/employee-percentage",
  isLoggedIn,
  isAdmin,
  StatisticController.getEmployeeAttendancePercentage
);

router.get(
  "/employees/count",
  isLoggedIn,
  isAdmin,
  StatisticController.getTotalEmployeeCount
);

router.get(
  "/attendance/days-present",
  isLoggedIn,
  isAdmin,
  StatisticController.getTotalDaysPresent
);

router.get(
  "/attendance/days-absent",
  isLoggedIn,
  isAdmin,
  StatisticController.getTotalDaysAbsent
);

router.get(
  "/attendance/first-date",
  isLoggedIn,
  isAdmin,
  StatisticController.getFirstDate
);

router.get(
  "/attendance/last-date",
  isLoggedIn,
  isAdmin,
  StatisticController.getLastDate
);
router.get(
  "/attendance/percentage-byday",
  isLoggedIn,
  isAdmin,
  StatisticController.getAttendancePercentageByDay
);
module.exports = router;
