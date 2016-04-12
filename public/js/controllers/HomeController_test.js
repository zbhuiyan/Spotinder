app.controller('HomeController_test', function ($scope, $location, Spotify, spotinderService) {
// I really like how you split up your code into different controllers, yet there is no documentation as to how they work and 
// communicate - to prove me you understand how it works

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