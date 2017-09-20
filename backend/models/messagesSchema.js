// models/race.js
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title: { type: String, required: false },
  message: { type: String, required: false },
  secret: { type: String, required: false },
  id: {type: Date, default: Date.now}
});

var Messages = mongoose.model('message_collections', schema);

module.exports = Messages;
