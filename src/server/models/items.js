var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
  name: String,
  created: String,
  deadline: String,
  lastDay: String,
  description: String,
  completed: { type : Boolean, default: false },
  streak: { type : Number, default: 0 }
});

module.exports = mongoose.model('items', Item);
