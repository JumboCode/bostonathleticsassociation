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
            cordova.plugins.Keyboard.show();
            //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            //cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

    });
})

var token;
var domain = "";
function checkCredentials() {
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;

    var url = domain + "api-token-auth" + "/";
    request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            token = JSON.parse(request.responseText)['token'];
            console.log(token);

            // TODO: Here's where we would parse the attendees list
            var attendees = [
                                  {
                                    "id": 1,
                                    "volunteer": {
                                      "id": 1,
                                      "name": "Babe Ruth",
                                      "phone": "434324324234",
                                      "email": "spencer.perry@tufts.edu",
                                      "city": "Home Run",
                                      "state": "Maryland",
                                      "years_of_service": "4",
                                      "jacket": "Yes",
                                      "jacket_size": "XS",
                                      "status": "Ok"
                                    },
                                    "event": {
                                      "id": 1,
                                      "name": "Boston Marathon",
                                      "date": "2016-10-19T09:00:41Z",
                                      "csv": "http://localhost:8000/api/attendees/file/simple_csv_56oKwOt.csv"
                                    },
                                    "team_captain": {
                                      "id": 3,
                                      "name": "Earl Sweatshirt",
                                      "email": "sweatshirt@aol.com",
                                      "phone": "3943288904",
                                      "city": "LA",
                                      "state": "Cali",
                                      "years_of_service": "4",
                                      "jacket": "Yes",
                                      "jacket_size": "M",
                                      "status": "3"
                                    },
                                    "at_event": 1,
                                    "notes": "Made it to the event"
                                  },
                                  {
                                    "id": 2,
                                    "volunteer": {
                                      "id": 3,
                                      "name": "Earl Sweatshirt",
                                      "phone": "3943288904",
                                      "email": "sweatshirt@aol.com",
                                      "city": "LA",
                                      "state": "Cali",
                                      "years_of_service": "4",
                                      "jacket": "Yes",
                                      "jacket_size": "M",
                                      "status": "3"
                                    },
                                    "event": {
                                      "id": 1,
                                      "name": "Boston Marathon",
                                      "date": "2016-10-19T09:00:41Z",
                                      "csv": "http://localhost:8000/api/attendees/file/simple_csv_56oKwOt.csv"
                                    },
                                    "team_captain": {
                                      "id": 1,
                                      "name": "Babe Ruth",
                                      "email": "spencer.perry@tufts.edu",
                                      "phone": "434324324234",
                                      "city": "Home Run",
                                      "state": "Maryland",
                                      "years_of_service": "4",
                                      "jacket": "Yes",
                                      "jacket_size": "XS",
                                      "status": "Ok"
                                    },
                                    "at_event": 1,
                                    "notes": "What"
                                  },
                                  {
                                    "id": 3,
                                    "volunteer": {
                                      "id": 2,
                                      "name": "Michael Jordan",
                                      "phone": "3243423423",
                                      "email": "iamthebest@michaeljordan.com",
                                      "city": "Chicago",
                                      "state": "Illinois",
                                      "years_of_service": "4",
                                      "jacket": "Yes",
                                      "jacket_size": "L",
                                      "status": "Ok"
                                    },
                                    "event": {
                                      "id": 1,
                                      "name": "Boston Marathon",
                                      "date": "2016-10-19T09:00:41Z",
                                      "csv": "http://localhost:8000/api/attendees/file/simple_csv_56oKwOt.csv"
                                    },
                                    "team_captain": {
                                      "id": 1,
                                      "name": "Babe Ruth",
                                      "email": "spencer.perry@tufts.edu",
                                      "phone": "434324324234",
                                      "city": "Home Run",
                                      "state": "Maryland",
                                      "years_of_service": "4",
                                      "jacket": "Yes",
                                      "jacket_size": "XS",
                                      "status": "Ok"
                                    },
                                    "at_event": 1,
                                    "notes": "sjcidsoj"
                                  }
                                ];
            // console.log(attendees);
            localStorage.setItem("attendees",JSON.stringify(attendees));
            localStorage.setItem("token", token);
            verCheck();
            window.location.href = "list.html";
        }

        if (request.readyState == 4 && request.status == 400) {
            alert("invalid login");
        }
    };

    request.send("username=" + user + "&password=" + pass);
}

function showKeyboard() {
    console.log("N");
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      console.log("Y");
      window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

}

function verCheck(){
    var LS = localStorage.getItem('token');
    if (LS == "True") {
        window.location.href("list.html")
    } else{
    }
}


