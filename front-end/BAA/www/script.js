angular.module('starter', ['ionic'])
    .controller('PopupCtrl',function($scope, $ionicPopup, $timeout, $http) {

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
      });

      // An alert dialog
      $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
          title: 'Ionic Popup',
          template: 'This is alert popup',
        });
        alertPopup.then(function(res) {
          console.log('Thanks');
        });
      };

      // Confirm popup code
      $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Ionic Popup',
          template: 'This is confirm popup'
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You clicked on "OK" button');
          } else {
            console.log('You clicked on "Cancel" button');
          }
        });
      };*/

      // Prompt popup code
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
        promptPopup.then(function(res) {
          if(res) {
            console.log('Your input is ',res);
          }
          else
          {
            console.log('Please enter input');
          }
        });
      };

      // showpopup method code
      $scope.showPopup = function() {
        $scope.data = {}

        var myPopup = $ionicPopup.show({
          template: ' Enter Password<input type="password" ng-model="data.userPassword">   <br> Enter Confirm Password  <input type="password" ng-model="data.confirmPassword" > ',
          title: 'Volunteer Name',
          subTitle: 'Please use normal things',

          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Save</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (!$scope.data.userPassword) {
                  //don't allow the user to close unless he enters wifi password
                  e.preventDefault();
                } else {
                  return $scope.data;
                }
              }
            },
          ]
        });
        myPopup.then(function(res) {

          if(res){

              if(res.userPassword==res.confirmPassword)
              {
                console.log('Password Is Ok');
              }
              else
              {
                console.log('Password not matched');
              }
          }
          else
          {
            console.log('Enter password');
          }


        });

      };

    });



