const express = require('express');
const Assignmentrouter = express.Router();
const Assignment = require('../model/Assignment');

// Get all assignments
Assignmentrouter.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});// Get all assignments
Assignmentrouter.get('/', async (req, res) => {
  try {
      console.log('Class Query Parameter:', req.params.class);
  
      let assignments;
      
      if (req.params.class) {
        assignments = await Assignment.find({ class: req.params.class});
      } else {
        assignments = await Assignment.find();
      }
  
      console.log('Retrieved Assignments:', assignments);
      res.json(assignments);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ message: error.message });
    }
});

// Create a new assignment
Assignmentrouter.post('/', async (req, res) => {
  const { subject, teacherId, title, description, dueDate, className } = req.body;

  try {
    const assignment = new Assignment({
      subject,
      teacherId,
      title,
      description,
      dueDate,
      className,
    });

    const newAssignment = await assignment.save();
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = Assignmentrouter;