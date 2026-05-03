const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req,res)=>{
  const hashed = await bcrypt.hash(req.body.password,10);
  const user = await User.create({...req.body,password:hashed});
  res.json(user);
});

// LOGIN
router.post('/login', async (req,res)=>{
  const user = await User.findOne({email:req.body.email});
  if(!user) return res.send("User not found");

  const match = await bcrypt.compare(req.body.password,user.password);
  if(!match) return res.send("Wrong password");

  const token = jwt.sign({id:user._id}, 'secret');
  res.json({token});
});

module.exports = router;