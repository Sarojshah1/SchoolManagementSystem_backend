const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  className: { type: String, required: true }, 
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;