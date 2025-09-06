const mongoose = require('mongoose');
const FlightSchema = new mongoose.Schema({
  flightNumber: String,
  flightName: String,
  from: String,
  to: String,
  journeyDateTime: Date
});
module.exports = mongoose.model('Flight', FlightSchema);
