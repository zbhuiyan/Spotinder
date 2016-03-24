//x public/js/services/TodoService.js
// The main angular service for sharing functions and variables

app.service('spotinderService', function($http, $q, $location) {

  this.matchUsers = {};
  this.totalLikes = 0;

  this.addLike = function(data){
    // console.log("spotinderService addLike");
      var responseData = $http.post('/api/addLike/', data).then(function (response) {
      // console.log("response.data");
      // console.log(response.data);

      if (response.data.success) {
        return response.data;
      } else {
        return {
          error: response.data.message
        };
      }
    });
    return responseData;
  };

  this.addUser = function(data){
    // console.log("spotinderService addUser");
    // console.log(data);
      var responseData = $http.post('/api/addUser/', data).then(function (response) {
      // console.log("response.data");
      // console.log(response.data);

      if (response.data.success) {
        return response.data.users;
      } else {
        return {
          error: response.data.message
        };
      }
    });
    return responseData;
  };

  this.getLikes = function(data){
    var responseData = $http.get('/api/getLikes/'+ data.username).then(function (response) {
      // console.log("response.data getLikes spotinderService");
      // console.log(response.data);

      if (response.data.success) {
        return response.data.user;
      } else {
        return {
          error: response.data.message
        };
      }
    });
    return responseData;
  }

  this.match = function(data){

    var responseData = $http({ method: 'GET', url: '/api/match', params: {username: data.username, like: data.like}}).then(function (response) {


      if (response.data.success) {
        return response.data;
      } else {
        return {
          error: response.data.message
        };
      }
    });
    console.log("responseData");
    console.log(responseData);
    return responseData; 
  }

//---------------------------------------------------------------------------------------------------------------------
// fucntion for creating topic
  this.edit = function(topicData) {
    var confirmation = $q.defer();

    $http.post('/api/editTopic/' + topicData.url, topicData)
      .then(function (response) {
        if (response.data.success) {
          confirmation.resolve({
            success: response.data.success,
            title: response.data.title,
            url: response.data.url,
            content: response.data.content,
          });
        } else {
          confirmation.resolve({
            success: response.data.success,
            message: response.data.message
          });
        }

      }, function (error) {
        console.log('ERROR: Promise error in TodoService', error);
        confirmation.reject(error);
      });
    return confirmation.promise;
  };

// function for deleting existing topics
  this.delete = function(topicData) {
    var confirmation = $q.defer();
    $http.post('/api/deleteTopic/' + topicData.url, topicData)
      .then(function (response) {
        if (response.data.success) {
          confirmation.resolve({
            success: response.data.success
          });
        } else {
          confirmation.resolve({
            success: response.data.success,
            message: response.data.message
          });
        }

      }, function (error) {
        console.log('ERROR: Promise error in TodoService', error);
        confirmation.reject(error);
      });
    return confirmation.promise;
  };

// function for getting a list of stored topics
  this.getTopicList = function() {
    var topics = $http.get('/api/getTopicList').then(function (response) {
        // console.log(response);
        return response.data;
      });
    return topics;
  };

// function for getting a specific topic info
  this.getTopic = function(url) {
    var topic = $http.get('/api/getTopic/' + url).then(function (response) {
        if (response.data.success) {
          return response.data;
        } else {
          return {
            title: '',
            content: ''
          };
        }

        return response.data;
      });
    return topic;
  };

// funciton for redirecting url
  this.go = function ( path ) {
    $location.path( path );
  };

});