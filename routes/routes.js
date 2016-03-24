//routes/routes.js

//main routing summary of app server side handling
var express = require('express');
var mongoose = require('mongoose');
var Track = require('../models/trackModel');
var User = require('../models/userModel');
var async = require('async');

// Track.find().remove().exec();


Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

var routes = {


  addUser: function(req, res){

   var confirm = function (err, user) {

      User.find(function(err, users) {
      if (err) {
        console.log("ERROR: Cannot retrieve users")
        res.status(404);
      }

      res.json({
        success: true,
        users: users
      });
      
      });
    };

  
      User.find({username: req.body.display_name}, function(err, users) {
      switch(users.length) {
        case 0: //Topic does not exist; create it!
          User.create({
            username: req.body.display_name,
            like: [],
          }, confirm);
          break;
        case 1: //Topic exists: edit it!
          var user = users[0];
          user.save(confirm);
          break;
        default: //Either the topic exists or it doesn't. Something is broken.
          res.status(500).send({
            success: false,
            message: 'ERROR: User stored incorrectly'
          });
      }
    });

  },




  addLike: function(req, res){

    var trackConfirm = function (err, track) {      
    };

    var userConfirm = function (err, user) {

      User.find(function(err, users) {
        if (err) {
          console.log("ERROR: Cannot retrieve users")
          res.status(404);
        }
        // console.log("addUser confirm");
        // console.log(users);

        res.json({
          success: true,
          users: users
        });
        });
      };
  
  
    Track.find({name: req.body.name, artist: req.body.artist}, function(err, tracks) {
      switch(tracks.length) {
        case 0: //Topic does not exist; create it!
          Track.create({
            user: [req.body.user],
            name: req.body.name,
            artist: req.body.artist
          }, trackConfirm);
          break;
        case 1: //Topic exists: edit it!
          var track = tracks[0];
            if(!track.user.contains(req.body.user)){
              track.user.push(req.body.user);            
            }          
            track.save(trackConfirm);
          break;
        default: //Either the topic exists or it doesn't. Something is broken.
          res.status(500).send({
            success: false,
            message: 'ERROR: Track stored incorrectly'
          });
      }
    });

    User.find({username: req.body.user}, function(err, users) {
        if(users.length < 1){
          res.status(500).send({
            success: false,
            message: 'ERROR: User stored incorrectly'
          });          
        }     
        var user = users[0];
        if(!user.like.contains(req.body.name)){
            user.like.push(req.body.name);            
          }          
        user.save(userConfirm);
    });


  },
  

  getLikes: function(req, res){

    User.find({username: req.params.username}, function(err, users) {
        if(users.length < 1){
          res.status(500).send({
            success: false,
            message: 'ERROR: User stored incorrectly'
          });          
        }     
        var user = users[0];
        res.json({
          success: true,
          user: user
        });
    });

  },


  match: function(req, res){
    var matchUsers = [];
    var matchUsersFreq = [];

    var count = 0;

    var trackFindingFunctions = [];
    req.query.like.forEach(function(trackName){
      trackFindingFunctions.push(function(callback){
        Track.find({name: trackName}, function(err, tracks){
          var track = tracks[0];
          matchUsers.push.apply(matchUsers, track.user);
          callback(null, null);
        });
        
      }); 
    });

    async.series(trackFindingFunctions, function(err, results){

      matchUsers.forEach(function(user){
        var exist = false;
        matchUsersFreq.forEach(function(obj){
          if(String(obj.username) == (String(user))){
            var userFreq = obj.matchedLikes;
            userFreq += 1;
            obj.username = user;
            obj.matchedLikes = userFreq;
            exist = true;
          };
        });

        if(! exist){
          var userFreq = 0;
          userFreq += 1;
          matchUsersFreq.push({username: user, matchedLikes: userFreq});
        }
        
      });
      res.json({
        success: true,
        users: matchUsersFreq,
        totalLikes: req.query.like.length
      });
    });

    }
}

module.exports = routes;