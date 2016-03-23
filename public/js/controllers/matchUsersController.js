// public/js/controllers/matchUsersController.js

app.controller('matchUsersController', function($scope, spotinderService) {


	function compare(a,b) {
	  if (a.matchedLikes < b.matchedLikes)
	    return 1;
	  else if (a.matchedLikes > b.matchedLikes)
	    return -1;
	  else 
	    return 0;
	}

	$scope.matchUsers = spotinderService.matchUsers;
	$scope.totalLikes = spotinderService.totalLikes;


	$scope.matchUsers = $scope.matchUsers.sort(compare);

	console.log("$scope.matchUsers");
	console.log($scope.matchUsers);


});