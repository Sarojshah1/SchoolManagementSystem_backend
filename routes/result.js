const express = require("express");
const Result = require("../model/result");
const ResultRouter = express.Router();

ResultRouter.post("/", async (req, res) => {
    try {
      const { studentId, subjectId, term, marks } = req.body;
  
      // Check if required fields are provided
      if (!studentId || !subjectId || !term || !marks) {
        return res.status(400).json({ message: "Please provide studentId, subject, term, and marks." });
      }
  
      // Create a new mark with provided data
      const mark = new Result({ studentId, subjectId, term, marks });
      await mark.save();
  
      res.status(201).json(mark);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Route to get marks for a student
ResultRouter.get("/", async (req, res) => {
    try {
        const marks = await Result.find().populate('studentId').populate('subjectId');
        res.json(marks);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});





module.exports = ResultRouter;
