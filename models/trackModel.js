// models/topicModel.js
//storage collection model file for specifying topic stored data structure

var mongoose = require('mongoose');

var track = mongoose.Schema({
  user:{
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },  
  created: {
    type: Date,
    required: true,
    default: new Date()
  }
});

module.exports = mongoose.model("track", track);