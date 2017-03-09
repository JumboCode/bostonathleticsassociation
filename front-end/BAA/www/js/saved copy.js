angular.module('ionicApp', ['ionic'])



.controller('MyCtrl', function($scope, $ionicPopup, $http) {
    /*$http({
        method: 'GET',
        url: '/api/volunteers',
        withCredentials: true
      }).then(function successCallback(response) {
          console.log('hello');
          console.log(response.data[1]);
      }, function errorCallback(response) {
          console.log('error');
          console.log(response[1].name);
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });*/
      
            $scope.showPrompt = function() {
        console.log('in popup');


      $http({
        method: 'GET',
        url: '/api/volunteers',
        withCredentials: true
      }).then(function successCallback(response) {
          console.log('in pop up');
          console.log(response.data[1]);
          var promptPopup = $ionicPopup.prompt({
            title: response.data[1].name,
            template: '<div class="row"> <input type="text" placeholder=" add freetext here" ng-model"data.volunteerComment"> </div><div class="row">iamthebest.michaeljordan</div><hr><div class="row">email</div><br><div class="row">3243423423</div><hr><div class="row">phone number</div><hr><div class="row"><div class="col col-50">Chicago</div><div class="col col-50">Illinois</div></div><div class="row"><div class="col col-50"><hr></div><div class="col col-50"><hr></div></div>'
          });
      }, function errorCallback(response) {
          console.log('error');
          console.log(response[1].name);
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });

        //var promptPopup = $ionicPopup.prompt({
        //  title: 'Volunteer Name',
        //  template: '<div class="row"> <input type="text" placeholder=" add freetext here" ng-model"data.volunteerComment"> </div><div class="row">julia.grace@tufts.edu</div><hr><div class="row">email</div><br><div class="row">617-763-8095</div><hr><div class="row">phone number</div><hr><div class="row"><div class="col col-50">Medford</div><div class="col col-50">MA</div></div><div class="row"><div class="col col-50"><hr></div><div class="col col-50"><hr></div></div>'
        //});

        /*
        promptPopup.then(function(res) {
          if(res) {
            console.log('Your input is ',res);
          }
          else
          {
            console.log('Please enter input');
          }
        });
        */


      };
  
  $scope.data = {
    showDelete: false
  };
  
  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };
  $scope.share = function(item) {
    alert('Share Item: ' + item.id);
  };
  
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
  
  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };
  
  $scope.items = [
    { id: 0, name:"Ryan Osgood" },
    { id: 1, name:"Yuki Zaninovich" },
    { id: 2, name:"Julia Grace" },
    { id: 3, name:"Dani Kupfer" },
    { id: 4, name:"Jenna Kubiak" },
    { id: 5, name:"Shan Shan Duan" },
    { id: 6, name:"Michael Morisi"},
    { id: 7, name:"Andrew Hoiberg" }, 
    { id: 8, name:"Michael Jackson" }, 
    { id: 9, name:"Beyonce" },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
    { id: 16 },
    { id: 17 },
    { id: 18 },
    { id: 19 },
    { id: 20 },
    { id: 21 },
    { id: 22 },
    { id: 23 },
    { id: 24 },
    { id: 25 },
    { id: 26 },
    { id: 27 },
    { id: 28 },
    { id: 29 },
    { id: 30 },
    { id: 31 },
    { id: 32 },
    { id: 33 },
    { id: 34 },
    { id: 35 },
    { id: 36 },
    { id: 37 },
    { id: 38 },
    { id: 39 },
    { id: 40 },
    { id: 41 },
    { id: 42 },
    { id: 43 },
    { id: 44 },
    { id: 45 },
    { id: 46 },
    { id: 47 },
    { id: 48 },
    { id: 49 },
    { id: 50 }
  ];
  
});

