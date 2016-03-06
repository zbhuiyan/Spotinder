var confidential = require('../confidential');
var express = require('express'); 
var router = express.Router(); 
var mongoose = require('mongoose'); 
var path = require('path'); 
var querystring = require('querystring');
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
var request = require('request'); // "Request" library

// var Wiki = require(path.join(__dirname,'../models/wikiModel'));


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';




routes = {}; 

routes.login = function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: confidential.client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
}

routes.callback = function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(confidential.client_id + ':' + confidential.client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
}

routes.refresh_token = function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(confidential.client_id + ':' + confidential.client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
}


// wiki.loadPageGET = function(req, res){
// 	//Input: req, res objects 
// 	//Output: sends error if error finding wiki object. Else sends json object of selected wiki

// 	var header = req.params.title;
	
// 	//find wiki object
// 	Wiki.findOne({header:header}, function(err, wikiContent){
// 		if(err){
// 			res.send(err);
// 		}

// 		//json object to load page of a specific title
// 		res.json(wikiContent);
// 	})
// };

// wiki.updateWikiPOST = function(req, res){
// 	//Input: req, res objects
// 	//Output: sends json objects of all wiki objects to display in side bar and updated wiki object to show updated wiki page
// 	var oldHeader = req.params.title;
// 	var newHeader = req.body.header;
// 	var newContent = req.body.content;
// 	Wiki.update({header:oldHeader}, {$set: {header:newHeader, content: newContent}}, function(err, record){
// 			Wiki.findOne({header:newHeader}, function(err, updatedObj){
// 				Wiki.find({}, function(err, listAll){
// 					res.json({mainWiki:updatedObj, all:listAll})
// 				})
// 			})
// 	})
// };

// wiki.saveNewWikiPOST  = function(req, res){
	
// 	//save a new page to the database
// 	//should redirect to new post page
// 	console.log('save wiki');
// 	console.log(req.body.header); 
// 	console.log(req.body.content); 
// 	var w = new Wiki({header: req.body.header, content: req.body.content}); 
// 	w.save(function(err){ 
// 		if(err){ 
// 			console.log("there has been an error saving new wiki", err); 
// 		}
// 		console.log(w, 'w');
// 		console.log("Saved new page sucessfully.")
// 		//DO WE WANT TO REDIRECT? 
// 		// res.redirect(200, '/api/' + w.header); 

// 		Wiki.find({}, function(err, allWikis){
// 			//DO WE WANT TO SEND JSON BACK? 
// 			res.json({all:allWikis, newWiki: w}); 
// 		})
// 	});


// }

// routes.catchAnything = function(req, res){ 
// 	console.log("out of routes");
// }


module.exports = routes;