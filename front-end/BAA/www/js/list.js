StatusEnum = {
    checkedIn : 2,
    noShow : 0,
    cancelled : 1
};

var domain = "http://floating-castle-71814.herokuapp.com/";
angular.module('starter', ['ionic'])
    .controller('MyCtrl', function ($scope, $ionicPopup, $ionicScrollDelegate) {
        var token = localStorage.getItem("token");
        var attendeesTemp = localStorage.getItem("attendees");
        $scope.attendees = JSON.parse(attendeesTemp);

        // The popup button

        $scope.showPrompt = function (attendeeObj) {
            var attendee = attendeeObj.volunteer;
            if (attendeeObj.notes == "undefined") {
                var notes = "";
                $scope.holder = "Please enter notes";
            } else if (attendeeObj.notes == undefined) {
                var notes = "";
                $scope.holder = "Please enter notes";
            } else {
                var notes = attendeeObj.notes;
                $scope.holder = "";

            }

            $scope.data = {input: notes};
            var promptPopup = $ionicPopup.show({
                title: attendee.first_name + " " + attendee.last_name[0] + ".",
                scope: $scope,
                cssClass: 'my-custom-popup',
                template: '<textarea  rows="30" cols="20" wrap="hard" ng-controller="MyCtrl" ng-model="data.input" id="volunteer_comment" placeholder={{holder}}></textarea>',
                buttons: [{
                    text: 'Confirm',
                    type: 'button-positive',
                    onTap: function(){
                        updateNotes($scope.data.input, attendeeObj);
                    }
                }, {text: 'Cancel'}]
            });


        };

        // Helper function for name search
	    $scope.fullnameSearch = function (searchString) {
		    return function (object) {
			    if (searchString == undefined || searchString == "") {
				    return true;
			    }
			    searchString = searchString.toLowerCase();
			     var compareString = object.volunteer.first_name.toLowerCase() + ' ' + object.volunteer.last_name.toLowerCase();
                 var substring = compareString.indexOf(searchString);

			     $ionicScrollDelegate.scrollTop();
			    return (substring !== -1);
		    }
	    };

        // Change the state of an attendee
        $scope.changeStatus = function (item, status) {
            // Item is a attendee
            var url = domain + "api/attendees/"+ item.id + "/";
            var request = new XMLHttpRequest();
            request.open("PATCH", url);
            request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            request.setRequestHeader('Authorization', 'Token ' + token);

            // For determining the status of attendee
            if (status == "checkIn") {
                item.status = StatusEnum.checkedIn;
            } else if (status == "noShow") {
                item.status = StatusEnum.noShow;
            } else if (status == "cancelled") {
                item.status = StatusEnum.cancelled;
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

        $scope.logout = function () {
            localStorage.clear();
            window.location.href = "index.html";

        }
    });




function updateNotes(note, attendee) {
    var ID = attendee.volunteer.id;
    var token = localStorage.getItem("token");
    var url = domain + "api/attendees/" + ID + "/";
    var request = new XMLHttpRequest();
    request.open("PATCH", url);
    request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Authorization", "Token " + token);

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            attendee.notes = note;
        }
        if (request.readyState == 4 && request.status == 400) {
            alert("comment not saved");
        }
    };

    request.send("notes=" + note);
}
