const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  date: { type: String, required: true },
  slots: { type: [String], default: [] }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
