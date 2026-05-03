const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const auth = require('../middleware/auth');

// CREATE LEAD
router.post('/', auth, async (req,res)=>{
  const lead = await Lead.create(req.body);
  res.json(lead);
});

// GET LEADS
router.get('/', auth, async (req,res)=>{
  const leads = await Lead.find();
  res.json(leads);
});

// UPDATE STATUS
router.put('/:id', auth, async (req,res)=>{
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body);
  res.json(lead);
});

module.exports = router;