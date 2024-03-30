const express = require("express");
const StudentAttendancerouter = express.Router();
const Attendance = require("../model/attendance");
const Student = require("../model/students");

StudentAttendancerouter.get("/:username", async (req, res) => {
    try {
      const { username } = req.params;
      console.log(username);
  
      if (!username) {
        return res.status(400).json({
          success: false,
          message: "Username is required as a query parameter",
        });
      }
  
      // Find the studentId associated with the provided username
      const student = await Student.findOne({ username }).exec();
  
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found with the provided username",
        });
      }
  
      // Retrieve attendance records for the student based on their studentId
      const attendances = await Attendance.find({ studentId: student._id }).exec();
      res.json({ success: true, attendances });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  

module.exports = StudentAttendancerouter;
