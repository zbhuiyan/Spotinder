// models/topicModel.js
//storage collection model file for specifying topic stored data structure

var mongoose = require('mongoose');

var track = mongoose.Schema({
  user:{
    type: Array
  },
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
  },  
  created: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("track", track);