var spotinderApp = angular.module('spotinderApp', []); 

mainController = function ($scope, $http) {
 
  // $scope.newUser = {};
  $http.get('/')
    .success(function(data){
      console.log('callbackmain',data);
    //   $scope.newUser = data;
    //   console.log("bahohdo", $scope.newUser)
    // })
    // .error(function(data){
    //   console.log('Error:' + data);
    });


  $scope.login = function(){

    $http.post('/login')
      .success(function(user){
        $scope.userid = user;
        console.log('scope user id', $scope.userid);
      });
    // $http.post('/login')
    //   .success(function(user){
    //     console.log('user',user);
    //     $scope.userid = data;
        // console.log('data in login',data);
      // })
      // .error(function(data){
      //   console.log('Error:' + data);
      // });
  };

  $scope.likeHipHop = function (){
    console.log('im about to save like hiphop', $scope.userid);
    
    // $http.get('/')
    // .success(function(data){
    //   $scope.newUser = data.newUser;
    //   console.log("success data");
    //   console.log(data);
    // })
    // .error(function(data){
    //   console.log('error', data);
    // })
    // $scope.userid = $scope.user.userid;
    // console.log("scope.userid",$scope.userid)
    $http.post('/saveLike',{id:$scope.userid})
      .success(function(data){
        console.log('it saved ur like');
      })
      .error(function(data){
        console.log('error didnt save like', data);
      })


    // })
      //   $scope.newUser = data.newUser;
      //   $scope.user = data.all;
      //   console.log("success", $scope.newUser);
      //   console.log("data all", data.all);
      // })
      // .error(function(data){
      //   console.log('error', data);
      // })
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
mainController.$inject = ['$scope', '$http'];
spotinderApp.controller('mainController', mainController);