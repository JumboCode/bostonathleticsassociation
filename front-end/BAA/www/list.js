angular.module('ionicApp', ['ionic'])
.controller('MyCtrl', function($scope, $ionicPopup, $http) {
      $http({
        method: 'GET',
        url: '/api/volunteers',
        headers: {
          'Authorization': "Token " + token
        }
        withCredentials: true
      }).then(function successCallback(response) {
          $scope.items = response.data
          $scope.data = {
            showDelete: false
          };
          $scope.showPrompt = function(item) {
            var promptPopup = $ionicPopup.prompt({
                  title: item.name,
                  template: '<div class="row"> <input type="text" placeholder=" add freetext here" ng-model"data.volunteerComment"> </div><div class="row">'+item.email+'</div><hr><div class="row">email</div><br><div class="row">'+item.phone+'</div><hr><div class="row">phone number</div><hr><div class="row"><div class="col col-50">'+item.state+'</div><div class="col col-50">'+item.team_captain+'</div></div><div class="row"><div class="col col-50"><hr></div><div class="col col-50"><hr></div></div>'
              });
          }
          $scope.changeStatus = function(item){
            // here we will need to call a function to update the status at the current item on the server side 
          }
          console.log(response.data)
      }, function errorCallback(response) {
          console.log('error');
          console.log(response[1].name);
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });
});

