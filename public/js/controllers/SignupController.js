// public/js/controllers/SignupController.js
// SignupController for rendering 'partials/signup.html' page.
// including functions for users to sign up for first time visiting

app.controller('SignupController', function($scope, AuthService) {
  
  $scope.signupForm = function() {
    AuthService.createAccount({
      username: $scope.username,
      password: $scope.password
    });    
  }

});