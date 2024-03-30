const jwt = require('jsonwebtoken');
const express = require("express");
const Student = require("../model/students");
require('dotenv').config();

// const jwt = require('jsonwebtoken');
const LoginRouter = express.Router();

const crypto = require('crypto');

// Generate a random key
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);



function generateToken(user) {
    return jwt.sign(
      { id: user._id, username: user.username },
      secretKey,
      { expiresIn: '1h' }
    );
  }
  
LoginRouter.post('/', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Student.findOne({ username, password });
  
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
  
      // Generate JWT token upon successful authentication
      const token = generateToken(user);
      console.log(token);

  
      res.json({ token,user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  LoginRouter.get("/:username", async (req, res) => {
    try {
      const username = req.params.username;
      console.log(username);
      const user = await Student.findOne({ username }); // Assuming User is your Mongoose model
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  module.exports = LoginRouter;
