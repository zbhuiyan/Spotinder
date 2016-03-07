var mongoose = require('mongoose'); 

var userSchema = mongoose.Schema({ 
	displayName: String, 
	id: Number,
	email: String,
	spotifyURI: String,
	genre: String
	
}, {'collection' : 'users'}); 

var users = mongoose.model('users',  userSchema);
module.exports = users;