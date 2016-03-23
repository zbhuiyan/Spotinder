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
      // console.log("user");
      // console.log(user);
      // console.log(err);

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

  
      User.find({username: req.body.display_name}, function(err, users) {
        // console.log("users.length:");
        // console.log(users.length);
        // console.log(err);
      switch(users.length) {
        case 0: //Topic does not exist; create it!
          User.create({
            username: req.body.display_name,
            like: [],
          }, confirm);
          break;
        case 1: //Topic exists: edit it!
          var user = users[0];
          // console.log("find the user: " + user.display_name)        
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
      // console.log("track");
      // console.log(track);
      // console.log(err);

      // Track.find(function(err, tracks) {
      // if (err) {
      //   console.log("ERROR: Cannot retrieve users")
      //   res.status(404);
      // }
      // console.log("addLike confirm");
      // console.log(tracks);

      // res.json({
      //   success: true,
      //   traks: tracks
      // });
      
      // });
    };

var userConfirm = function (err, user) {
      // console.log("user");
      // console.log(user);
      // console.log(err);

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
        // console.log("tracks.length:");
        // console.log(tracks.length);
        // console.log(err);
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
        // console.log("users.length:");
        // console.log(users.length);
        // console.log(err);
        if(users.length < 1){
          res.status(500).send({
            success: false,
            message: 'ERROR: User stored incorrectly'
          });          
        }     
        var user = users[0];
        // console.log("find the user: " + user.display_name);
        // console.log("req.body.name: " + req.body.name); 
        if(!user.like.contains(req.body.name)){
            user.like.push(req.body.name);            
          }          
        user.save(userConfirm);
      // }
    });


  },
  

  getLikes: function(req, res){
    // console.log("req.params.userame: " + req.params.username); 

    User.find({username: req.params.username}, function(err, users) {
        // console.log("users.length:");
        // console.log(users.length);
        // console.log(err);
        if(users.length < 1){
          res.status(500).send({
            success: false,
            message: 'ERROR: User stored incorrectly'
          });          
        }     
        var user = users[0];
        // console.log("find the user: " + user.username);
        res.json({
          success: true,
          user: user
        });
    });

  },


  match: function(req, res){
    // console.log(req.query.like);
    var matchUsers = [];
    // var count = 0;

    // async.parallel([
    //     function(callback){
    //       console.log("A");

    //       req.query.like.forEach(function(trackName){
    //         Track.find({name: trackName}, function(err, tracks) {
    //           var track = tracks[0];
    //           matchUsers.push.apply(matchUsers, track.user);
    //           // count ++;
    //           console.log(matchUsers.length);
    //         }); 
    //       });

    //       callback(null, matchUsers);
    //     }
    // ],
    // function(err, results){
    //   console.log("final: " + matchUsers.length);  
    //   console.log("results: " + results);    

    // });

    var count = 0;
    var trackFindingFunctions = [];
    req.query.like.forEach(function(trackName){
      trackFindingFunctions.push(function(callback){
        Track.find({name: trackName}, function(err, tracks){
          var track = tracks[0];
          matchUsers.push.apply(matchUsers, track.user);
          count ++;
          console.log(count);
        });
        callback(null, null);
      }); 
    });
    async.parallel(trackFindingFunctions, function(err, results){
      console.log(matchUsers);
      console.log('final')
    });


      var matchUsersMap = [ { username:'Anne', matchedLikes: 4 },   { username: 'Yuki', matchedLikes: 8}, { username: 'Michael Dan', matchedLikes: 6} ];

      res.json({
          success: true,
          users: matchUsersMap,
          totalLikes: req.query.like.length
        });
    }

// ------------------------------------------------------------------------------------------------------------------------------------------------------
  // getTopic: function(req, res) {
  //   Topic.findOne({url: req.params.topic_url}, function (err, topic) {
  //     if (err) {
  //       return res.send({
  //         success: false,
  //         message: 'ERROR: Could not create topic'
  //       });
  //     }
  //     return res.send({
  //       success: true,
  //       title: topic.title,
  //       url: topic.url,
  //       content: topic.content
  //     });
  //   });
  // },
  // getTopicList: function(req, res) {
  //   Topic.find(function(err, topics) {
  //     if (err) {
  //       console.log("ERROR: Cannot retrieve topics")
  //       res.status(404);
  //     }
  //     var topicHeaders = [];
  //     for (var i = 0; i < topics.length; i++) {
  //       topicHeaders.push({
  //         title: topics[i].title,
  //         url: topics[i].url
  //       });
  //     }
  //     res.status(200).json(topicHeaders);
  //   });
  // },
  // editTopic: function(req, res) {
  //   function confirm(err, topic) {
  //     if (err) {
  //       return res.send({
  //         success: false,
  //         message: 'ERROR: Could not create topic'
  //       });
  //     }
  //     return res.send({
  //       success: true,
  //       title: topic.title,
  //       url: topic.url,
  //       content: topic.content
  //     });
  //   }
  //   Topic.find({url: req.params.topic_url}, function(err, topics) {
  //     switch(topics.length) {
  //       case 0: //Topic does not exist; create it!
  //         Topic.create({
  //           user: req.user._id,
  //           title: req.body.title.trim(),
  //           url: req.body.title.trim().replace(/ /g,"_"),
  //           content: req.body.content
  //         }, confirm);
  //         break;
  //       case 1: //Topic exists: edit it!
  //         var topic = topics[0];
  //         if (topic.user.toString() == req.user._id.toString()) {
  //           topic.title = req.body.title.trim();
  //           topic.url = req.body.title.trim().replace(/ /g,"_");
  //           topic.content = req.body.content;
  //           topic.save(confirm);
  //         } else {
  //           res.status(401).send({
  //             success: false,
  //             message: 'ERROR: Not your topic'
  //           });
  //         }
  //         break;
  //       default: //Either the topic exists or it doesn't. Something is broken.
  //         res.status(500).send({
  //           success: false,
  //           message: 'ERROR: Topic stored incorrectly'
  //         });
  //     }
  //   });
  // },
  // deleteTopic: function(req, res) {
  //   Topic.findOne({url: req.params.topic_url}).remove(function (err) {
  //     if (err) {
  //       return res.send({
  //         success: false,
  //         message: 'ERROR: Could not delete topic'
  //       });
  //     }
  //     return res.send({
  //       success: true
  //     });
  //   });
  // }
}

module.exports = routes;