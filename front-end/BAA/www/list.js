StatusEnum = {
    checkedIn : 0,
    noShow : 1,
    cancelled : 2
};


angular.module('starter', ['ionic'])
    .controller('MyCtrl', function ($scope, $ionicPopup, $http) {
        var token = localStorage.getItem("token");
        var attendeesTemp = localStorage.getItem("attendees");
        $scope.attendees = JSON.parse(attendeesTemp);
        console.log($scope.attendees);
        $scope.showPrompt = function (item) {
            console.log(item);
                var promptPopup = $ionicPopup.show({
                    title: item.name,
                    template: '<body><div class="row"> <input type="text" placeholder=" Add text Here" ng-model="item.volunteerComment" id="volunteer_comment" style="height:60px;padding-bottom=20px;"></div><div class="row"><div class="col">' + item.email + '<hr style="margin-bottom:0px;"></div></div><div class="row" style="margin-top:0px;"><div class="col" class"label" style="color:gray;">email</div></div><div class="row"><div class="col">' + item.phone + '<hr></div></div><div class="row"><div class="col" class="label" style="color:gray;">phone number</div></div><div class="row"><div class="col col-50">' + item.city + '<hr></div><div class="col col-50">' + item.state + '<hr></div></div><div class="row"><div class="col col-50" class="label" style="color:gray;">city</div><div class="col col-50" class="label" style="color:gray;">state</div></div><div class="row"><div class="col">' + item.years_of_service + '<hr></div></div><div class="row"><div class="col" class="label" style="color:gray;">years of working with BAA</div></div><div class="row"><div class="col col-50">' + item.jacket_size + '<hr></div></div><div class="row"><div class="col col-50" class="label" style="color:gray;">jacket size</div></div></body>',
                    buttons: [{ text: 'Confirm', onTap: updateNotes(template.getElementById("volunteer_comment"), item.id)}, { text: 'Cancel' }]
                });
        };

        $scope.changeStatus = function (item, status) {
            // Item is a attendee
            var url = "/api/attendees/"+ item.id + "/";
            var request = new XMLHttpRequest();
            request.open("PATCH", url);
            request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            request.setRequestHeader('Authorization', 'Token ' + token);
            console.log(status);
            if (status == "checkIn") {
                item.at_event = StatusEnum.checkedIn;
                console.log("Checked in");
            } else if (status == "noShow") {
                item.at_event = StatusEnum.noShow;
                console.log("noShow");
            } else if (status == "cancelled") {
                item.at_event = StatusEnum.cancelled;
                console.log("cancelled");
            }

            request.send("at_event=" + String(item.at_event));
        };

        $scope.isCheckedIn = function (item) {
            return item.at_event == StatusEnum.checkedIn;
        };

        $scope.isNoShow = function (item) {
            return item.at_event == StatusEnum.noShow;
        };

        $scope.isCancelled = function (item) {
            return item.at_event == StatusEnum.cancelled;
        };
    });

function updateNotes(res, ID) {
    console.log(res);
    var token = localStorage.getItem("token");
    var url = "/api/attendees/"+ID+"/";
    var request = new XMLHttpRequest();
    request.open("PATCH", url);
    request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Authorization", "Token " + token);

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

