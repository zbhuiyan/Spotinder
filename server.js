//server.js
//main file for app server hosting
// MODULE IMPORTS ==============================================================

// utility modules
var path           = require('path');
var logger         = require('morgan');
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
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CONNECT TO DATABASE =========================================================
mongoose.connect('mongodb://localhost/Spot');

// SECURITY CONFIGURATION ======================================================
// var passport = auth.configure();
// app.use(session({
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection,
//     ttl: 24 * 60 * 60
//   }),
//   secret: 'karabraxossecretkey',
//   resave: true,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// ROUTES ======================================================================

// GET requests
// app.get('/api/checkAuthentication', auth.sendAuthentication);
// app.get('/api/getTopicList', routes.getTopicList);
// app.get('/api/getTopic/:topic_url', routes.getTopic);

// POST requests
// app.post('/api/deleteTopic/:topic_url', auth.checkAuthentication, routes.deleteTopic);
// app.post('/api/editTopic/:topic_url?', auth.checkAuthentication, routes.editTopic);
// app.post('/login', auth.login);
// app.post('/signup', auth.signup);
// app.post('/logout', auth.logout);
app.post('/api/addLike', routes.addLike);
app.post('/api/addUser', routes.addUser);

// AngularJS requests
app.get('/callback', function(req, res) {
	res.sendFile(__dirname + '/public/partials/callback.html');
})

app.get('*', function (req, res) {
  console.log('cannot find route!!!!');
  res.sendFile(__dirname + '/public/index.html');
});

// START SERVER ================================================================
var PORT = process.env.PORT || 8888;
app.listen(PORT, function() {
  console.log("Topics running on port:", PORT);
});
