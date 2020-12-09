const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonutPromiseSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  amount: {
    type: Number,
    required: true
  }
});

module.exports = Item = mongoose.model('promise', DonutPromiseSchema);