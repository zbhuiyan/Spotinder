app.controller('HomeController_test', function ($scope, $location, Spotify, spotinderService) {


    $scope.searchArtist = function () {
      Spotify.search($scope.searchartist, 'artist').then(function (data) {
        $scope.artists = data.artists.items;
      });
    };



    $scope.login = function () {
      Spotify.login().then(function (data) {
        alert("You are now logged in");
        Spotify.setAuthToken(data);
        Spotify.getCurrentUser().then(function (data) {
          spotinderService.userData = data;
          console.log('log in');
          $location.path('/user');

        });


      }, function () {
        console.log('didn\'t log in');
      })
    };

  });