const express = require("express");
const router = express.Router();
const attendanceHistoryController = require("../controllers/attendanceHistoryController");
const isLoggedIn = require("../middleWares/AuthMiddleWare");
const isAdmin = require("../middleWares/adminMiddleWare");

router.get(
  "/",

  attendanceHistoryController.getAttendancebyEmployeeId
);
router.get(
  "/allEmployees",

  attendanceHistoryController.getAllEmployees
);

module.exports = router;
