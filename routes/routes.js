//routes/routes.js

//main routing summary of app server side handling
var express = require('express');
var mongoose = require('mongoose');
var Track = require('../models/trackModel');
var User = require('../models/userModel');

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

  // addUser: function(req, res){
  //   // User.find().remove().exec();

  //   var confirm = function (err, user) {
  //     console.log("save process");
  //     console.log(err);
  //     console.log(user);

  //     // if (err) {
  //     //   return res.send({
  //     //     success: false,
  //     //     message: 'ERROR: Could not create topic'
  //     //   });
  //     // }
  //     // return res.send({
  //     //   success: true,
  //     //   name: req.body.name,
  //     //   artist: req.body.artist,
  //     //   user: req.body.user
  //     // });
      
  //     User.find(function(err, users) {
  //     if (err) {
  //       console.log("ERROR: Cannot retrieve users")
  //       res.status(404);
  //     }
  //     res.json({
  //       success: true,
  //       users: users
  //     });
  //     });

  //   };

  //     var query = {'username':req.body.display_name};
  //     var newData = {
  //           username: req.body.display_name,
  //         }

  //     // console.log("newData: " + req.body.display_name);

  //     User.findOneAndUpdate(query, newData, {upsert:true}, function(err, doc){
  //         if (err) return res.send(500, { error: err });

  //         return res.send("succesfully saved");

  //     });
  //     confirm();

  //   // User.create({
  //   //         username: req.body.display_name,
  //   //         userid: req.body.id,
  //   //       }, confirm);
  // },   


  addUser: function(req, res){

   var confirm = function (err, user) {
      console.log("user");
      console.log(user);
      console.log(err);

      User.find(function(err, users) {
      if (err) {
        console.log("ERROR: Cannot retrieve users")
        res.status(404);
      }
      console.log("addUser confirm");
      console.log(users);

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
          console.log("find the user: " + user.display_name)        
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

   var track_confirm = function (err, track) {
      console.log("track");
      console.log(track);
      console.log(err);

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

var user_confirm = function (err, user) {
      console.log("user");
      console.log(user);
      console.log(err);

      User.find(function(err, users) {
        if (err) {
          console.log("ERROR: Cannot retrieve users")
          res.status(404);
        }
        console.log("addUser confirm");
        console.log(users);

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
          }, track_confirm);
          break;
        case 1: //Topic exists: edit it!
          var track = tracks[0];
            if(!track.user.contains(req.body.user)){
              track.user.push(req.body.user);            
            }          
            track.save(track_confirm);
          break;
        default: //Either the topic exists or it doesn't. Something is broken.
          res.status(500).send({
            success: false,
            message: 'ERROR: Track stored incorrectly'
          });
      }
    });

    User.find({username: req.body.user}, function(err, users) {
        console.log("users.length:");
        console.log(users.length);
        console.log(err);
        if(users.length < 1){
          res.status(500).send({
            success: false,
            message: 'ERROR: User stored incorrectly'
          });          
        }     
        var user = users[0];
        console.log("find the user: " + user.display_name);
        console.log("req.body.name: " + req.body.name); 
        if(!user.like.contains(req.body.name)){
            user.like.push(req.body.name);            
          }          
        user.save(user_confirm);
      // }
    });


  },
  





  getTopic: function(req, res) {
    Topic.findOne({url: req.params.topic_url}, function (err, topic) {
      if (err) {
        return res.send({
          success: false,
          message: 'ERROR: Could not create topic'
        });
      }
      return res.send({
        success: true,
        title: topic.title,
        url: topic.url,
        content: topic.content
      });
    });
  },
  getTopicList: function(req, res) {
    Topic.find(function(err, topics) {
      if (err) {
        console.log("ERROR: Cannot retrieve topics")
        res.status(404);
      }
      var topicHeaders = [];
      for (var i = 0; i < topics.length; i++) {
        topicHeaders.push({
          title: topics[i].title,
          url: topics[i].url
        });
      }
      res.status(200).json(topicHeaders);
    });
  },
  editTopic: function(req, res) {
    function confirm(err, topic) {
      if (err) {
        return res.send({
          success: false,
          message: 'ERROR: Could not create topic'
        });
      }
      return res.send({
        success: true,
        title: topic.title,
        url: topic.url,
        content: topic.content
      });
    }
    Topic.find({url: req.params.topic_url}, function(err, topics) {
      switch(topics.length) {
        case 0: //Topic does not exist; create it!
          Topic.create({
            user: req.user._id,
            title: req.body.title.trim(),
            url: req.body.title.trim().replace(/ /g,"_"),
            content: req.body.content
          }, confirm);
          break;
        case 1: //Topic exists: edit it!
          var topic = topics[0];
          if (topic.user.toString() == req.user._id.toString()) {
            topic.title = req.body.title.trim();
            topic.url = req.body.title.trim().replace(/ /g,"_");
            topic.content = req.body.content;
            topic.save(confirm);
          } else {
            res.status(401).send({
              success: false,
              message: 'ERROR: Not your topic'
            });
          }
          break;
        default: //Either the topic exists or it doesn't. Something is broken.
          res.status(500).send({
            success: false,
            message: 'ERROR: Topic stored incorrectly'
          });
      }
    });
  },
  deleteTopic: function(req, res) {
    Topic.findOne({url: req.params.topic_url}).remove(function (err) {
      if (err) {
        return res.send({
          success: false,
          message: 'ERROR: Could not delete topic'
        });
      }
      return res.send({
        success: true
      });
    });
  }
}

module.exports = routes;