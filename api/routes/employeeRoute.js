const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/", employeeController.getEmployeeList);
router.get("/:id", employeeController.getEmployeeById);
router.delete("/:id", employeeController.deleteEmployee);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.updateEmployee);

module.exports = router;
