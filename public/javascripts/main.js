var wikiApp = angular.module('wikiApp', []);

function mainController($scope, $http) {
  $scope.showNewWiki = false; 
  $scope.showEdit = false;
  // $scope.showContent = false; 

  $http.get('api/home')
    .success(function(data){
      console.log(data);
      $scope.wiki = data;
      console.log("b;ahohdo", $scope.wiki)
    })
    .error(function(data){
      console.log('Error:' + data);
    });


  $scope.home = function(){
    $http.post('api/home')
      .success(function(data){
        // $scope.formData = {};
        $scope.wiki = data;
      })
      .error(function(data){
        console.log('Error:' + data);
      });
  };

  $scope.selectWiki = function(header){

    $scope.showNewWiki = false; 
    $scope.showEdit = true;
    // $scope.showContent = true; 
    $scope.newWiki = {};

    console.log('in selectWiki')
    $http.get('api/header/'+header)
      .success(function(data){
        $scope.mainWiki = data;
        $scope.header = $scope.mainWiki.header;
        $scope.content = $scope.mainWiki.content;
        $scope.editorEnabled = false;
        console.log(data)
      })
      .error(function(data){
        console.log('Error:' + data);
      });
  };

  $scope.saveNewWiki = function(){ 
    console.log("are you in here (in new wiki)??")
    $scope.showNewWiki = false;
    // $scope.showContent = false;  

    console.log("about to post")
    $http.post('/api/createNew', {header: $scope.newWiki.header, content: $scope.newWiki.content})
      .success(function(data){ 
        $scope.newWiki = data.newWiki;
        $scope.wiki = data.all;
        console.log("Success", data.newWiki);
        console.log("data all ", data.all);
      })
      .error(function(data){ 
        console.log("Failure", data)
      })

  }
      
  $scope.enableShowNewWiki = function(){ 
    console.log($scope.showNewWiki); 
    $scope.showNewWiki = true; 
    console.log($scope.showNewWiki);
  }

    $scope.enableEditor = function() {
        $scope.editorEnabled = true;
        $scope.editableHeader = $scope.mainWiki.header;
        $scope.editableContent = $scope.mainWiki.content;
    };
      
    $scope.disableEditor = function() {
        $scope.editorEnabled = false;
    };
      
    $scope.save = function(header) {
        $scope.showNewWiki = false; 
        // $scope.showContent = true; 
        $scope.mainWiki.content = $scope.editableContent;
        $scope.mainWiki.header = $scope.editableHeader;
        $scope.disableEditor();
        console.log($scope.mainWiki.content, 'new content')
        console.log($scope.mainWiki.header, 'new header')

        $http.post('/api/header/' + header, {header: $scope.mainWiki.header, content:$scope.mainWiki.content})
          .success(function(data){
            $scope.wiki = data.all;
            console.log(data)
            console.log('saved correctly')

          })
          .error(function(data){
          console.log('Error:' + data);
        });
    };

    $scope.partialSearch = function(header){

    $scope.showNewWiki = false; 
    // $scope.showContent = true; 
    $scope.newWiki = {};

    console.log('in selectWiki')
    $http.get('api/header/'+header)
      .success(function(data){
        $scope.mainWiki = data;
        $scope.header = $scope.mainWiki.header;
        $scope.content = $scope.mainWiki.content;
        $scope.editorEnabled = false;
        console.log(data)
      })
      .error(function(data){
        console.log('Error:' + data);
      });
  };

    $scope.search = function(){
      console.log('im in search');
      $scope.searchQuery = angular.copy($scope.query)
      $scope.selectWiki($scope.searchQuery);
    }

}