const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  image: String,
  status: {
    type: String,
    default: "Available"
  }
});

module.exports = mongoose.model('Property', PropertySchema);