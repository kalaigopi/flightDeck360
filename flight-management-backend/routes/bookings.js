const express = require('express');
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const auth = require('../middleware/auth');
const router = express.Router();

// Passenger: create booking
router.post('/', auth(), async (req, res) => {
  const booking = await Booking.create({ ...req.body, passenger: req.user.id });
  res.json(booking);
});

// Passenger/Admin: view bookings
router.get('/', auth(), async (req, res) => {
  const query = req.user.role === 'admin' ? {} : { passenger: req.user.id };
  res.json(await Booking.find(query).populate('flight'));
});

// Admin: update status
router.patch('/:id/status', auth('admin'), async (req, res) => {
  res.json(await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }));
});

module.exports = router;
