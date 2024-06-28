const express = require('express');

const router = express.Router();

const carrierController = require('../controllers/carrierController');

// Get all carriers
router.get('/', carrierController.getAllCarriers);

// Update carrier location
router.patch('/:id', carrierController.updateCarrierLocation);

module.exports = router;
