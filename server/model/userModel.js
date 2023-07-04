const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  RegisteredDate: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
