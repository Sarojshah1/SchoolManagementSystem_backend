require('dotenv').config();
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
const TeacherLoginrouter = require("./routes/loginteacher");
const StudentAttendancerouter = require("./routes/studentAttendance");
const otprouter = require("./routes/otp");
const verifyrouter = require("./routes/verifyotp");
const pushNotificationRoute = require("./routes/notifications");
const http = require("http");
const WebSocket = require("ws");


const app = express();
const port = process.env.PORT || 7000;
connectionmongoDB("mongodb+srv://sarojshah2326:QZWUpIUWjztdYNiO@cluster0.bxqxhex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(message) {
        console.log("Received: %s", message);
    });

    ws.send("Connected to push notification server");
});
// routine api
app.use("/routine", router);
app.use("/routine/:day", router);
app.use("/Add_routine", router);
app.use("/update_routine/:id", router);
app.use("/delete_routine/:id", router);
// teacher auth
app.use("/users", Userrouter);
app.use("/user", TeacherLoginrouter);
app.use("/users/login", TeacherLoginrouter );
app.use("/Add_User", Userrouter);
app.use("/update_User", Userrouter);
app.use("/delete_User/:id", Userrouter);

// Student Auth

app.use("/Students", Studentrouter);
app.use("/Student", Loginrouter);
app.use("/Student/login", Loginrouter);
app.use("/Add_Students", Studentrouter);
app.use("/update_Students", Studentrouter);
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
app.use("/Subjects", Subjectrouter);


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

app.use("/otp", otprouter);
app.use("/verify", verifyrouter);
// app.use("/send-notification", pushNotificationRoute);
app.post("/send-notification", (req, res) => {
    const { message } = req.body;

    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });

    res.status(200).send("Notification sent successfully");
});



app.listen(port, () => console.log(`Starting app at ${port}`));
