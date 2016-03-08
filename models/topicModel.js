// models/topicModel.js
//storage collection model file for specifying topic stored data structure

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Topic = mongoose.Schema({
  user:{
    type: ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },  
  content: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: new Date()
  }
});

module.exports = mongoose.model("topic", Topic);