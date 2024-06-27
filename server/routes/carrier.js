const express = require('express');
const router = express.Router();
const Carrier = require('../models/Carrier');

// Get all carriers
router.get('/', async (req, res) => {
  try {
    const carriers = await Carrier.find();
    res.json(carriers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update carrier location
router.patch('/:id', async (req, res) => {
  try {
    const carrier = await Carrier.findById(req.params.id);
    if (carrier == null) {
      return res.status(404).json({ message: 'Cannot find carrier' });
    }

    if (req.body.location != null) {
      carrier.location = req.body.location;
    }

    const updatedCarrier = await carrier.save();
    res.json(updatedCarrier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add new carrier (optional for initial setup)
router.post('/', async (req, res) => {
  const carrier = new Carrier({
    name: req.body.name,
    location: req.body.location,
    phoneNumber: req.body.phoneNumber
  });

  try {
    const newCarrier = await carrier.save();
    res.status(201).json(newCarrier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
