// public/js/services/AuthService.js

var routeForUnauthorizedAccess = '/login';

app.service('AuthService', function($http, $q, $rootScope, $location) {

  this.authenticated = false;

  this.login = function(credentials) {
    var service = this;
    $http.post('/login', credentials).then(function success(response) {

      service.authenticated = response.data.authenticated;
      if (service.authenticated) {
        $location.path('/');
      } else {
        $location.path(routeForUnauthorizedAccess);
      }
    }, function failure(response) {
      service.authenticated = response.data.authenticated;
      $location.path(routeForUnauthorizedAccess);
    });
  };

  this.logout = function() {
    var service = this;
    $http.post('/logout').then(function success(response) {
      service.authenticated = response.data.authenticated;
      $location.path(routeForUnauthorizedAccess);
    });
  };

  this.createAccount = function(credentials) {
    $http.post('/signup', credentials).then(function success(response) {
      $location.path(routeForUnauthorizedAccess);
    });
  };

  this.checkAuthentication = function() {
    var service = this;
    var deferred = $q.defer();
    $http.get('/api/checkAuthentication').then(function success(response) {
      service.authenticated = response.data.authenticated;
      if (!service.authenticated) {
        $location.path(routeForUnauthorizedAccess);
      }
      deferred.resolve();
    }, function error(response) {
      service.authenticated = false;
      $location.path(routeForUnauthorizedAccess);
      deferred.resolve();
    });
    return deferred.promise;
  };

});
