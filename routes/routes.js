var confidential = require('../confidential');
var express = require('express'); 
var router = express.Router(); 
var mongoose = require('mongoose'); 
var path = require('path'); 
var querystring = require('querystring');
var router = express.Router(); 
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
var request = require('request'); // "Request" library

var User = require(path.join(__dirname,'../models/userModel'));
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

  console.log("i am in login");
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


  
  console.log('I am in callback');
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
          console.log(body); //all the user info upon login
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

  console.log('I am in refresh_token');
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
routes.saveLike = function(req,res){
  console.log('im in save like');
  var user = new User({displayName: req.body.displayName, id: req.body.id, email: req.body.email, spotifyURI: req.body.spotifyURI, genre:req.body.genre});
  console.log('user',user);


}



// routes.saveLike = function(req, res){
// 	//save users like to the database
	
// 	console.log('im in save like');

// 	var user = new User({displayName: req.body.displayName, id: req.body.id, email: req.body.email, spotifyURI: req.body.spotifyURI, genre:req.body.genre}); 
// 	user.save(function(err){ 
// 		if(err){ 
// 			console.log("there has been an error saving user like", err); 
// 		}else{
// 		console.log('usermodel', user);
// 		console.log("Saved user info sucessfully.")};
//   }
// }


// routes.catchAnything = function(req, res){ 
// 	console.log("out of routes");
// }

module.exports = routes;