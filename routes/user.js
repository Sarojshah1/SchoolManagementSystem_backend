const express = require("express");
const User=require("../model/User");
const UserRouter = express.Router();

UserRouter.post("/", async (req, res) => {
  try {
    const {
      fullname,
      phonenumber,
      role,
      subject,
      gender,
      className,
      address,
      dateofbirth,
      password,
    } = req.body;
    const currentYear = new Date().getFullYear();
    let counter = 1;

    // Check if the generated username already exists
    while (true) {
      const username = `${currentYear}${counter.toString().padStart(3, "0")}`;
      const existingUser = await User.findOne({ username });

      if (!existingUser) {
        break;
      }
      counter++;
    }

    const newUser = new User({
      fullname,
      phonenumber,
      role,
      subject,
      gender,
      className,
      address,
      dateofbirth,
      username: `teacher${currentYear}${counter.toString().padStart(3, "0")}`,
      password,
    });

    await newUser.save();

    res.json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
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


UserRouter.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.json({user: data});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

UserRouter.put("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const {new_password}=req.body; // Extract username from the request parameters
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

UserRouter.delete("/", async (req, res) => {
  try {
    await User.deleteOne(req.params.id);
    res.json({ message: "Data deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports=UserRouter;