const Routine = require("../model/routines");

async function handlecreateRoutine(req, res) {
  const newData = new Routine({
    day: req.body.day,
    time: req.body.time,
    className: req.body.className,
    subject: req.body.subject,
    teacherId: req.body.teacherId,
  });

  try {
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function handleGetRoutine(req, res) {
  try {
    const data = await Routine.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function handleGetRoutineByDay(req, res) {
  const day = req.params.day;
  try {
    const data = await Routine.find({ day: day });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function handleUpdateRoutine(req, res) {
  const day = req.params.day;
  try {
    const data = await Routine.find({ day: day }).populate("teacherId");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function handleDeleteRoutine(req, res) {
  const day = req.params.day;
  try {
    const data = await Routine.find({ day: day }).populate("teacherId");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  handlecreateRoutine,
  handleGetRoutine,
  handleGetRoutineByDay,
  handleUpdateRoutine,
  handleDeleteRoutine,
};
