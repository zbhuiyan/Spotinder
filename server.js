//server.js
//main file for app server hosting
// MODULE IMPORTS ==============================================================

// utility modules
var path           = require('path');
// var logger         = require('morgan');
var cookieParser   = require('cookie-parser');

// express modules
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');

// database modules
var mongoose       = require('mongoose');

// route modules
var routes         = require('./routes/routes');

// authentication modules
// var auth = require('./authentication.js');
var session        = require('express-session');
var MongoStore     = require('connect-mongo')(session);

// CONFIGURATION ===============================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CONNECT TO DATABASE =========================================================

var MONGOURI = process.env.MONGOURI || 'mongodb://localhost/Spot';
mongoose.connect(MONGOURI);

app.post('/api/addLike', routes.addLike);
app.post('/api/addUser', routes.addUser);
app.get('/api/getLikes/:username', routes.getLikes);
app.get('/api/match', routes.match);

// AngularJS requests
app.get('/callback', function(req, res) {
	res.sendFile(__dirname + '/public/partials/callback.html');
})

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// START SERVER ================================================================
var PORT = process.env.PORT || 	8888;
app.listen(PORT, function() {
  console.log("Topics running on port:", PORT);
});
	