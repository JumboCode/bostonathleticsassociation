angular.module('ionicApp', ['ionic'])



.controller('MyCtrl', function($scope, $http) {
    $http({
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
      });
  
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

