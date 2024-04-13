const express = require("express");
const Student = require("../model/students");
const jwt = require('jsonwebtoken');
const StudentRouter = express.Router();


StudentRouter.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ success: true, students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


StudentRouter.post("/", async (req, res) => {
  try {
    const {
      fullname,
      gender,
      className,
      parents,
      address,
      dateofbirth,
      phone,
      password,
    } = req.body;
    const currentYear = new Date().getFullYear();
    let counter = 1;

    // Check if the generated username already exists
    while (true) {
      const username = `${currentYear}${counter.toString().padStart(3, "0")}`;
      const existingUser = await Student.findOne({ username });

      if (!existingUser) {
        break;
      }
      counter++;
    }

    const newStudent = new Student({
      fullname,
      gender,
      className,
      parents,
      address,
      dateofbirth,
      phone,
      username: `${currentYear}${counter.toString().padStart(3, "0")}`,
      password,
    });

    await newStudent.save();

    res.json({
      success: true,
      message: "Student created successfully",
      student: newStudent,
    });
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyValue &&
      error.keyPattern.username === 1
    ) {
      res
        .status(400)
        .json({
          success: false,
          message: "Duplicate username. Please try again.",
        });
    } else {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
});

StudentRouter.put("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username);
    const {new_password}=req.body;
    console.log(new_password);
    const updatedData = await User.findOneAndUpdate(
      { username: username }, 
      { password: new_password },// Find user by username
      { new: true }
    );
    res.json(updatedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

StudentRouter.delete("/", async (req, res) => {
  try {
    await Student.deleteOne(req.params.id);
    res.json({ message: "Data deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});






module.exports = StudentRouter;
