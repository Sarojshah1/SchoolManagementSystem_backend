const express = require("express");
const User=require("../model/User");
const UserRouter = express.Router();

UserRouter.post("/", async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.json(savedUser);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
});

UserRouter.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

UserRouter.put("/", async (req, res) => {
  try {
    const updatedData = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
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