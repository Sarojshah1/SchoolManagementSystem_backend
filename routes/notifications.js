const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(message) {
        console.log("Received: %s", message);
    });

    ws.send("Connected to push notification server");
});


app.post("/send-notification", (req, res) => {
    const { message } = req.body;

    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });

    res.status(200).send("Notification sent successfully");
});


