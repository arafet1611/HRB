const mongoose = require('mongoose')
const attendanceSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Present', 'Absent', 'Late'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  percentage:{
    type:Number,
  }
})
const attendance = mongoose.model('Attendance', attendanceSchema)

module.exports = attendance