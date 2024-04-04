const express = require("express");
const Subject = require("../model/subject");
const SubjectRouter = express.Router();

SubjectRouter.post("/", async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json(subject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
SubjectRouter.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = SubjectRouter;