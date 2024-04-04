const express = require("express");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const OTP = require("../model/otp");
require("dotenv").config();
const verifyrouter = express.Router();
verifyrouter.post("/", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await OTP.findOne({ email: email });
    if (!user || user.otp !== otp || user.otpExpiration < new Date()) {
      res.status(401).json({ message: "Invalid OTP" });
    } else {
      res.status(200).json({ message: "OTP verified successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to verify OTP");
  }
});

module.exports =  verifyrouter;