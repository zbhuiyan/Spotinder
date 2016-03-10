// public/js/controllers/HomeController.js
// home controller for rendering home.html page
// including functions for deleting topics and triggering editing functionality in client side

app.controller('HomeController', function($scope, $location, TopicService, Spotify) {
  
  $scope.topicSearch = "";

  Spotify.login();

  Spotify.getAlbum('0sNOF9WDwhWunNAHPD3Baj').then(function (data) {
    console.log(data);
  });

//calling service get function to get all the topics
  TopicService.getTopicList().then(function(topics) {
    $scope.topics = topics;
    $scope.TopicsCount = topics.length;
  });


// get topic url to render topic page with topic controller
  $scope.getTopic = function(topic_url) {
      $location.path('/topic_page');
      TopicService.current_topic_url = topic_url
  };

  $scope.readTopic = function(url) {
    $location.path('/wiki/' + url);
  };

  $scope.createTopic = function() {
    $location.path('/new');
  };

//left codes from the previous app--------------------------------------------------------------------------------------------------

  $scope.filterCallback = function(category) {
    if (category == 'all') {
      $scope.todos = $scope.todos.concat($scope.hiddenTodos);
      $scope.hiddenTodos = [];
    } else {
      var newTodos = [];
      var newHiddenTodos = [];
      var check = (category == 'completed');
      for (var i = 0; i < $scope.todos.length; i++) {
        if ($scope.todos[i].completed == check) {
          newTodos.push($scope.todos[i]);
        } else {
          newHiddenTodos.push($scope.todos[i]);
        }
      }
      for (var i = 0; i < $scope.hiddenTodos.length; i++) {
        if ($scope.hiddenTodos[i].completed == check) {
          newTodos.push($scope.hiddenTodos[i]);
        } else {
          newHiddenTodos.push($scope.hiddenTodos[i]);
        }
      }
      $scope.todos = newTodos;
      $scope.hiddenTodos = newHiddenTodos;
    }
  };

  $scope.$parent.registerFilterCallback($scope.filterCallback);

});