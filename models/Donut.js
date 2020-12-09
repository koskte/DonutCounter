const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonutSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    default: new Date()
  }
});

module.exports = Item = mongoose.model('item', DonutSchema);