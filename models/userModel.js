// models/userModel.js
//storage collection model file for specifying user stored data structure

var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt');

var user = mongoose.Schema({
  username: {
    type: String
  },
  like:{
    type: Array
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("user", user);
