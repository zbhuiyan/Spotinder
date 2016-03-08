// public/js/controllers/MainController.js
// main controller for rendering index.html page

app.controller('MainController', function($scope, TopicService) {
  
  $scope.filter = 'all';
  $scope.filterCallbacks = [];


  $scope.registerFilterCallback = function(callback){
    $scope.filterCallbacks.push(callback);
  }

  $scope.filterChange = function() {
    console.log($scope.filterCallbacks);
    for (var i = 0; i < $scope.filterCallbacks.length; i++) {
      $scope.filterCallbacks[i]($scope.filter);
    }
  }

});