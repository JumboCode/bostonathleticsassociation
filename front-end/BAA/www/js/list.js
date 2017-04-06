StatusEnum = {
    checkedIn : 1,
    noShow : 0,
    cancelled : 2
};

var domain = "http://localhost:8000/";
angular.module('starter', ['ionic'])
    .controller('MyCtrl', function ($scope, $ionicPopup, $http) {
        var token = localStorage.getItem("token");
        var attendeesTemp = localStorage.getItem("attendees");
        $scope.attendees = JSON.parse(attendeesTemp);
        console.log($scope.attendees);
        $scope.showPrompt = function (attendee) {
            $scope.data = {};
            var promptPopup = $ionicPopup.show({
                title: attendee.first_name,
                scope: $scope,
                cssClass: 'my-custom-popup',
                template: '<div><textarea rows="30" cols="20" wrap="hard" ng-model="data.input" id="volunteer_comment"></textarea>',
                buttons: [{
                    text: 'Confirm',
                    type: 'button-positive',
                    onTap: function(){
                        updateNotes($scope.data.input, attendee.id);
                    }
                }, {text: 'Cancel'}]
            });


        };

        $scope.changeStatus = function (item, status) {
            // Item is a attendee
            var url = domain + "api/attendees/"+ item.id + "/";
            var request = new XMLHttpRequest();
            request.open("PATCH", url);
            request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            request.setRequestHeader('Authorization', 'Token ' + token);
            console.log(status);

            if (status == "checkIn") {
                item.status = StatusEnum.checkedIn;
                console.log("Checked in");
            } else if (status == "noShow") {
                item.status = StatusEnum.noShow;
                console.log("noShow");
            } else if (status == "cancelled") {
                item.status = StatusEnum.cancelled;
                console.log("cancelled");
            }

            request.send("status=" + String(item.status));
        };

        $scope.isCheckedIn = function (item) {
            return item.status == StatusEnum.checkedIn;
        };

        $scope.isNoShow = function (item) {
            return item.status == StatusEnum.noShow;
        };

        $scope.isCancelled = function (item) {
            return item.status == StatusEnum.cancelled;
        };
    });




function updateNotes(res, ID) {
    console.log(res);
    var token = localStorage.getItem("token");
    var url = domain + "api/attendees/" + ID + "/";
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