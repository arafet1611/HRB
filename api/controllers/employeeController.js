const Employee = require("../model/employeeModel");

const getEmployeeList = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    console.error("Error getting employees list:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.error("Error getting employee:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      department,
      jobTitle,
      experience,
      password,
      phoneNumber,
    } = req.body;
    const newEmployee = new Employee({
      name,
      email,
      department,
      jobTitle,
      experience,
      password,
      phoneNumber,
    });
    await newEmployee.save();
    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      department,
      jobTitle,
      experience,
      password,
      phoneNumber,
    } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        department,
        jobTitle,
        experience,
        password,
        phoneNumber,
      },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getEmployeeList,
  getEmployeeById,
  deleteEmployee,
  createEmployee,
  updateEmployee,
};
