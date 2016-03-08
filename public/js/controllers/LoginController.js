// public/js/controllers/LoginController.js
// SignupController for rendering 'partials/login.html' page.
// including functions for users to log in for later visiting

app.controller('LoginController', function($scope, AuthService) {
  
  $scope.loginForm = function() {
    AuthService.login({
      username: $scope.username,
      password: $scope.password
    });
    $scope.username = '';
    $scope.password = '';
  }

});