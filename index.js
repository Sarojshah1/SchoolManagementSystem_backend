const express = require("express");
const { connectionmongoDB } = require("./connection");
const router = require("./routes/routine");
const Userrouter = require("./routes/user");
const Studentrouter = require("./routes/Students");
const Feerouter = require("./routes/fees");
const Paymentrouter = require("./routes/payment");
const Assignmentrouter = require("./routes/Assignment");
const Attendancerouter = require("./routes/attendance");
const Subjectrouter = require("./routes/subject");
const Resultrouter = require("./routes/result");
const Loginrouter = require("./routes/login");
const StudentAttendancerouter = require("./routes/studentAttendance");
const app = express();
const port = 7000;
connectionmongoDB("mongodb://localhost:27017/SchoolManagement");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// routine api
app.use("/routine", router);
app.use("/routine/:day", router);
app.use("/Add_routine", router);
app.use("/update_routine/:id", router);
app.use("/delete_routine/:id", router);
// teacher auth
app.use("/users", Userrouter);
app.use("/Add_User", Userrouter);
app.use("/update_User/:id", Userrouter);
app.use("/delete_User/:id", Userrouter);

// Student Auth

app.use("/Students", Studentrouter);
app.use("/Student", Loginrouter);
app.use("/Student/login", Loginrouter);
app.use("/Add_Students", Studentrouter);
app.use("/update_Students/:id", Studentrouter);
app.use("/delete_Students/:id", Studentrouter);

// Fees api
// Fees api

app.use("/fee", Feerouter);
// app.use("/fee/:", Feerouter);
app.use("/Add_Fees", Feerouter);
app.use("/update_Fee/:id", Feerouter);
app.use("/delete_Fee/:id", Feerouter);

// add subject api
app.use("/Add_Subject", Subjectrouter);


// Payment api

app.use("/Payments", Paymentrouter);
app.use("/Payment/:id", Paymentrouter);
app.use("/Add_Payment", Paymentrouter);
app.use("/Add_Payment/:id", Paymentrouter);
app.use("/update_Payment/:id", Paymentrouter);
app.use("/delete_Payment/:id", Paymentrouter);

// Assignment api

app.use("/assignment", Assignmentrouter);
app.use("/assignment/:class", Assignmentrouter);
app.use("/Add_assignment", Assignmentrouter);

// Attendance api

app.use("/attendances", Attendancerouter);
app.use("/classattendances", Attendancerouter);
app.use("/studentattendance", StudentAttendancerouter);
app.use("/Add_attendance", Attendancerouter);


// results
// app.use("/marks", Resultrouter);
app.use("/Add_marks", Resultrouter);
app.use("/results", Resultrouter);
app.use("/result/:studentId", Resultrouter);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ success: false, message: "Internal server error" });
// });

app.listen(port, () => console.log(`Starting app at ${port}`));
