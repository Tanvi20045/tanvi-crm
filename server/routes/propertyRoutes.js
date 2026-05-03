const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// ADD PROPERTY
router.post('/', async (req, res) => {
  const property = new Property(req.body);
  await property.save();
  res.json(property);
});

// GET ALL PROPERTIES
router.get('/', async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

module.exports = router;
// UPDATE PROPERTY
router.put('/:id', async (req, res) => {
  const updated = await Property.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});