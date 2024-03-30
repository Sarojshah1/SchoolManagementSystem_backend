const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullname: { type: String,  },
  gender: { type: String,  },
  className: { type: String,  },
  parents: { type: String,  },
  address: { type: String,  },
  dateofbirth: { type: Date, },
  phone: { type: String,  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
