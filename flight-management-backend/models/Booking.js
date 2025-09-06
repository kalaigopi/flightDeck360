const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  passenger: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
  totalPassengers: Number,
  assistanceRequired: Boolean,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
});
module.exports = mongoose.model('Booking', BookingSchema);
