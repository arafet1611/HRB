const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
router.post("/", attendanceController.saveAttendanceStatus);
module.exports = router;
