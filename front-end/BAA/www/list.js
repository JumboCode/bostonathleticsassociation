angular.module('starter', ['ionic'])

    .controller('MyCtrl', function ($scope, $ionicPopup, $http) {
        var token = localStorage.getItem("token");
        console.log(token);
        console.log($scope);
        $http({
            method: 'GET',
            url: '/api/volunteers',
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then(function successCallback(response) {
            $scope.items = response.data;
            $scope.data = {
                showDelete: false
            };
            $scope.showPrompt = function (item) {
                var promptPopup = $ionicPopup.prompt({
                    title: item.name,
                    template: '<body><div class="row"> <input type="text" placeholder=" Add Freetext Here" ng-model="item.volunteerComment" id="volunteer_comment" style="height:60px;padding-bottom=20px;"></div><div class="row"><div class="col">' + item.email + '<hr style="margin-bottom:0px;"></div></div><div class="row" style="margin-top:0px;"><div class="col" class"label" style="color:gray;">email</div></div><div class="row"><div class="col">' + item.phone + '<hr></div></div><div class="row"><div class="col" class="label" style="color:gray;">phone number</div></div><div class="row"><div class="col col-50">' + item.city + '<hr></div><div class="col col-50">' + item.state + '<hr></div></div><div class="row"><div class="col col-50" class="label" style="color:gray;">city</div><div class="col col-50" class="label" style="color:gray;">state</div></div><div class="row"><div class="col">' + item.years_of_service + '<hr></div></div><div class="row"><div class="col" class="label" style="color:gray;">years of working with BAA</div></div><div class="row"><div class="col col-50">' + item.jacket_size + '<hr></div></div><div class="row"><div class="col col-50" class="label" style="color:gray;">jacket size</div></div></body>'
                });
            };
            $scope.changeStatus = function (item) {
                // here we will need to call a function to update the status at the current item on the server side
            };

            $scope.checkin = function (item) {
                document.getElementById("#");
                var url = "/api/attendees/" + item.id + "/";
                request = new XMLHttpRequest();
                request.open("PATCH", url);
                request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                console.log(token);
                request.setRequestHeader("Authorization", "Token " + token);
                request.onreadystatechange = function () {
                    if (request.readyState == 4 && request.status == 200) {
                        console.log(request.responseText);
                        console.log('the attendee has been checked in.')
                    }
                    if (request.readyState == 4 && request.status == 400) {
                        alert("there was a problem.");
                    }
                };
                request.send("at_event=1");

            };

            $scope.checkout = function (item) {
                document.getElementById("checkin_button").src = 'Oval.png'
                var url = "/api/attendees/" + item.id + "/";
                request = new XMLHttpRequest();
                request.open("PATCH", url);
                request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                request.setRequestHeader("Authorization", "Token " + token);
                request.onreadystatechange = function () {
                    if (request.readyState == 4 && request.status == 200) {
                        console.log(request.responseText);
                        console.log('the attendee has been checked out.')
                    }
                    if (request.readyState == 4 && request.status == 400) {
                        alert("there was a problem.");
                    }
                };
                request.send("at_event=2");

            }

        }, function errorCallback(response) {
            console.log('error');
            console.log(response[1].name);
            // called asynchronously if an error occurs
            // or server returns response with an error status.

        });



    });

function updateNotes(res, ID) {

    var url = "/api/attendees/"+ID+"/";
    var request = new XMLHttpRequest();
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
    };
    request.send("notes=" + res);

}

