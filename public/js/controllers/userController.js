// public/js/controllers/userController.js

app.controller('userController', function($scope, spotinderService, Spotify) {

	$scope.hip_hop_genre = [];
	$scope.pop_genre = [];
	$scope.rock_genre = [];
	$scope.country_genre = [];
	$scope.alternative_genre = [];



    Spotify.search('hip_hop', 'track').then(function (data) {
      // console.log(data);
      var trakArray = data['tracks']['items'];
      trakArray.forEach(function(track) {
		name = track['name'];
		artist = track['artists'][0]['name'];
		$scope.hip_hop_genre.push( { 'genre': 'hip_hop', 'name':name, "artist":artist } );
		$scope.hip_hop_genre = $scope.hip_hop_genre.slice(0,3);
		// console.log("number",$scope.hip_hop_genre.length);
      });
    });


    Spotify.search('pop', 'track').then(function (data) {
      console.log(data);
      var trakArray = data['tracks']['items'];
      trakArray.forEach(function(track) {
		name = track['name'];
		artist = track['artists'][0]['name'];
		$scope.pop_genre.push( { 'genre': 'pop', 'name':name, "artist":artist } );
		$scope.pop_genre = $scope.pop_genre.slice(0,3);
		
      });
    });

      Spotify.search('rock', 'track').then(function (data) {
      console.log(data);
      var trakArray = data['tracks']['items'];
      trakArray.forEach(function(track) {
		name = track['name'];
		artist = track['artists'][0]['name'];
		$scope.rock_genre.push( { 'genre': 'rock', 'name':name, "artist":artist } );
		$scope.rock_genre = $scope.rock_genre.slice(0,3);
      });
    });

      Spotify.search('country', 'track').then(function (data) {
      console.log(data);
      var trakArray = data['tracks']['items'];
      trakArray.forEach(function(track) {
		name = track['name'];
		artist = track['artists'][0]['name'];
		$scope.country_genre.push( { 'genre': 'rock', 'name':name, "artist":artist } );
		$scope.country_genre = $scope.country_genre.slice(0,3);
      });
    });

      Spotify.search('alternative', 'track').then(function (data) {
      console.log(data);
      var trakArray = data['tracks']['items'];
      trakArray.forEach(function(track) {
		name = track['name'];
		artist = track['artists'][0]['name'];
		$scope.alternative_genre.push( { 'genre': 'rock', 'name':name, "artist":artist } );
		$scope.alternative_genre = $scope.alternative_genre.slice(0,3);
      });
    });


  
	$scope.userData = spotinderService.userData;

	$scope.like = function (dataGenre, dataName, dataArtist){
		data = {
			genre: dataGenre, 
			name: dataName,
			artist: dataArtist, 
			user: $scope.userData.display_name
			}
		console.log('data', data);
		var confirmationPromise = spotinderService.addLike(data);
		confirmationPromise.then(
	      function(confirmation) {
	        // $scope.title = confirmation.title;
	        // $scope.content = confirmation.content;
	        // $scope.url = confirmation.url;
	        // $location.path('/wiki/' + confirmation.url, false);
	        console.log("confirmation");
	        console.log(confirmation);
	      },
	      function(error) {
	        console.log('ERROR: Promise error in TopicController', error);
	      }
	    );		
	};
	
	// $scope.likeIndieAlt = function(){
	// 	console.log('im in likeindiealt');
	// };

 //  $scope.likePop = function(){
 //    console.log('im in likepop');
 //  };

 //  $scope.likeRock = function(){
 //    console.log('im in likerock');
 //  };

 //  $scope.likeCountry = function(){
 //    console.log('im in likecountry');
 //  };

});