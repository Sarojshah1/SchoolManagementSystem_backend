const mongoose = require("mongoose");

const markSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  term: Number,
  marks: Number,
  // Add more fields as needed
});

const Mark = mongoose.model("Mark", markSchema);
module.exports = Mark;