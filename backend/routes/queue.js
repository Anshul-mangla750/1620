const express = require('express');
const router = express.Router();
const { Queue, Department } = require('../models/queue.js');

// Home page (OPD Management)
router.get('/', async (req, res) => {
  try {
    let data = await Queue.find();
    console.log(data);
    res.render("index.ejs", { patients: data });
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/new', (req, res) => {
  res.render('newPatient.ejs');
});

router.post('/', async (req, res) => {
  let {name, phone, department, appointmentTime, status, priority, waitTime, position} = req.body;
  // Generate a unique id using timestamp
  let uniqueId = `T${Date.now()}`;
  let queue = new Queue({
    id: uniqueId,
    name,
    phone,
    department,
    appointmentTime,
    status,
    priority,
    waitTime,
    position
  });
  try {
    await queue.save();
    console.log("Patient added successfully");
    res.redirect('/queue');
  } catch (err) {
    console.error("Error adding patient:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Edit Patient
router.get('/:id/edit', async (req, res) => {
  try {
    const patient = await Queue.findOne({ id: req.params.id });
    if (!patient) {
      return res.status(404).send("Patient not found");
    }
    res.render('editPatient.ejs', { patient });
  } catch (err) {
    console.error("Error fetching patient:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Update Patient (PUT request)
router.put('/:id', async (req, res) => {
  const { name, phone, department, appointmentTime, status, priority, waitTime, position } = req.body;
  try {
    await Queue.findOneAndUpdate(
      { id: req.params.id },
      { name, phone, department, appointmentTime, status, priority, waitTime, position },
      { new: true }
    );
    res.redirect('/queue');
  } catch (err) {
    console.error("Error updating patient:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Patient
router.post('/:id/delete', async (req, res) => {
  try {
    await Queue.deleteOne({ id: req.params.id });
    res.redirect('/queue');
  } catch (err) {
    console.error("Error deleting patient:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Departments routes
router.get('/departments', async (req, res) => {
  try {
    const data = await Department.find();
    res.render('departments.ejs', { departments: data });
  } catch (err) {
    console.error("Error fetching departments:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
