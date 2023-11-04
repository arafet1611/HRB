const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const isLoggedIn = require("../middleWares/AuthMiddleWare");
const isAdmin = require("../middleWares/adminMiddleWare");
router.post(
  "/",
  isLoggedIn,
  isAdmin,
  attendanceController.saveAttendanceStatus
);
module.exports = router;
