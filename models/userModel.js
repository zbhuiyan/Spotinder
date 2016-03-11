// models/userModel.js
//storage collection model file for specifying user stored data structure

var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt');

var User = mongoose.Schema({
  username: {
    type: String
  },
  userid:{
    type: String,
    required: true
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

module.exports = mongoose.model("users", User);
