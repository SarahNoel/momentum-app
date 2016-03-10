var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
  name: String,
  created: Object,
  deadline: Object,
  lastDay: Object,
  description: String,
  completed: { type : Boolean, default: false },
  streak: { type : Number, default: 0 },
  longestStreak: { type : Number, default: 0 }
});

module.exports = mongoose.model('items', Item);
