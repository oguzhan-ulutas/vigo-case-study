const mongoose = require('mongoose');

const carrierSchema = new mongoose.Schema({
  name: String,
  location: {
    lat: Number,
    lng: Number,
  },
  phoneNumber: String,
});

const Carrier = mongoose.model('Carrier', carrierSchema);

module.exports = Carrier;
