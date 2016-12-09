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
            $scope.data = {}
            var promptPopup = $ionicPopup.prompt({
                  title: item.volunteer.name,
                  //template:'hello',
                  template: '<body><br><div class="row"> <input type="text" placeholder="  '+item.notes+'" ng-model="data.notes" id="volunteer_comment" style="height:50px;padding:12px;text-align:top !important;"></div><br><div class="row"><div class="col">'+item.volunteer.email+'<hr></div></div><div class="row"><div class="col" class"label" style="color:gray;">email</div></div><br><div class="row"><br><div class="col">'+item.volunteer.phone+'<hr></div></div><div class="row"><div class="col" class="label" style="color:gray;">phone number</div></div><br><div class="row"><div class="col col-50">'+item.volunteer.city+'<hr></div><div class="col col-50">'+item.volunteer.state+'<hr></div></div><div class="row"><div class="col col-50" class="label" style="color:gray;">city</div><div class="col col-50" class="label" style="color:gray;">state</div></div><br><div class="row"><div class="col">'+item.volunteer.years_of_service+'<hr></div></div><div class="row"><div class="col" class="label" style="color:gray;">years of working with BAA</div></div><br><div class="row"><div class="col col-50">'+item.volunteer.jacket_size+'<hr></div></div><div class="row"><div class="col col-50" class="label" style="color:gray;">jacket size</div></div><br></body>',
                  //<div class="row"> <input type="text" placeholder="  '+item.notes+'" ng-model="item.notes" id="volunteer_comment" style="height:60px;padding-bottom=20px;"></div>
                  //inputType: 'text',
                  //inputPlaceholder: '  ' + item.notes
                  //template:'yo'
                  scope: $scope,
                  buttons: [
                  {text: 'Cancel'},
                  {
                    text: 'Save',
                    //type: 'button-positive',
                    onTap: function(e) {
                      if (!$scope.data.notes){
                        console.log("nothing");
                        e.preventDefault();
                      }else {
                        return $scope.data.notes;
                      }
                    }
                  }]

              });
              promptPopup.then(function(res) {
              console.log("index?" + tokenInfo.volunteers.indexOf(item));
              index = tokenInfo.volunteers.indexOf(item);
              console.log(res);
              //res = JSON.stringify(res);
              console.log("strigify: " + res);

              tokenInfo.volunteers[index].notes = res;
             // upate = JSON.parse(tokenInfo);
              console.log("Token Info 4 real:" + tokenInfo);

              //$scope.$apply(function(index) {
              //    $scope.items[index].notes = item.notes;
              //});
              //$scope.items[index].notes = item.notes;
              updateNotes(res, item.id);
              console.log('Tapped!', res);
            });
          }
          $scope.changeStatus = function(item){
            // here we will need to call a function to update the status at the current item on the server side 
          }
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

function updateNotes(res, ID) {

    var url = "/api/attendees/"+ID+"/";
    request = new XMLHttpRequest();
    request.open("PATCH", url);
    request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    console.log(getToken().token);
    request.setRequestHeader("Authorization", "Token " + getToken().token);


    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
          console.log("response: " + request.responseText);
      }
      if (request.readyState == 4 && request.status == 400) {
          alert("comment not saved");
      }
    }
    request.send("notes=" + res);

};

function verCheck(){
    var LS = localStorage.getItem('token');
    if (LS == "True") {
        window.location.assign("/list.html")
    } else{
    }
}

function getToken() {
    console.log("Tokennnnn:" + token);
    tokenInfo = JSON.parse(localStorage.getItem('token'));
    console.log("Token parsed:" + tokenInfo);
    return tokenInfo;
}

