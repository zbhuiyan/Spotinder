var mongoose = require('mongoose'); 

var pageSchema = mongoose.Schema({ 
	header: String, 
	content: String
}, {'collection' : 'wiki'}); 

var wiki = mongoose.model('wiki',  pageSchema);
module.exports = wiki;