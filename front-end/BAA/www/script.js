angular.module('starter', ['ionic'])
    .controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {

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
      };

      // Prompt popup code
      $scope.showPrompt = function() {
        var promptPopup = $ionicPopup.prompt({
          title: 'Ionic Popup',
          template: 'This is prompt popup'
        });
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
          title: 'Enter Password',
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