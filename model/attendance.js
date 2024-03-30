const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isPresent: {
      type: Boolean,
      default: false,
    },
  });
  
  const Attendance = mongoose.model('Attendance', attendanceSchema);

  module.exports = Attendance;