const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const path = require('path');

// ✅ Render-safe middleware import
const auth = require(path.join(__dirname, '../middleware/auth.js'));

// =====================
// CREATE LEAD
// =====================
router.post('/', auth, async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// GET ALL LEADS
// =====================
router.get('/', auth, async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// UPDATE LEAD STATUS
// =====================
router.put('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;