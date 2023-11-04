const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const isLoggedIn = require("../middleWares/AuthMiddleWare");
const isAdmin = require("../middleWares/adminMiddleWare");
router.get("/", isLoggedIn, isAdmin, employeeController.getEmployeeList);
router.get("/:id", isLoggedIn, isAdmin, employeeController.getEmployeeById);
router.delete("/:id", isLoggedIn, isAdmin, employeeController.deleteEmployee);
router.post("/", isLoggedIn, isAdmin, employeeController.createEmployee);
router.put("/:id", isLoggedIn, isAdmin, employeeController.updateEmployee);

module.exports = router;
