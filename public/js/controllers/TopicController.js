// public/js/controllers/TopicController.js
// main topic controller for rendering  topic.html
// for creating new topic 
// viewing and editing existing topics

app.controller('TopicController',
    function($scope, $routeParams, $location, TopicService) {
  $scope.getTopic = function(url) {
    TopicService.getTopic(url).then(
      function(topic) {
        $scope.url = topic.url;
        $scope.title = topic.title;
        $scope.content = topic.content;
      },
      function(error) {
        console.log('ERROR: Promise error in TopicController', error);
      }
    );
  };

  if ($routeParams.topic_url) {
    $scope.getTopic($routeParams.topic_url);
    if ($routeParams.cmd == 'edit') {
      $scope.state = 'editing';
    } else {
      $scope.state = 'reading';
    }    
  } else {
    $scope.url = '';
    $scope.title = '';
    $scope.content = '';
    $scope.state = 'editing';
  }

  $scope.edit = function(title, content) {
    var confirmationPromise = TopicService.edit({
      title: title,
      content: content,
      url: $scope.url
    });
    
    confirmationPromise.then(
      function(confirmation) {
        $scope.title = confirmation.title;
        $scope.content = confirmation.content;
        $scope.state = 'reading';
        $scope.url = confirmation.url;
        $location.path('/wiki/' + confirmation.url, false);
      },
      function(error) {
        console.log('ERROR: Promise error in TopicController', error);
      }
    );
  };

  $scope.delete = function() {
    var confirmationPromise = TopicService.delete({
      url: $scope.url
    });
    
    confirmationPromise.then(
      function(confirmation) {
        $location.path('/', true);
      },
      function(error) {
        console.log('ERROR: Promise error in TopicController', error);
      }
    );
  };

  $scope.editMode = function() {
    $scope.state = 'editing';
    $location.path('/wiki/' + $scope.url + '/edit', false);
  };

});