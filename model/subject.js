const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: String,
  // Add more fields as needed
});

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
