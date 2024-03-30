const express = require("express");
const Attendancerouter = express.Router();
const Attendance = require("../model/attendance");
const {
  validateAttendanceInput,
} = require("../middlewares/attendancemiddlewares");

Attendancerouter.post("/", validateAttendanceInput, async (req, res) => {
    try {
      const { attendances } = req.body;
      const currentDate = new Date().toLocaleDateString(); // Get the current date
  
      // Check if attendance is already recorded for today and the given class
      const existingAttendance = await Attendance.findOne({
        date: currentDate,
        className: attendances[0].className, // Assuming all attendances in the request belong to the same class
      });
  
      if (existingAttendance) {
        return res.status(400).json({
          success: false,
          message: `Attendance for class ${attendances[0].className} is already recorded for today`,
        });
      }
  
      // Create new attendance records
      const newAttendances = attendances.map(({ studentId, className, isPresent }) => ({
        studentId,
        className,
        isPresent: isPresent !== undefined ? isPresent : false,
        date: currentDate,
      }));
  
      await Attendance.insertMany(newAttendances);
  
      res.json({ success: true, message: "Attendance recorded successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

Attendancerouter.get("/:class", async (req, res) => {
    try {
      const { class:className } = req.params;
      console.log(className);
  
      if (!className) {
        return res.status(400).json({
          success: false,
          message: "Class name is required as a query parameter",
        });
      }
  
      const attendances = await Attendance.find({ className }).exec();
      res.json({  attendances });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });



module.exports = Attendancerouter;
