// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

    });
})

.controller('MyCtrl', function($scope, $ionicPopup, $http) {
      tokenInfo = getToken();
      console.log(tokenInfo);
      //console.log(tokenInfo.token);
      //console.log(tokenInfo.volunteers);
      //$http({
        //method: 'GET',
        //url: '/api/volunteers',
        //headers: {
         // 'Authorization': 'Token ' + tokenInfo.token
        //}
      //}).then(function successCallback(response) {
          //$scope.items = response.data
          $scope.items = tokenInfo.volunteers;
          //$scope.data = {
          $scope.volunteers = {
            showDelete: false
          };
          $scope.showPrompt = function(item) {
            var promptPopup = $ionicPopup.prompt({
                  title: item.volunteer.name,
                  template: '<body><div class="row"> <input type="text" placeholder=" add freetext here" ng-model="item.volunteerComment" id="volunteer_comment" style="height:60px;padding-bottom=20px;"></div><div class="row"><div class="col">'+item.volunteer.email+'<hr style="margin-bottom:0px;"></div></div><div class="row" style="margin-top:0px;"><div class="col" class"label" style="color:gray;">email</div></div><div class="row"><div class="col">'+item.volunteer.phone+'<hr></div></div><div class="row"><div class="col" class="label" style="color:gray;">phone number</div></div><div class="row"><div class="col col-50">'+item.volunteer.city+'<hr></div><div class="col col-50">'+item.volunteer.state+'<hr></div></div><div class="row"><div class="col col-50" class="label" style="color:gray;">city</div><div class="col col-50" class="label" style="color:gray;">state</div></div><div class="row"><div class="col">'+item.volunteer.years_of_service+'<hr></div></div><div class="row"><div class="col" class="label" style="color:gray;">years of working with BAA</div></div><div class="row"><div class="col col-50">'+item.volunteer.jacket_size+'<hr></div></div><div class="row"><div class="col col-50" class="label" style="color:gray;">jacket size</div></div></body>'
              });
          }
          $scope.changeStatus = function(item){
            // here we will need to call a function to update the status at the current item on the server side 
          }
          //console.log(response.data)
      //}, function errorCallback(response) {
        //  console.log('error');
          //console.log(response[1].name);
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      //});
});

var token;
checkCredentials = function(){
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;

    var url = "api-token-auth";
    request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            token = request.responseText;
            localStorage.setItem("token", token);
            verCheck();
            console.log(token);
            window.location.href = "list.html";
        }

        if (request.readyState == 4 && request.status == 400) {
            alert("invalid login");
        }
    }

    request.send("username=" + user + "&password=" + pass);
};

function verCheck(){
    var LS = localStorage.getItem('token');
    if (LS == "True") {
        window.location.assign("/list.html")
    } else{
    }
}

function getToken() {
    //console.log("Tokennnnn:" + token)
    tokenInfo = JSON.parse(localStorage.getItem('token'));
    console.log("Tokennnnn:" + tokenInfo)
    return tokenInfo;
}

