const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    // You can add more fields if needed, such as timestamp, user_id, etc.
    // For simplicity, only token is included in this example.
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
