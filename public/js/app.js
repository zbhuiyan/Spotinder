// <!-- public/js/app.js -->
// main angular app  module file
// angular routing summary for client side routing

var app = angular.module('wikilab', [
    'ngRoute', 'spotify'
  ])
  .config(function(SpotifyProvider){
    SpotifyProvider.setClientId('03ffe0cac0a0401aa6673c3cf6d02ced');
    SpotifyProvider.setRedirectUri('http://localhost:8888/callback');
    SpotifyProvider.setScope('user-read-private playlist-read-private');
  })
  .config([
    '$routeProvider',
    '$locationProvider',
  function($routeProvider, $locationProvider) {

// angular routing summary
  $routeProvider

    .when('/', {
      templateUrl: 'partials/home_test.html',
      controller: 'HomeController_test'
    })

    .when('/user', {
      templateUrl: 'partials/userPage.html',
      controller: 'userController'
    })

    .when('/matchUsers', {
      templateUrl: 'partials/matchUsersPage.html',
      controller: 'matchUsersController'
    })

    .otherwise({ //  matches callback#(queryparams)
      redirectTo: "/"
    });

  $locationProvider.html5Mode(true);

}])


// app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
//     var original = $location.path;
//     $location.path = function (path, reload) {
//         if (reload === false) {
//             var lastRoute = $route.current;
//             var un = $rootScope.$on('$locationChangeSuccess', function () {
//                 $route.current = lastRoute;
//                 un();
//             });
//         }
//         return original.apply($location, [path]);
//     };
// }]);
