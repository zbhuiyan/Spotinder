var express = require('express'); 
var router = express.Router(); 
var mongoose = require('mongoose'); 
var path = require('path'); 
var Wiki = require(path.join(__dirname,'../models/wikiModel'));


wiki = {}; 

wiki.home = function(req, res){ 
	//Input: req, res objects 
	//Output: sends error if error and sends json of wiki list to front end 
	
	//find all wikis and load homepage with list of titles in database
	Wiki.find({}, function(err, wikiList){
		if(err){
			res.send(err);
		}
		res.json(wikiList);
	})
};

wiki.loadPageGET = function(req, res){
	//Input: req, res objects 
	//Output: sends error if error finding wiki object. Else sends json object of selected wiki

	var header = req.params.title;
	
	//find wiki object
	Wiki.findOne({header:header}, function(err, wikiContent){
		if(err){
			res.send(err);
		}

		//json object to load page of a specific title
		res.json(wikiContent);
	})
};

wiki.updateWikiPOST = function(req, res){
	//Input: req, res objects
	//Output: sends json objects of all wiki objects to display in side bar and updated wiki object to show updated wiki page
	var oldHeader = req.params.title;
	var newHeader = req.body.header;
	var newContent = req.body.content;
	Wiki.update({header:oldHeader}, {$set: {header:newHeader, content: newContent}}, function(err, record){
			Wiki.findOne({header:newHeader}, function(err, updatedObj){
				Wiki.find({}, function(err, listAll){
					res.json({mainWiki:updatedObj, all:listAll})
				})
			})
	})
};

wiki.saveNewWikiPOST  = function(req, res){
	
	//save a new page to the database
	//should redirect to new post page
	console.log('save wiki');
	console.log(req.body.header); 
	console.log(req.body.content); 
	var w = new Wiki({header: req.body.header, content: req.body.content}); 
	w.save(function(err){ 
		if(err){ 
			console.log("there has been an error saving new wiki", err); 
		}
		console.log(w, 'w');
		console.log("Saved new page sucessfully.")
		//DO WE WANT TO REDIRECT? 
		// res.redirect(200, '/api/' + w.header); 

		Wiki.find({}, function(err, allWikis){
			//DO WE WANT TO SEND JSON BACK? 
			res.json({all:allWikis, newWiki: w}); 
		})
	});


}

wiki.catchAnything = function(req, res){ 

	console.log("Caught something")
}


module.exports = wiki;