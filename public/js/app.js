// <!-- public/js/app.js -->
// main angular app  module file
// angular routing summary for client side routing

var app = angular.module('wikiLab', [
    'ngRoute', 'spotify'
  ])
  .config(function(SpotifyProvider){
    SpotifyProvider.setClientId('03ffe0cac0a0401aa6673c3cf6d02ced');
    SpotifyProvider.setRedirectUri('http://localhost:8888/callback');
    SpotifyProvider.setScope('playlist-read-private');
  })
  .config([
    '$routeProvider',
    '$locationProvider',
  function($routeProvider, $locationProvider) {
    
// angular routing summary
  $routeProvider
    // .when('/', {
    //   templateUrl: 'partials/home.html',
    //   controller: 'HomeController'
    //   // ,
    //   // resolve: {
    //   //   authentication: function(AuthService, $route) {
    //   //     return AuthService.checkAuthentication();
    //   //   }
    //   // }
    // })

    .when('/', {
      templateUrl: 'partials/home_test.html',
      controller: 'HomeController_test'
    })

    .when('/new', {
      templateUrl: 'partials/topic.html',
      controller: 'TopicController'
    })

    .when('/wiki/:topic_url/:cmd', {
      templateUrl: 'partials/topic.html',
      controller: 'TopicController'
    })

    .when('/wiki/:topic_url', {
      templateUrl: 'partials/topic.html',
      controller: 'TopicController'
    })

    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginController'
    })

    .when('/signup', {
      templateUrl: 'partials/signup.html',
      controller: 'SignupController'
    })

    .when('/logout', {
      resolve: {
        authentication: function(AuthService, $route) {
          return AuthService.logout();
        }
      }
    })

    .otherwise({ //  matches callback#(queryparams)
      redirectTo: "/"
    });

  $locationProvider.html5Mode(true);

}])


// var client_id = '03ffe0cac0a0401aa6673c3cf6d02ced'; // Your client id
// var client_secret = 'a57c43efb9644574a96d6623fb8bfbc2'; // Your client secret
// var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);
