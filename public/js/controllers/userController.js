// public/js/controllers/userController.js

app.controller('userController', function($scope, spotinderService, Spotify) {

	$scope.hip_hop_genre = [];



    Spotify.search('hip_pop', 'track').then(function (data) {
      // console.log(data);
      var trakArray = data['tracks']['items'];
      trakArray.forEach(function(track) {
		name = track['name'];
		artist = track['artists'][0]['name'];
		$scope.hip_hop_genre.push( { 'genre': 'hip_pop', 'name':name, "artist":artist } );
      });
    });


  
	$scope.userData = spotinderService.userData;
	spotinderService.addUser($scope.userData);


	$scope.like = function (dataGenre, dataName, dataArtist){
		data = {
			genre: dataGenre, 
			name:dataName,
			artist:dataArtist, 
			user: $scope.userData.display_name
			}
		// console.log(data);
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
	

});