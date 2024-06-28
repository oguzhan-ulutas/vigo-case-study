const Carrier = require('../models/Carrier');

// Get all carriers
exports.getAllCarriers = async (req, res) => {
  try {
    const carriers = await Carrier.find();

    res.json(carriers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update carrier location
exports.updateCarrierLocation = async (req, res) => {
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
};
