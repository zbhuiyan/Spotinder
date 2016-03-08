// models/userModel.js
//storage collection model file for specifying user stored data structure

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

var User = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// generating a hash
User.methods.generateHash = function(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        resolve(hash);
      });
    });
  });
};

// checking if password is valid
User.methods.validPassword = function(password) {
  var hash = this.password;
  return new Promise(function(resolve, reject) {
    console.log(password);
    console.log(hash);
    bcrypt.compare(password, hash, function(err, res) {
      resolve(res);
    });
  });
};

module.exports = mongoose.model("users", User);