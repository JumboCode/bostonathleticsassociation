angular.module('starter', ['ionic'])
    .controller('MyCtrl', function ($scope, $ionicPopup, $http) {
        var token = localStorage.getItem("token");
        $scope.attendees = localStorage.getItem("attendees");
        console.log($scope.attendees);
        $scope.showPrompt = function (item) {
                var promptPopup = $ionicPopup.prompt({
                    title: item.name,
                    template: '<body><div class="row"> <input type="text" placeholder=" Add Freetext Here" ng-model="item.volunteerComment" id="volunteer_comment" style="height:60px;padding-bottom=20px;"></div><div class="row"><div class="col">' + item.email + '<hr style="margin-bottom:0px;"></div></div><div class="row" style="margin-top:0px;"><div class="col" class"label" style="color:gray;">email</div></div><div class="row"><div class="col">' + item.phone + '<hr></div></div><div class="row"><div class="col" class="label" style="color:gray;">phone number</div></div><div class="row"><div class="col col-50">' + item.city + '<hr></div><div class="col col-50">' + item.state + '<hr></div></div><div class="row"><div class="col col-50" class="label" style="color:gray;">city</div><div class="col col-50" class="label" style="color:gray;">state</div></div><div class="row"><div class="col">' + item.years_of_service + '<hr></div></div><div class="row"><div class="col" class="label" style="color:gray;">years of working with BAA</div></div><div class="row"><div class="col col-50">' + item.jacket_size + '<hr></div></div><div class="row"><div class="col col-50" class="label" style="color:gray;">jacket size</div></div></body>'
                });
        };

        $scope.changeStatus = function (item) {
            // Item is a attendee
            var url = "/api/attendees/"+ item.id + "/";
            var request = new XMLHttpRequest();
            request.open("PATCH", url);
            request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            request.setRequestHeader('Authorization', 'Token ' + token);

            if (item.at_event == 1) {
                item.at_event = 2;
                console.log("checked out");
            }
            else {
                item.at_event = 1;
                console.log("checked in");
            }
            request.send("at_event=" + String(item.at_event));
        };

        $scope.isCheckedIn = function (item) {
            return item.at_event == 1;
        }
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

