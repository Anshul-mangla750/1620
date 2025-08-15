const express = require('express');
const router = express.Router();
const Bed  = require('../models/bed.js');

// Get all beds
router.get('/', async (req, res) => {
    try {
        const beds = await Bed.find();
        res.render('beds.ejs', { beds, title:"Bed Management" });
    } catch (err) {
        console.error("Error fetching beds:", err);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/new', (req, res) => {
  res.render('newBed.ejs', {title:"Bed Management"});
});

router.post('/', async (req, res) => {
  try {
    const {
      bedId,
      ward,
      floor,
      room,
      status,
      patientName,
      patientId,
      doctor,
      condition,
      admitDate,
      dischargeDate
    } = req.body;

    // Build patient object only if status is occupied and patient info is provided
    const patient = (status === 'occupied' && patientName && patientId)
      ? { name: patientName, id: patientId }
      : undefined;

    const newBed = new Bed({
      bedId,
      ward,
      floor,
      room,
      status,
      patient,
       doctor,
      condition,
      admitDate: admitDate ? new Date(admitDate) : undefined,
      dischargeDate: dischargeDate ? new Date(dischargeDate) : undefined
    });

    await newBed.save();
    res.redirect('/beds');
  } catch (err) {
    console.error("Error adding bed:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Edit Bed - Render Edit Form
router.get('/:id/edit', async (req, res) => {
  try {
    const bed = await Bed.findById(req.params.id);
    if (!bed) return res.status(404).send("Bed not found");
    res.render('editBed.ejs', { bed, title:"Bed Management" });
  } catch (err) {
    console.error("Error fetching bed:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Update Bed
router.put('/:id', async (req, res) => {
  try {
    const {
      bedId,
      ward,
      floor,
      room,
      status,
      patientName,
      patientId,
      doctor,
      condition,
      admitDate,
      dischargeDate
    } = req.body;

    const patient = (status === 'occupied' && patientName && patientId)
      ? { name: patientName, id: patientId }
      : undefined;

    await Bed.findByIdAndUpdate(req.params.id, {
      bedId,
      ward,
      floor,
      room,
      status,
      patient,
      doctor,
      condition,
      admitDate: admitDate ? new Date(admitDate) : undefined,
      dischargeDate: dischargeDate ? new Date(dischargeDate) : undefined
    });

    res.redirect('/beds');
  } catch (err) {
    console.error("Error updating bed:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Bed
router.delete('/:id', async (req, res) => {
  try {
    await Bed.findByIdAndDelete(req.params.id);
    res.redirect('/beds');
  } catch (err) {
    console.error("Error deleting bed:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Add more routes as needed

module.exports = router;
