angular.module('ionicApp', ['ionic'])
.controller('MyCtrl', function($scope, $ionicPopup, $http) {
      var token = localStorage.getItem("token")
      console.log(token)
      $http({
        method: 'GET',
        url: '/api/volunteers',
        headers: {
          'Authorization': 'Token 4bae81c59ba63290db534414dfa255b3576b56ec'
        }
      }).then(function successCallback(response) {
          $scope.items = response.data
          $scope.data = {
            showDelete: false
          };
          $scope.showPrompt = function(item) {
            var promptPopup = $ionicPopup.prompt({
                  title: item.name,
                  template: '<body><div class="row"> <input type="text" placeholder=" add freetext here" ng-model="item.volunteerComment" id="volunteer_comment" style="height:60px;padding-bottom=20px;"></div><div class="row"><div class="col">'+item.email+'<hr style="margin-bottom:0px;"></div></div><div class="row" style="margin-top:0px;"><div class="col" class"label" style="color:gray;">email</div></div><div class="row"><div class="col">'+item.phone+'<hr></div></div><div class="row"><div class="col" class="label" style="color:gray;">phone number</div></div><div class="row"><div class="col col-50">'+item.city+'<hr></div><div class="col col-50">'+item.state+'<hr></div></div><div class="row"><div class="col col-50" class="label" style="color:gray;">city</div><div class="col col-50" class="label" style="color:gray;">state</div></div><div class="row"><div class="col">'+item.years_of_service+'<hr></div></div><div class="row"><div class="col" class="label" style="color:gray;">years of working with BAA</div></div><div class="row"><div class="col col-50">'+item.jacket_size+'<hr></div></div><div class="row"><div class="col col-50" class="label" style="color:gray;">jacket size</div></div></body>'
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