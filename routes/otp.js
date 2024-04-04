const express = require('express');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const OTP=require("../model/otp");
require('dotenv').config();
const otprouter = express.Router();

const transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  otprouter.post('/', async (req, res) => {
    const { email } = req.body;
    console.log(email);
    const otp = randomstring.generate({ length: 6, charset: 'numeric' });
  
    // Save OTP and its expiration time to database
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 5); // OTP expires in 5 minutes
  
    try {
      await OTP.findOneAndUpdate(
        { email: email },
        { otp: otp, otpExpiration: otpExpiration },
        { upsert: true }
      );
  
      const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: 'Your OTP',
        text: `Your OTP is: ${otp}`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send('Failed to send OTP');
        } else {
          console.log('OTP sent successfully');
          res.status(200).send('OTP sent successfully');
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Failed to send OTP');
    }
  });


  module.exports =  otprouter;
  
