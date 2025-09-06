const express = require('express');
const Flight = require('../models/Flight');
const auth = require('../middleware/auth');
const router = express.Router();

// Admin CRUD
router.post('/', auth('admin'), async (req, res) => res.json(await Flight.create(req.body)));
router.get('/', auth(), async (req, res) => res.json(await Flight.find()));
router.put('/:id', auth('admin'), async (req, res) => res.json(await Flight.findByIdAndUpdate(req.params.id, req.body)));
router.delete('/:id', auth('admin'), async (req, res) => res.json(await Flight.findByIdAndRemove(req.params.id)));

// Filter
router.get('/search', auth(), async (req, res) => {
  const { from, to, journeyDateTime } = req.query;
  res.json(await Flight.find({ from, to, journeyDateTime }));
});

module.exports = router;
