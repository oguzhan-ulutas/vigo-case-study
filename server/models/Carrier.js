const mongoose = require('mongoose');

const carrierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ['idle', 'found', 'accepted', 'rejected', 'arrived'],
    default: 'idle',
  },
});

const Carrier = mongoose.model('Carrier', carrierSchema);

module.exports = Carrier;
