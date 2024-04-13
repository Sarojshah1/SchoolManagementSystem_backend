const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  phonenumber: { type: String, required: true },
  role: { type: String, required: true },
  subject: { type: String, required: true },
  gender: { type: String, required: true },
  className: { type: String, required: true },
  address: { type: String, required: true },
  dateofbirth: { type: Date, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
