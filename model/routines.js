const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routineSchema = new Schema({
  day: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  className: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  teacherId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
},{
  timestamps: true
});

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;