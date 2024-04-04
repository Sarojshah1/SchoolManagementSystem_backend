const express = require("express");
const Result = require("../model/result");
const ResultRouter = express.Router();

ResultRouter.post("/", async (req, res) => {
  try {
    const results = req.body; // Array of objects containing studentId, subjectId, term, and marks
    console.log(results);

    // Check if the request body contains data
    if (!results || !Array.isArray(results) || results.length === 0) {
      console.log("Please provide data in the correct format.");
      return res
        .status(400)
        .json({ message: "Please provide data in the correct format." });
    }

    // Iterate over each result object and create a new mark for each one
    const createdResults = [];
    for (const result of results) {
      const { studentId, subjectId, term, marks } = result;

      // Check if required fields are provided
      if (!studentId || !subjectId || !term || !marks) {
        return res
          .status(400)
          .json({
            message:
              "Each data object must contain studentId, subjectId, term, and marks.",
          });
      }

      // Create a new mark with provided data
      const mark = new Result({ studentId, subjectId, term, marks });
      await mark.save();
      createdResults.push(mark);
    }

    res.status(201).json(createdResults);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get marks for a student
ResultRouter.get("/", async (req, res) => {
  try {
    const marks = await Result.find()
      .populate("studentId")
      .populate("subjectId");
    res.json(marks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = ResultRouter;
