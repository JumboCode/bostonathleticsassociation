StatusEnum = {
    checkedIn : 0,
    noShow : 1,
    cancelled : 2
};

var domain = "";
angular.module('starter', ['ionic'])
    .controller('MyCtrl', function ($scope, $ionicPopup, $http) {
        var token = localStorage.getItem("token");
        var attendeesTemp = localStorage.getItem("attendees");
        $scope.attendees = JSON.parse(attendeesTemp);
        console.log($scope.attendees);
        $scope.showPrompt = function (item) {
            $scope.data = {};
            var promptPopup = $ionicPopup.show({
                title: item.name,
                scope: $scope,
                cssClass: 'my-custom-popup',
                template: '<div><textarea rows="30" cols="20" wrap="hard" ng-model="data.input" id="volunteer_comment"></textarea>',
                buttons: [{
                    text: 'Confirm',
                    type: 'button-positive',
                    onTap: function(){
                        updateNotes($scope.data.input, item.id);
                    }
                }, {text: 'Cancel'}]
            });


        };

        $scope.changeStatus = function (item, status) {
            // Item is a attendee
            var url = domain + "/api/attendees/"+ item.id + "/";
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
    var url = domain + "/api/attendees/" + ID + "/";
    var request = new XMLHttpRequest();
    request.open("PATCH", url);
    request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Authorization", "Token " + token);

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            console.log("response: " + request.responseText);
        }
        if (request.readyState == 4 && request.status == 400) {
            alert("comment not saved");
        }
    };

    request.send("notes=" + res);
}