var spotinderApp = angular.module('spotinderApp', []);

function mainController($scope, $http) {
 

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

  $scope.likeHipHop = function(){
    console.log('Im in likehiphop');
  };

  $scope.likeIndieAlt = function(){
    console.log('im in likeindiealt');
  };

  $scope.likePop = function(){
    console.log('im in likepop');
  };

  $scope.likeRock = function(){
    console.log('im in likerock');
  };

  $scope.likeCountry = function(){
    console.log('im in likecountry');
  };

/*
  $scope.enableLikeHopHop = function(){ 
   
  }*/
      
//   $scope.enableShowNewWiki = function(){ 
//     console.log($scope.showNewWiki); 
//     $scope.showNewWiki = true; 
//     console.log($scope.showNewWiki);
//   }

//     $scope.enableEditor = function() {
//         $scope.editorEnabled = true;
//         $scope.editableHeader = $scope.mainWiki.header;
//         $scope.editableContent = $scope.mainWiki.content;
//     };
      
//     $scope.disableEditor = function() {
//         $scope.editorEnabled = false;
//     };
      
//     $scope.save = function(header) {
//         $scope.showNewWiki = false; 
//         // $scope.showContent = true; 
//         $scope.mainWiki.content = $scope.editableContent;
//         $scope.mainWiki.header = $scope.editableHeader;
//         $scope.disableEditor();
//         console.log($scope.mainWiki.content, 'new content')
//         console.log($scope.mainWiki.header, 'new header')

//         $http.post('/api/header/' + header, {header: $scope.mainWiki.header, content:$scope.mainWiki.content})
//           .success(function(data){
//             $scope.wiki = data.all;
//             console.log(data)
//             console.log('saved correctly')

//           })
//           .error(function(data){
//           console.log('Error:' + data);
//         });
//     };

//     $scope.partialSearch = function(header){

//     $scope.showNewWiki = false; 
//     // $scope.showContent = true; 
//     $scope.newWiki = {};

//     console.log('in selectWiki')
//     $http.get('api/header/'+header)
//       .success(function(data){
//         $scope.mainWiki = data;
//         $scope.header = $scope.mainWiki.header;
//         $scope.content = $scope.mainWiki.content;
//         $scope.editorEnabled = false;
//         console.log(data)
//       })
//       .error(function(data){
//         console.log('Error:' + data);
//       });
//   };

//     $scope.search = function(){
//       console.log('im in search');
//       $scope.searchQuery = angular.copy($scope.query)
//       $scope.selectWiki($scope.searchQuery);
//     }

}